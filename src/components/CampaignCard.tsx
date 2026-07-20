import type { Campaign } from '../types'
import { ProgressBar } from './ProgressBar'
import { formatInr } from '../lib/formatCurrency'
import { CategoryIcon, IconArrowRight } from './icons'
import { API_URL } from '../lib/apiClient'

const CATEGORY_TINT: Record<string, string> = {
  annadanam: 'bg-sky-100',
  subhojanam: 'bg-peach-100',
  gauseva: 'bg-sun-100',
  gita: 'bg-sky-100',
  vastra: 'bg-peach-100',
  'temple-dev': 'bg-sun-100',
  youth: 'bg-sky-100',
  festival: 'bg-peach-100',
  general: 'bg-sun-100',
}

export function CampaignCard({ campaign, onSelect }: { campaign: Campaign; onSelect: (c: Campaign) => void }) {
  const tint = CATEGORY_TINT[campaign.category] || 'bg-sky-100'
  const startingAmount = campaign.donationTiers[0]?.amount
  const heroImageSrc = campaign.heroImage?.startsWith('http')
    ? campaign.heroImage
    : campaign.heroImage
      ? `${API_URL}${campaign.heroImage}`
      : undefined

  return (
    <button
      type="button"
      onClick={() => onSelect(campaign)}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white text-left shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`relative h-40 w-full overflow-hidden ${tint}`}>
        {heroImageSrc ? (
          <img
            src={heroImageSrc}
            alt={campaign.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/80 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <CategoryIcon category={campaign.category} className="h-8 w-8 text-sky-700" />
            </span>
          </div>
        )}
        {campaign.contentStatus === 'coming-soon' && (
          <span className="absolute right-3 top-3 rounded-full bg-ink-900/85 px-3 py-1 text-xs font-semibold text-white">
            Coming soon
          </span>
        )}
        {startingAmount && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-800">
            From {formatInr(startingAmount)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <h3 className="text-lg font-semibold text-ink-900">{campaign.title}</h3>
        <p className="line-clamp-2 flex-1 text-sm text-ink-400">{campaign.shortDescription}</p>
        <ProgressBar raised={campaign.raisedAmount} goal={campaign.goalAmount} />
        <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 group-hover:gap-2 transition-all">
          View seva <IconArrowRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  )
}
