import { createFileRoute } from "@tanstack/react-router";
import { Star, ExternalLink, Facebook, Instagram, Youtube, Search } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";

export const Route = createFileRoute("/testimonials")({
  component: Testimonials,
  head: () => ({
    meta: [
      { title: "Reviews — Caprani Plumbing & Heating Hull" },
      { name: "description", content: "See what Hull customers say about Caprani Plumbing & Heating across Facebook, Instagram and Google." },
    ],
  }),
});

function Testimonials() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="text-sm font-semibold uppercase tracking-wider text-accent">Reviews</div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            What our customers say
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/85">
            We don't make these up. See the latest reviews and job photos on our Facebook, Instagram and Google pages.
          </p>
        </div>
      </section>

      {/* Honest "read them at source" panel — replaces fake-looking testimonial wall */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-3">
          <SocialCard
            href={SITE.social.facebook}
            icon={Facebook}
            label="Facebook"
            handle="@capraniplumbingandheating"
          />
          <SocialCard
            href={SITE.social.instagram}
            icon={Instagram}
            label="Instagram"
            handle="@capraniplumbingandheating"
          />
          <SocialCard
            href={SITE.social.youtube}
            icon={Youtube}
            label="YouTube"
            handle="Caprani Plumbing & Heating"
          />
          <SocialCard
            href="https://www.google.com/search?q=Caprani+Plumbing+%26+Heating+Hull"
            icon={Search}
            label="Google Reviews"
            handle="Search us on Google"
          />
        </div>

        <Reveal>
          <div className="mt-12 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex">
                {[0,1,2,3,4].map(i => <Star key={i} className="h-5 w-5 fill-accent text-accent" />)}
              </div>
              <span className="text-sm font-semibold text-foreground">Hull homeowners and landlords</span>
            </div>
            <p className="mt-4 text-lg leading-snug text-foreground">
              From small leaks to full bathroom refurbs, our customers tell us the same things: we answer the phone, we turn up when we say we will, and we leave the place tidy.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              We're proud to be Gas Safe registered (No. {SITE.gasSafe}) and OFTEC registered (No. {SITE.oftec}) — proper credentials, not just a logo at the bottom of the page.
            </p>
          </div>
        </Reveal>
      </section>

      <CtaBand title="Want to leave us a review?" />
    </>
  );
}

function SocialCard({
  href, icon: Icon, label, handle,
}: { href: string; icon: React.ComponentType<{ className?: string }>; label: string; handle: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 font-semibold text-foreground">{label}</div>
      <div className="mt-1 text-sm text-muted-foreground">{handle}</div>
      <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
        See reviews & posts <ExternalLink className="h-3.5 w-3.5" />
      </div>
    </a>
  );
}
