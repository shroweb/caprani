import { Link } from "@tanstack/react-router";
import { Phone, CalendarDays } from "lucide-react";
import { SITE } from "@/lib/site";

export function MobileCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-white/10 bg-[#3a3a3a] sm:hidden">
      <a
        href={SITE.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-semibold text-white active:bg-white/10"
      >
        <Phone className="h-4 w-4" />
        Call us
      </a>
      <div className="w-px bg-white/10" />
      <Link
        to="/contact"
        className="flex flex-1 items-center justify-center gap-2 bg-accent py-4 text-sm font-semibold text-accent-foreground active:brightness-90"
      >
        <CalendarDays className="h-4 w-4" />
        Book online
      </Link>
    </div>
  );
}
