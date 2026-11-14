import type { DestinationSlug } from './destinations'

export type PackageCategory =
  | 'singapore'
  | 'malaysia'
  | 'singapore-malaysia'
  | 'thailand'
  | 'custom'
  | 'group'

export interface DurationOption {
  days: number
  nights: number
  label: string
  priceDisplay: string
  amount: number
  legacyAdvertised: boolean
  note?: string
}

export interface TravelPackage {
  slug: string
  title: string
  destinations: DestinationSlug[]
  durations: DurationOption[]
  priceNote: string
  shortDescription: string
  highlights: string[]
  image: string
  category: PackageCategory
  airTicketsSeparate?: boolean
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

const reconfirmationNote =
  'Prices shown are estimated starting figures for planning. Final cost, availability, inclusions, and dates must be reconfirmed with VihaaraYatra International Tours before booking.'

function formatInr(amount: number, suffix = ''): string {
  return `₹${amount.toLocaleString('en-IN')}${suffix}`
}

function roundThousand(value: number): number {
  return Math.max(1000, Math.round(value / 1000) * 1000)
}

type PriceAnchor = {
  days: number
  amount: number
  display?: string
  suffix?: string
}

function estimateAmount(days: number, anchors: PriceAnchor[]): { amount: number; legacy: boolean; display: string } {
  const sorted = [...anchors].sort((a, b) => a.days - b.days)
  const exact = sorted.find((a) => a.days === days)
  const suffix = sorted.find((a) => a.suffix)?.suffix ?? ''

  if (exact) {
    return {
      amount: exact.amount,
      legacy: true,
      display: exact.display ?? formatInr(exact.amount, exact.suffix ?? suffix),
    }
  }

  if (sorted.length === 1) {
    const anchor = sorted[0]!
    const amount = roundThousand((anchor.amount / anchor.days) * days)
    return { amount, legacy: false, display: formatInr(amount, anchor.suffix ?? suffix) }
  }

  const first = sorted[0]!
  const last = sorted[sorted.length - 1]!

  if (days < first.days) {
    const amount = roundThousand((first.amount / first.days) * days)
    return { amount, legacy: false, display: formatInr(amount, suffix) }
  }

  if (days > last.days) {
    const prev = sorted[sorted.length - 2]!
    const slope = (last.amount - prev.amount) / Math.max(1, last.days - prev.days)
    const amount = roundThousand(last.amount + slope * (days - last.days))
    return { amount, legacy: false, display: formatInr(amount, suffix) }
  }

  let lower = first
  let upper = last
  for (let i = 0; i < sorted.length - 1; i++) {
    const left = sorted[i]!
    const right = sorted[i + 1]!
    if (days >= left.days && days <= right.days) {
      lower = left
      upper = right
      break
    }
  }

  const t = (days - lower.days) / Math.max(1, upper.days - lower.days)
  const amount = roundThousand(lower.amount + t * (upper.amount - lower.amount))
  return { amount, legacy: false, display: formatInr(amount, suffix) }
}

function durationRange(anchors: PriceAnchor[]): DurationOption[] {
  const options: DurationOption[] = []
  for (let days = 3; days <= 10; days++) {
    const nights = days - 1
    const estimated = estimateAmount(days, anchors)
    options.push({
      days,
      nights,
      label: `${nights}N / ${days}D`,
      priceDisplay: estimated.display,
      amount: estimated.amount,
      legacyAdvertised: estimated.legacy,
      note: estimated.legacy
        ? 'Previously advertised starting price - subject to reconfirmation.'
        : 'Estimated starting price for planning - subject to reconfirmation.',
    })
  }
  return options
}

export const packages: TravelPackage[] = [
  {
    slug: 'singapore-malaysia',
    title: 'Singapore & Malaysia',
    destinations: ['singapore', 'malaysia'],
    durations: durationRange([
      { days: 6, amount: 85000, display: '₹85,000' },
      { days: 7, amount: 95000, display: '₹95,000' },
    ]),
    priceNote: reconfirmationNote,
    shortDescription:
      'Cross-border holidays pairing Singapore waterfront icons with Kuala Lumpur skyline highlights. Choose your duration from the dropdown.',
    highlights: [
      'Marina Bay and Gardens by the Bay experiences in Singapore',
      'Kuala Lumpur orientation with Petronas Twin Towers viewpoints',
      'Flexible Sentosa or Batu Caves-style excursions depending on timing',
      'Ideal foundation for families and first-time Southeast Asia visitors',
    ],
    image: unsplash('photo-1525625293386-3f8f99389edd'),
    category: 'singapore-malaysia',
  },
  {
    slug: 'singapore-city',
    title: 'Singapore City Highlights',
    destinations: ['singapore'],
    airTicketsSeparate: true,
    durations: durationRange([
      { days: 4, amount: 40000, display: '₹40,000 + air', suffix: ' + air' },
    ]),
    priceNote:
      'Estimated land-style pricing; international air tickets are usually additional unless reconfirmed otherwise. ' +
      reconfirmationNote,
    shortDescription:
      'Focused Singapore getaways covering Marina Bay, Gardens by the Bay, and optional Sentosa or Universal Studios time.',
    highlights: [
      'MRT-friendly city core for Merlion Park and waterfront walks',
      'Evening light experiences at Marina Bay or Supertree Grove',
      'Family-oriented Sentosa or Universal Studios add-ons',
      'Hawker dining in Chinatown, Little India, or Lau Pa Sat',
    ],
    image: unsplash('photo-1600664356348-10686526af4f'),
    category: 'singapore',
  },
  {
    slug: 'malaysia-kl',
    title: 'Malaysia Kuala Lumpur City',
    destinations: ['malaysia'],
    durations: durationRange([{ days: 4, amount: 38000, display: '₹38,000' }]),
    priceNote: reconfirmationNote,
    shortDescription:
      'Kuala Lumpur short breaks with towers, markets, and optional day trips to Batu Caves or Genting Highlands.',
    highlights: [
      'KLCC district and Petronas Twin Towers photo stops',
      'Merdeka Square and Bukit Bintang evenings',
      'Optional limestone temple visit at Batu Caves',
      'Cool-climate escape potential via Genting Highlands',
    ],
    image: unsplash('photo-1449824913935-59a10b8d2000'),
    category: 'malaysia',
  },
  {
    slug: 'bangkok-pattaya',
    title: 'Bangkok & Pattaya',
    destinations: ['thailand'],
    durations: durationRange([{ days: 5, amount: 38000, display: '₹38,000' }]),
    priceNote: reconfirmationNote,
    shortDescription:
      'Combine Bangkok temples and river life with Pattaya coastal resorts. Select 3 to 10 day plans from the duration menu.',
    highlights: [
      'Grand Palace and Chao Phraya river atmosphere',
      'Street-food evenings and market browsing',
      'Pattaya beach promenades and family coastal attractions',
      'Optional island or cultural show experiences subject to itinerary',
    ],
    image: unsplash('photo-1508009603885-50cf7c579365'),
    category: 'thailand',
  },
]

export const packageCategories: { slug: PackageCategory; label: string }[] = [
  { slug: 'singapore', label: 'Singapore' },
  { slug: 'malaysia', label: 'Malaysia' },
  { slug: 'singapore-malaysia', label: 'Singapore & Malaysia' },
  { slug: 'thailand', label: 'Thailand' },
  { slug: 'group', label: 'Group Tours' },
  { slug: 'custom', label: 'Custom Enquiries' },
]

export const packagesByCategory = (category: PackageCategory): TravelPackage[] =>
  packages.filter((pkg) => pkg.category === category)

export const packageBySlug = (slug: string): TravelPackage | undefined =>
  packages.find((pkg) => pkg.slug === slug)

export default packages
