import { useState } from 'react'
import type { Campaign, CreateOrderResponse, DedicationInput, DonationTier, VerifyPaymentResponse } from '../types'
import { api } from '../lib/apiClient'
import { formatInr } from '../lib/formatCurrency'
import { openRazorpayCheckout } from '../lib/razorpayCheckout'
import { DedicationFields } from './DedicationFields'
import { TrustBadgeRow } from './TrustBadgeRow'

const DEFAULT_TIERS: DonationTier[] = [
  { amount: 501, label: '₹501' },
  { amount: 1001, label: '₹1,001' },
  { amount: 2501, label: '₹2,501' },
]

export function DonationForm({
  campaign,
  memorialMode = false,
  occasionLabel,
  onSuccess,
  onFailure,
}: {
  campaign: Campaign
  memorialMode?: boolean
  occasionLabel?: string
  onSuccess: (receiptUrl: string) => void
  onFailure: (reason: string) => void
}) {
  const tiers = campaign.donationTiers.length ? campaign.donationTiers : DEFAULT_TIERS

  const [selectedTier, setSelectedTier] = useState<number | null>(tiers[0]?.amount ?? null)
  const [customAmount, setCustomAmount] = useState('')
  const [donor, setDonor] = useState({ name: '', email: '', phone: '', address: '', pan: '' })
  const [dedication, setDedication] = useState<DedicationInput>({ isMemorial: memorialMode })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const amount = customAmount ? Number(customAmount) : selectedTier

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!amount || amount <= 0) {
      setError('Please select or enter a valid donation amount.')
      return
    }
    if (!donor.name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!donor.email.trim() && !donor.phone.trim()) {
      setError('Please provide an email or phone number so we can send your receipt.')
      return
    }

    setSubmitting(true)
    try {
      const order = await api.post<CreateOrderResponse>('/api/donations/order', {
        campaignSlug: campaign.slug,
        amount,
        donor,
        dedication,
      })

      const result = await openRazorpayCheckout({
        keyId: order.keyId,
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        campaignTitle: campaign.title,
        prefill: { name: donor.name, email: donor.email, contact: donor.phone },
      })

      const verified = await api.post<VerifyPaymentResponse>('/api/donations/verify', result)
      onSuccess(verified.receiptUrl)
    } catch (err) {
      onFailure((err as Error).message || 'Payment failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      id="donate-form"
      onSubmit={handleSubmit}
      className="scroll-mt-24 space-y-5 rounded-2xl border border-sky-100 bg-white p-5 shadow-lg shadow-sky-900/5 sm:p-6"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Complete Your Offering</p>
        <h3 className="font-serif text-xl font-semibold text-ink-900">
          {campaign.title}
          {occasionLabel ? ` · for your ${occasionLabel}` : ''}
        </h3>
      </div>

      <div>
        <label className="text-sm font-medium text-ink-800">Choose an amount</label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {tiers.map((t) => (
            <button
              type="button"
              key={t.amount}
              onClick={() => {
                setSelectedTier(t.amount)
                setCustomAmount('')
              }}
              className={`flex flex-col items-center rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                selectedTier === t.amount && !customAmount
                  ? 'border-sky-500 bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-sm'
                  : 'border-sky-200 text-ink-800 hover:border-sky-400'
              }`}
            >
              <span>{formatInr(t.amount)}</span>
              {t.description && (
                <span
                  className={`text-[11px] font-normal ${
                    selectedTier === t.amount && !customAmount ? 'text-white/85' : 'text-ink-700/60'
                  }`}
                >
                  {t.description}
                </span>
              )}
            </button>
          ))}
        </div>
        <input
          type="number"
          min={1}
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value)
            setSelectedTier(null)
          }}
          placeholder="Or enter a custom amount (₹)"
          className="mt-2 w-full rounded-lg border border-sky-200 px-3 py-2.5 text-sm focus:border-sky-400 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          required
          placeholder="Full name *"
          value={donor.name}
          onChange={(e) => setDonor({ ...donor, name: e.target.value })}
          className="w-full min-w-0 rounded-lg border border-sky-200 px-3 py-2.5 text-sm focus:border-sky-400 focus:outline-none"
        />
        <input
          type="tel"
          placeholder="Mobile number"
          value={donor.phone}
          onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
          className="w-full min-w-0 rounded-lg border border-sky-200 px-3 py-2.5 text-sm focus:border-sky-400 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={donor.email}
          onChange={(e) => setDonor({ ...donor, email: e.target.value })}
          className="w-full min-w-0 rounded-lg border border-sky-200 px-3 py-2.5 text-sm sm:col-span-2 focus:border-sky-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="PAN (optional)"
          value={donor.pan}
          onChange={(e) => setDonor({ ...donor, pan: e.target.value })}
          className="w-full min-w-0 rounded-lg border border-sky-200 px-3 py-2.5 text-sm uppercase focus:border-sky-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Address (optional)"
          value={donor.address}
          onChange={(e) => setDonor({ ...donor, address: e.target.value })}
          className="w-full min-w-0 rounded-lg border border-sky-200 px-3 py-2.5 text-sm focus:border-sky-400 focus:outline-none"
        />
      </div>

      <DedicationFields value={dedication} onChange={setDedication} memorialMode={memorialMode} />

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="cta-gradient w-full rounded-full py-3.5 text-sm font-semibold shadow-md transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting
          ? 'Processing…'
          : `Offer ${amount ? formatInr(amount) : ''}${occasionLabel ? ` for your ${occasionLabel}` : ''}`}
      </button>

      <TrustBadgeRow />
    </form>
  )
}
