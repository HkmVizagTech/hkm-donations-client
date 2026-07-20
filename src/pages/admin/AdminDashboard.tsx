import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { api } from '../../lib/apiClient'
import { formatInr } from '../../lib/formatCurrency'

interface DashboardStats {
  totalRaised: number
  totalDonations: number
  totalCampaigns: number
  activeCampaigns: number
  totalDonors: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    api.get<DashboardStats>('/api/admin/dashboard/stats').then(setStats)
  }, [])

  const cards = stats
    ? [
        { label: 'Total Raised', value: formatInr(stats.totalRaised) },
        { label: 'Total Donations', value: stats.totalDonations },
        { label: 'Total Donors', value: stats.totalDonors },
        { label: 'Active Campaigns', value: `${stats.activeCampaigns} / ${stats.totalCampaigns}` },
      ]
    : []

  return (
    <div>
      <Helmet>
        <title>Dashboard | Admin</title>
      </Helmet>
      <h1 className="font-serif text-2xl font-semibold text-ink-900">Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats === null
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-2xl bg-sky-50" />
            ))
          : cards.map((c) => (
              <div key={c.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <p className="text-2xl font-semibold text-sky-700">{c.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-400">{c.label}</p>
              </div>
            ))}
      </div>
    </div>
  )
}
