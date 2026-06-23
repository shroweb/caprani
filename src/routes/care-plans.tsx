import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X, Clock, ShieldCheck, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { GoogleRating } from "@/components/google-rating";
import { getCarePlan } from "@/lib/cms/content";

export const Route = createFileRoute("/care-plans")({
  component: CarePlans,
  loader: () => getCarePlan(),
  head: () => ({
    meta: [
      { title: "Landlord Care Plan — £29.99/mo | Caprani Plumbing & Heating Hull" },
      {
        name: "description",
        content:
          "All-inclusive Landlord Care Plan from £29.99 + VAT per month. Unlimited 24/7 call-outs, CP12, annual boiler service, CO alarm check. Hull & East Yorkshire.",
      },
    ],
  }),
});

function CarePlans() {
  const { title, intro, included, memberPerks, excluded } = Route.useLoaderData();

  return (
    <>
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-4xl font-black sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
            {intro}
          </p>
          <GoogleRating className="mt-7" />
          <div className="mt-10">
            <div className="flex items-start gap-1">
              <span className="mt-4 text-2xl font-black text-accent">£</span>
              <span className="stat-num text-7xl text-primary-foreground sm:text-8xl">29.99</span>
              <div className="ml-2 mt-5">
                <div className="text-sm text-primary-foreground/55">+ VAT</div>
                <div className="text-sm text-primary-foreground/55">/ month</div>
              </div>
            </div>
            <div className="mt-3 inline-flex rounded-md border border-accent/25 bg-accent/12 px-4 py-1.5 text-xs font-semibold text-accent">
              12-month minimum · one property
            </div>
          </div>
        </div>
      </section>

      {/* Two-column content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main content — 2/3 */}
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-2xl font-black">What's included</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Cover for one domestic rental property.
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 rounded-md border border-border bg-card p-5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <div className="text-sm text-foreground">{item}</div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80}>
              <h3 className="mt-12 text-xl font-black">Member-only perks</h3>
              <ul className="mt-4 space-y-2.5">
                {memberPerks.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Sticky sidebar — 1/3 */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="premium-panel rounded-md border-accent/30 p-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-accent">£</span>
                  <span className="stat-num text-4xl text-primary">29.99</span>
                  <span className="ml-1 text-sm text-muted-foreground">+ VAT/mo</span>
                </div>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Sign up online
                </Link>
                <a
                  href={SITE.phoneHref}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  <Phone className="h-4 w-4" /> {SITE.phone}
                </a>
                <ul className="mt-5 space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-accent" /> 2-hour emergency response
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Gas Safe No. {SITE.gasSafe}
                  </li>
                </ul>
              </div>

              <div className="rounded-md border border-border bg-secondary/40 p-5 text-xs leading-relaxed text-muted-foreground">
                Full exclusions are listed below. We'll walk you through everything before you sign
                — no surprises.
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Exclusions */}
      <section className="border-t border-border bg-secondary/45">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-xl font-black">What's not covered</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              We'll go through all of this before you sign — no surprises.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {excluded.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 55}>
                <div className="rounded-md border border-border bg-card p-5">
                  <h3 className="text-sm font-bold text-foreground">{cat.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Want a homeowner care plan?" />
    </>
  );
}
