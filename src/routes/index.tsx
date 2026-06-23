import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ArrowRight, Star, ExternalLink } from "lucide-react";
import { GoogleIcon } from "@/components/social-icons";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { GoogleRating } from "@/components/google-rating";
import { getHomePage, getReviews, getServices } from "@/lib/cms/content";
import { useSiteData } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const [homePage, services, reviews] = await Promise.all([
      getHomePage(),
      getServices(),
      getReviews(),
    ]);
    return { homePage, services, reviews };
  },
});

function Home() {
  const {
    homePage: { heroTitle, heroText, heroImage, whyChooseUs, process },
    services,
    reviews,
  } = Route.useLoaderData();
  const { siteSettings: SITE } = useSiteData();
  const yearsSince = new Date().getFullYear() - (SITE.founded ?? 2016);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="relative h-[86vh] min-h-[620px] w-full overflow-hidden bg-primary">
          <img
            src={heroImage}
            alt="The Caprani Plumbing & Heating team outside their Hull shopfront on Spring Bank West"
            className="h-full w-full object-cover object-[center_55%]"
            fetchPriority="high"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/88 via-black/56 to-black/12" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-primary/85 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-[580px] animate-fade-up">
              <h1 className="text-5xl font-black leading-[1.05] text-white sm:text-6xl lg:text-[4.5rem]">
                {heroTitle}
              </h1>
              <p className="mt-6 max-w-[430px] text-base leading-8 text-white/74 sm:text-lg">
                {heroText}
              </p>
              <GoogleRating className="mt-7" />
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2.5 rounded-md bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-2xl shadow-accent/25 transition-colors hover:bg-accent/90"
                >
                  <Phone className="h-4 w-4" /> {SITE.phone}
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-white/22 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
                >
                  Book online <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-9 grid max-w-xl grid-cols-3 gap-4 border-t border-white/16 pt-5 text-xs text-white/68">
                <span>Gas Safe {SITE.gasSafe}</span>
                <span>OFTEC {SITE.oftec}</span>
                <span>24/7 emergency cover</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────────────────────── */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-y divide-border border-x border-border md:grid-cols-4 md:divide-y-0">
            <StatItem
              num={String(SITE.google.reviewCount)}
              label="Google Reviews"
              detail="Latest Google profile count"
              href={SITE.google.reviewsUrl}
            />
            <StatItem
              num={`${SITE.google.rating}★`}
              label="Average Rating"
              detail="Out of 5 on Google"
              href={SITE.google.reviewsUrl}
            />
            <StatItem
              num={String(yearsSince)}
              label="Years in Hull"
              detail={`Est. ${SITE.founded} · family-run`}
            />
            <StatItem num="24/7" label="Emergency Cover" detail="365 days, bank holidays" />
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────── */}
      <section className="bg-secondary/45">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <Reveal>
                  <h2 className="text-3xl font-black sm:text-4xl">
                    What we do,
                    <br />
                    day in day out
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Domestic and commercial, across Hull and East Yorkshire. New boiler, full
                    bathroom, or a 2am emergency.
                  </p>
                  <Link
                    to="/services"
                    className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    All services <ArrowRight className="h-4 w-4" />
                  </Link>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ul className="grid gap-4 sm:grid-cols-2">
                {services.map((s, i) => (
                  <Reveal key={s.slug} delay={i * 45}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="service-card group relative block h-full overflow-hidden rounded-md"
                    >
                      <div className="aspect-video overflow-hidden bg-secondary">
                        <img
                          src={s.image}
                          alt={s.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded bg-primary/85 text-[11px] font-black text-primary-foreground backdrop-blur-sm">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-foreground">{s.title}</h3>
                        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {s.short}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                          Learn more{" "}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
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

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-black sm:text-4xl">Simple from start to finish</h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-primary-foreground/12 bg-primary-foreground/12 sm:grid-cols-3">
            {process.map((step, i) => (
              <ProcessStep
                key={step.title}
                num={String(i + 1).padStart(2, "0")}
                title={step.title}
                desc={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CAPRANI ───────────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-black sm:text-4xl">
              What makes us
              <br />
              different
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {whyChooseUs.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="border-l-2 border-accent py-1 pl-6">
                  <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────────── */}
      <section className="bg-secondary/45">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-black sm:text-4xl">What Hull customers say</h2>
              </div>
              <a
                href={SITE.google.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm transition-colors hover:border-accent/40 hover:bg-card"
              >
                <GoogleIcon className="h-4 w-4 shrink-0" />
                <span className="font-bold">{SITE.google.rating}</span>
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-muted-foreground">{SITE.google.reviewCount} reviews</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </a>
            </div>
          </Reveal>

          {/* Featured review */}
          <Reveal delay={80}>
            <figure className="mt-8 overflow-hidden rounded-md bg-primary px-8 py-10 text-primary-foreground sm:px-12 sm:py-14">
              <div className="select-none text-[7rem] font-black leading-none text-accent/20 sm:text-[9rem]">
                "
              </div>
              <blockquote className="-mt-6 text-xl font-medium leading-relaxed sm:text-2xl">
                {reviews[0].text}
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex">
                  {Array.from({ length: reviews[0].rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="font-semibold">{reviews[0].name}</span>
                <span className="text-sm text-primary-foreground/50">via Google</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Supporting reviews */}
          {reviews.length > 1 && (
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {reviews.slice(1).map((r, i) => (
                <Reveal key={r.name} delay={i * 60}>
                  <figure className="flex h-full flex-col rounded-md border border-border bg-card p-6 shadow-sm">
                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
                      {r.text}
                    </blockquote>
                    <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">
                      {r.name}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={120}>
            <div className="mt-8 text-center">
              <Link
                to="/testimonials"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
              >
                See all reviews <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function StatItem({
  num,
  label,
  detail,
  href,
}: {
  num: string;
  label: string;
  detail: string;
  href?: string;
}) {
  const inner = (
    <div className="px-4 py-5 sm:px-6">
      <div className="stat-num text-4xl text-primary sm:text-5xl">{num}</div>
      <div className="mt-2 text-sm font-semibold text-foreground">{label}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{detail}</div>
    </div>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-75"
      >
        {inner}
      </a>
    );
  }
  return inner;
}

function ProcessStep({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <Reveal>
      <div className="h-full bg-primary px-6 py-8 sm:px-8">
        <div className="select-none text-5xl font-black leading-none text-accent/35">{num}</div>
        <h3 className="mt-4 text-xl font-bold">{title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-primary-foreground/70">{desc}</p>
      </div>
    </Reveal>
  );
}
