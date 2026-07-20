import { IconHome, IconTemple, IconHeart, IconCalendar, IconMenu } from './icons'

const TABS = [
  { href: '#top', label: 'Home', Icon: IconHome },
  { href: '#sevas', label: 'Sevas', Icon: IconTemple },
  { href: '#special-occasion', label: 'Donate', Icon: IconHeart, primary: true },
  { href: '#festivals', label: 'Festivals', Icon: IconCalendar },
  { href: '#contact', label: 'Menu', Icon: IconMenu },
]

export function MobileTabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-sky-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="grid grid-cols-5">
        {TABS.map((tab) =>
          tab.primary ? (
            <a key={tab.href} href={tab.href} className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium text-sky-700">
              <span className="-mt-5 grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-sun-400 to-sky-600 text-white shadow-lg shadow-sky-500/30">
                <tab.Icon className="h-5 w-5" />
              </span>
              <span className="mt-0.5">{tab.label}</span>
            </a>
          ) : (
            <a key={tab.href} href={tab.href} className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium text-ink-400">
              <tab.Icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </a>
          )
        )}
      </div>
    </nav>
  )
}
