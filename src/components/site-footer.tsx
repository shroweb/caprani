import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { SITE, SERVICES } from "@/lib/site";
import { FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/social-icons";
import logo from "@/assets/logo.webp";


export function SiteFooter() {
  return (
    <footer className="bg-primary pb-16 text-primary-foreground sm:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <img src={logo} alt="Caprani Plumbing & Heating" className="h-10 w-auto" />
          <p className="mt-4 text-sm text-primary-foreground/75">
            Hull's local Gas Safe plumbing and heating specialists. Domestic & commercial,
            24/7 emergency cover across {SITE.area}.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary-foreground/10 px-3 py-1.5 text-xs">
            <ShieldCheck className="h-4 w-4 text-accent" /> Gas Safe Registered
          </div>
          <div className="mt-4 flex items-center gap-3">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full bg-primary-foreground/10 p-2 text-primary-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-primary-foreground/10 p-2 text-primary-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={SITE.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="rounded-full bg-primary-foreground/10 p-2 text-primary-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
            <a
              href={SITE.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="rounded-full bg-primary-foreground/10 p-2 text-primary-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <YouTubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Services</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="text-primary-foreground/80 hover:text-accent"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Company</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="text-primary-foreground/80 hover:text-accent">About</Link></li>
            <li><Link to="/care-plans" className="text-primary-foreground/80 hover:text-accent">Care Plans</Link></li>
            <li><Link to="/testimonials" className="text-primary-foreground/80 hover:text-accent">Reviews</Link></li>
            <li><Link to="/jobs" className="text-primary-foreground/80 hover:text-accent">Careers</Link></li>
            <li><Link to="/contact" className="text-primary-foreground/80 hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-accent">
                <Phone className="h-4 w-4 text-accent" /> {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-accent">
                <Mail className="h-4 w-4 text-accent" /> {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{SITE.address}</span>
            </li>
          </ul>
          <Link
            to="/contact"
            className="mt-5 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
          >
            Book a job
          </Link>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} Caprani Plumbing & Heating. All rights reserved.</span>
            <Link to="/terms" className="hover:text-accent">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-accent">Privacy Policy</Link>
          </div>
          <div className="flex items-center gap-4">
            <span>Gas Safe registered · Fully insured · 24/7 emergency</span>
            <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-accent"><FacebookIcon className="h-4 w-4" /></a>
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-accent"><InstagramIcon className="h-4 w-4" /></a>
            <a href={SITE.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-accent"><TikTokIcon className="h-4 w-4" /></a>
            <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-accent"><YouTubeIcon className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
