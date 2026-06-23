import { defineArrayMember, defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(170),
    }),
    defineField({ name: "image", title: "Social image", type: "imageWithAlt" }),
  ],
});

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (Rule) => Rule.required().min(6).max(140),
    }),
  ],
});

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required().max(40) }),
    defineField({ name: "href", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "variant",
      type: "string",
      options: { list: ["primary", "secondary", "phone"] },
      initialValue: "primary",
    }),
  ],
});

export const portableText = defineType({
  name: "portableText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
      ],
      lists: [{ title: "Bulleted", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              }),
            ],
          },
        ],
      },
    }),
  ],
});

export const processStep = defineType({
  name: "processStep",
  title: "Process step",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required().max(70) }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(260),
    }),
  ],
});

export const pricingRow = defineType({
  name: "pricingRow",
  title: "Pricing row",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required().max(80) }),
    defineField({ name: "price", type: "string", validation: (Rule) => Rule.required().max(40) }),
    defineField({ name: "note", type: "string", validation: (Rule) => Rule.max(120) }),
  ],
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({
      name: "question",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "answer",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
    }),
  ],
});

export const vacancy = defineType({
  name: "vacancy",
  title: "Vacancy",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required().max(80) }),
    defineField({
      name: "location",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "type",
      title: "Contract type",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({ name: "isOpen", title: "Open", type: "boolean", initialValue: true }),
  ],
});
