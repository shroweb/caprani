import { createFileRoute, Link } from "@tanstack/react-router";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { SITE } from "@/lib/site";
import { GoogleRating } from "@/components/google-rating";
import { getLegalPage } from "@/lib/cms/content";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  loader: () => getLegalPage("privacy"),
  head: () => ({
    meta: [
      { title: "Privacy Policy — Caprani Plumbing & Heating" },
      {
        name: "description",
        content: "Privacy policy for Caprani Plumbing and Heating Limited, Hull.",
      },
    ],
  }),
});

const legalComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-8 text-lg font-bold text-foreground first:mt-0">{children}</h2>
    ),
    normal: ({ children }) => (
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    ),
  },
};

function Privacy() {
  const page = Route.useLoaderData();

  return (
    <>
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-4xl font-black sm:text-5xl">{page?.title ?? "Privacy Policy"}</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            {SITE.legalName} · {SITE.address}
          </p>
          <GoogleRating className="mt-7" />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {page?.body && <PortableText value={page.body} components={legalComponents} />}

        <div className="mt-12 rounded-md border border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
          For any privacy queries, contact us at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-semibold text-foreground hover:text-accent"
          >
            {SITE.email}
          </a>{" "}
          or{" "}
          <Link to="/contact" className="font-semibold text-foreground hover:text-accent">
            via our contact form
          </Link>
          .
        </div>
      </section>
    </>
  );
}
