import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/site";
import logo from "@/assets/logo.webp";
import { FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/social-icons";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/care-plans", label: "Care Plans" },
  { to: "/about", label: "About" },
  { to: "/testimonials", label: "Reviews" },
  { to: "/jobs", label: "Jobs" },
  { to: "/contact", label: "Contact" },
  { to: "/terms", label: "T&Cs" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full bg-[#3a3a3a] text-white">
      {/* Top bar */}
      <div className="hidden border-b border-white/10 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-white/60">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3" /> {SITE.phone}
            </span>
            <span className="hidden md:inline">{SITE.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/60 hover:text-accent"><FacebookIcon className="h-3.5 w-3.5" /></a>
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/60 hover:text-accent"><InstagramIcon className="h-3.5 w-3.5" /></a>
            <a href={SITE.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white/60 hover:text-accent"><TikTokIcon className="h-3.5 w-3.5" /></a>
            <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/60 hover:text-accent"><YouTubeIcon className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center" aria-label="Caprani Plumbing & Heating">
            <img src={logo} alt="Caprani Plumbing & Heating" className="h-10 w-auto sm:h-11" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-white/80 transition-colors hover:text-accent [&.active]:text-accent"
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:flex"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
            <Link
              to="/contact"
              className="hidden rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-transform hover:scale-[1.02] hover:bg-accent/90 sm:inline-flex"
            >
              Book Now
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center rounded-md bg-accent p-2 text-accent-foreground sm:hidden"
              aria-label="Call now"
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-md p-2 text-white lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#3a3a3a] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-accent px-3 py-2.5 text-center text-sm font-semibold text-accent-foreground"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
