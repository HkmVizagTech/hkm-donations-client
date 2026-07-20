import { org } from '../../content/orgContent'
import { FAQAccordion } from '../FAQAccordion'

export function TrustSection() {
  return (
    <section id="trust" className="scroll-mt-20 bg-gradient-to-b from-sky-200 to-cream-50 py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Transparency</p>
          <h2 className="mt-1 font-serif text-3xl font-semibold text-ink-900">Trust &amp; Transparency</h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink-600">
            Serving Visakhapatnam since {org.foundedYear}, registered as a trust in {org.registeredYear}.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="font-semibold text-ink-900">Registered Trust</h3>
            <p className="mt-2 text-sm text-ink-700">
              {org.legalName} is building the {org.templeName} — currently serving devotees at{' '}
              {org.address}.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="font-semibold text-ink-900">80G Tax Exemption</h3>
            <p className="mt-2 text-sm text-ink-700">
              All donations to {org.legalName} are eligible for 80G income tax benefits under the
              Finance Act. PAN details are required for the certificate.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="font-semibold text-ink-900">Annual &amp; Audit Reports</h3>
            <p className="mt-2 text-sm text-ink-700">
              Annual, audit, and fund utilization reports are being compiled for publication. Contact
              us at {org.contact.email} to request current financial documentation.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="font-semibold text-ink-900">Bank Transfer Details</h3>
            <p className="mt-2 text-sm text-ink-700">
              {org.bankDetails.beneficiary}
              <br />
              {org.bankDetails.bank}, {org.bankDetails.branch}
              <br />
              A/c: {org.bankDetails.accountNumber} &middot; IFSC: {org.bankDetails.ifsc}
            </p>
          </div>
        </div>

        <p className="mt-4 rounded-lg bg-sun-100 px-4 py-3 text-center text-xs font-medium text-sun-700">
          {org.trust.note}
        </p>

        <div className="mt-10">
          <h3 className="mb-4 text-center font-serif text-xl font-semibold text-ink-900">Common Questions</h3>
          <FAQAccordion items={org.faqs} />
        </div>
      </div>
    </section>
  )
}
