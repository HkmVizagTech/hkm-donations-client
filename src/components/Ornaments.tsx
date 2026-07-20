// Decorative SVG motifs used in place of real photography (none available yet).
// Purely ornamental — never presented as real temple/deity photographs.

export function LotusMotif({ className = 'h-full w-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g fill="none" strokeWidth="1.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            d="M100 100 C 100 60, 130 40, 100 10 C 70 40, 100 60, 100 100 Z"
            transform={`rotate(${i * 45} 100 100)`}
            stroke="currentColor"
            opacity={0.5}
          />
        ))}
        <circle cx="100" cy="100" r="14" stroke="currentColor" opacity={0.6} />
      </g>
    </svg>
  )
}

export function SunburstMotif({ className = 'h-full w-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="1.5" opacity={0.5}>
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * Math.PI) / 8
          const x1 = 100 + Math.cos(angle) * 40
          const y1 = 100 + Math.sin(angle) * 40
          const x2 = 100 + Math.cos(angle) * 92
          const y2 = 100 + Math.sin(angle) * 92
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        })}
        <circle cx="100" cy="100" r="38" />
      </g>
    </svg>
  )
}

export function BlobBackdrop({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sun-200/50 blur-3xl" />
      <div className="absolute -right-20 top-16 h-80 w-80 rounded-full bg-sky-200/50 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-peach-200/40 blur-3xl" />
    </div>
  )
}
