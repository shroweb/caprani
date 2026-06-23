import { Star } from "lucide-react";
import { useSiteData } from "@/lib/site-data";
import { GoogleIcon } from "@/components/social-icons";

export function GoogleRating({ className = "" }: { className?: string }) {
  const { siteSettings: SITE } = useSiteData();
  return (
    <a
      href={SITE.google.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 rounded-md border border-primary-foreground/16 bg-primary-foreground/7 px-4 py-2.5 text-primary-foreground shadow-sm backdrop-blur transition-colors hover:bg-primary-foreground/12 ${className}`}
      aria-label={`${SITE.google.rating} out of 5 on Google from ${SITE.google.reviewCount} reviews`}
    >
      <GoogleIcon className="h-5 w-5 shrink-0" />
      <span className="text-sm font-bold">{SITE.google.rating}</span>
      <span className="flex" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
        ))}
      </span>
      <span className="hidden text-sm text-primary-foreground/62 sm:inline">
        {SITE.google.reviewCount} Google reviews
      </span>
    </a>
  );
}
