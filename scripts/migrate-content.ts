import { createClient } from "@sanity/client";
import { SERVICES, SERVICE_DETAILS, TEAM, REVIEWS, SITE } from "../src/lib/site";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";
const token = process.env.SANITY_MIGRATION_TOKEN;

if (!projectId || !token) {
  console.error("Missing SANITY_STUDIO_PROJECT_ID or SANITY_MIGRATION_TOKEN env vars.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-06-23",
  useCdn: false,
});

// Every object inside a Sanity array needs a unique `_key`, or Studio's
// editor refuses to let a human reorder/edit the list ("Missing keys").
// The HTTP API doesn't generate these automatically, so we do it here.
function key() {
  return crypto.randomUUID().slice(0, 12);
}

function toPortableText(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: "block" as const,
    _key: key(),
    style: "normal" as const,
    markDefs: [],
    children: [{ _type: "span" as const, _key: key(), text, marks: [] }],
  }));
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function migrateServices() {
  const docs = SERVICES.map((service, index) => {
    const detail = SERVICE_DETAILS[service.slug];
    return {
      _id: `service-${service.slug}`,
      _type: "service",
      title: service.title,
      slug: { _type: "slug", current: service.slug },
      short: service.short,
      intro: detail?.intro ?? service.short,
      body: toPortableText(detail?.body ?? [service.short]),
      included: [...service.included],
      benefits: [...service.benefits],
      process: (detail?.process ?? []).map((p) => ({ ...p, _key: key(), _type: "processStep" })),
      brands: detail?.brands ?? [],
      pricing: (detail?.pricing ?? []).map((p) => ({ ...p, _key: key(), _type: "pricingRow" })),
      faqs: (detail?.faqs ?? []).map((f) => ({
        _key: key(),
        _type: "faq",
        question: f.q,
        answer: f.a,
      })),
      relatedServices: (detail?.related ?? []).map((slug) => ({
        _key: key(),
        _type: "reference" as const,
        _ref: `service-${slug}`,
        _weak: true,
      })),
      sortOrder: (index + 1) * 10,
      isPublished: true,
    };
  });

  for (const doc of docs) {
    await client.createOrReplace(doc);
    console.log(`✓ service: ${doc.title}`);
  }
}

async function migrateTeam() {
  for (const [index, member] of TEAM.entries()) {
    const doc = {
      _id: `team-${slugify(member.name)}`,
      _type: "teamMember",
      name: member.name,
      role: member.role,
      since: member.since,
      bio: member.bio,
      sortOrder: (index + 1) * 10,
      isPublished: true,
    };
    await client.createOrReplace(doc);
    console.log(`✓ team member: ${doc.name}`);
  }
}

async function migrateReviews() {
  for (const [index, review] of REVIEWS.entries()) {
    const doc = {
      _id: `review-${index + 1}`,
      _type: "review",
      name: review.name,
      rating: review.rating,
      text: review.text,
      source: review.source,
      isFeatured: index === 0,
      isPublished: true,
    };
    await client.createOrReplace(doc);
    console.log(`✓ review: ${doc.name}`);
  }
}

