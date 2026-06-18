import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, ShieldCheck, BadgeCheck, Clock, Zap } from "lucide-react";
import { SITE, SERVICES } from "@/lib/site";
import { FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/social-icons";
import logo from "@/assets/caprani_logo_transparent.png";

export function SiteFooter() {
  return (
    <footer className="bg-primary pb-16 text-primary-foreground sm:pb-0">
      {/* Credentials trust strip */}
      <div className="border-b border-primary-foreground/10 bg-primary-foreground/[0.035]">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-primary-foreground/55">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            <span>Gas Safe Registered · No. {SITE.gasSafe}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-primary-foreground/55">
            <BadgeCheck className="h-3.5 w-3.5 text-accent" />
            <span>OFTEC Registered · No. {SITE.oftec}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-primary-foreground/55">
            <Zap className="h-3.5 w-3.5 text-accent" />
            <span>£5m Public Liability Insurance</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-primary-foreground/55">
            <Clock className="h-3.5 w-3.5 text-accent" />
            <span>24/7 Emergency Cover · 365 days</span>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <img
            src={logo}
            alt="Caprani Plumbing & Heating"
            className="h-12 w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          />
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/65">
            Hull's local Gas Safe plumbing and heating specialists. Domestic &amp; commercial, 24/7
            emergency cover across {SITE.area}.
          </p>
          <div className="mt-5 flex items-center gap-3">
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
                className="rounded-md bg-primary-foreground/10 p-2 text-primary-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-primary-foreground/55">Services</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="text-primary-foreground/70 transition-colors hover:text-accent"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-primary-foreground/55">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: "/about", label: "About us" },
              { to: "/care-plans", label: "Care Plans" },
              { to: "/testimonials", label: "Reviews" },
              { to: "/jobs", label: "Careers" },
              { to: "/contact", label: "Contact" },
              { to: "/terms", label: "Terms & Conditions" },
              { to: "/privacy", label: "Privacy Policy" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-primary-foreground/70 transition-colors hover:text-accent"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-primary-foreground/55">Get in touch</h4>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li>
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-2.5 font-semibold text-primary-foreground transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4 text-accent" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 text-primary-foreground/70 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 text-accent" />
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-primary-foreground/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{SITE.address}</span>
            </li>
          </ul>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Book a job
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/45 sm:flex-row sm:px-6 lg:px-8">
          <span>
            © {new Date().getFullYear()} {SITE.legalName}. Company No. {SITE.companyNo}.
          </span>
          <span className="text-primary-foreground/30">
            Gas Safe · OFTEC · Fully insured · 24/7
          </span>
        </div>
      </div>
    </footer>
  );
}
