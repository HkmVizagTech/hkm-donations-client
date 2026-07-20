import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { api, API_URL } from '../../lib/apiClient'
import { formatInr } from '../../lib/formatCurrency'
import { Modal } from '../../components/Modal'

interface DonationTier {
  amount: number
  label: string
  description?: string
}

interface Campaign {
  _id: string
  title: string
  slug: string
  category: string
  shortDescription?: string
  description?: string
  heroImage?: string
  donationTiers: DonationTier[]
  goalAmount: number
  raisedAmount: number
  isActive: boolean
  isFeatured: boolean
  contentStatus: 'verified' | 'coming-soon'
}

const CATEGORIES = ['annadanam', 'subhojanam', 'gauseva', 'gita', 'vastra', 'temple-dev', 'youth', 'festival', 'general']

const EMPTY_FORM = {
  title: '',
  slug: '',
  category: 'general',
  shortDescription: '',
  description: '',
  heroImage: '',
  goalAmount: 0,
  isActive: true,
  isFeatured: false,
  contentStatus: 'verified' as 'verified' | 'coming-soon',
  donationTiers: [] as DonationTier[],
}

export function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Campaign | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function load() {
    setLoading(true)
    api.get<{ campaigns: Campaign[] }>('/api/admin/campaigns').then((res) => {
      setCampaigns(res.campaigns)
      setLoading(false)
    })
  }

  useEffect(load, [])

  function openCreate() {
    setEditing(null)
    setForm(EMPTY_FORM)
    setError(null)
    setShowForm(true)
  }

  function openEdit(c: Campaign) {
    setEditing(c)
    setForm({
      title: c.title,
      slug: c.slug,
      category: c.category,
      shortDescription: c.shortDescription || '',
      description: c.description || '',
      heroImage: c.heroImage || '',
      goalAmount: c.goalAmount,
      isActive: c.isActive,
      isFeatured: c.isFeatured,
      contentStatus: c.contentStatus,
      donationTiers: c.donationTiers,
    })
    setError(null)
    setShowForm(true)
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await api.postForm<{ url: string }>('/api/admin/uploads', formData)
      setForm((f) => ({ ...f, heroImage: res.url }))
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setUploading(false)
    }
  }

  function updateTier(i: number, patch: Partial<DonationTier>) {
    setForm((f) => ({
      ...f,
      donationTiers: f.donationTiers.map((t, idx) => (idx === i ? { ...t, ...patch } : t)),
    }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const payload = { ...form }
      if (editing) {
        await api.put(`/api/admin/campaigns/${editing._id}`, payload)
      } else {
        await api.post('/api/admin/campaigns', payload)
      }
      setShowForm(false)
      load()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(c: Campaign) {
    await api.put(`/api/admin/campaigns/${c._id}`, { isActive: !c.isActive })
    load()
  }

  async function handleDelete(c: Campaign) {
    if (!confirm(`Delete "${c.title}"? This cannot be undone.`)) return
    await api.del(`/api/admin/campaigns/${c._id}`)
    load()
  }

  return (
    <div>
      <Helmet>
        <title>Campaigns | Admin</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-ink-900">Campaigns</h1>
        <button type="button" onClick={openCreate} className="cta-gradient rounded-full px-5 py-2 text-sm font-semibold">
          + New Campaign
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sky-100 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Raised</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-50">
            {loading ? (
              <tr><td className="px-4 py-6 text-ink-400" colSpan={6}>Loading…</td></tr>
            ) : (
              campaigns.map((c) => (
                <tr key={c._id}>
                  <td className="px-4 py-3 font-medium text-ink-900">{c.title}</td>
                  <td className="px-4 py-3 text-ink-600">{c.category}</td>
                  <td className="px-4 py-3 text-ink-600">{formatInr(c.raisedAmount)}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleActive(c)}
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        c.isActive ? 'bg-green-100 text-green-700' : 'bg-ink-100 text-ink-500'
                      }`}
                    >
                      {c.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{c.isFeatured ? 'Yes' : '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => openEdit(c)} className="mr-3 font-semibold text-sky-600 hover:text-sky-700">
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(c)} className="font-semibold text-red-600 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal open={showForm} onClose={() => setShowForm(false)} wide>
        <form onSubmit={handleSave} className="space-y-4">
          <h2 className="font-serif text-xl font-semibold text-ink-900">
            {editing ? 'Edit Campaign' : 'New Campaign'}
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              required
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-lg border border-sky-200 px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Slug (auto-generated if blank)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="rounded-lg border border-sky-200 px-3 py-2 text-sm"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="rounded-lg border border-sky-200 px-3 py-2 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={form.contentStatus}
              onChange={(e) => setForm({ ...form, contentStatus: e.target.value as 'verified' | 'coming-soon' })}
              className="rounded-lg border border-sky-200 px-3 py-2 text-sm"
            >
              <option value="verified">Verified content</option>
              <option value="coming-soon">Coming soon</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Short description (shown on cards)"
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            className="w-full rounded-lg border border-sky-200 px-3 py-2 text-sm"
          />
          <textarea
            placeholder="Full description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-lg border border-sky-200 px-3 py-2 text-sm"
          />

          <div>
            <label className="text-sm font-medium text-ink-700">Hero image</label>
            <div className="mt-1 flex items-center gap-3">
              {form.heroImage && (
                <img src={`${API_URL}${form.heroImage}`} alt="" className="h-14 w-14 rounded-lg object-cover" />
              )}
              <input type="file" accept="image/*" onChange={handleUpload} className="text-sm" />
              {uploading && <span className="text-xs text-ink-400">Uploading…</span>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-ink-700">Donation tiers</label>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, donationTiers: [...f.donationTiers, { amount: 0, label: '' }] }))}
                className="text-xs font-semibold text-sky-600"
              >
                + Add tier
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {form.donationTiers.map((t, i) => (
                <div key={i} className="grid grid-cols-8 gap-2">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={t.amount}
                    onChange={(e) => updateTier(i, { amount: Number(e.target.value) })}
                    className="col-span-2 rounded-lg border border-sky-200 px-2 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Label"
                    value={t.label}
                    onChange={(e) => updateTier(i, { label: e.target.value })}
                    className="col-span-2 rounded-lg border border-sky-200 px-2 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Description (e.g. 10 plates)"
                    value={t.description || ''}
                    onChange={(e) => updateTier(i, { description: e.target.value })}
                    className="col-span-3 rounded-lg border border-sky-200 px-2 py-1.5 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, donationTiers: f.donationTiers.filter((_, idx) => idx !== i) }))}
                    className="col-span-1 text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <input
              type="number"
              placeholder="Goal amount (0 = no fixed goal)"
              value={form.goalAmount}
              onChange={(e) => setForm({ ...form, goalAmount: Number(e.target.value) })}
              className="rounded-lg border border-sky-200 px-3 py-2 text-sm"
            />
            <label className="flex items-center gap-2 text-sm text-ink-700">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              Active (visible on site)
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-700">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
              Featured
            </label>
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-sky-200 px-5 py-2 text-sm font-semibold text-ink-700">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="cta-gradient rounded-full px-5 py-2 text-sm font-semibold disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Campaign'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
