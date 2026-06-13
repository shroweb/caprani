import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";

export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
  head: () => ({
    meta: [
      { title: "Services — Caprani Plumbing & Heating Hull" },
      { name: "description", content: "Boiler installations, repairs, bathroom suites, underfloor heating and more across Hull & East Yorkshire. Gas Safe and OFTEC registered." },
    ],
  }),
});

function ServicesIndex() {
  const [featured, ...rest] = SERVICES;

  return (
    <>
      {/* Page hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <span className="section-label text-accent before:bg-accent">Services</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Plumbing &amp; heating,<br />done properly
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/75">
            Whatever you need — a new boiler, a leak fixed, or a full bathroom refit — our Hull team handles it from start to finish.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Featured first service */}
        <Reveal>
          <Link
            to="/services/$slug"
            params={{ slug: featured.slug }}
            className="group mb-8 flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-xl sm:flex-row"
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
                <span className="section-label text-accent before:bg-accent">Featured service</span>
                <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{featured.short}</p>
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
                className="group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-xl"
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
