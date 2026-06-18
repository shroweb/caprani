import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Phone, ShieldCheck, Wrench, HelpCircle } from "lucide-react";
import { SERVICES, SERVICE_DETAILS, SITE } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetail,
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    const details = SERVICE_DETAILS[service.slug];
    return { service, details };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return {};
    return {
      meta: [
        { title: `${s.title} in Hull | Caprani Plumbing & Heating` },
        { name: "description", content: s.short },
        { property: "og:title", content: `${s.title} | Caprani Plumbing & Heating` },
        { property: "og:description", content: s.short },
        { property: "og:image", content: s.image as unknown as string },
      ],
    };
  },
});

function ServiceDetail() {
  const { service, details } = Route.useLoaderData();
  const related = (details?.related ?? [])
    .map((slug: string) => SERVICES.find((s) => s.slug === slug))
    .filter(Boolean) as Array<(typeof SERVICES)[number]>;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img src={service.image} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-primary-foreground/62"
          >
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
            <span>/</span>
            <Link to="/services" className="hover:text-accent">
              Services
            </Link>
            <span>/</span>
            <span className="text-primary-foreground/90">{service.title}</span>
          </nav>
          <h1 className="mt-5 text-4xl font-black sm:text-5xl">{service.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/85">
            {details?.intro ?? service.short}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Get a free quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 bg-primary-foreground/5 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-primary-foreground/70">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" /> Gas Safe {SITE.gasSafe}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" /> OFTEC {SITE.oftec}
            </span>
            <span>Fully insured · 12-month workmanship guarantee</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            <Reveal>
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="aspect-[16/10] w-full rounded-md border border-border object-cover shadow-sm"
              />
            </Reveal>

            {/* Overview body */}
            {details?.body && (
              <Reveal delay={60}>
                <div className="prose prose-sm max-w-none">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">Overview</h2>
                  <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                    {details.body.map((p: string, i: number) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* What's included */}
            <Reveal delay={80}>
              <h2 className="text-2xl font-bold tracking-tight">What's included</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.included.map((t: string) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 rounded-md border border-border bg-card p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Process */}
            {details?.process && (
              <Reveal delay={100}>
                <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
                <ol className="mt-5 space-y-4">
                  {details.process.map(
                    (step: { title: string; description: string }, i: number) => (
                      <li
                        key={step.title}
                        className="flex gap-4 rounded-md border border-border bg-card p-5"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-foreground">{step.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </li>
                    ),
                  )}
                </ol>
              </Reveal>
            )}

            {/* Brands */}
            {details?.brands && (
              <Reveal delay={120}>
                <h2 className="text-2xl font-bold tracking-tight">Brands we fit</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {details.brands.map((b: string) => (
                    <span
                      key={b}
                      className="rounded-md border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Pricing */}
            {details?.pricing && (
              <Reveal delay={130}>
                <h2 className="text-2xl font-bold tracking-tight">Indicative pricing</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every job is different — these are typical starting prices. You'll get a fixed
                  written quote before any work begins.
                </p>
                <div className="mt-5 overflow-hidden rounded-md border border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      {details.pricing.map(
                        (p: { label: string; price: string; note?: string }, i: number) => (
                          <tr key={p.label} className={i % 2 === 0 ? "bg-card" : "bg-secondary/40"}>
                            <td className="px-4 py-3 font-medium text-foreground">{p.label}</td>
                            <td className="px-4 py-3 text-right font-semibold text-primary whitespace-nowrap">
                              {p.price}
                            </td>
                            <td className="hidden px-4 py-3 text-right text-xs text-muted-foreground sm:table-cell">
                              {p.note}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            )}

            {/* Benefits */}
            <Reveal delay={140}>
              <h2 className="text-2xl font-bold tracking-tight">Why customers choose us</h2>
              <ul className="mt-4 space-y-3">
                {service.benefits.map((t: string) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* FAQs */}
            {details?.faqs && (
              <Reveal delay={160}>
                <h2 className="text-2xl font-bold tracking-tight">Frequently asked</h2>
                <div className="mt-4 divide-y divide-border rounded-md border border-border bg-card">
                  {details.faqs.map((f: { q: string; a: string }) => (
                    <details key={f.q} className="group p-5">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                        <span className="flex items-start gap-3 font-semibold text-foreground">
                          <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                          {f.q}
                        </span>
                        <span className="mt-1 shrink-0 text-muted-foreground transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 pl-8 text-sm leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="premium-panel rounded-md p-6">
                <h3 className="text-lg font-bold">Get a free quote</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tell us a bit about the job — we'll get back the same day.
                </p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Book online <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={SITE.phoneHref}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  <Phone className="h-4 w-4" /> {SITE.phone}
                </a>
                <div className="mt-5 rounded-md bg-secondary/60 p-3 text-xs text-muted-foreground">
                  Gas Safe No. {SITE.gasSafe} · OFTEC No. {SITE.oftec} · Fully insured
                </div>
              </div>

              <div className="rounded-md border border-border bg-primary p-6 text-primary-foreground shadow-sm">
                <h3 className="flex items-center gap-2 font-bold text-primary-foreground">
                  <Wrench className="h-4 w-4 text-accent" /> Emergency call-outs
                </h3>
                <p className="mt-2 text-sm text-primary-foreground/85">
                  24/7 call-outs across Hull & East Yorkshire. No heat, no hot water, or a leak you
                  can't stop — ring the office direct.
                </p>
                <a
                  href={SITE.phoneHref}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  <Phone className="h-4 w-4" /> Call {SITE.phone}
                </a>
              </div>

              <div className="rounded-md border border-border bg-secondary/50 p-6">
                <h4 className="text-sm font-semibold text-muted-foreground">Coverage</h4>
                <p className="mt-2 text-sm text-foreground">
                  Hull, Beverley, Cottingham, Hessle, Anlaby, Willerby, Hedon, Hornsea, Withernsea,
                  Driffield and the surrounding East Yorkshire villages.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight">Related services</h2>
              <Link to="/services" className="text-sm font-semibold text-primary hover:text-accent">
                All services
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/services/$slug"
                  params={{ slug: r.slug }}
                  className="service-card group overflow-hidden rounded-md"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground group-hover:text-accent">
                      {r.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.short}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
