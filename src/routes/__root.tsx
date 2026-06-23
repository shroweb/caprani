import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCta } from "@/components/mobile-cta";
import { SITE } from "@/lib/site";
import { getNavigation, getServices, getSiteSettings } from "@/lib/cms/content";
import { SiteDataProvider } from "@/lib/site-data";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async () => {
    const [siteSettings, navigation, services] = await Promise.all([
      getSiteSettings(),
      getNavigation(),
      getServices(),
    ]);
    return { siteSettings, navigation, services };
  },
  head: ({ loaderData }) => {
    const site = loaderData?.siteSettings ?? SITE;
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Caprani Plumbing & Heating | Hull Gas Safe Engineers" },
        {
          name: "description",
          content:
            "Hull's local plumbing & heating experts. Gas Safe registered, 24/7 emergency call-outs across Hull & East Yorkshire. Call 01482 762888.",
        },
        { name: "author", content: "Caprani Plumbing & Heating" },
        { property: "og:title", content: "Caprani Plumbing & Heating | Hull" },
        {
          property: "og:description",
          content:
            "Domestic & commercial plumbing and heating in Hull. 24/7 emergency. Gas Safe registered.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:url", content: site.url },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Plumber",
            name: site.name,
            legalName: site.legalName,
            url: site.url,
            telephone: site.phone,
            email: site.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: "896 Spring Bank West",
              addressLocality: "Hull",
              postalCode: "HU5 5BL",
              addressRegion: "East Yorkshire",
              addressCountry: "GB",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: site.google.rating,
              reviewCount: site.google.reviewCount,
            },
            areaServed: { "@type": "AdministrativeArea", name: site.area },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
            sameAs: Object.values(site.social),
            foundingDate: String(SITE.founded),
          }),
        },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const siteData = Route.useLoaderData();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteDataProvider value={siteData}>
        <SiteHeader />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
        <MobileCta />
      </SiteDataProvider>
    </QueryClientProvider>
  );
}
