import { imageUrl, cmsFetch } from "./client";
import {
  fallbackCarePlan,
  fallbackHomePage,
  fallbackJobsPage,
  fallbackLegalPage,
  fallbackReviews,
  fallbackServiceDetail,
  fallbackServices,
  fallbackSiteSettings,
  fallbackTeam,
} from "./fallback";
import {
  carePlanQuery,
  homePageQuery,
  jobsPageQuery,
  legalPageQuery,
  reviewsQuery,
  serviceDetailQuery,
  servicesQuery,
  siteAlertQuery,
  siteSettingsQuery,
  teamQuery,
} from "./queries";
import type {
  CmsCarePlan,
  CmsHomePage,
  CmsJobsPage,
  CmsLegalPage,
  CmsReview,
  CmsServiceDetail,
  CmsServiceSummary,
  CmsSiteAlert,
  CmsSiteSettings,
  CmsTeamMember,
} from "./types";

type RawService = Omit<CmsServiceSummary, "image"> & { image?: unknown };
type RawServiceDetail = Omit<CmsServiceDetail, "image" | "body"> & {
  image?: unknown;
  body?: unknown[];
};
type RawTeamMember = Omit<CmsTeamMember, "img"> & { image?: unknown };
type RawSiteSettings = Omit<CmsSiteSettings, "phoneHref" | "google"> & {
  googleRating?: number;
  googleReviewCount?: number;
  googleReviewsUrl?: string;
};

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function blocksToPlainParagraphs(blocks: unknown[] | undefined) {
  if (!blocks?.length) return undefined;
  return blocks
    .map((block) => {
      if (!block || typeof block !== "object" || !("children" in block)) return "";
      const children = (block as { children?: { text?: string }[] }).children ?? [];
      return children.map((child) => child.text ?? "").join("");
    })
    .filter(Boolean);
}

function mapSiteSettings(raw?: RawSiteSettings): CmsSiteSettings {
  if (!raw) return fallbackSiteSettings;

  return {
    ...fallbackSiteSettings,
    ...raw,
    phoneHref: phoneHref(raw.phone ?? fallbackSiteSettings.phone),
    google: {
      rating: raw.googleRating ?? fallbackSiteSettings.google.rating,
      reviewCount: raw.googleReviewCount ?? fallbackSiteSettings.google.reviewCount,
      reviewsUrl: raw.googleReviewsUrl ?? fallbackSiteSettings.google.reviewsUrl,
    },
    social: {
      ...fallbackSiteSettings.social,
      ...raw.social,
    },
  };
}

function mapService(raw: RawService): CmsServiceSummary {
  const fallback = fallbackServices.find((service) => service.slug === raw.slug);
  return {
    slug: raw.slug,
    title: raw.title,
    short: raw.short,
    image: imageUrl(raw.image, 1200) ?? fallback?.image ?? "",
    imageAlt: raw.imageAlt,
    included: raw.included ?? [],
    benefits: raw.benefits ?? [],
  };
}

function mapServiceDetail(raw?: RawServiceDetail, slug?: string): CmsServiceDetail | undefined {
  if (!raw) return slug ? fallbackServiceDetail(slug) : undefined;
  const fallback = fallbackServiceDetail(raw.slug);
  const body = blocksToPlainParagraphs(raw.body) ?? fallback?.body ?? [];

  return {
    ...mapService(raw),
    intro: raw.intro ?? fallback?.intro ?? raw.short,
    body,
    process: raw.process ?? fallback?.process ?? [],
    brands: raw.brands ?? fallback?.brands,
    pricing: raw.pricing ?? fallback?.pricing,
    faqs: raw.faqs ?? fallback?.faqs ?? [],
    related: raw.related ?? fallback?.related ?? [],
    seo: raw.seo,
  };
}

function mapTeamMember(raw: RawTeamMember): CmsTeamMember {
  const fallback = fallbackTeam.find((member) => member.name === raw.name);
  return {
    name: raw.name,
    role: raw.role,
    since: raw.since,
    bio: raw.bio,
    img: imageUrl(raw.image, 900) ?? fallback?.img ?? "",
    imageAlt: raw.imageAlt,
  };
}

export async function getSiteSettings() {
  const raw = await cmsFetch<RawSiteSettings>(siteSettingsQuery);
  return mapSiteSettings(raw);
}

export async function getServices() {
  const raw = await cmsFetch<RawService[]>(servicesQuery);
  return raw?.length ? raw.map(mapService) : fallbackServices;
}

export async function getServiceDetail(slug: string) {
  const raw = await cmsFetch<RawServiceDetail>(serviceDetailQuery, { slug });
  return mapServiceDetail(raw, slug);
}

export async function getReviews() {
  const raw = await cmsFetch<CmsReview[]>(reviewsQuery);
  return raw?.length ? raw : fallbackReviews;
}

export async function getTeamMembers() {
  const raw = await cmsFetch<RawTeamMember[]>(teamQuery);
  return raw?.length ? raw.map(mapTeamMember) : fallbackTeam;
}

export async function getJobsPage() {
  const raw = await cmsFetch<CmsJobsPage>(jobsPageQuery);
  return raw?.vacancies?.length ? raw : fallbackJobsPage;
}

export async function getSiteAlert() {
  return cmsFetch<CmsSiteAlert>(siteAlertQuery);
}

type RawHomePage = Omit<CmsHomePage, "heroImage"> & { heroImage?: unknown };

function mapHomePage(raw?: RawHomePage): CmsHomePage {
  if (!raw) return fallbackHomePage;
  return {
    ...fallbackHomePage,
    ...raw,
    heroImage: imageUrl(raw.heroImage, 1600) ?? fallbackHomePage.heroImage,
    whyChooseUs: raw.whyChooseUs?.length ? raw.whyChooseUs : fallbackHomePage.whyChooseUs,
    process: raw.process?.length ? raw.process : fallbackHomePage.process,
  };
}

export async function getHomePage() {
  const raw = await cmsFetch<RawHomePage>(homePageQuery);
  return mapHomePage(raw);
}

export async function getCarePlan() {
  const raw = await cmsFetch<CmsCarePlan>(carePlanQuery);
  if (!raw) return fallbackCarePlan;
  return {
    ...fallbackCarePlan,
    ...raw,
    included: raw.included?.length ? raw.included : fallbackCarePlan.included,
    memberPerks: raw.memberPerks?.length ? raw.memberPerks : fallbackCarePlan.memberPerks,
    excluded: raw.excluded?.length ? raw.excluded : fallbackCarePlan.excluded,
  };
}

export async function getLegalPage(slug: string) {
  const raw = await cmsFetch<CmsLegalPage>(legalPageQuery, { slug });
  if (raw?.body?.length) return raw;
  return fallbackLegalPage(slug);
}
