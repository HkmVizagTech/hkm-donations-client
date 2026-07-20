import { org } from '../content/orgContent'

const STATS = [
  { value: org.stats.yearsOfSeva, label: 'Years of Seva' },
  { value: org.stats.mealsDaily, label: 'Meals Daily' },
  { value: org.stats.festivalsPerYear, label: 'Festivals a Year' },
]

export function StatsBar() {
  return (
    <div className="grid grid-cols-3 divide-x divide-white/40 rounded-3xl border border-white/60 bg-white/70 py-6 shadow-sm backdrop-blur">
      {STATS.map((s) => (
        <div key={s.label} className="text-center">
          <div className="font-serif text-2xl font-semibold text-sky-700 sm:text-3xl">{s.value}</div>
          <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-ink-600 sm:text-xs">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}
