import { formatInr } from '../lib/formatCurrency'

export function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  if (!goal) {
    if (!raised) {
      return <p className="text-sm font-medium text-sky-600">Be the first to support this seva</p>
    }
    return <p className="text-sm font-medium text-ink-700">{formatInr(raised)} raised so far</p>
  }

  const pct = Math.min(100, Math.round((raised / goal) * 100))
  return (
    <div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-sky-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sun-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-xs font-medium text-ink-700">
        <span>{formatInr(raised)} raised</span>
        <span>Goal: {formatInr(goal)}</span>
      </div>
    </div>
  )
}
