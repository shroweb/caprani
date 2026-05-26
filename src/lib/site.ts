import engineerBoiler from "@/assets/engineer-boiler.webp";
import boilerInstall from "@/assets/boiler-install.webp";
import basinTap from "@/assets/basin-tap.webp";
import bathroomSuite from "@/assets/bathroom-suite.webp";
import vanChimney from "@/assets/van-chimney.webp";
import underfloorHeating from "@/assets/underfloor-heating.webp";
import radiatorCastIron from "@/assets/radiator-castiron.webp";
import commercialPipework from "@/assets/commercial-pipework.webp";
import teamShopfront from "@/assets/team-shopfront.webp";
import badgesGasOftec from "@/assets/badges-gas-oftec.webp";

export const SITE = {
  url: "https://capraniplumbing.co.uk",
  name: "Caprani Plumbing & Heating",
  legalName: "Caprani Plumbing and Heating Ltd",
  phone: "01482 762888",
  phoneHref: "tel:01482762888",
  area: "Hull & East Yorkshire",
  email: "info@capraniplumbing.co.uk",
  founded: 2016,
  gasSafe: "579132",
  oftec: "C105741",
  companyNo: "10010264",
  director: "Nathan Caprani",
  social: {
    facebook: "https://www.facebook.com/capraniplumbingandheating/",
    instagram: "https://www.instagram.com/capraniplumbingandheating/",
    tiktok: "https://www.tiktok.com/@capraniplumbingnheating",
    youtube: "https://www.youtube.com/channel/UCPtYSydpLIk6hBcS3nnWAvw",
  },
};

const IMG = "https://img1.wsimg.com/isteam/ip/19f149d2-47b5-4126-aafc-6b3c594766b3";
export const HERO_IMG = engineerBoiler;
export const TEAM_SHOPFRONT_IMG = teamShopfront;
export const BADGES_IMG = badgesGasOftec;
export const VAN_IMG = vanChimney;
export const BASIN_IMG = basinTap;

export const SERVICES = [
  {
    slug: "boiler-installations",
    title: "Boiler Installations",
    short: "Full-system replacements and new installs, handled start-to-finish by Gas Safe engineers.",
    image: boilerInstall,
    included: [
      "Free home survey and written quote",
      "Worcester, Vaillant, Ideal & Baxi",
      "Up to 12-year manufacturer warranty",
      "Old boiler removal and disposal",
      "System flush and full commissioning",
    ],
    benefits: ["Lower bills, quieter heating", "Smart thermostat options", "Finance available"],
  },
  {
    slug: "maintenance-repairs",
    title: "Maintenance & Repairs",
    short: "Dripping tap or a grumbling boiler — we tackle everything plumbing and heating, fast.",
    image: basinTap,
    included: [
      "Diagnostic call-out",
      "Transparent fixed pricing",
      "Same-day repairs where possible",
      "Quality replacement parts",
    ],
    benefits: ["No call-out fee on completed work", "12-month workmanship guarantee", "Local engineers"],
  },
  {
    slug: "bathroom-suites",
    title: "Bathroom Suites",
    short: "Downstairs loos to roll-top baths — we'll work with any budget, even if you can't splash out.",
    image: bathroomSuite,
    included: [
      "Design consultation",
      "Suite and tile supply",
      "Plumbing, tiling and finishing",
      "Project-managed end-to-end",
    ],
    benefits: ["Single trusted team", "Fixed-price quotes", "Adds real value to your home"],
  },
  {
    slug: "boiler-servicing",
    title: "Boiler Servicing",
    short: "Annual servicing keeps your boiler safe, efficient, and your manufacturer warranty valid.",
    image: engineerBoiler,
    included: [
      "Full safety inspection",
      "Flue and combustion check",
      "Component clean and test",
      "Gas Safe certificate",
    ],
    benefits: ["Avoid breakdowns", "Protects warranty", "Improves efficiency"],
  },
  {
    slug: "oil",
    title: "Oil Boilers",
    short: "OFTEC-registered oil boiler installation, servicing and maintenance for homes and businesses.",
    image: vanChimney,
    included: [
      "OFTEC-registered work (C105741)",
      "Oil boiler installs and swaps",
      "Annual servicing",
      "Reactive repairs",
    ],
    benefits: ["Safety and compliance", "Reliable rural heating", "Specialist expertise"],
  },
  {
    slug: "underfloor-heating",
    title: "Underfloor Heating",
    short: "Wet underfloor heating — even warmth, lower running costs, no bulky radiators.",
    image: underfloorHeating,
    included: ["System design", "Manifold and zone setup", "Smart controls", "Full commissioning"],
    benefits: ["Even comfortable warmth", "Frees up wall space", "Lower running costs"],
  },
  {
    slug: "designer-radiators",
    title: "Designer Radiators",
    short: "Sleek, modern radiators that combine efficient heating with statement-piece design.",
    image: radiatorCastIron,
    included: [
      "Range of contemporary and classic designs",
      "Vertical and floor-standing options",
      "Expert guidance and installation",
      "System balancing",
    ],
    benefits: ["Stylish focal point", "Frees up usable space", "Energy efficient"],
  },
  {
    slug: "commercial-services",
    title: "Commercial Services",
    short: "Schools, care homes, offices, retail and industrial — installs, servicing and repairs.",
    image: commercialPipework,
    included: [
      "Commercial gas safety checks",
      "Landlord certificates (CP12)",
      "Planned maintenance contracts",
      "Reactive repairs",
    ],
    benefits: ["Compliance peace of mind", "Priority response", "Dedicated point of contact"],
  },
] as const;

