import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { api } from '../../lib/apiClient'
import { Modal } from '../../components/Modal'

interface CampaignOption {
  _id: string
  title: string
}

interface Festival {
  _id: string
  name: string
  slug: string
  description?: string
  campaign?: { _id: string; title: string } | null
  isActive: boolean
  contentStatus: 'verified' | 'coming-soon'
}

const EMPTY_FORM = {
  name: '',
  slug: '',
  description: '',
  campaign: '',
  isActive: true,
  contentStatus: 'verified' as 'verified' | 'coming-soon',
}

export function AdminFestivals() {
  const [festivals, setFestivals] = useState<Festival[]>([])
  const [campaigns, setCampaigns] = useState<CampaignOption[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Festival | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function load() {
    setLoading(true)
    Promise.all([
      api.get<{ festivals: Festival[] }>('/api/admin/festivals'),
      api.get<{ campaigns: CampaignOption[] }>('/api/admin/campaigns'),
    ]).then(([f, c]) => {
      setFestivals(f.festivals)
      setCampaigns(c.campaigns)
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

  function openEdit(f: Festival) {
    setEditing(f)
    setForm({
      name: f.name,
      slug: f.slug,
      description: f.description || '',
      campaign: f.campaign?._id || '',
      isActive: f.isActive,
      contentStatus: f.contentStatus,
    })
    setError(null)
    setShowForm(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const payload = { ...form, campaign: form.campaign || null }
      if (editing) {
        await api.put(`/api/admin/festivals/${editing._id}`, payload)
      } else {
        await api.post('/api/admin/festivals', payload)
      }
      setShowForm(false)
      load()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(f: Festival) {
    await api.put(`/api/admin/festivals/${f._id}`, { isActive: !f.isActive })
    load()
  }

  async function handleDelete(f: Festival) {
    if (!confirm(`Delete "${f.name}"?`)) return
    await api.del(`/api/admin/festivals/${f._id}`)
    load()
  }

  return (
    <div>
      <Helmet>
        <title>Festivals | Admin</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-ink-900">Festivals</h1>
        <button type="button" onClick={openCreate} className="cta-gradient rounded-full px-5 py-2 text-sm font-semibold">
          + New Festival
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sky-100 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Linked Campaign</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Content</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-50">
            {loading ? (
              <tr><td className="px-4 py-6 text-ink-400" colSpan={5}>Loading…</td></tr>
            ) : (
              festivals.map((f) => (
                <tr key={f._id}>
                  <td className="px-4 py-3 font-medium text-ink-900">{f.name}</td>
                  <td className="px-4 py-3 text-ink-600">{f.campaign?.title || '—'}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleActive(f)}
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        f.isActive ? 'bg-green-100 text-green-700' : 'bg-ink-100 text-ink-500'
                      }`}
                    >
                      {f.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{f.contentStatus}</td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => openEdit(f)} className="mr-3 font-semibold text-sky-600 hover:text-sky-700">
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(f)} className="font-semibold text-red-600 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal open={showForm} onClose={() => setShowForm(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          <h2 className="font-serif text-xl font-semibold text-ink-900">
            {editing ? 'Edit Festival' : 'New Festival'}
          </h2>

          <input
            type="text"
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-sky-200 px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Slug (auto-generated if blank)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full rounded-lg border border-sky-200 px-3 py-2 text-sm"
          />
          <textarea
            placeholder="Description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-lg border border-sky-200 px-3 py-2 text-sm"
          />
          <select
            value={form.campaign}
            onChange={(e) => setForm({ ...form, campaign: e.target.value })}
            className="w-full rounded-lg border border-sky-200 px-3 py-2 text-sm"
          >
            <option value="">No linked campaign</option>
            {campaigns.map((c) => (
              <option key={c._id} value={c._id}>{c.title}</option>
            ))}
          </select>

          <div className="flex items-center gap-6">
            <select
              value={form.contentStatus}
              onChange={(e) => setForm({ ...form, contentStatus: e.target.value as 'verified' | 'coming-soon' })}
              className="rounded-lg border border-sky-200 px-3 py-2 text-sm"
            >
              <option value="verified">Verified content</option>
              <option value="coming-soon">Coming soon</option>
            </select>
            <label className="flex items-center gap-2 text-sm text-ink-700">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              Active
            </label>
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-sky-200 px-5 py-2 text-sm font-semibold text-ink-700">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="cta-gradient rounded-full px-5 py-2 text-sm font-semibold disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Festival'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
