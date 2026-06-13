import { Link } from "@tanstack/react-router";
import { Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

export function CtaBand({ title = "Need a Gas Safe engineer today?" }: { title?: string }) {
  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="mb-3 h-0.5 w-10 bg-accent" />
            <h2 className="text-2xl font-black text-primary-foreground sm:text-3xl">{title}</h2>
            <p className="mt-2.5 text-primary-foreground/65">
              Call our Hull team directly or book online — 24/7 emergency cover, every day of the year.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-md bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] hover:shadow-accent/35"
            >
              <Phone className="h-4 w-4" /> Call {SITE.phone}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Book online <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
