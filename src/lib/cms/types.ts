export type CmsImage = {
  url?: string;
  alt?: string;
};

export type CmsSeo = {
  title?: string;
  description?: string;
  image?: CmsImage;
};

export type CmsSiteSettings = {
  name: string;
  legalName?: string;
  url?: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  area?: string;
  gasSafe?: string;
  oftec?: string;
  companyNo?: string;
  google: {
    rating: number;
    reviewCount: number;
    reviewsUrl: string;
  };
  social: Record<"facebook" | "instagram" | "tiktok" | "youtube", string>;
  seo?: CmsSeo;
};

export type CmsServiceSummary = {
  slug: string;
  title: string;
  short: string;
  image: string;
  imageAlt?: string;
  included: string[];
  benefits: string[];
};

export type CmsServiceDetail = CmsServiceSummary & {
  intro: string;
  body: string[];
  process: { title: string; description: string }[];
  brands?: string[];
  pricing?: { label: string; price: string; note?: string }[];
  faqs: { q: string; a: string }[];
  related: string[];
  seo?: CmsSeo;
};

export type CmsReview = {
  name: string;
  rating: number;
  text: string;
  source: "Google" | "Facebook" | "Direct";
  reviewedAt?: string;
};

export type CmsTeamMember = {
  name: string;
  role: string;
  since?: string;
  bio: string;
  img: string;
  imageAlt?: string;
};

export type CmsVacancy = {
  title: string;
  location: string;
  type: string;
  description: string;
  isOpen?: boolean;
};

export type CmsJobsPage = {
  heroTitle: string;
  heroText: string;
  vacancies: CmsVacancy[];
  seo?: CmsSeo;
};

export type CmsSiteAlert = {
  message: string;
  href?: string;
};

export type CmsRedirect = {
  from: string;
  to: string;
  statusCode: 301 | 302 | 307 | 308;
};

export type CmsCta = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "phone";
};

export type CmsProcessStep = {
  title: string;
  description: string;
};

export type CmsHomePage = {
  heroTitle: string;
  heroText: string;
  heroImage?: string;
  heroImageAlt?: string;
  primaryCta?: CmsCta;
  secondaryCta?: CmsCta;
  whyChooseUs: CmsProcessStep[];
  process: CmsProcessStep[];
  seo?: CmsSeo;
};

export type CmsCarePlan = {
  title: string;
  intro?: string;
  included: string[];
  memberPerks: string[];
  excluded: { title: string; items: string[] }[];
  seo?: CmsSeo;
};

export type CmsPortableBlock = {
  _type: "block";
  style?: "normal" | "h2" | "h3";
  children: { _type: "span"; text: string }[];
};

export type CmsLegalPage = {
  title: string;
  slug: string;
  body: CmsPortableBlock[];
  seo?: CmsSeo;
};
