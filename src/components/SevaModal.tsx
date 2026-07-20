import { useState } from 'react'
import type { Campaign } from '../types'
import { ProgressBar } from './ProgressBar'
import { DonationForm } from './DonationForm'
import { DonationSuccess, DonationFailure } from './DonationOutcome'
import { CategoryIcon } from './icons'
import { Modal } from './Modal'

export function SevaModal({
  campaign,
  onClose,
  occasionLabel,
}: {
  campaign: Campaign | null
  onClose: () => void
  occasionLabel?: string
}) {
  const [view, setView] = useState<{ type: 'form' } | { type: 'success'; receiptUrl: string } | { type: 'failure'; reason: string }>({
    type: 'form',
  })

  function handleClose() {
    onClose()
    setTimeout(() => setView({ type: 'form' }), 300)
  }

  if (!campaign) return null

  return (
    <Modal open={!!campaign} onClose={handleClose} wide>
      {view.type === 'success' && <DonationSuccess receiptUrl={view.receiptUrl} onClose={handleClose} />}
      {view.type === 'failure' && (
        <DonationFailure reason={view.reason} onRetry={() => setView({ type: 'form' })} />
      )}
      {view.type === 'form' && (
        <div className="lg:grid lg:grid-cols-5 lg:items-start lg:gap-8">
          <div className="space-y-5 lg:col-span-3">
            <div className="flex items-start gap-3">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-sky-100">
                <CategoryIcon category={campaign.category} className="h-7 w-7 text-sky-700" />
              </span>
              <div>
                <h2 className="font-serif text-xl font-semibold text-ink-900">{campaign.title}</h2>
                <p className="mt-1 text-sm text-ink-600">{campaign.shortDescription}</p>
              </div>
            </div>

            {campaign.contentStatus === 'coming-soon' && (
              <p className="rounded-lg bg-sun-100 px-4 py-3 text-sm font-medium text-sun-700">
                We're finalizing full details for this seva — the description reflects what's
                confirmed so far.
              </p>
            )}

            <p className="whitespace-pre-line text-sm text-ink-700">{campaign.description}</p>

            {campaign.impactStats && campaign.impactStats.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {campaign.impactStats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-sky-50/70 p-3 text-center shadow-sm ring-1 ring-black/5">
                    <div className="font-serif text-lg font-semibold text-sky-700">{s.value}</div>
                    <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-400">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {campaign.features && campaign.features.length > 0 && (
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {campaign.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                    <span className="mt-0.5 text-sky-500" aria-hidden>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {campaign.testimonials && campaign.testimonials.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {campaign.testimonials.slice(0, 2).map((t) => (
                  <div key={t.name} className="rounded-xl bg-sun-50/70 p-3 shadow-sm ring-1 ring-black/5">
                    <p className="text-xs italic text-ink-700">&ldquo;{t.quote}&rdquo;</p>
                    <p className="mt-2 text-xs font-semibold text-ink-900">{t.name}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <ProgressBar raised={campaign.raisedAmount} goal={campaign.goalAmount} />
            </div>
          </div>

          <div className="mt-6 lg:col-span-2 lg:mt-0">
            <DonationForm
              campaign={campaign}
              occasionLabel={occasionLabel}
              onSuccess={(receiptUrl) => setView({ type: 'success', receiptUrl })}
              onFailure={(reason) => setView({ type: 'failure', reason })}
            />
          </div>
        </div>
      )}
    </Modal>
  )
}
