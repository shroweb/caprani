import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, BadgeCheck } from "lucide-react";
import { SITE, TEAM, DIRECTOR_QUOTE } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Caprani Plumbing & Heating | Family-run in Hull since 2016" },
      {
        name: "description",
        content:
          "Meet the Caprani team. A family-run, Gas Safe and OFTEC registered plumbing & heating business serving Hull and East Yorkshire since 2016.",
      },
    ],
  }),
});

function About() {
  return (
    <>
      {/* Page hero */}
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-4xl font-black sm:text-5xl lg:text-6xl">
            Hull's family-run
            <br />
            plumbing &amp; heating team
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
            Founded in {SITE.founded}, Caprani Plumbing & Heating is a small, family-run business
            based in Hull — dedicated to domestic and commercial clients across the city and East
            Yorkshire.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-2xl font-black sm:text-3xl">What we stand for</h2>
        </Reveal>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {[
            {
              t: "Raising industry standards",
              d: "Continuous improvement, innovation and adherence to the highest quality and safety protocols. Every job, every time.",
            },
            {
              t: "Customer focused",
              d: "Tailored, reliable, friendly service for every client we serve — domestic and commercial. No call centres, just people.",
            },
            {
              t: "Investing in young people",
              d: "Apprenticeships and training to empower the next generation in plumbing and heating. George and Tyler are proof.",
            },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 80}>
              <div className="border-l-2 border-accent py-1 pl-6">
                <h3 className="text-lg font-bold">{v.t}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Accreditations */}
      <section className="border-y border-border bg-secondary/45">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="premium-panel flex items-center gap-4 rounded-md p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold">Gas Safe Register</div>
                <div className="text-sm text-muted-foreground">Registration No. {SITE.gasSafe}</div>
              </div>
            </div>
            <div className="premium-panel flex items-center gap-4 rounded-md p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold">OFTEC Register</div>
                <div className="text-sm text-muted-foreground">Registration No. {SITE.oftec}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl font-black sm:text-4xl">Meet the team</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            The people who will actually turn up at your door: engineers, apprentices, and the
            office team keeping each job moving.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {TEAM.map((p, i) => (
            <Reveal key={p.name} delay={i * 45}>
              <figure className="service-card group overflow-hidden rounded-md">
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-5">
                  <div className="font-bold text-foreground">{p.name}</div>
                  <div className="mt-0.5 text-sm font-semibold text-accent">{p.role}</div>
                  {p.since && (
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      With Caprani since {p.since}
                    </div>
                  )}
                  {p.bio && (
                    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{p.bio}</p>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Director quote — editorial treatment */}
      <section className="overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <Reveal>
            <div className="select-none text-[8rem] font-black leading-none text-accent/15 sm:text-[11rem]">
              "
            </div>
            <blockquote className="-mt-8 text-2xl font-medium leading-snug sm:text-3xl lg:text-4xl">
              {DIRECTOR_QUOTE.text}
            </blockquote>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-10 bg-accent" />
              <cite className="text-sm font-semibold not-italic text-primary-foreground/60">
                {DIRECTOR_QUOTE.attribution}
              </cite>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
