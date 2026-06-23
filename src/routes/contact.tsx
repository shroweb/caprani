import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, Check, Clock } from "lucide-react";
import { SITE, SERVICES } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { GoogleRating } from "@/components/google-rating";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Please enter a phone number").max(20),
  email: z.string().trim().email("Invalid email").max(120).optional().or(z.literal("")),
  address: z.string().trim().min(3, "Please enter your address").max(160),
  service: z.string().min(1, "Please choose a service"),
  date: z.string().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact & Book — Caprani Plumbing & Heating Hull" },
      {
        name: "description",
        content:
          "Book a plumbing or heating job in Hull. Get a free quote from Caprani Plumbing & Heating — Gas Safe registered, 24/7 emergency cover.",
      },
    ],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", { method: "POST", body: fd });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: Record<string, string[]>;
      };

      if (!response.ok || !result.ok) {
        if (result.errors) {
          setErrors(
            Object.fromEntries(
              Object.entries(result.errors).map(([key, value]) => [
                key,
                value?.[0] ?? "Invalid value",
              ]),
            ),
          );
        }
        setFormError(result.message ?? "We couldn't send this request. Please call us instead.");
        return;
      }

      setSent(true);
      form.reset();
    } catch {
      setFormError("We couldn't send this request. Please call us instead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-4xl font-black sm:text-5xl">
            Book a job or
            <br />
            get a free quote
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/75">
            Tell us what you need and a preferred date — we'll be in touch the same day. For
            emergencies, please call us directly.
          </p>
          <GoogleRating className="mt-7" />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <Reveal>
            <form onSubmit={onSubmit} className="premium-panel rounded-md p-6 sm:p-8">
              {sent ? (
                <div className="rounded-md bg-secondary/60 p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-black">Thanks — we've got it</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A member of the Caprani team will be in touch shortly. For anything urgent, call{" "}
                    <a href={SITE.phoneHref} className="font-semibold text-accent">
                      {SITE.phone}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field name="name" label="Your name" error={errors.name} required />
                    <Field
                      name="phone"
                      label="Phone number"
                      type="tel"
                      error={errors.phone}
                      required
                    />
                    <Field
                      name="email"
                      label="Email (optional)"
                      type="email"
                      error={errors.email}
                    />
                    <Field
                      name="address"
                      label="Address / postcode"
                      error={errors.address}
                      required
                    />
                    <div className="sm:col-span-1">
                      <label className="text-sm font-medium" htmlFor="service">
                        Service type<span className="ml-0.5 text-accent">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        defaultValue=""
                        className="field-control mt-1.5 w-full"
                      >
                        <option value="" disabled>
                          Choose a service
                        </option>
                        {SERVICES.map((s) => (
                          <option key={s.slug} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Other">Other / not sure</option>
                      </select>
                      {errors.service && (
                        <p className="mt-1 text-xs text-destructive">{errors.service}</p>
                      )}
                    </div>
                    <Field
                      name="date"
                      label="Preferred date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium" htmlFor="message">
                        Tell us more
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        maxLength={1000}
                        className="field-control mt-1.5 w-full py-2.5"
                        placeholder="A few details about the job"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-4 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90 sm:w-auto"
                  >
                    {submitting ? "Sending..." : "Send booking request"}
                  </button>
                  {formError && <p className="mt-3 text-sm text-destructive">{formError}</p>}
                  <p className="mt-3 text-xs text-muted-foreground">
                    We'll never share your details. Replies usually within 1 working hour.
                  </p>
                </>
              )}
            </form>
          </Reveal>
        </div>

        <aside className="space-y-4">
          {/* Contact details */}
          <div className="premium-panel rounded-md p-6">
            <h3 className="font-black text-lg">Speak to us</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-3 font-bold text-foreground transition-colors hover:text-accent"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent/10">
                    <Phone className="h-4 w-4 text-accent" />
                  </div>
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-accent"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary">
                    <Mail className="h-4 w-4 text-accent" />
                  </div>
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <span className="pt-2">{SITE.address}</span>
              </li>
            </ul>
            {/* Emergency callout */}
            <div className="mt-5 flex items-start gap-3 rounded-md border border-accent/20 bg-accent/5 p-4">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div className="text-xs leading-relaxed">
                <strong className="font-semibold text-foreground">24/7 emergency cover.</strong> No
                heating, a gas leak, or a burst pipe? Call us any time — we'll come out.
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-md border border-border bg-card">
            <div className="px-5 pb-3 pt-5">
              <h3 className="font-black">Our coverage area</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Hull, Hessle, Cottingham, Anlaby, Kingswood, Beverley and surrounding East
                Yorkshire.
              </p>
            </div>
            <iframe
              title="Hull coverage map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.3937%2C53.7505%2C-0.3537%2C53.7705&layer=mapnik&marker=53.7605%2C-0.3737"
              className="h-64 w-full border-0"
              loading="lazy"
            />
          </div>
        </aside>
      </section>
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  error,
  min,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  min?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        min={min}
        className="field-control mt-1.5 w-full"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
