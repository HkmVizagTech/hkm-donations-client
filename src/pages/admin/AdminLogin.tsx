import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { api } from '../../lib/apiClient'

interface LoginResponse {
  token: string
  admin: { id: string; name: string; email: string }
}

export function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await api.post<LoginResponse>('/api/admin/auth/login', { email, password })
      localStorage.setItem('hkm_admin_token', res.token)
      localStorage.setItem('hkm_admin_name', res.admin.name)
      navigate('/admin')
    } catch (err) {
      setError((err as Error).message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="hero-gradient flex min-h-screen items-center justify-center px-4">
      <Helmet>
        <title>Admin Login | HKM Visakhapatnam</title>
      </Helmet>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5">
        <div className="text-center">
          <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-sky-600 font-serif text-lg font-semibold text-white">
            H
          </span>
          <h1 className="mt-3 font-serif text-xl font-semibold text-ink-900">Admin Login</h1>
          <p className="text-sm text-ink-500">HKM Visakhapatnam donation platform</p>
        </div>

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-sky-200 px-3 py-2.5 text-sm focus:border-sky-400 focus:outline-none"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-sky-200 px-3 py-2.5 text-sm focus:border-sky-400 focus:outline-none"
        />

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="cta-gradient w-full rounded-full py-2.5 text-sm font-semibold disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
