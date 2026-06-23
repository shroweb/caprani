import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "legalName", type: "string" }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "phone", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "email", type: "email", validation: (Rule) => Rule.required() }),
    defineField({ name: "address", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "area", title: "Service area", type: "string" }),
    defineField({ name: "founded", title: "Year founded", type: "number" }),
    defineField({ name: "gasSafe", title: "Gas Safe number", type: "string" }),
    defineField({ name: "oftec", title: "OFTEC number", type: "string" }),
    defineField({ name: "companyNo", title: "Company number", type: "string" }),
    defineField({ name: "googleRating", type: "number", validation: (Rule) => Rule.min(0).max(5) }),
    defineField({
      name: "googleReviewCount",
      type: "number",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({ name: "googleReviewsUrl", type: "url" }),
    defineField({
      name: "social",
      type: "object",
      fields: [
        defineField({ name: "facebook", type: "url" }),
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "tiktok", type: "url" }),
        defineField({ name: "youtube", type: "url" }),
      ],
    }),
    defineField({ name: "seo", type: "seo" }),
    defineField({
      name: "footerTagline",
      title: "Footer tagline",
      type: "text",
      rows: 3,
    }),
  ],
  preview: { select: { title: "name", subtitle: "phone" } },
});

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      type: "string",
      validation: (Rule) => Rule.required().max(90),
    }),
    defineField({
      name: "heroText",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(260),
    }),
    defineField({ name: "heroImage", type: "imageWithAlt" }),
    defineField({ name: "primaryCta", type: "cta" }),
    defineField({ name: "secondaryCta", type: "cta" }),
    defineField({
      name: "whyChooseUs",
      type: "array",
      of: [{ type: "processStep" }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "process",
      type: "array",
      of: [{ type: "processStep" }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required().max(80) }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "short",
      title: "Card summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({ name: "intro", type: "text", rows: 3, validation: (Rule) => Rule.max(320) }),
    defineField({ name: "body", type: "portableText" }),
    defineField({ name: "included", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "benefits", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "process", type: "array", of: [{ type: "processStep" }] }),
    defineField({ name: "brands", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "pricing", type: "array", of: [{ type: "pricingRow" }] }),
    defineField({ name: "faqs", type: "array", of: [{ type: "faq" }] }),
    defineField({
      name: "relatedServices",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({ name: "sortOrder", type: "number", initialValue: 100 }),
    defineField({ name: "isPublished", type: "boolean", initialValue: true }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current", media: "image" } },
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team members",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required().max(80) }),
    defineField({ name: "role", type: "string", validation: (Rule) => Rule.required().max(90) }),
    defineField({ name: "since", type: "string", validation: (Rule) => Rule.max(20) }),
    defineField({
      name: "bio",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(420),
    }),
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({ name: "sortOrder", type: "number", initialValue: 100 }),
    defineField({ name: "isPublished", type: "boolean", initialValue: true }),
  ],
});

export const review = defineType({
  name: "review",
  title: "Reviews",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required().max(80) }),
    defineField({
      name: "rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "text",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().max(800),
    }),
    defineField({
      name: "source",
      type: "string",
      options: { list: ["Google", "Facebook", "Direct"] },
      initialValue: "Google",
    }),
    defineField({ name: "reviewedAt", type: "date" }),
    defineField({ name: "isFeatured", type: "boolean", initialValue: false }),
    defineField({ name: "isPublished", type: "boolean", initialValue: true }),
  ],
});

export const carePlan = defineType({
  name: "carePlan",
  title: "Care plans",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({ name: "included", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "memberPerks", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "excluded",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "items", type: "array", of: [{ type: "string" }] }),
          ],
        },
      ],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const jobsPage = defineType({
  name: "jobsPage",
  title: "Jobs page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroText", type: "text", rows: 3 }),
    defineField({ name: "vacancies", type: "array", of: [{ type: "vacancy" }] }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal pages",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "body", type: "portableText", validation: (Rule) => Rule.required() }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const siteAlert = defineType({
  name: "siteAlert",
  title: "Site alert",
  type: "document",
  fields: [
    defineField({
      name: "message",
      type: "string",
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({ name: "href", type: "string" }),
    defineField({ name: "startsAt", type: "datetime" }),
    defineField({ name: "endsAt", type: "datetime" }),
    defineField({ name: "isActive", type: "boolean", initialValue: false }),
  ],
});

export const redirect = defineType({
  name: "redirect",
  title: "Redirects",
  type: "document",
  fields: [
    defineField({ name: "from", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "to", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "statusCode",
      type: "number",
      options: { list: [301, 302, 307, 308] },
      initialValue: 301,
    }),
    defineField({ name: "isActive", type: "boolean", initialValue: true }),
  ],
});

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "links",
      title: "Header nav links",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "href", type: "string", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "footerLinks",
      title: 'Footer "Company" links',
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "href", type: "string", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
  ],
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroText", type: "text", rows: 3 }),
    defineField({
      name: "values",
      title: "Our values",
      type: "array",
      of: [
        {
          type: "object",
          name: "valueItem",
          fields: [
            defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({ name: "teamIntro", title: "Team section intro", type: "text", rows: 2 }),
    defineField({ name: "quoteText", title: "Director quote", type: "text", rows: 4 }),
    defineField({ name: "quoteAttribution", title: "Quote attribution", type: "string" }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroText", type: "text", rows: 3 }),
    defineField({ name: "emergencyText", title: "Emergency callout text", type: "text", rows: 2 }),
    defineField({ name: "coverageTitle", type: "string" }),
    defineField({ name: "coverageText", type: "text", rows: 2 }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroText", type: "text", rows: 3 }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const testimonialsPage = defineType({
  name: "testimonialsPage",
  title: "Reviews page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroText", type: "text", rows: 3 }),
    defineField({ name: "seo", type: "seo" }),
  ],
});