async function migrateCarePlan() {
  const doc = {
    _id: "carePlan-landlord",
    _type: "carePlan",
    title: "Landlord Care Plan",
    intro:
      "Hassle-free property maintenance and compliance in one monthly fee. Built for Hull landlords who want their phone to stop ringing at 11pm.",
    included: [
      "Unlimited 24/7 call-outs — no call-out charges, ever, day or night.",
      "CP12 Landlord Gas Safety Certificate — annual inspection covering 1 gas boiler + 1 additional gas appliance.",
      "Annual boiler service — full yearly service by a Gas Safe engineer.",
      "Carbon monoxide alarm check — plus a FREE replacement CO alarm if found defective.",
      "1 tap or 1 toilet repair — we cover minor repairs, no separate trades needed.",
      "Annual water quality test — professional water test once a year.",
    ],
    memberPerks: [
      "20% loyalty discount on new boiler installs (after 12+ months)",
      "10% off additional plumbing, heating and drainage services",
      "Priority service over non-care-plan customers",
      "4-hour appointment windows",
      "Emergency call-outs attended within 2 hours",
    ],
    excluded: [
      {
        _key: key(),
        title: "Gas appliances",
        items: [
          "Pre-existing faults at sign-up",
          "Commercial gas appliances",
          "Boilers over 70kW",
          "Back boilers with obsolete components",
          "Unvented hot water cylinders",
          "Gas pipework alterations or upgrades",
          "Flue and chimney work",
          "Asbestos removal",
          "Cosmetic repairs or deep cleaning",
          "Damage from limescale, sludge or poor maintenance",
        ],
      },
      {
        _key: key(),
        title: "Central heating",
        items: [
          "Radiator bleeding, balancing or remedial work",
          "Non-standard radiator valve repairs",
          "Cylinder or expansion vessel work",
          "Heat pumps, solar thermal or specialist systems",
          "Powerflushing or chemical cleaning (available separately)",
        ],
      },
      {
        _key: key(),
        title: "Water pipework",
        items: [
          "Lead, steel or iron pipework",
          "Pipework access labour exceeding 20 minutes",
          "Stop tap repairs or replacement",
          "Washing machine or dishwasher connections",
          "Pipework beyond the external stop tap",
          "Shared or communal building pipework",
          "Frozen pipe or tenant damage",
        ],
      },
      {
        _key: key(),
        title: "Taps & toilets",
        items: [
          "Sanitary ware replacement",
          "Work requiring removal of tiling or fitted furniture",
          "Concealed cisterns without access panels",
          "Macerators, bidets, urinals or electric toilets",
          "Limescale damage",
          "Blockages from tenant misuse",
        ],
      },
      {
        _key: key(),
        title: "General",
        items: [
          "Drainage systems and waste pipework",
          "Shower systems and shower pumps",
          "Water ingress from roofs or external sources",
          "Damage from frost, fire, floods or acts of God",
          "Third-party, inter-tenancy or tenant negligence damage",
          "Liability for property damage caused by leaks",
        ],
      },
    ],
  };
  await client.createOrReplace(doc);
  console.log(`✓ care plan: ${doc.title}`);
}

async function migrateJobsPage() {
  const doc = {
    _id: "jobsPage-main",
    _type: "jobsPage",
    heroTitle: "Join the Caprani team",
    heroText:
      "We're growing — and we're always keen to hear from talented engineers and apprentices who take pride in their work.",
    vacancies: [
      {
        _key: key(),
        _type: "vacancy",
        title: "Gas Safe Heating Engineer",
        location: "Hull",
        type: "Full-time",
        description:
          "Experienced Gas Safe engineer to join our domestic install & service team. Company van and tools provided.",
        isOpen: true,
      },
      {
        _key: key(),
        _type: "vacancy",
        title: "Plumbing Apprentice",
        location: "Hull",
        type: "Apprenticeship",
        description:
          "Earn while you learn — work alongside experienced engineers and study towards your NVQ.",
        isOpen: true,
      },
      {
        _key: key(),
        _type: "vacancy",
        title: "Bathroom Installer",
        location: "Hull / East Yorkshire",
        type: "Full-time",
        description:
          "Skilled bathroom fitter with experience in tiling, plumbing first/second fix and complete refurbishments.",
        isOpen: true,
      },
    ],
  };
  await client.createOrReplace(doc);
  console.log(`✓ jobs page`);
}

async function migrateHomePage() {
  const doc = {
    _id: "homePage-main",
    _type: "homePage",
    heroTitle: "Your local plumbing & heating team",
    heroText:
      "Gas Safe registered. Family-run. Boiler packed in or a pipe gone? Give us a ring — we'll pick up.",
    whyChooseUs: [
      {
        _key: key(),
        _type: "processStep",
        title: "We pick up the phone",
        description:
          "Our engineers carry their own phones. You'll reach a real person — not a call centre, not a voicemail.",
      },
      {
        _key: key(),
        _type: "processStep",
        title: "The price you're quoted is the price you pay",
        description:
          "We give written fixed prices before any work starts. The invoice won't surprise you.",
      },
      {
        _key: key(),
        _type: "processStep",
        title: "Gas Safe, every single time",
        description:
          "Every gas job is done by a registered engineer. Certificates issued on the day, left with you in writing.",
      },
    ],
    process: [
      {
        _key: key(),
        _type: "processStep",
        title: "You ring us",
        description: "Any time, any day. Someone picks up — or calls back within the hour.",
      },
      {
        _key: key(),
        _type: "processStep",
        title: "We come to you",
        description:
          "Same-day for emergencies. We diagnose, give you a fixed price, and won't start until you're happy with it.",
      },
      {
        _key: key(),
        _type: "processStep",
        title: "Fixed and guaranteed",
        description:
          "The invoice matches the quote. Every job carries a 12-month workmanship guarantee.",
      },
    ],
  };
  await client.createOrReplace(doc);
  console.log(`✓ home page`);
}

function block(style: "normal" | "h2" | "h3", text: string) {
  return {
    _type: "block" as const,
    _key: key(),
    style,
    children: [{ _type: "span" as const, _key: key(), text }],
  };
}

