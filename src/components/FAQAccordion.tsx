import { useState } from 'react'

export interface FAQItem {
  q: string
  a: string
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-sky-100 rounded-2xl border border-sky-100 bg-white">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-ink-800">{item.q}</span>
              <span
                className={`shrink-0 text-sky-600 transition-transform ${isOpen ? 'rotate-45' : ''}`}
                aria-hidden
              >
                +
              </span>
            </button>
            {isOpen && <p className="px-5 pb-4 text-sm text-ink-700/80">{item.a}</p>}
          </div>
        )
      })}
    </div>
  )
}
