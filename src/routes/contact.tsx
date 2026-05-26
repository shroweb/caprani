import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, Check } from "lucide-react";
import { SITE, SERVICES } from "@/lib/site";
import { Reveal } from "@/components/reveal";

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
      { name: "description", content: "Book a plumbing or heating job in Hull. Get a free quote from Caprani Plumbing & Heating — Gas Safe registered, 24/7 emergency cover." },
    ],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="text-sm font-semibold uppercase tracking-wider text-accent">Contact & book</div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Book a job or get a free quote
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Tell us what you need and a preferred date — we'll be in touch the same day.
            For emergencies, please call us directly.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <Reveal>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
            >
              {sent ? (
                <div className="rounded-lg bg-secondary/60 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Thanks — we've got it</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A member of the Caprani team will be in touch shortly. For anything urgent, please call {SITE.phone}.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field name="name" label="Your name" error={errors.name} required />
                    <Field name="phone" label="Phone number" type="tel" error={errors.phone} required />
                    <Field name="email" label="Email (optional)" type="email" error={errors.email} />
                    <Field name="address" label="Address / postcode" error={errors.address} required />
                    <div className="sm:col-span-1">
                      <label className="text-sm font-medium" htmlFor="service">Service type</label>
                      <select id="service" name="service" defaultValue="" className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30">
                        <option value="" disabled>Choose a service…</option>
                        {SERVICES.map(s => <option key={s.slug} value={s.title}>{s.title}</option>)}
                        <option value="Other">Other / not sure</option>
                      </select>
                      {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
                    </div>
                    <Field name="date" label="Preferred date" type="date" min={new Date().toISOString().split("T")[0]} />
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium" htmlFor="message">Tell us more</label>
                      <textarea id="message" name="message" rows={5} maxLength={1000} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30" placeholder="A few details about the job…" />
                    </div>
                  </div>
                  <button type="submit" className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-3.5 text-base font-semibold text-accent-foreground transition-transform hover:scale-[1.01] sm:w-auto">
                    Send booking request
                  </button>
                  <p className="mt-3 text-xs text-muted-foreground">We'll never share your details. Replies usually within 1 working hour.</p>
                </>
              )}
            </form>
          </Reveal>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-bold">Speak to us</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                <a className="font-semibold hover:text-accent" href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" /> {SITE.email}
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-accent" /> Hull, East Yorkshire
              </li>
            </ul>
            <div className="mt-5 rounded-md bg-accent/10 p-3 text-xs text-foreground">
              <strong className="font-semibold text-accent">24/7 emergency:</strong> for no heating, leaks or gas issues, call us anytime.
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <h3 className="px-6 pt-6 text-lg font-bold">Our coverage area</h3>
            <p className="px-6 pb-4 pt-1 text-sm text-muted-foreground">Hull, Hessle, Cottingham, Anlaby, Kingswood, Beverley and surrounding East Yorkshire.</p>
            <iframe
              title="Hull coverage map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.50%2C53.70%2C-0.20%2C53.82&layer=mapnik&marker=53.7676%2C-0.3274"
              className="h-72 w-full border-0"
              loading="lazy"
            />
          </div>
        </aside>
      </section>
    </>
  );
}

function Field({
  name, label, type = "text", required, error, min,
}: { name: string; label: string; type?: string; required?: boolean; error?: string; min?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}{required && <span className="ml-0.5 text-accent">*</span>}
      </label>
      <input
        id={name} name={name} type={type} required={required} min={min}
        className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
