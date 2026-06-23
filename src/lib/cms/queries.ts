export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  name,
  legalName,
  url,
  phone,
  email,
  address,
  area,
  founded,
  gasSafe,
  oftec,
  companyNo,
  googleRating,
  googleReviewCount,
  googleReviewsUrl,
  social,
  footerTagline,
  seo{title, description, "image": image{..., "alt": alt}}
}`;

export const servicesQuery = `*[_type == "service" && isPublished == true] | order(sortOrder asc, title asc) {
  title,
  "slug": slug.current,
  short,
  image,
  "imageAlt": image.alt,
  included,
  benefits
}`;

export const serviceDetailQuery = `*[_type == "service" && isPublished == true && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  short,
  image,
  "imageAlt": image.alt,
  included,
  benefits,
  intro,
  body,
  process,
  brands,
  pricing,
  "faqs": faqs[]{ "q": question, "a": answer },
  "related": relatedServices[]->slug.current,
  seo{title, description, "image": image{..., "alt": alt}}
}`;

export const reviewsQuery = `*[_type == "review" && isPublished == true] | order(isFeatured desc, reviewedAt desc) {
  name,
  rating,
  text,
  source,
  reviewedAt
}`;

export const teamQuery = `*[_type == "teamMember" && isPublished == true] | order(sortOrder asc, name asc) {
  name,
  role,
  since,
  bio,
  image,
  "imageAlt": image.alt
}`;

export const jobsPageQuery = `*[_type == "jobsPage"][0]{
  heroTitle,
  heroText,
  "vacancies": vacancies[isOpen != false],
  seo{title, description, "image": image{..., "alt": alt}}
}`;

export const siteAlertQuery = `*[
  _type == "siteAlert" &&
  isActive == true &&
  (!defined(startsAt) || startsAt <= now()) &&
  (!defined(endsAt) || endsAt >= now())
] | order(_updatedAt desc)[0]{
  message,
  href
}`;

export const redirectsQuery = `*[_type == "redirect" && isActive == true]{
  from,
  to,
  statusCode
}`;

export const homePageQuery = `*[_type == "homePage"][0]{
  heroTitle,
  heroText,
  heroImage,
  "heroImageAlt": heroImage.alt,
  primaryCta,
  secondaryCta,
  whyChooseUs,
  process,
  seo{title, description, "image": image{..., "alt": alt}}
}`;

export const carePlanQuery = `*[_type == "carePlan"][0]{
  title,
  intro,
  included,
  memberPerks,
  excluded,
  seo{title, description, "image": image{..., "alt": alt}}
}`;

export const legalPageQuery = `*[_type == "legalPage" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  body,
  seo{title, description, "image": image{..., "alt": alt}}
}`;

export const navigationQuery = `*[_type == "navigation"][0]{
  links,
  footerLinks
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  heroTitle,
  heroText,
  values,
  teamIntro,
  quoteText,
  quoteAttribution,
  seo{title, description, "image": image{..., "alt": alt}}
}`;

export const contactPageQuery = `*[_type == "contactPage"][0]{
  heroTitle,
  heroText,
  emergencyText,
  coverageTitle,
  coverageText,
  seo{title, description, "image": image{..., "alt": alt}}
}`;

export const servicesPageQuery = `*[_type == "servicesPage"][0]{
  heroTitle,
  heroText,
  seo{title, description, "image": image{..., "alt": alt}}
}`;

export const testimonialsPageQuery = `*[_type == "testimonialsPage"][0]{
  heroTitle,
  heroText,
  seo{title, description, "image": image{..., "alt": alt}}
}`;
