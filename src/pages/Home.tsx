import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { api } from '../lib/apiClient'
import type { Campaign, Festival } from '../types'
import { CampaignCard } from '../components/CampaignCard'
import { StatsBar } from '../components/StatsBar'
import { TrustBadgeRow } from '../components/TrustBadgeRow'
import { DonorTicker } from '../components/DonorTicker'
import { ProgressBar } from '../components/ProgressBar'
import { CategoryIcon, IconTemple } from '../components/icons'
import { SevaModal } from '../components/SevaModal'
import { FestivalsSection } from '../components/sections/FestivalsSection'
import { SpecialOccasionSection } from '../components/sections/SpecialOccasionSection'
import { TrustSection } from '../components/sections/TrustSection'
import { ContactSection } from '../components/sections/ContactSection'
import { SunburstMotif } from '../components/Ornaments'
import { org } from '../content/orgContent'

const VERSES = [
  {
    quote:
      'Whatever you do, whatever you eat, whatever you offer or give away, do that, O son of Kunti, as an offering to Me.',
    ref: 'Bhagavad Gita 9.27',
    tint: 'bg-sky-200',
  },
  {
    quote: 'One who offers Me with love and devotion a leaf, a flower, fruit or water, I will accept it.',
    ref: 'Bhagavad Gita 9.26',
    tint: 'bg-sun-200',
  },
  {
    quote: 'It is the duty of every living being to perform welfare activities for the benefit of others.',
    ref: 'Srimad-Bhagavatam 10.22.35',
    tint: 'bg-peach-200',
  },
]

