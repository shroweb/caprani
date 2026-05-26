import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Briefcase, MapPin, Clock, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";

const vacancies = [
  {
    title: "Gas Safe Heating Engineer",
    location: "Hull",
    type: "Full-time",
    description: "Experienced Gas Safe engineer to join our domestic install & service team. Company van and tools provided.",
  },
  {
    title: "Plumbing Apprentice",
    location: "Hull",
    type: "Apprenticeship",
    description: "Earn while you learn — work alongside experienced engineers and study towards your NVQ.",
  },
  {
    title: "Bathroom Installer",
    location: "Hull / East Yorkshire",
    type: "Full-time",
    description: "Skilled bathroom fitter with experience in tiling, plumbing first/second fix and complete refurbishments.",
  },
];

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(7).max(20),
  role: z.string().min(1),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const Route = createFileRoute("/jobs")({
  component: Jobs,
  head: () => ({
    meta: [
      { title: "Careers — Join Caprani Plumbing & Heating Hull" },
      { name: "description", content: "Current vacancies at Caprani Plumbing & Heating in Hull. We're hiring Gas Safe engineers, bathroom installers and plumbing apprentices." },
    ],
  }),
});

function Jobs() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
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
          <div className="text-sm font-semibold uppercase tracking-wider text-accent">Careers</div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Join the Caprani team</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            We're growing — and we're always keen to hear from talented engineers and apprentices
            who take pride in their work.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Current vacancies</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {vacancies.map((v, i) => (
            <Reveal key={v.title} delay={i * 70}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
                <Briefcase className="h-5 w-5 text-accent" />
                <h3 className="mt-3 text-lg font-semibold">{v.title}</h3>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {v.location}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {v.type}</span>
                </div>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{v.description}</p>
                <a href="#apply" className="mt-5 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  Apply now
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="apply" className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold">Apply</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Send us your details and we'll be in touch. You can attach a CV by email after we reply.
            </p>
            <form onSubmit={onSubmit} className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
              {sent ? (
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Application received</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Thanks for your interest — we'll be in touch soon.</p>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <JField name="name" label="Full name" required error={errors.name} />
                    <JField name="email" label="Email" type="email" required error={errors.email} />
                    <JField name="phone" label="Phone" type="tel" required error={errors.phone} />
                    <div>
                      <label className="text-sm font-medium" htmlFor="role">Role</label>
                      <select id="role" name="role" defaultValue="" className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30">
                        <option value="" disabled>Choose a role…</option>
                        {vacancies.map(v => <option key={v.title} value={v.title}>{v.title}</option>)}
                        <option value="Speculative">Speculative application</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium" htmlFor="message">A bit about you</label>
                      <textarea id="message" name="message" rows={5} maxLength={2000} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30" placeholder="Tell us about your experience and qualifications…" />
                    </div>
                  </div>
                  <button type="submit" className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-3.5 text-base font-semibold text-accent-foreground hover:bg-accent/90 sm:w-auto">
                    Submit application
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function JField({ name, label, type = "text", required, error }: { name: string; label: string; type?: string; required?: boolean; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}{required && <span className="ml-0.5 text-accent">*</span>}
      </label>
      <input id={name} name={name} type={type} required={required}
        className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30" />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
