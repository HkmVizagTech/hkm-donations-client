import { useState } from 'react'
import type { Campaign } from '../../types'
import { DonationForm } from '../DonationForm'
import { DonationSuccess, DonationFailure } from '../DonationOutcome'
import { CategoryIcon } from '../icons'

const OCCASIONS = ['Birthday', 'Anniversary', 'Wedding', 'New Job / Promotion', 'Housewarming', 'In Loving Memory']

export function SpecialOccasionSection({ campaigns }: { campaigns: Campaign[] }) {
  const [occasion, setOccasion] = useState(OCCASIONS[0])
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [view, setView] = useState<{ type: 'form' } | { type: 'success'; receiptUrl: string } | { type: 'failure'; reason: string }>({
    type: 'form',
  })

  const sevas = campaigns.filter((c) => c.slug !== 'mandir-nirman-seva')
  const selected = sevas.find((c) => c.slug === selectedSlug)
  const isMemorialOccasion = occasion === 'In Loving Memory'

  return (
    <section id="special-occasion" className="scroll-mt-20 hero-gradient mantra-watermark py-14">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">A Different Kind of Celebration</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-ink-900 sm:text-4xl">
            Mark Your Special Day with an Offering
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink-600">
            A birthday, anniversary, or milestone is a moment of gratitude — or honor the memory of a
            loved one. Sponsor a seva in that spirit, and receive mahaprasadam and an 80G receipt.
          </p>
        </div>

        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Step One</p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-ink-900">What Are You Celebrating?</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {OCCASIONS.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => {
                  setOccasion(o)
                  setView({ type: 'form' })
                }}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  occasion === o
                    ? 'border-sky-500 bg-gradient-to-r from-sky-500 to-sky-600 text-white'
                    : 'border-sky-200 bg-white/70 text-ink-700 hover:border-sky-400'
                }`}
              >
                {o}
              </button>
            ))}
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-sky-600">Step Two</p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-ink-900">Choose a Seva for Your Occasion</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sevas.map((c) => {
              const isSelected = c.slug === selectedSlug
              return (
                <button
                  key={c._id}
                  type="button"
                  onClick={() => {
                    setSelectedSlug(c.slug)
                    setView({ type: 'form' })
                  }}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-sky-500 bg-white shadow-md'
                      : 'border-sky-100 bg-white/70 hover:border-sky-300'
                  }`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-100">
                    <CategoryIcon category={c.category} className="h-5 w-5 text-sky-700" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-base font-semibold text-ink-900">{c.title}</span>
                    <span className="mt-0.5 block text-xs text-ink-400">{c.shortDescription}</span>
                    {isSelected && (
                      <span className="mt-1.5 inline-block text-xs font-semibold text-sky-600">
                        Selected — continue ↓
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>

          {selected && (
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Step Three</p>
              <h3 className="mt-1 font-serif text-xl font-semibold text-ink-900">Complete Your Offering</h3>
              <div className="mt-4 max-w-xl">
                {view.type === 'success' && (
                  <DonationSuccess receiptUrl={view.receiptUrl} onClose={() => setView({ type: 'form' })} />
                )}
                {view.type === 'failure' && (
                  <DonationFailure reason={view.reason} onRetry={() => setView({ type: 'form' })} />
                )}
                {view.type === 'form' && (
                  <DonationForm
                    campaign={selected}
                    memorialMode={isMemorialOccasion}
                    occasionLabel={isMemorialOccasion ? undefined : occasion}
                    onSuccess={(receiptUrl) => setView({ type: 'success', receiptUrl })}
                    onFailure={(reason) => setView({ type: 'failure', reason })}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
