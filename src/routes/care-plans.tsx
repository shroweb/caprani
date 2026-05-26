import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X, Clock, ShieldCheck, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";

export const Route = createFileRoute("/care-plans")({
  component: CarePlans,
  head: () => ({
    meta: [
      { title: "Landlord Care Plan — £29.99/mo | Caprani Plumbing & Heating Hull" },
      { name: "description", content: "All-inclusive Landlord Care Plan from £29.99 + VAT per month. Unlimited 24/7 call-outs, CP12, annual boiler service, CO alarm check. Hull & East Yorkshire." },
    ],
  }),
});

const included = [
  { t: "Unlimited 24/7 call-outs", d: "No call-out charges, ever. Day or night." },
  { t: "CP12 Landlord Gas Safety Certificate", d: "Annual inspection covering 1 gas boiler + 1 additional gas appliance." },
  { t: "Annual boiler service", d: "Full yearly service by a Gas Safe engineer." },
  { t: "Carbon monoxide alarm check", d: "Plus a FREE replacement CO alarm if found defective." },
  { t: "1 tap or 1 toilet repair", d: "We cover minor repairs — no separate trades needed." },
  { t: "Annual water quality test", d: "Professional water test once a year." },
];

const memberPerks = [
  "20% loyalty discount on new boiler installs (after 12+ months)",
  "10% off additional plumbing, heating and drainage services",
  "Priority service over non-care-plan customers",
  "4-hour appointment windows",
  "Emergency call-outs attended within 2 hours",
];

const excluded = [
  "Pre-existing faults at sign-up",
  "Commercial gas appliances",
  "Boilers over 70kW",
  "Complex heating systems (heat pumps, solar thermal)",
  "Showers, shower pumps, macerators",
  "Drainage systems and waste pipework",
  "Lead, steel or iron pipework",
  "Pipework access labour exceeding 20 minutes",
  "Damage from frost, fire, floods or tenant misuse",
];

function CarePlans() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="text-sm font-semibold uppercase tracking-wider text-accent">Caprani Care Plans</div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Landlord Care Plan
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/85">
            Hassle-free property maintenance and compliance in one monthly fee. Built for Hull landlords who want their phone to stop ringing at 11pm.
          </p>
          <div className="mt-8 flex flex-wrap items-baseline gap-3">
            <span className="text-5xl font-extrabold sm:text-6xl">£29.99</span>
            <span className="text-primary-foreground/70">+ VAT / month</span>
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">12-month minimum</span>
          </div>
        </div>
      </section>

      {/* Two-column: what's in, what's out (asymmetric, content-led, not 3 pricing cards) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Included — 2/3 width */}
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-2xl font-bold">What's included</h2>
              <p className="mt-2 text-sm text-muted-foreground">Cover for one domestic rental property.</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {included.map((i) => (
                  <li key={i.t} className="flex gap-3 rounded-xl border border-border bg-card p-5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <div className="font-semibold text-foreground">{i.t}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{i.d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80}>
              <h3 className="mt-10 text-xl font-bold">Member-only perks</h3>
              <ul className="mt-4 space-y-2">
                {memberPerks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Sidebar — 1/3 width */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              <div className="rounded-2xl border border-accent bg-card p-6 shadow-xl shadow-accent/10">
                <div className="text-xs font-semibold uppercase tracking-wider text-accent">Get started</div>
                <div className="mt-2 text-3xl font-extrabold text-primary">£29.99<span className="text-base font-medium text-muted-foreground"> + VAT/mo</span></div>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
                >
                  Sign up online
                </Link>
                <a
                  href={SITE.phoneHref}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
                >
                  <Phone className="h-4 w-4" /> {SITE.phone}
                </a>
                <ul className="mt-5 space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-accent" /> 2-hour emergency response</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-accent" /> Gas Safe No. {SITE.gasSafe}</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-secondary/40 p-6">
                <h4 className="text-sm font-bold">Not covered</h4>
                <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                  {excluded.map((e) => (
                    <li key={e} className="flex items-start gap-2">
                      <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" /> {e}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[11px] text-muted-foreground">Full exclusions in our T&Cs — we'll walk you through them before you sign.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand title="Want a homeowner care plan?" />
    </>
  );
}
