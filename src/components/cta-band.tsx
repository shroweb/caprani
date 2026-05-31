import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export function CtaBand({ title = "Need a Gas Safe engineer today?" }: { title?: string }) {
  return (
    <section className="bg-accent">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
          <p className="mt-2 text-primary/75">
            Call our Hull team or book online — 24/7 emergency cover available.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] hover:bg-primary/90"
          >
            <Phone className="h-4 w-4" /> Call {SITE.phone}
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/20"
          >
            Book online
          </Link>
        </div>
      </div>
    </section>
  );
}

