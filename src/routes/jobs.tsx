import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Briefcase, MapPin, Clock, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { GoogleRating } from "@/components/google-rating";
import { getJobsPage } from "@/lib/cms/content";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(7).max(20),
  role: z.string().min(1),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const Route = createFileRoute("/jobs")({
  component: Jobs,
  loader: () => getJobsPage(),
  head: () => ({
    meta: [
      { title: "Careers — Join Caprani Plumbing & Heating Hull" },
      {
        name: "description",
        content:
          "Current vacancies at Caprani Plumbing & Heating in Hull. We're hiring Gas Safe engineers, bathroom installers and plumbing apprentices.",
      },
    ],
  }),
});

function Jobs() {
  const { heroTitle, heroText, vacancies } = Route.useLoaderData();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
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
      const response = await fetch("/api/jobs/apply", { method: "POST", body: formData });
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
        setFormError(
          result.message ?? "We couldn't send this application. Please email us instead.",
        );
        return;
      }

      setSent(true);
      form.reset();
    } catch {
      setFormError("We couldn't send this application. Please email us instead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-4xl font-black sm:text-5xl">{heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">{heroText}</p>
          <GoogleRating className="mt-7" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Current vacancies</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {vacancies.map((v, i) => (
            <Reveal key={v.title} delay={i * 70}>
              <div className="service-card flex h-full flex-col rounded-md p-6">
                <Briefcase className="h-5 w-5 text-accent" />
                <h3 className="mt-3 text-lg font-semibold">{v.title}</h3>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {v.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {v.type}
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{v.description}</p>
                <a
                  href="#apply"
                  className="mt-5 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Apply now
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="apply" className="bg-secondary/45 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold">Apply</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Send us your details and attach your CV — we'll be in touch shortly.
            </p>
            <form onSubmit={onSubmit} className="premium-panel mt-6 rounded-md p-6 sm:p-8">
              {sent ? (
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Application received</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks for your interest — we'll be in touch soon.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <JField name="name" label="Full name" required error={errors.name} />
                    <JField name="email" label="Email" type="email" required error={errors.email} />
                    <JField name="phone" label="Phone" type="tel" required error={errors.phone} />
                    <div>
                      <label className="text-sm font-medium" htmlFor="role">
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        defaultValue=""
                        className="field-control mt-1.5 w-full"
                      >
                        <option value="" disabled>
                          Choose a role
                        </option>
                        {vacancies.map((v) => (
                          <option key={v.title} value={v.title}>
                            {v.title}
                          </option>
                        ))}
                        <option value="Speculative">Speculative application</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium" htmlFor="message">
                        A bit about you
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        maxLength={2000}
                        className="field-control mt-1.5 w-full py-2.5"
                        placeholder="Tell us about your experience and qualifications"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium" htmlFor="cv">
                        CV / Resume
                      </label>
                      <input
                        id="cv"
                        name="cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="field-control mt-1.5 w-full cursor-pointer py-2 text-muted-foreground file:mr-3 file:rounded file:border-0 file:bg-accent file:px-3 file:py-1 file:text-xs file:font-semibold file:text-accent-foreground hover:file:bg-accent/90"
                      />
                      <p className="mt-1 text-xs text-muted-foreground">
                        PDF, DOC or DOCX — max 5 MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-3.5 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90 sm:w-auto"
                  >
                    {submitting ? "Submitting..." : "Submit application"}
                  </button>
                  {formError && <p className="mt-3 text-sm text-destructive">{formError}</p>}
                </>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function JField({
  name,
  label,
  type = "text",
  required,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
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
        className="field-control mt-1.5 w-full"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
