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
  amount: number | null
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
  'Indicative pricing from previously advertised programmes or enquiry ranges. Final cost, availability, inclusions, and dates must be reconfirmed with VihaaraYatra International Tours before booking.'

function durationRange(
  base: { days: number; amount: number; display: string }[],
  enquireDays: number[],
): DurationOption[] {
  const byDay = new Map(base.map((b) => [b.days, b]))
  const options: DurationOption[] = []
  for (let days = 3; days <= 10; days++) {
    const nights = days - 1
    const known = byDay.get(days)
    if (known) {
      options.push({
        days,
        nights,
        label: `${nights}N / ${days}D`,
        priceDisplay: known.display,
        amount: known.amount,
        legacyAdvertised: true,
      })
    } else if (enquireDays.includes(days) || true) {
      options.push({
        days,
        nights,
        label: `${nights}N / ${days}D`,
        priceDisplay: 'On request',
        amount: null,
        legacyAdvertised: false,
        note: 'Share your preferred dates for a custom quote.',
      })
    }
  }
  return options
}

export const packages: TravelPackage[] = [
  {
    slug: 'singapore-malaysia',
    title: 'Singapore & Malaysia',
    destinations: ['singapore', 'malaysia'],
    durations: durationRange(
      [
        { days: 6, amount: 85000, display: '₹85,000' },
        { days: 7, amount: 95000, display: '₹95,000' },
      ],
      [],
    ),
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
    durations: durationRange([{ days: 4, amount: 40000, display: '₹40,000 + air' }], []),
    priceNote:
      'Indicative land-style pricing; international air tickets are usually additional unless reconfirmed otherwise. ' +
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
    durations: durationRange([{ days: 4, amount: 38000, display: '₹38,000' }], []),
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
    durations: durationRange([{ days: 5, amount: 38000, display: '₹38,000' }], []),
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
