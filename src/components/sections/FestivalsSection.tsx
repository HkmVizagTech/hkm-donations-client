import type { Festival } from '../../types'
import { IconFlame } from '../icons'

export function FestivalsSection({
  festivals,
  onSelect,
}: {
  festivals: Festival[]
  onSelect: (festival: Festival) => void
}) {
  if (festivals.length === 0) return null

  return (
    <section id="festivals" className="scroll-mt-20 bg-gradient-to-b from-peach-200 via-cream-50 to-sun-200 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">The Vaishnava Calendar</p>
          <h2 className="mt-1 font-serif text-3xl font-semibold text-ink-900">Festival Sponsorships</h2>
          <p className="mx-auto mt-2 max-w-2xl text-ink-600">
            Sponsor seva and celebrations for HKM Visakhapatnam's festival calendar throughout the year.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {festivals.map((f) => (
            <button
              key={f._id}
              type="button"
              onClick={() => f.campaign && onSelect(f)}
              disabled={!f.campaign}
              className="flex flex-col gap-2 rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-semibold text-ink-900">
                  <IconFlame className="h-4 w-4 text-peach-300" /> {f.name}
                </span>
                {f.contentStatus === 'coming-soon' && (
                  <span className="rounded-full bg-sun-100 px-3 py-1 text-xs font-semibold text-sun-700">
                    Coming soon
                  </span>
                )}
              </div>
              <p className="line-clamp-3 text-sm text-ink-500">{f.description}</p>
              {f.campaign && <span className="mt-2 text-sm font-semibold text-sky-600">Sponsor this festival &rarr;</span>}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