export function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [festivals, setFestivals] = useState<Festival[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null)

  useEffect(() => {
    Promise.all([
      api.get<{ campaigns: Campaign[] }>('/api/campaigns'),
      api.get<{ festivals: Festival[] }>('/api/festivals'),
    ])
      .then(([c, f]) => {
        setCampaigns(c.campaigns)
        setFestivals(f.festivals)
      })
      .finally(() => setLoading(false))
  }, [])

  const flagship = campaigns.find((c) => c.slug === 'mandir-nirman-seva')
  const sevaGrid = [...campaigns]
    .filter((c) => c.slug !== 'mandir-nirman-seva')
    .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
  const subhojanam = campaigns.find((c) => c.slug === 'subhojanam')
  const activeFestivals = festivals.filter((f) => f.contentStatus === 'verified')

  return (
    <>
      <Helmet>
        <title>HKM Visakhapatnam | Donate</title>
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[url('/hero_bg.png')] bg-cover bg-[position:78%_center] sm:bg-[position:68%_center]">
        <div className="absolute inset-0 bg-gradient-to-r from-cream-50 via-cream-50/85 to-cream-50/10 sm:from-cream-50/80 sm:via-cream-50/45 sm:to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-28 sm:pt-36 lg:px-10">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-700">
              {org.deity} &middot; {org.templeName}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold text-ink-900 sm:text-6xl">
              Every Offering Becomes a Blessing
            </h1>
            <p className="mt-5 max-w-md text-base text-ink-600 sm:text-lg">{org.mission}</p>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <a
                href="#sevas"
                className="cta-gradient rounded-full px-7 py-3 text-sm font-semibold shadow-lg shadow-sky-500/20 sm:px-8"
              >
                Choose a Seva
              </a>
              <a
                href="#special-occasion"
                className="cta-outline rounded-full px-7 py-3 text-sm font-semibold sm:px-8"
              >
                Sponsor a Special Occasion
              </a>
            </div>
            <div className="mt-8">
              <TrustBadgeRow />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto -mt-8 max-w-4xl px-4 sm:px-6">
        <StatsBar />
      </section>

      {activeFestivals.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-r from-peach-200 to-sun-300 px-6 py-5 text-center text-ink-900 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-700/70">
              Currently celebrating
            </p>
            <p className="mt-1 font-serif text-xl">
              {activeFestivals[0].name} —{' '}
              <a href="#festivals" className="underline decoration-ink-800/40 underline-offset-4">
                sponsor this festival
              </a>
            </p>
          </div>
        </section>
      )}

      {/* Flagship campaign */}
      {flagship && (
        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-sky-800 via-sky-900 to-ink-900">
            <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sun-300">
                  <IconTemple className="h-4 w-4" /> Flagship Campaign
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-white sm:text-3xl">
                  {flagship.title}
                </h2>
                <p className="mt-3 text-sm text-white/75 sm:text-base">{flagship.shortDescription}</p>
                <div className="mt-5 rounded-xl bg-white/10 p-4">
                  <ProgressBar raised={flagship.raisedAmount} goal={flagship.goalAmount} />
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCampaign(flagship)}
                  className="cta-gradient mt-5 inline-block rounded-full px-7 py-3 text-sm font-semibold shadow-md"
                >
                  Sponsor a Square Foot or Brick →
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(flagship.features || []).slice(0, 4).map((f) => (
                  <div key={f} className="rounded-xl bg-white/10 p-4 text-sm text-white/90">
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Seva grid */}
      <section id="sevas" className="scroll-mt-20 bg-gradient-to-b from-sun-200 via-cream-50 to-sky-200 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">More ways to serve</p>
            <h2 className="mt-1 font-serif text-3xl font-semibold text-ink-900">Choose Your Seva</h2>
          </div>

          {loading ? (
            <p className="text-center text-ink-400">Loading sevas…</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sevaGrid.map((c) => (
                <CampaignCard key={c._id} campaign={c} onSelect={setActiveCampaign} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subhojanam feature */}
      {subhojanam && (
        <section className="bg-gradient-to-b from-sky-200 to-cream-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-600">
                  <CategoryIcon category="subhojanam" className="h-4 w-4" /> Subhojanam · Anna-Daan
                </p>
                <h2 className="mt-1 font-serif text-3xl font-semibold text-ink-900">
                  No One Should Go Hungry Within Our Reach
                </h2>
                <p className="mt-3 text-ink-600">{subhojanam.shortDescription}</p>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {(subhojanam.impactStats || []).map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="font-serif text-xl font-semibold text-sky-700">{s.value}</div>
                      <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-ink-400">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCampaign(subhojanam)}
                  className="cta-gradient mt-6 inline-block rounded-full px-7 py-3 text-sm font-semibold shadow-md"
                >
                  Sponsor Meals Today →
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {(subhojanam.testimonials || []).slice(0, 2).map((t) => (
                  <div key={t.name} className="rounded-2xl bg-sky-50/70 p-5 shadow-sm ring-1 ring-black/5">
                    <p className="text-sm italic text-ink-700">&ldquo;{t.quote}&rdquo;</p>
                    <p className="mt-3 text-sm font-semibold text-ink-900">{t.name}</p>
                    <p className="text-xs text-ink-400">{t.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <FestivalsSection festivals={festivals} onSelect={(f) => f.campaign && setActiveCampaign(f.campaign)} />

      {/* Scripture verses */}
      <section className="relative overflow-hidden bg-gradient-to-b from-peach-200 to-cream-50 py-14">
        <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64">
          <SunburstMotif className="h-full w-full text-peach-300/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-6 text-center font-serif text-2xl font-semibold text-ink-900">The Importance of Seva</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {VERSES.map((v) => (
              <div key={v.ref} className={`rounded-2xl p-6 shadow-sm ${v.tint}`}>
                <p className="text-sm text-ink-700">&ldquo;{v.quote}&rdquo;</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-500">{v.ref}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SpecialOccasionSection campaigns={campaigns} />

      {/* Donor ticker */}
      <section className="bg-gradient-to-b from-sky-200 to-cream-50 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-center font-serif text-2xl font-semibold text-ink-900">
            Generous Souls Supporting the Mission
          </h2>
          <DonorTicker />
        </div>
      </section>

      <TrustSection />
      <ContactSection />

      <SevaModal campaign={activeCampaign} onClose={() => setActiveCampaign(null)} />
    </>
  )
}
