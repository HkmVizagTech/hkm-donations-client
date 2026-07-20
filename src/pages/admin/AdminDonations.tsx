import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { api, downloadFile } from '../../lib/apiClient'
import { formatInr } from '../../lib/formatCurrency'

interface Donation {
  _id: string
  donor: { name: string; email?: string; phone?: string }
  campaign: { title: string }
  amount: number
  status: 'created' | 'paid' | 'failed'
  createdAt: string
}

export function AdminDonations() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    setLoading(true)
    const query = statusFilter ? `?status=${statusFilter}` : ''
    api.get<{ donations: Donation[] }>(`/api/admin/donations${query}`).then((res) => {
      setDonations(res.donations)
      setLoading(false)
    })
  }, [statusFilter])

  return (
    <div>
      <Helmet>
        <title>Donations | Admin</title>
      </Helmet>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-2xl font-semibold text-ink-900">Donations</h1>
        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-sky-200 px-3 py-2 text-sm"
          >
            <option value="">All statuses</option>
            <option value="paid">Paid</option>
            <option value="created">Created (unpaid)</option>
            <option value="failed">Failed</option>
          </select>
          <button
            type="button"
            onClick={() => downloadFile('/api/admin/donations/export', 'donations.csv')}
            className="rounded-full border border-sky-200 px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50"
          >
            Export Donations CSV
          </button>
          <button
            type="button"
            onClick={() => downloadFile('/api/admin/donors/export', 'donors.csv')}
            className="rounded-full border border-sky-200 px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50"
          >
            Export Donors CSV
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sky-100 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Donor</th>
              <th className="px-4 py-3">Campaign</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-50">
            {loading ? (
              <tr><td className="px-4 py-6 text-ink-400" colSpan={5}>Loading…</td></tr>
            ) : donations.length === 0 ? (
              <tr><td className="px-4 py-6 text-ink-400" colSpan={5}>No donations yet.</td></tr>
            ) : (
              donations.map((d) => (
                <tr key={d._id}>
                  <td className="px-4 py-3 text-ink-600">{new Date(d.createdAt).toLocaleDateString('en-IN')}</td>
                  <td className="px-4 py-3 font-medium text-ink-900">{d.donor?.name}</td>
                  <td className="px-4 py-3 text-ink-600">{d.campaign?.title}</td>
                  <td className="px-4 py-3 text-ink-600">{formatInr(d.amount)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        d.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : d.status === 'failed'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-sun-100 text-sun-700'
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
