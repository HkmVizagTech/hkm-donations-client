import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { IconHome, IconTemple, IconCalendar, IconHeart, IconMenu } from '../icons'

const NAV = [
  { to: '/admin', label: 'Dashboard', Icon: IconHome, end: true },
  { to: '/admin/campaigns', label: 'Campaigns', Icon: IconTemple },
  { to: '/admin/festivals', label: 'Festivals', Icon: IconCalendar },
  { to: '/admin/donations', label: 'Donations', Icon: IconHeart },
]

export function AdminLayout() {
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const token = localStorage.getItem('hkm_admin_token')

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) return null
  if (!token) return <Navigate to="/admin/login" replace />

  function handleLogout() {
    localStorage.removeItem('hkm_admin_token')
    localStorage.removeItem('hkm_admin_name')
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-cream-50">
      <aside className="hidden w-56 shrink-0 border-r border-sky-100 bg-white lg:block">
        <div className="flex h-16 items-center gap-2 border-b border-sky-100 px-5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-sky-600 text-sm font-semibold text-white">
            H
          </span>
          <span className="font-serif text-sm font-semibold text-ink-900">Admin Panel</span>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-sky-50 text-sky-700' : 'text-ink-600 hover:bg-cream-100'
                }`
              }
            >
              <item.Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Log out
          </button>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-sky-100 bg-white px-4 lg:hidden">
          <span className="font-serif text-sm font-semibold text-ink-900">Admin Panel</span>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            <IconMenu className="h-5 w-5 text-ink-700" />
          </button>
        </header>
        {open && (
          <nav className="flex flex-col gap-1 border-b border-sky-100 bg-white p-3 lg:hidden">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-sky-50 text-sky-700' : 'text-ink-600'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button type="button" onClick={handleLogout} className="rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600">
              Log out
            </button>
          </nav>
        )}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