const legalContent: Record<
  string,
  { title: string; sections: { title: string; body: string }[] }
> = {
  terms: {
    title: "Terms & Conditions",
    sections: [
      {
        title: "Company details",
        body: `${SITE.legalName}, ${SITE.address}. Telephone: ${SITE.phone}. Company registered in England, No. ${SITE.companyNo}.`,
      },
      {
        title: "Formation of contract",
        body: "A binding contract is formed when you confirm a booking, accept a written quotation, pay a deposit, or permit work to commence. These terms apply to all such contracts.",
      },
      {
        title: "Quotations",
        body: "Written quotations are valid for 14 days unless otherwise stated. Pricing may be revised if hidden defects, unforeseen site conditions, or access difficulties materially affect the scope of work. We will notify you before proceeding with any variation.",
      },
      {
        title: "Deposits and payment",
        body: "Works exceeding £500 require a 50% deposit before commencement. Projects over £5,000 are subject to staged payments agreed in advance. Invoices are due within 7 days of issue. Late payments incur an administration charge of £50 + VAT plus statutory interest under the Late Payment of Commercial Debts (Interest) Act 1998.",
      },
      {
        title: "Labour charges",
        body: "Labour is charged in minimum increments of one hour. Chargeable time includes diagnostics, material ordering, administration, certification, and travel where applicable.",
      },
      {
        title: "Cancellations",
        body: "Standard service appointments require at least 24 hours' notice of cancellation. Quoted or scheduled works require 7 working days' notice. Cancellations with insufficient notice may attract charges of between 20% and 100% of the agreed value. Deposits are non-refundable unless we are unable to fulfil the booking.",
      },
      {
        title: "Workmanship warranty",
        body: "Our workmanship is covered by a 12-month warranty against defects arising directly from work carried out by us. This does not extend to faults caused by pre-existing conditions, subsequent third-party interference, misuse, or fair wear and tear.",
      },
      {
        title: "Consumer rights",
        body: "If you are a domestic consumer and a contract is formed at a distance (e.g. by phone or online), you may have a 14-day cooling-off period under the Consumer Contracts Regulations 2013. If you request that work begins within this period, you may be charged for services rendered up to the point of cancellation.",
      },
      {
        title: "Liability",
        body: "Our liability is limited to the value of the works carried out. We are not liable for consequential or indirect losses. Nothing in these terms limits liability for death or personal injury caused by our negligence, or for any matter that cannot lawfully be excluded.",
      },
      {
        title: "Governing law",
        body: "These terms are governed by the law of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        title: "Who we are",
        body: `${SITE.legalName} is the data controller for personal information collected through this website and in the course of providing our services. Registered address: ${SITE.address}. Company No. ${SITE.companyNo}.`,
      },
      {
        title: "What we collect",
        body: "When you use our contact or booking form, or call us, we collect your name, phone number, email address, and property address. We also collect basic analytics data (pages visited, approximate location) through cookies to help us improve the site. We do not collect payment card details directly — payments are handled by our approved providers.",
      },
      {
        title: "How we use it",
        body: "We use your contact details to respond to enquiries, schedule and carry out work, issue invoices, and send service reminders where you have agreed to this. We do not sell your data to third parties or use it for unsolicited marketing.",
      },
      {
        title: "Cookies",
        body: "We use cookies to analyse website traffic and optimise your experience. You can disable cookies in your browser settings, though some features of the site may not work as intended.",
      },
      {
        title: "How long we keep it",
        body: "We retain customer records for 7 years after the last transaction to meet our legal and accounting obligations, then securely delete them.",
      },
      {
        title: "Your rights",
        body: `Under UK GDPR you have the right to access, correct, or delete the personal data we hold about you. To make a request, contact us at ${SITE.email} or call ${SITE.phone}. If you are not satisfied with our response, you may complain to the Information Commissioner's Office (ico.org.uk).`,
      },
    ],
  },
};

async function migrateLegalPages() {
  for (const [slug, page] of Object.entries(legalContent)) {
    const headingStyle = slug === "terms" ? "h3" : "h2";
    const doc = {
      _id: `legalPage-${slug}`,
      _type: "legalPage",
      title: page.title,
      slug: { _type: "slug", current: slug },
      body: page.sections.flatMap((s) => [block(headingStyle, s.title), block("normal", s.body)]),
    };
    await client.createOrReplace(doc);
    console.log(`✓ legal page: ${doc.title}`);
  }
}

async function main() {
  await migrateServices();
  await migrateTeam();
  await migrateReviews();
  await migrateCarePlan();
  await migrateJobsPage();
  await migrateHomePage();
  await migrateLegalPages();
  console.log("\nMigration complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