export const TEAM = [
  { name: "Nathan Caprani", role: "Company Director & Lead Engineer", since: "2007", img: `${IMG}/Nathan.jpg/:/cr=t:6.3%25,l:0%25,w:100%25,h:75%25/rs=w:600,h:600,cg:true` },
  { name: "Jessica Caprani", role: "Office Manager", img: `${IMG}/Jessica.jpg/:/cr=t:17.85%25,l:0%25,w:100%25,h:71.1%25/rs=w:600,h:600,cg:true` },
  { name: "Matthew Owen", role: "Operations Manager", img: `${IMG}/Matthew.jpg/:/cr=t:8.26%25,l:0%25,w:100%25,h:75%25/rs=w:600,h:600,cg:true` },
  { name: "Paul Jewitt", role: "Plumbing & Heating Engineer", img: `${IMG}/Paul.jpg/:/cr=t:8.26%25,l:0%25,w:100%25,h:75%25/rs=w:600,h:600,cg:true` },
  { name: "George Benn", role: "Plumbing & Heating Apprentice", since: "2021", img: `${IMG}/George.jpg/:/cr=t:5.98%25,l:0%25,w:100%25,h:75%25/rs=w:600,h:600,cg:true` },
  { name: "Tyler Hill", role: "Plumbing & Heating Apprentice", img: `${IMG}/Tyler%20Hill.jpg/:/cr=t:6.96%25,l:0%25,w:100%25,h:75%25/rs=w:600,h:600,cg:true` },
  { name: "Justina Plaxton", role: "Admin Assistant", img: `${IMG}/Justina%20Plaxton.jpg/:/cr=t:13.76%25,l:0%25,w:100%25,h:62.2%25/rs=w:600,h:600,cg:true` },
  { name: "Mullak Yeldar", role: "Quality & Compliance Coordinator", img: `${IMG}/Kallum.png/:/cr=t:16.27%25,l:0%25,w:100%25,h:67.45%25/rs=w:600,h:600,cg:true` },
  { name: "Otto", role: "The Office Dog", img: `${IMG}/blob-03a281b.png/:/cr=t:26.79%25,l:12.83%25,w:80.65%25,h:60.44%25/rs=w:600,h:600,cg:true,m` },
];

