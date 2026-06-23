import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getServices, getServicesPage } from "@/lib/cms/content";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { GoogleRating } from "@/components/google-rating";

export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
  loader: async () => {
    const [services, page] = await Promise.all([getServices(), getServicesPage()]);
    return { services, page };
  },
  head: () => ({
    meta: [
      { title: "Services — Caprani Plumbing & Heating Hull" },
      {
        name: "description",
        content:
          "Boiler installations, repairs, bathroom suites, underfloor heating and more across Hull & East Yorkshire. Gas Safe and OFTEC registered.",
      },
    ],
  }),
});

function ServicesIndex() {
  const { services, page } = Route.useLoaderData();
  const [featured, ...rest] = services;

  return (
    <>
      {/* Page hero */}
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-4xl font-black sm:text-5xl">{page.heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/75">{page.heroText}</p>
          <GoogleRating className="mt-7" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Featured first service */}
        <Reveal>
          <Link
            to="/services/$slug"
            params={{ slug: featured.slug }}
            className="service-card group mb-8 flex flex-col overflow-hidden rounded-md sm:flex-row"
          >
            <div className="aspect-[4/3] overflow-hidden bg-secondary sm:aspect-auto sm:w-2/5 sm:shrink-0">
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-8 sm:p-10">
              <div>
                <h2 className="text-2xl font-black sm:text-3xl">{featured.title}</h2>
                <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                  {featured.short}
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent">
                View service{" "}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Remaining services grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s, i) => (
            <Reveal key={s.slug} delay={i * 45}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="service-card group block h-full overflow-hidden rounded-md"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
