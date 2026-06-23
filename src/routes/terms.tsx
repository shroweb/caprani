import { createFileRoute } from "@tanstack/react-router";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { SITE } from "@/lib/site";
import { GoogleRating } from "@/components/google-rating";
import { getLegalPage } from "@/lib/cms/content";
import type { CmsPortableBlock } from "@/lib/cms/types";

export const Route = createFileRoute("/terms")({
  component: Terms,
  loader: () => getLegalPage("terms"),
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Caprani Plumbing & Heating" },
      {
        name: "description",
        content: "Terms and conditions for Caprani Plumbing and Heating Limited, Hull.",
      },
    ],
  }),
});

// Maps each h3 block's array index to its 1-based section number, so the
// numbering survives React re-rendering blocks (e.g. StrictMode) without
// relying on mutable state inside the block renderer.
function numberHeadings(body: CmsPortableBlock[] | undefined) {
  const numbers = new Map<number, number>();
  let count = 0;
  body?.forEach((b, i) => {
    if (b.style === "h3") numbers.set(i, ++count);
  });
  return numbers;
}

function legalComponents(headingNumbers: Map<number, number>): PortableTextComponents {
  return {
    block: {
      h3: ({ children, index }) => (
        <h2 className="mt-8 text-lg font-bold text-foreground first:mt-0">
          <span className="mr-2 text-accent">{headingNumbers.get(index)}.</span>
          {children}
        </h2>
      ),
      normal: ({ children }) => (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
      ),
    },
  };
}

function Terms() {
  const page = Route.useLoaderData();

  return (
    <>
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-4xl font-black sm:text-5xl">{page?.title ?? "Terms & Conditions"}</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            {SITE.legalName} · {SITE.address}
          </p>
          <GoogleRating className="mt-7" />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {page?.body && (
          <PortableText value={page.body} components={legalComponents(numberHeadings(page.body))} />
        )}

        <div className="mt-12 rounded-md border border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
          Questions about these terms? Call us on{" "}
          <a href={SITE.phoneHref} className="font-semibold text-foreground hover:text-accent">
            {SITE.phone}
          </a>{" "}
          or email{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-semibold text-foreground hover:text-accent"
          >
            {SITE.email}
          </a>
          .
        </div>
      </section>
    </>
  );
}
