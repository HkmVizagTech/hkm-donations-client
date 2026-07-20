// Minimal inline SVG icon set — replaces emoji glyphs used throughout the app.
// Kept as simple stroked line icons so they inherit `currentColor` cleanly.
import type { ReactElement } from 'react'

type IconProps = { className?: string }

const base = 'h-5 w-5'

export function IconBowl({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <path d="M3 12h18a9 9 0 0 1-18 0Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 12c0-2.5 1.2-4.5 2-5.5M12 12c0-3 .8-5.5 1.5-7M17 12c0-2 .5-4 1.5-6" strokeLinecap="round" />
    </svg>
  )
}

export function IconBowlSteam({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <path d="M3 13h18a9 9 0 0 1-18 0Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 4c-1 1-1 2 0 3M13 3c-1 1-1 2 0 3M17 4c-1 1-1 2 0 3" strokeLinecap="round" />
    </svg>
  )
}

export function IconCow({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <path
        d="M5 9c-1.5 0-2-1.5-1-2.5S6 6 6 7M19 9c1.5 0 2-1.5 1-2.5S18 6 18 7"
        strokeLinecap="round"
      />
      <path
        d="M5.5 10.5c0-2 2-3.5 6.5-3.5s6.5 1.5 6.5 3.5c0 3-1 5-1.5 6.5-.3 1-1 2-2.5 2h-5c-1.5 0-2.2-1-2.5-2-.5-1.5-1.5-3.5-1.5-6.5Z"
        strokeLinejoin="round"
      />
      <circle cx={9.5} cy={11.5} r={0.8} fill="currentColor" stroke="none" />
      <circle cx={14.5} cy={11.5} r={0.8} fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconBook({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <path
        d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z"
        strokeLinejoin="round"
      />
      <path
        d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5v-13Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconGarment({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <path
        d="M9 4l3 1.5L15 4l3 3-2 2v11H8V9L6 7l3-3Z"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconTemple({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <path d="M12 3l7 5H5l7-5Z" strokeLinejoin="round" />
      <path d="M4 20h16M5 20v-7M9 20v-7M15 20v-7M19 20v-7M4 13h16" strokeLinecap="round" />
    </svg>
  )
}

export function IconSprout({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <path
        d="M12 21v-8M12 13c0-3-2-5-6-5 0 4 2 6 6 5ZM12 11c0-3 2-5 6-5 0 4-2 6-6 5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconFlame({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <path
        d="M12 3c1 3-2 4-2 7a4 4 0 1 0 8 0c0-1-1-2-1-2 .5 2-1 3-1 1 0-2-2-3-2-5 0-.7.2-1.3.5-1.9C13 2 12.3 2.4 12 3Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconShieldCheck({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconLock({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <rect x={5} y={11} width={14} height={9} rx={2} />
      <path d="M8 11V7a4 4 0 1 1 8 0v4" strokeLinecap="round" />
    </svg>
  )
}

export function IconBolt({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <path d="M13 3 5 13h5l-1 8 8-10h-5l1-8Z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

export function IconGift({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <rect x={4} y={9} width={16} height={4} rx={1} />
      <path d="M6 13h12v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7ZM12 9V6a2.5 2.5 0 1 0-2.5 2.5H12ZM12 9V6a2.5 2.5 0 1 1 2.5 2.5H12Z" />
    </svg>
  )
}

export function IconArrowRight({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.8}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconHome({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z" strokeLinejoin="round" />
    </svg>
  )
}

export function IconCalendar({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <rect x={4} y={5} width={16} height={15} rx={2} />
      <path d="M4 9h16M8 3v3M16 3v3" strokeLinecap="round" />
    </svg>
  )
}

export function IconHeart({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <path
        d="M12 20s-7-4.4-9.5-9C.7 7.8 2 4.5 5.2 4a4.6 4.6 0 0 1 6.8 2 4.6 4.6 0 0 1 6.8-2c3.2.5 4.5 3.8 2.7 7-2.5 4.6-9.5 9-9.5 9Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconPhone({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
      <path
        d="M5 4h3l1.5 4.5-2 1.6a11.5 11.5 0 0 0 5.9 5.9l1.6-2L19.5 15.5V18.5a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconMenu({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.8}>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  )
}

export const CATEGORY_ICONS: Record<string, (props: IconProps) => ReactElement> = {
  annadanam: IconBowlSteam,
  subhojanam: IconBowl,
  gauseva: IconCow,
  gita: IconBook,
  vastra: IconGarment,
  'temple-dev': IconTemple,
  youth: IconSprout,
  festival: IconFlame,
  general: IconHeart,
}

export function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const Cmp = CATEGORY_ICONS[category] || IconHeart
  return <Cmp className={className} />
}
