import { REVIEWS, SERVICE_DETAILS, SERVICES, SITE, TEAM } from "@/lib/site";
import type {
  CmsCarePlan,
  CmsHomePage,
  CmsJobsPage,
  CmsLegalPage,
  CmsPortableBlock,
  CmsReview,
  CmsServiceDetail,
  CmsServiceSummary,
  CmsSiteSettings,
  CmsTeamMember,
} from "./types";

export const fallbackSiteSettings: CmsSiteSettings = SITE;

export const fallbackReviews: CmsReview[] = [...REVIEWS];

export const fallbackServices: CmsServiceSummary[] = SERVICES.map((service) => ({
  ...service,
  included: [...service.included],
  benefits: [...service.benefits],
}));

export const fallbackTeam: CmsTeamMember[] = TEAM.map((member) => ({ ...member }));

export const fallbackJobsPage: CmsJobsPage = {
  heroTitle: "Join the Caprani team",
  heroText:
    "We're growing — and we're always keen to hear from talented engineers and apprentices who take pride in their work.",
  vacancies: [
    {
      title: "Gas Safe Heating Engineer",
      location: "Hull",
      type: "Full-time",
      description:
        "Experienced Gas Safe engineer to join our domestic install & service team. Company van and tools provided.",
      isOpen: true,
    },
    {
      title: "Plumbing Apprentice",
      location: "Hull",
      type: "Apprenticeship",
      description:
        "Earn while you learn — work alongside experienced engineers and study towards your NVQ.",
      isOpen: true,
    },
    {
      title: "Bathroom Installer",
      location: "Hull / East Yorkshire",
      type: "Full-time",
      description:
        "Skilled bathroom fitter with experience in tiling, plumbing first/second fix and complete refurbishments.",
      isOpen: true,
    },
  ],
};

export function fallbackServiceDetail(slug: string): CmsServiceDetail | undefined {
  const summary = fallbackServices.find((service) => service.slug === slug);
  if (!summary) return undefined;
  const detail = SERVICE_DETAILS[slug];

  return {
    ...summary,
    intro: detail?.intro ?? summary.short,
    body: detail?.body ?? [summary.short],
    process: detail?.process ?? [],
    brands: detail?.brands,
    pricing: detail?.pricing,
    faqs: detail?.faqs ?? [],
    related: detail?.related ?? [],
  };
}

export const fallbackHomePage: CmsHomePage = {
  heroTitle: "Your local plumbing & heating team",
  heroText:
    "Gas Safe registered. Family-run. Boiler packed in or a pipe gone? Give us a ring — we'll pick up.",
  whyChooseUs: [
    {
      title: "We pick up the phone",
      description:
        "Our engineers carry their own phones. You'll reach a real person — not a call centre, not a voicemail.",
    },
    {
      title: "The price you're quoted is the price you pay",
      description:
        "We give written fixed prices before any work starts. The invoice won't surprise you.",
    },
    {
      title: "Gas Safe, every single time",
      description:
        "Every gas job is done by a registered engineer. Certificates issued on the day, left with you in writing.",
    },
  ],
  process: [
    {
      title: "You ring us",
      description: "Any time, any day. Someone picks up — or calls back within the hour.",
    },
    {
      title: "We come to you",
      description:
        "Same-day for emergencies. We diagnose, give you a fixed price, and won't start until you're happy with it.",
    },
    {
      title: "Fixed and guaranteed",
      description:
        "The invoice matches the quote. Every job carries a 12-month workmanship guarantee.",
    },
  ],
};

export const fallbackCarePlan: CmsCarePlan = {
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

function block(style: "normal" | "h2" | "h3", text: string): CmsPortableBlock {
  return { _type: "block", style, children: [{ _type: "span", text }] };
}

const legalSections: Record<
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

export function fallbackLegalPage(slug: string): CmsLegalPage | undefined {
  const page = legalSections[slug];
  if (!page) return undefined;

  // "terms" renders numbered sections (h3); "privacy" renders plain headings (h2).
  const headingStyle = slug === "terms" ? "h3" : "h2";

  return {
    title: page.title,
    slug,
    body: page.sections.flatMap((s) => [block(headingStyle, s.title), block("normal", s.body)]),
  };
}
