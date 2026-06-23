import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSiteData } from "@/lib/site-data";
import logo from "@/assets/caprani_logo_transparent.png";
import { FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/social-icons";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { siteSettings: SITE, navigation } = useSiteData();
  const nav = navigation.links;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-primary/95 text-white shadow-[0_8px_30px_rgba(3,10,22,0.16)] backdrop-blur">
      {/* Top utility bar */}
      <div className="hidden border-b border-white/10 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-5 text-white/62">
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
          <div className="flex items-center gap-4">
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
      <div>
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center" aria-label="Caprani Plumbing & Heating">
            <img src={logo} alt="Caprani Plumbing & Heating" className="h-11 w-auto sm:h-12" />
          </Link>

          <nav className="hidden items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] p-1 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                to={n.href}
                className="rounded px-3 py-2 text-sm font-medium text-white/72 transition-colors hover:bg-white/8 hover:text-white [&.active]:bg-white/10 [&.active]:text-white"
                activeOptions={{ exact: n.href === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-white/78 transition-colors hover:bg-white/10 hover:text-white sm:flex"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
            <Link
              to="/contact"
              className="hidden rounded-md bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground shadow-sm transition-colors hover:bg-accent/90 sm:inline-flex"
            >
              Book now
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
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {nav.map((n) => (
              <Link
                key={n.href}
                to={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-white/82 transition-colors hover:bg-white/10 hover:text-white [&.active]:bg-white/10 [&.active]:text-white"
                activeOptions={{ exact: n.href === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-accent px-3 py-3 text-center text-sm font-bold text-accent-foreground"
            >
              Book now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
