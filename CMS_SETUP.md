# Caprani CMS Implementation Brief

## What has been added

Caprani now has a production CMS foundation built around Sanity for editable site content and Cloudflare storage for operational data.

- Sanity Studio config at `sanity.config.ts`
- Content schemas in `src/sanity/schemaTypes`
- CMS fetch layer with static fallbacks in `src/lib/cms`
- CMS-backed services, service detail, reviews, team, and jobs pages
- Contact and job application API endpoints in `src/server.ts`
- D1/R2 operational storage handlers in `src/lib/server`
- D1 migration in `migrations/0001_cms_operational_tables.sql`
- Environment template in `.env.example`

## CMS scope included in phase 1

- Global site settings: phone, email, address, social links, registrations, Google rating
- Home page model: hero, CTAs, process, trust content, SEO
- Services: listing cards, detail pages, images, inclusions, process, brands, pricing, FAQs, related services
- Reviews/testimonials
- Team profiles
- Jobs page and vacancies
- Care plan content model
- Legal page content model
- Site-wide alert model
- Redirect model
- Preview and webhook endpoints
- Contact lead capture to D1
- Job application capture to D1 and CV upload to private R2
- Turnstile-ready bot protection
- Resend-compatible transactional email hook
- Static fallbacks so the public site keeps working before CMS credentials are present

## Does it need a database?

Yes, but it needs two different kinds of storage.

Sanity is the content database for website-editable content. It stores pages, services, reviews, team members, SEO fields, alerts, and redirects.

Cloudflare D1 is needed for operational records that should not live in the CMS: contact requests, job applications, audit events, and rate-limit events.

Cloudflare R2 is needed for private uploads such as CV files. Those should not be stored in Sanity or committed to the repo.

## What I need from you

Create or provide access to these services:

1. Sanity project
   - Project ID
   - Dataset name, normally `production`
   - Studio login users
   - CORS origins for local and production domains

2. Cloudflare resources
   - D1 database named `caprani-operational` is created and migrated
   - D1 database ID is wired into `wrangler.jsonc`
   - R2 bucket named `caprani-private-uploads` is still blocked until R2 is enabled in Cloudflare

3. Security and email
   - Cloudflare Turnstile site key and secret key
   - Resend API key, or another transactional email provider if preferred
   - Verified sender address
   - Destination inbox for website leads

4. Production domain details
   - Final production URL
   - Any legacy URLs that need redirects

## Local setup commands

Install dependencies:

```bash
npm install
```

Run the website:

```bash
npm run dev
```

Run Sanity Studio:

```bash
npm run studio
```

Apply D1 migration after the Cloudflare database exists:

```bash
npx wrangler d1 migrations apply caprani-operational --remote
```

## Required environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
VITE_SANITY_PROJECT_ID=
VITE_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
CMS_PREVIEW_SECRET=
SANITY_WEBHOOK_SECRET=
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
EMAIL_PROVIDER_API_KEY=
EMAIL_FROM=
EMAIL_TO=
```

## Sanity webhook

Create a Sanity webhook pointing to:

```text
https://YOUR_DOMAIN/api/revalidate
```

Add this header:

```text
x-sanity-webhook-secret: YOUR_SANITY_WEBHOOK_SECRET
```

The current app does not have a separate ISR cache to purge, so the endpoint acknowledges webhooks and is ready for cache invalidation if page caching is added later.

## Notes before launch

- D1 is already configured with database ID `477630f7-1870-4ecb-bfd9-696a32b43f48`.
- Add the real Sanity project ID and dataset before expecting CMS content to load.
- Contact submissions and job applications without CV uploads can store once deployed with the D1 binding. Job CV uploads still need R2 enabled.
- Turnstile is optional in local development; it becomes active when `TURNSTILE_SECRET_KEY` is set.
- Email sending is skipped until `EMAIL_PROVIDER_API_KEY`, `EMAIL_FROM`, and `EMAIL_TO` are set.
