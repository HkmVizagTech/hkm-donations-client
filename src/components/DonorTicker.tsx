import { useEffect, useState } from 'react'
import { api } from '../lib/apiClient'
import type { RecentDonation } from '../types'
import { formatInr } from '../lib/formatCurrency'
import { formatRelativeTime } from '../lib/formatRelativeTime'

export function DonorTicker() {
  const [donations, setDonations] = useState<RecentDonation[] | null>(null)

  useEffect(() => {
    api
      .get<{ donations: RecentDonation[] }>('/api/donations/recent?limit=12')
      .then((res) => setDonations(res.donations))
      .catch(() => setDonations([]))
  }, [])

  if (donations === null) return null

  if (donations.length === 0) {
    return (
      <div className="rounded-2xl border border-sky-100 bg-white p-6 text-center text-sm text-ink-700/70">
        Be among the first devotees to support this mission — your name could be the first on this
        list.
      </div>
    )
  }

  return (
    <div className="max-h-80 overflow-hidden rounded-2xl border border-sky-100 bg-white">
      <div className="flex items-center gap-2 border-b border-sky-100 px-5 py-3">
        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
        <span className="text-xs font-semibold uppercase tracking-wide text-green-700">Live</span>
        <span className="text-sm font-medium text-ink-800">Generous Souls Supporting the Mission</span>
      </div>
      <ul className="divide-y divide-sky-50">
        {donations.map((d, i) => (
          <li key={i} className="flex items-center gap-3 px-5 py-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
              {d.name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink-800">{d.name}</p>
              <p className="truncate text-xs text-ink-700/60">
                {formatInr(d.amount)} · {d.seva || d.campaignTitle} · {formatRelativeTime(d.at)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
