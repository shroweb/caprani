import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/site";
import logo from "@/assets/caprani_logo_transparent.png";
import { FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/social-icons";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/care-plans", label: "Care Plans" },
  { to: "/about", label: "About" },
  { to: "/testimonials", label: "Reviews" },
  { to: "/jobs", label: "Jobs" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-white">
      {/* Top utility bar */}
      <div className="hidden border-b border-white/10 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-5 text-white/55">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone className="h-3 w-3" /> {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="hidden transition-colors hover:text-white md:inline"
            >
              {SITE.email}
            </a>
          </div>
          <div className="flex items-center gap-3.5">
            {[
              { href: SITE.social.facebook, Icon: FacebookIcon, label: "Facebook" },
              { href: SITE.social.instagram, Icon: InstagramIcon, label: "Instagram" },
              { href: SITE.social.tiktok, Icon: TikTokIcon, label: "TikTok" },
              { href: SITE.social.youtube, Icon: YouTubeIcon, label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/55 transition-colors hover:text-accent"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center" aria-label="Caprani Plumbing & Heating">
            <img
              src={logo}
              alt="Caprani Plumbing & Heating"
              className="h-10 w-auto sm:h-11"
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="relative text-sm font-medium text-white/75 transition-colors hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full [&.active]:text-white [&.active]:after:w-full [&.active]:after:bg-accent"
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:flex"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
            <Link
              to="/contact"
              className="hidden rounded-md bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground shadow-sm transition-all hover:scale-[1.02] hover:bg-accent/90 sm:inline-flex"
            >
              Book Now
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center rounded-md bg-accent p-2.5 text-accent-foreground sm:hidden"
              aria-label="Call now"
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-md p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-primary lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-0.5 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white [&.active]:text-accent"
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-accent px-3 py-3 text-center text-sm font-bold text-accent-foreground"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
