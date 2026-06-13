import { createFileRoute } from "@tanstack/react-router";
import { Star, ExternalLink, Facebook, Instagram, Youtube } from "lucide-react";
import { SITE, REVIEWS } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { GoogleIcon } from "@/components/social-icons";

export const Route = createFileRoute("/testimonials")({
  component: Testimonials,
  head: () => ({
    meta: [
      { title: "Reviews — Caprani Plumbing & Heating Hull" },
      { name: "description", content: `${SITE.google.rating} stars on Google from ${SITE.google.reviewCount} reviews. See what Hull customers say about Caprani Plumbing & Heating.` },
    ],
  }),
});

function Testimonials() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <span className="section-label text-accent before:bg-accent">Reviews</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            What our customers say
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/75">
            We don't make these up. See the latest reviews and job photos on our Facebook, Instagram and Google pages.
          </p>
          <a
            href={SITE.google.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-5 py-3 transition-colors hover:bg-primary-foreground/10"
          >
            <GoogleIcon className="h-5 w-5 shrink-0" />
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black">{SITE.google.rating}</span>
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm text-primary-foreground/65">
                {SITE.google.reviewCount} Google reviews
              </span>
            </div>
            <ExternalLink className="h-4 w-4 shrink-0 text-primary-foreground/40" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <span className="section-label">Recent reviews</span>
          <h2 className="mt-4 text-2xl font-black tracking-tight">From Google — verified customers</h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 70}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/25 hover:shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <GoogleIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                </div>
                <div className="mt-4 select-none text-4xl font-black leading-none text-accent/20">
                  "
                </div>
                <blockquote className="-mt-1 flex-1 text-sm leading-relaxed text-foreground">
                  {r.text}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <div className="h-px w-5 bg-accent" />
                  <span className="text-sm font-semibold text-muted-foreground">{r.name}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <SocialCard
              href={SITE.google.reviewsUrl}
              label="Google"
              handle={`${SITE.google.rating}★ · ${SITE.google.reviewCount} reviews`}
              renderIcon={() => <GoogleIcon className="h-5 w-5" />}
            />
            <SocialCard
              href={SITE.social.facebook}
              label="Facebook"
              handle="@capraniplumbingandheating"
              renderIcon={() => <Facebook className="h-5 w-5" />}
            />
            <SocialCard
              href={SITE.social.instagram}
              label="Instagram"
              handle="@capraniplumbingandheating"
              renderIcon={() => <Instagram className="h-5 w-5" />}
            />
            <SocialCard
              href={SITE.social.youtube}
              label="YouTube"
              handle="Caprani Plumbing & Heating"
              renderIcon={() => <Youtube className="h-5 w-5" />}
            />
          </div>
        </Reveal>
      </section>

      <CtaBand title="Want to leave us a review?" />
    </>
  );
}

function SocialCard({
  href,
  label,
  handle,
  renderIcon,
}: {
  href: string;
  label: string;
  handle: string;
  renderIcon: () => React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        {renderIcon()}
      </div>
      <div className="mt-4 font-bold text-foreground">{label}</div>
      <div className="mt-0.5 text-sm text-muted-foreground">{handle}</div>
      <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        See reviews &amp; posts <ExternalLink className="h-3.5 w-3.5" />
      </div>
    </a>
  );
}
