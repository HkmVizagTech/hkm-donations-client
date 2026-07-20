import { IconShieldCheck, IconLock, IconBolt, IconGift } from './icons'

const BADGES = [
  { Icon: IconShieldCheck, label: '80G Tax Exemption', color: 'text-sun-600' },
  { Icon: IconLock, label: 'Secure Razorpay Checkout', color: 'text-sky-600' },
  { Icon: IconBolt, label: 'Instant Confirmation', color: 'text-sun-600' },
  { Icon: IconGift, label: 'Mahaprasadam Blessings', color: 'text-sky-600' },
]

export function TrustBadgeRow({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium sm:text-sm ${
        dark ? 'text-cream-100/80' : 'text-ink-600'
      }`}
    >
      {BADGES.map((b) => (
        <span key={b.label} className="flex items-center gap-1.5 whitespace-nowrap">
          <b.Icon className={`h-4 w-4 ${dark ? 'text-sun-300' : b.color}`} />
          {b.label}
        </span>
      ))}
    </div>
  )
}
