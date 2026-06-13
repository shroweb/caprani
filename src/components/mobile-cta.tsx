import { Link } from "@tanstack/react-router";
import { Phone, CalendarDays } from "lucide-react";
import { SITE } from "@/lib/site";

export function MobileCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-white/10 bg-primary sm:hidden">
      <a
        href={SITE.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-semibold text-white/90 transition-colors active:bg-white/10"
      >
        <Phone className="h-4 w-4 text-accent" />
        {SITE.phone}
      </a>
      <div className="w-px bg-white/10" />
      <Link
        to="/contact"
        className="flex flex-1 items-center justify-center gap-2 bg-accent py-4 text-sm font-bold text-accent-foreground active:brightness-90"
      >
        <CalendarDays className="h-4 w-4" />
        Book online
      </Link>
    </div>
  );
}
