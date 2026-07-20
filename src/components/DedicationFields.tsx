import type { DedicationInput } from '../types'

interface Props {
  value: DedicationInput
  onChange: (value: DedicationInput) => void
  memorialMode?: boolean
}

export function DedicationFields({ value, onChange, memorialMode }: Props) {
  return (
    <div className="space-y-3 rounded-xl border border-sky-100 bg-sky-50/50 p-4">
      {!memorialMode && (
        <label className="flex items-center gap-2 text-sm font-medium text-ink-800">
          <input
            type="checkbox"
            checked={!!value.isMemorial}
            onChange={(e) => onChange({ ...value, isMemorial: e.target.checked })}
            className="h-4 w-4 rounded border-sky-300 text-sky-600"
          />
          Dedicate this donation "In Loving Memory" of someone
        </label>
      )}

      {(memorialMode || value.isMemorial) && (
        <div>
          <label className="text-sm font-medium text-ink-800">Memorial name</label>
          <input
            type="text"
            value={value.memorialName || ''}
            onChange={(e) => onChange({ ...value, memorialName: e.target.value, isMemorial: true })}
            placeholder="In loving memory of..."
            className="mt-1 w-full rounded-lg border border-sky-200 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
          />
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-ink-800">Seva (optional)</label>
        <input
          type="text"
          value={value.sevaSelected || ''}
          onChange={(e) => onChange({ ...value, sevaSelected: e.target.value })}
          placeholder="e.g. Anna-Daan, Gau Poshana"
          className="mt-1 w-full rounded-lg border border-sky-200 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-ink-800">Dedication message (optional)</label>
        <textarea
          value={value.message || ''}
          onChange={(e) => onChange({ ...value, message: e.target.value })}
          rows={2}
          className="mt-1 w-full rounded-lg border border-sky-200 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
        />
      </div>
    </div>
  )
}
