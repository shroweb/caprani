import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, BadgeCheck, Quote } from "lucide-react";
import { SITE, TEAM, DIRECTOR_QUOTE } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Caprani Plumbing & Heating | Family-run in Hull since 2016" },
      { name: "description", content: "Meet the Caprani team. A family-run, Gas Safe and OFTEC registered plumbing & heating business serving Hull and East Yorkshire since 2016." },
    ],
  }),
});

function About() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="text-sm font-semibold uppercase tracking-wider text-accent">About us</div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Hello and a big friendly warm welcome
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/85">
            Founded in {SITE.founded}, Caprani Plumbing & Heating is a small, family-run business based in Hull, dedicated to serving both domestic and commercial clients. Specialising in plumbing, heating and oil services.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Raising industry standards", d: "Continuous improvement, innovation and adherence to the highest quality and safety protocols." },
            { t: "Customer focused", d: "Tailored, reliable, friendly service for every client we serve — domestic and commercial." },
            { t: "Investing in young people", d: "Apprenticeships and training to empower the next generation in plumbing and heating." },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 80}>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-accent">Our values</div>
                <h3 className="mt-2 text-xl font-bold">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Accreditation */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="font-bold">Gas Safe Register</div>
              <div className="text-sm text-muted-foreground">Registration No. {SITE.gasSafe}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="font-bold">OFTEC Register</div>
              <div className="text-sm text-muted-foreground">Registration No. {SITE.oftec}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-sm font-semibold uppercase tracking-wider text-accent">Meet</div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">#TeamCAPRANI</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            The people who'll actually turn up at your door — engineers, apprentices, office team, and one office dog.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {TEAM.map((p, i) => (
            <Reveal key={p.name} delay={i * 50}>
              <figure className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <figcaption className="p-5">
                  <div className="font-semibold text-foreground">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.role}</div>
                  {p.since && <div className="mt-1 text-xs text-accent">With Caprani since {p.since}</div>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Director quote */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Quote className="h-10 w-10 text-accent" />
          <blockquote className="mt-4 text-2xl font-medium leading-snug sm:text-3xl">
            "{DIRECTOR_QUOTE.text}"
          </blockquote>
          <div className="mt-6 text-sm font-semibold text-primary-foreground/70">— {DIRECTOR_QUOTE.attribution}</div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