export const DIRECTOR_QUOTE = {
  text: "You have to take what you're given and turn it into something more — because the easiest thing to do is complain. To get something you've never had, you have to do something you've never done.",
  attribution: "Nathan Caprani, Company Director",
};

export type Service = (typeof SERVICES)[number];

/**
 * Long-form, per-service content for /services/$slug pages.
 * Keyed by slug. Anything missing falls back to the SERVICES summary.
 */
export const SERVICE_DETAILS: Record<
  string,
  {
    intro: string;
    body: string[];
    process: { title: string; description: string }[];
    brands?: string[];
    pricing?: { label: string; price: string; note?: string }[];
    faqs: { q: string; a: string }[];
    related: string[];
  }
> = {
  "boiler-installations": {
    intro:
      "A new boiler is a 10–15 year decision. We size it to your home, fit it neatly, and leave the system genuinely better than we found it — not just swapped out.",
    body: [
      "Every install starts with a free home survey. We check your hot-water demand, radiator output, flue route and gas supply before quoting — so the price you get is the price you pay.",
      "On the day, we sheet up walkways, drain the old system, fit the new boiler with a magnetic system filter and chemical flush, then commission to the manufacturer's spec. You get the warranty paperwork, the Benchmark logbook, and a quick walkthrough on the controls before we leave.",
    ],
    process: [
      { title: "Free home survey", description: "We come out, measure up, and talk you through the options — no obligation, no hard sell." },
      { title: "Written fixed quote", description: "Itemised, valid for 30 days, with finance options if you'd rather spread the cost." },
      { title: "Install day", description: "Typically one to two days. Floors covered, old kit removed, new system flushed and commissioned." },
      { title: "Aftercare", description: "Warranty registered with the manufacturer, plus our own 12-month workmanship guarantee." },
    ],
    brands: ["Worcester Bosch", "Vaillant", "Ideal", "Baxi", "Viessmann"],
    pricing: [
      { label: "Combi swap (like-for-like)", price: "from £1,895", note: "Standard install, existing pipework" },
      { label: "System or regular boiler", price: "from £2,395", note: "Including new filter and flush" },
      { label: "Full system upgrade", price: "POA", note: "Includes pipework, cylinder, controls" },
    ],
    faqs: [
      { q: "How long does an install take?", a: "Most combi swaps are done in a day. A full system change with a new cylinder or relocation is usually two days." },
      { q: "Do you offer finance?", a: "Yes — interest-free and longer-term options available through our approved lender. We'll send the details with your quote." },
      { q: "What warranty do I get?", a: "Up to 12 years from the manufacturer on approved boilers, plus our own 12-month workmanship guarantee on the install." },
    ],
    related: ["boiler-servicing", "maintenance-repairs", "underfloor-heating"],
  },
  "maintenance-repairs": {
    intro:
      "Boiler packed in, radiator stone cold, tap that won't stop dripping — we cover the lot, and we actually pick up the phone when you ring.",
    body: [
      "We diagnose first, fix second. You get a clear explanation of what's wrong, a fixed price before any work starts, and a job that's sorted properly — not patched up to limp on for another month.",
      "Common call-outs: no hot water, pressure drops, noisy boilers, leaking joints, blocked drains, dead radiators, faulty diverter valves, broken thermostats. If it's plumbing or heating, we'll have seen it before.",
    ],
    process: [
      { title: "Phone triage", description: "Quick chat to work out whether it's an emergency or can wait until tomorrow morning." },
      { title: "Diagnostic visit", description: "Fixed call-out fee. We find the fault and quote the fix before touching anything." },
      { title: "Same-day fix where possible", description: "We carry common parts on the van — about 70% of jobs are sorted on the first visit." },
      { title: "12-month guarantee", description: "On every repair we carry out. If it goes again, we come back free." },
    ],
    pricing: [
      { label: "Diagnostic call-out", price: "£75", note: "Waived if you go ahead with the repair" },
      { label: "Standard repair (1 hr)", price: "from £95", note: "Parts on top, quoted before we start" },
      { label: "Emergency out-of-hours", price: "from £150", note: "Evenings, weekends, bank holidays" },
    ],
    faqs: [
      { q: "How fast can you get to me?", a: "For genuine emergencies (no heat in winter, major leaks) we aim for same-day. Routine repairs are usually within 48 hours." },
      { q: "Do you charge to come and look?", a: "There's a fixed diagnostic fee, but it's waived if you go ahead with the repair on the day." },
      { q: "Are quotes free?", a: "Yes — we'll always tell you the cost before any work begins. No surprises on the invoice." },
    ],
    related: ["boiler-servicing", "boiler-installations", "commercial-services"],
  },
  "bathroom-suites": {
    intro:
      "From a tired downstairs loo to a full ensuite rebuild — one team, one quote, one point of contact from the first sketch to the final tile.",
    body: [
      "We project-manage the whole job: plumbing, tiling, electrics, plastering and finishing. No juggling three different trades and chasing dates — we sort it.",
      "Bring us a Pinterest board, a rough sketch, or just a rough budget. We'll spec the suite, source the tiles, and give you a fixed price and a realistic timeline before you commit.",
    ],
    process: [
      { title: "Design consultation", description: "On-site, free. We measure up, talk through layout options, and agree a style direction." },
      { title: "Fixed quote", description: "Itemised — labour, suite, tiles, sundries, waste removal. No surprise extras." },
      { title: "Strip-out & first fix", description: "Old suite out, new pipework, electrics and waste run to the new layout." },
      { title: "Second fix & finish", description: "Tiling, suite install, sealing, snagging, and a proper clean before handover." },
    ],
    pricing: [
      { label: "Cloakroom refresh", price: "from £2,500", note: "WC, basin, retile, redecorate" },
      { label: "Family bathroom", price: "from £6,500", note: "Full strip-out, suite, tiling, electrics" },
      { label: "Premium ensuite", price: "from £9,500", note: "Walk-in shower, designer fittings, underfloor heat" },
    ],
    faqs: [
      { q: "How long does a full bathroom take?", a: "Most family bathrooms are 7–10 working days from strip-out to walking on the new floor." },
      { q: "Can I supply my own suite?", a: "Yes, though we usually get trade pricing that beats the retail price you'd pay. We'll quote both ways." },
      { q: "Do you handle the electrics?", a: "Yes — Part P qualified for shower circuits, extractor fans, downlights and shaver sockets." },
    ],
    related: ["underfloor-heating", "designer-radiators", "maintenance-repairs"],
  },
  "boiler-servicing": {
    intro:
      "Once a year, an hour of our time, and your boiler stays safe, efficient, and warranty-valid. The cheapest insurance you'll buy all year.",
    body: [
      "An annual service catches the things that turn into £400 weekend call-outs — slow leaks, gummed-up diverter valves, blocked condensate pipes, drifting gas pressure. We sort them before they bite.",
      "Every service includes a full Gas Safe inspection, flue and combustion analysis, and a written report. If your boiler is still in its manufacturer warranty, this is what keeps it valid.",
    ],
    process: [
      { title: "Visual inspection", description: "Boiler casing, flue, condensate, gas tightness check — the safety basics." },
      { title: "Combustion analysis", description: "Calibrated flue gas analyser. We check CO, CO₂ and ratio against the manufacturer's spec." },
      { title: "Strip and clean", description: "Burner, heat exchanger and condensate trap cleaned where required." },
      { title: "Report & certificate", description: "Written service report and Gas Safe sticker — proof for your warranty and insurance." },
    ],
    pricing: [
      { label: "Annual gas boiler service", price: "£85", note: "Domestic combi, system or regular" },
      { label: "Oil boiler service", price: "£135", note: "OFTEC registered, includes nozzle change" },
      { label: "Landlord gas safety + service", price: "£120", note: "CP12 certificate included" },
    ],
    faqs: [
      { q: "How often should I service my boiler?", a: "Every 12 months. Most manufacturer warranties require it — miss a year and you can void cover." },
      { q: "How long does it take?", a: "Around 45 minutes to an hour for a standard combi. We'll book a 2-hour window so we're not rushing." },
      { q: "Do you do landlord certificates?", a: "Yes — CP12 gas safety certificate issued on the day, valid for 12 months." },
    ],
    related: ["maintenance-repairs", "boiler-installations", "oil"],
  },
  "oil": {
    intro:
      "OFTEC-registered oil specialists for the rural villages around Hull where mains gas doesn't reach. Installs, swaps, servicing and repairs.",
    body: [
      "We're one of the few firms in the area properly set up for oil — registered with OFTEC (C105741), insured for it, and stocked with the parts and tools that aren't on every gas engineer's van.",
      "Worcester Bosch Greenstar, Grant Vortex, Warmflow, Firebird — we install, service and repair them all. If you're on oil and you're tired of being told 'sorry, we don't really do that', give us a ring.",
    ],
    process: [
      { title: "Survey & tank check", description: "Boiler, tank, fuel line and bund condition — all checked before quoting any work." },
      { title: "Installation or swap", description: "Old unit removed, new boiler fitted, system flushed, commissioned and combustion-tested." },
      { title: "Annual servicing", description: "Nozzle change, electrode reset, combustion analysis, full safety inspection." },
      { title: "Breakdown repairs", description: "We carry pumps, nozzles, photocells and control boxes for the common units." },
    ],
    brands: ["Worcester Greenstar", "Grant Vortex", "Warmflow", "Firebird", "Mistral"],
    pricing: [
      { label: "Annual oil service", price: "£135", note: "Includes nozzle and combustion test" },
      { label: "Oil boiler swap", price: "from £2,895", note: "Like-for-like, external or internal" },
      { label: "Tank inspection", price: "£75", note: "Bund, sight gauge, fire valve, fuel line" },
    ],
    faqs: [
      { q: "My boiler keeps locking out — what is it?", a: "Usually a blocked nozzle, dirty photocell, or contaminated fuel. A service almost always sorts it." },
      { q: "Can you replace my oil tank?", a: "Yes — single or bunded, plastic or steel, with all the OFTEC paperwork on completion." },
      { q: "Do you cover rural East Yorkshire?", a: "Yes — we regularly cover Beverley, Driffield, Hornsea, Withernsea and the surrounding villages." },
    ],
    related: ["boiler-servicing", "boiler-installations", "commercial-services"],
  },
  "underfloor-heating": {
    intro:
      "Wet underfloor heating that turns the whole floor into one big radiator — even warmth, no cold spots, and your walls back for furniture instead of rads.",
    body: [
      "We design and install wet UFH systems for new builds, extensions, and retrofit projects. Manifolds, actuators, zone controls, screed or low-profile boards — full system, not just the pipe loops.",
      "Pairs brilliantly with a modern condensing boiler or an air source heat pump, since UFH runs at lower flow temperatures and squeezes more efficiency out of both.",
    ],
    process: [
      { title: "Design", description: "Heat loss calc per room, loop layout, manifold sizing and control zoning." },
      { title: "First fix", description: "Pipe loops laid and pressure tested before screed or floor goes down." },
      { title: "Manifold & controls", description: "Wired into your boiler or heat pump, with smart room thermostats per zone." },
      { title: "Commission & balance", description: "Each loop balanced to flow rate, system bled and signed off." },
    ],
    pricing: [
      { label: "Single room retrofit", price: "from £1,800", note: "Low-profile, no screed" },
      { label: "Extension (per m²)", price: "from £55/m²", note: "Pipe, manifold, controls" },
      { label: "Whole-house new build", price: "POA", note: "Full design and install" },
    ],
    faqs: [
      { q: "Will it work with my existing boiler?", a: "Usually yes — most modern combi and system boilers run UFH happily. We'll check on the survey." },
      { q: "Can I have it under wood floors?", a: "Yes, with engineered boards rated for UFH. We'd avoid solid hardwood — it can move and gap." },
      { q: "How long until the floor warms up?", a: "Wet UFH takes a few hours from cold — it's designed to run steady, not blast on and off like a radiator." },
    ],
    related: ["boiler-installations", "designer-radiators", "bathroom-suites"],
  },
  "designer-radiators": {
    intro:
      "Vertical columns, cast-iron classics, towel rails, mirror rads — radiators that earn their wall space instead of hiding behind the sofa.",
    body: [
      "We supply and fit from all the major designer ranges — Bisque, Stelrad, Reina, DQ — and we'll size them properly so they actually heat the room they're in.",
      "Most of the failures we see with statement rads aren't the rad itself, they're undersized output or a system that was never balanced. We sort both as standard.",
    ],
    process: [
      { title: "Heat loss check", description: "We work out the actual BTU you need before recommending models." },
      { title: "Specification", description: "Style, finish, valve type, pipe centres — agreed before anything is ordered." },
      { title: "Install", description: "Pipework adjusted, rad hung, valves fitted, system topped up and re-pressurised." },
      { title: "Balance & bleed", description: "Whole system rebalanced so every rad in the house heats evenly." },
    ],
    brands: ["Bisque", "Stelrad", "Reina", "DQ Heating", "The Radiator Company"],
    pricing: [
      { label: "Single rad swap", price: "from £180", note: "Like-for-like, you supply the rad" },
      { label: "Vertical designer rad", price: "from £450", note: "Including rad, valves and install" },
      { label: "Cast iron column rad", price: "POA", note: "Heavy units, often need pipe rework" },
    ],
    faqs: [
      { q: "Will a designer rad heat the room as well as my old one?", a: "Only if it's sized right. We always calculate BTU first so the new one matches or beats the old output." },
      { q: "Can you move a radiator to a different wall?", a: "Yes — we run new pipework in floor voids or chase into the wall. Quoted on survey." },
      { q: "Do you supply the radiators?", a: "We can, or you can. Either way we'll check the spec before ordering." },
    ],
    related: ["underfloor-heating", "bathroom-suites", "boiler-installations"],
  },
  "commercial-services": {
    intro:
      "Schools, care homes, offices, retail, light industrial — commercial gas and heating work with the response time of a local firm and the paperwork of a national.",
    body: [
      "We hold commercial Gas Safe qualifications and run planned maintenance contracts across Hull and East Yorkshire. CP12 landlord certificates, commercial boiler servicing, plant room work, kitchen gas, the lot.",
      "One named contact, one direct number, and an engineer who'll actually remember your site. No call centre, no ticketing system, no being passed around three departments.",
    ],
    process: [
      { title: "Site survey", description: "We walk the plant room, log appliances, and map out what's there now." },
      { title: "Maintenance plan", description: "Annual or quarterly visits, scoped to your equipment and compliance needs." },
      { title: "Compliance certificates", description: "Gas safety, CP12 landlord, commercial catering — issued and stored digitally." },
      { title: "Priority response", description: "Contract clients jump the queue. Most reactive calls attended same or next working day." },
    ],
    pricing: [
      { label: "Commercial gas safety check", price: "from £120", note: "Per appliance, quoted on site" },
      { label: "Landlord CP12 certificate", price: "from £85", note: "Up to 3 appliances" },
      { label: "Planned maintenance contract", price: "POA", note: "Tailored to portfolio" },
    ],
    faqs: [
      { q: "Do you cover multi-site landlords?", a: "Yes — we manage portfolios of 5 to 100+ properties with rolling CP12 renewal schedules." },
      { q: "What's your response time?", a: "Contract clients get same/next working day for reactive calls. Emergencies are attended within hours." },
      { q: "Do you carry public liability cover?", a: "£5m public liability, £10m employers' liability — certificates available on request." },
    ],
    related: ["boiler-servicing", "boiler-installations", "maintenance-repairs"],
  },
};
