import { useEffect, useState } from 'react'
import { org } from '../content/orgContent'
import { IconMenu, IconHeart, IconPhone } from './icons'

const NAV_LINKS = [
  { to: '#sevas', label: 'Sevas' },
  { to: '#festivals', label: 'Festivals' },
  { to: '#special-occasion', label: 'Special Occasion' },
  { to: '#trust', label: 'Trust & Transparency' },
  { to: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? 'border-b border-sun-300/60 bg-gradient-to-r from-sun-100 via-sun-50 to-sun-100 shadow-[0_4px_24px_rgba(207,159,46,0.18)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <img src="/logo.png" alt={org.brandName} className="h-11 w-auto drop-shadow-sm sm:h-14" />

        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className="group relative px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:text-sky-700"
            >
              {link.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-0.5 scale-x-0 rounded-full bg-gradient-to-r from-sun-500 to-sky-600 transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={org.contact.phoneHref}
            className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors sm:inline-flex ${
              scrolled ? 'bg-white/70 text-sky-800 hover:bg-white' : 'bg-white/50 text-ink-800 hover:bg-white/80'
            }`}
            aria-label={`Call ${org.contact.phone}`}
            title={org.contact.phone}
          >
            <IconPhone className="h-4 w-4" />
          </a>
          <a
            href="#sevas"
            className="cta-gradient hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold shadow-md shadow-sky-500/20 sm:inline-flex"
          >
            <IconHeart className="h-4 w-4" />
            Donate Now
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-ink-800 hover:bg-white/50 lg:hidden"
            aria-label="Toggle menu"
          >
            <IconMenu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-sun-200 bg-cream-50 px-4 py-3 lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.to}
              href={link.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-sun-100 hover:text-sky-700"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#sevas"
            onClick={() => setOpen(false)}
            className="cta-gradient mt-2 rounded-full px-5 py-2.5 text-center text-sm font-semibold"
          >
            Donate Now
          </a>
          <div className="mt-3 flex flex-col gap-1.5 border-t border-sun-200 pt-3 text-sm text-ink-600">
            <a href={org.contact.phoneHref} className="flex items-center gap-2 hover:text-sky-700">
              <IconPhone className="h-4 w-4" /> {org.contact.phone}
            </a>
            <a href={`mailto:${org.contact.email}`} className="hover:text-sky-700">
              {org.contact.email}
            </a>

          </div>
        </nav>
      )}
    </header>
  )
}
