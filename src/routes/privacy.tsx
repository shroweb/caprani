import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Caprani Plumbing & Heating" },
      { name: "description", content: "Privacy policy for Caprani Plumbing and Heating Limited, Hull." },
    ],
  }),
});

function Privacy() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="text-sm font-semibold uppercase tracking-wider text-accent">Legal</div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            {SITE.legalName} · {SITE.address}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="text-lg font-bold text-foreground">Who we are</h2>
            <p className="mt-2">
              {SITE.legalName} is the data controller for personal information collected through this website and in the course of providing our services. Registered address: {SITE.address}. Company No. {SITE.companyNo}.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">What we collect</h2>
            <p className="mt-2">
              When you use our contact or booking form, or call us, we collect your name, phone number, email address, and property address. We also collect basic analytics data (pages visited, approximate location) through cookies to help us improve the site. We do not collect payment card details directly — payments are handled by our approved providers.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">How we use it</h2>
            <p className="mt-2">
              We use your contact details to respond to enquiries, schedule and carry out work, issue invoices, and send service reminders where you have agreed to this. We do not sell your data to third parties or use it for unsolicited marketing.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">Cookies</h2>
            <p className="mt-2">
              We use cookies to analyse website traffic and optimise your experience. You can disable cookies in your browser settings, though some features of the site may not work as intended.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">How long we keep it</h2>
            <p className="mt-2">
              We retain customer records for 7 years after the last transaction to meet our legal and accounting obligations, then securely delete them.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">Your rights</h2>
            <p className="mt-2">
              Under UK GDPR you have the right to access, correct, or delete the personal data we hold about you. To make a request, contact us at{" "}
              <a href={`mailto:${SITE.email}`} className="font-semibold text-foreground hover:text-accent">{SITE.email}</a>{" "}
              or call{" "}
              <a href={SITE.phoneHref} className="font-semibold text-foreground hover:text-accent">{SITE.phone}</a>.
              If you are not satisfied with our response, you may complain to the{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-accent">Information Commissioner's Office</a>.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
          For any privacy queries, contact us at{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-foreground hover:text-accent">{SITE.email}</a>{" "}
          or{" "}
          <Link to="/contact" className="font-semibold text-foreground hover:text-accent">via our contact form</Link>.
        </div>
      </section>
    </>
  );
}
