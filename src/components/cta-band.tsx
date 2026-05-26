import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export function CtaBand({ title = "Need a Gas Safe engineer today?" }: { title?: string }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row lg:px-8">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-2 text-primary-foreground/75">
            Call our Hull team or book online — 24/7 emergency cover available.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
          >
            <Phone className="h-4 w-4" /> Call {SITE.phone}
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-md border border-primary-foreground/30 bg-primary-foreground/5 px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10"
          >
            Book online
          </Link>
        </div>
      </div>
    </section>
  );
}
