import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ShieldCheck, Clock, BadgeCheck, MapPin, ArrowRight, Star, ExternalLink } from "lucide-react";
import { SITE, SERVICES, HERO_IMG, REVIEWS } from "@/lib/site";
import { GoogleIcon } from "@/components/social-icons";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      {/* HERO — full-bleed real photo, solid info card bottom-left (no gradient wash) */}
      <section className="relative">
        <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden bg-primary">
          <img
            src={HERO_IMG}
            alt="Caprani Plumbing & Heating engineer working on copper pipework in Hull"
            className="h-full w-full object-cover"
          />
          {/* subtle bottom-left darken only — not a full overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/55 via-black/20 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8 lg:pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-xl rounded-2xl border border-white/10 bg-primary/95 p-6 text-primary-foreground shadow-2xl backdrop-blur sm:p-8 animate-fade-up">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                24/7 Emergency Call-Outs
              </div>
              <h1 className="mt-3 text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl">
                Your local plumbing & heating team in Hull
              </h1>
              <p className="mt-3 text-primary-foreground/80">
                Family-run since {SITE.founded}. Gas Safe registered. Boiler packed in or pipe gone? Give us a ring — we'll pick up.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-transform hover:scale-[1.02]"
                >
                  <Phone className="h-4 w-4" /> Call {SITE.phone}
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/25 bg-primary-foreground/5 px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Book online <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR — replaces fake stats. Real registration numbers. */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 px-4 py-6 sm:px-6 md:grid-cols-4 lg:px-8">
          <Trust icon={ShieldCheck} label="Gas Safe Registered" value={`No. ${SITE.gasSafe}`} />
          <Trust icon={BadgeCheck} label="OFTEC Registered" value={`No. ${SITE.oftec}`} />
          <Trust icon={Clock} label="Emergency Cover" value="24/7, 365 days" />
          <Trust icon={MapPin} label="Coverage" value={SITE.area} />
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-wider text-accent">Customer reviews</div>
                <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">What Hull customers say</h2>
              </div>
              <a
                href={SITE.google.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm transition-colors hover:border-accent/50 hover:bg-secondary"
              >
                <GoogleIcon className="h-4 w-4 shrink-0" />
                <span className="font-bold">{SITE.google.rating}</span>
                <div className="flex">
                  {[0,1,2,3,4].map(i => <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />)}
                </div>
                <span className="text-muted-foreground">{SITE.google.reviewCount} reviews</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </a>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 70}>
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
                    "{r.text}"
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">— {r.name}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-6 text-center">
              <Link to="/testimonials" className="text-sm font-semibold text-accent hover:underline">
                See all reviews →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES — asymmetric layout. Left: sticky intro. Right: large image-led list (no generic icons) */}
      <section className="bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <div className="text-sm font-semibold uppercase tracking-wider text-accent">Our work</div>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  What we do, day in day out
                </h2>
                <p className="mt-4 text-muted-foreground">
                  From a new bathroom suite to an emergency 2am call-out — domestic and commercial, across Hull and East Yorkshire.
                </p>
                <Link
                  to="/services"
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  All services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ul className="grid gap-5 sm:grid-cols-2">
                {SERVICES.map((s, i) => (
                  <Reveal key={s.slug} delay={i * 50}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-secondary">
                        <img
                          src={s.image}
                          alt={s.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
                        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{s.short}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                          Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function Trust({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 shrink-0 text-accent" />
      <div>
        <div className="text-sm font-semibold leading-tight text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{value}</div>
      </div>
    </div>
  );
}
