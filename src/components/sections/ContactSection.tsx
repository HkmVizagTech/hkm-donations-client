import { useState } from 'react'
import { api } from '../../lib/apiClient'
import { org } from '../../content/orgContent'

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      await api.post('/api/contact', form)
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Get in Touch</p>
          <h2 className="mt-1 font-serif text-3xl font-semibold text-ink-900">Contact Us</h2>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Address</p>
              <p className="mt-1 font-semibold text-ink-900">{org.currentVenue}</p>
              <p className="text-ink-700">{org.address}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Phone</p>
              <a href={org.contact.phoneHref} className="text-ink-700 hover:text-sky-600">
                {org.contact.phone}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Email</p>
              <a href={`mailto:${org.contact.email}`} className="text-ink-700 hover:text-sky-600">
                {org.contact.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Visiting Hours</p>
              <p className="text-ink-700">Morning: {org.temple.morningHours}</p>
              <p className="text-ink-700">Evening: {org.temple.eveningHours}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <input
              type="text"
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full min-w-0 rounded-lg border border-sky-200 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full min-w-0 rounded-lg border border-sky-200 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full min-w-0 rounded-lg border border-sky-200 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
            />
            <textarea
              required
              rows={4}
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full min-w-0 rounded-lg border border-sky-200 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="cta-gradient w-full rounded-full py-2.5 text-sm font-semibold disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </button>
            {status === 'sent' && <p className="text-sm font-medium text-green-700">Thank you — we'll be in touch soon.</p>}
            {status === 'error' && <p className="text-sm font-medium text-red-600">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
