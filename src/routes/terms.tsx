import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Caprani Plumbing & Heating" },
      {
        name: "description",
        content: "Terms and conditions for Caprani Plumbing and Heating Limited, Hull.",
      },
    ],
  }),
});

const sections = [
  {
    title: "Company details",
    body: `${SITE.legalName}, ${SITE.address}. Telephone: ${SITE.phone}. Company registered in England, No. ${SITE.companyNo}.`,
  },
  {
    title: "Formation of contract",
    body: "A binding contract is formed when you confirm a booking, accept a written quotation, pay a deposit, or permit work to commence. These terms apply to all such contracts.",
  },
  {
    title: "Quotations",
    body: "Written quotations are valid for 14 days unless otherwise stated. Pricing may be revised if hidden defects, unforeseen site conditions, or access difficulties materially affect the scope of work. We will notify you before proceeding with any variation.",
  },
  {
    title: "Deposits and payment",
    body: "Works exceeding £500 require a 50% deposit before commencement. Projects over £5,000 are subject to staged payments agreed in advance. Invoices are due within 7 days of issue. Late payments incur an administration charge of £50 + VAT plus statutory interest under the Late Payment of Commercial Debts (Interest) Act 1998.",
  },
  {
    title: "Labour charges",
    body: "Labour is charged in minimum increments of one hour. Chargeable time includes diagnostics, material ordering, administration, certification, and travel where applicable.",
  },
  {
    title: "Cancellations",
    body: "Standard service appointments require at least 24 hours' notice of cancellation. Quoted or scheduled works require 7 working days' notice. Cancellations with insufficient notice may attract charges of between 20% and 100% of the agreed value. Deposits are non-refundable unless we are unable to fulfil the booking.",
  },
  {
    title: "Workmanship warranty",
    body: "Our workmanship is covered by a 12-month warranty against defects arising directly from work carried out by us. This does not extend to faults caused by pre-existing conditions, subsequent third-party interference, misuse, or fair wear and tear.",
  },
  {
    title: "Consumer rights",
    body: "If you are a domestic consumer and a contract is formed at a distance (e.g. by phone or online), you may have a 14-day cooling-off period under the Consumer Contracts Regulations 2013. If you request that work begins within this period, you may be charged for services rendered up to the point of cancellation.",
  },
  {
    title: "Liability",
    body: "Our liability is limited to the value of the works carried out. We are not liable for consequential or indirect losses. Nothing in these terms limits liability for death or personal injury caused by our negligence, or for any matter that cannot lawfully be excluded.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the law of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
  },
];

function Terms() {
  return (
    <>
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-4xl font-black sm:text-5xl">Terms & Conditions</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            {SITE.legalName} · {SITE.address}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {sections.map((s, i) => (
            <div key={s.title}>
              <h2 className="text-lg font-bold text-foreground">
                <span className="mr-2 text-accent">{i + 1}.</span>
                {s.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-md border border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
          Questions about these terms? Call us on{" "}
          <a href={SITE.phoneHref} className="font-semibold text-foreground hover:text-accent">
            {SITE.phone}
          </a>{" "}
          or email{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-semibold text-foreground hover:text-accent"
          >
            {SITE.email}
          </a>
          .
        </div>
      </section>
    </>
  );
}
