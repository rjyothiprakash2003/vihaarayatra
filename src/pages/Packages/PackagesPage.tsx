import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { PackageCard } from '@/components/PackageCard/PackageCard'
import { Container } from '@/components/UI/Container'
import { SectionHeading } from '@/components/UI/SectionHeading'
import { Reveal } from '@/components/UI/Reveal'
import {
  packages,
  packageCategories,
  packagesByCategory,
  type PackageCategory,
} from '@/data/packages'
import { cn } from '@/lib/cn'
import { breadcrumbJsonLd, buildGraph } from '@/utils/seo'

const DAY_FILTERS = [3, 4, 5, 6, 7, 8, 9, 10] as const

export function PackagesPage() {
  const [category, setCategory] = useState<PackageCategory | 'all'>('all')
  const [days, setDays] = useState<number | 'all'>('all')

  const filtered = useMemo(() => {
    let list =
      category === 'all'
        ? packages
        : category === 'group' || category === 'custom'
          ? packages.filter((p) => p.category === category)
          : packagesByCategory(category)

    if (days !== 'all') {
      list = list.filter((pkg) => pkg.durations.some((d) => d.days === days))
    }
    return list
  }, [category, days])

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/packages' },
  ]

  return (
    <>
      <SEO
        title="Tour Packages | 3 to 10 Day Holidays"
        description="Browse Vihaara Yatra tour programmes with duration options from 3 to 10 days. Confirm final rates, inclusions, and dates before booking."
        path="/packages"
        jsonLd={buildGraph([breadcrumbJsonLd(crumbs)])}
      />

      <Container as="section" className="py-12 sm:py-16">
        <Breadcrumbs items={crumbs} className="mb-8" />
        <Reveal>
          <SectionHeading
            eyebrow="Programmes"
            title="Tour packages"
            subtitle="Filter by region and trip length (3-10 days). Use each card dropdown to compare durations and indicative prices."
          />
        </Reveal>

        <div className="mt-8 space-y-4">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Package categories">
            <button
              type="button"
              role="tab"
              aria-selected={category === 'all'}
              onClick={() => setCategory('all')}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                category === 'all'
                  ? 'bg-navy text-white'
                  : 'bg-white text-muted ring-1 ring-navy/10 hover:text-navy',
              )}
            >
              All packages
            </button>
            {packageCategories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                role="tab"
                aria-selected={category === cat.slug}
                onClick={() => setCategory(cat.slug)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  category === cat.slug
                    ? 'bg-navy text-white'
                    : 'bg-white text-muted ring-1 ring-navy/10 hover:text-navy',
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2" aria-label="Duration filter">
            <span className="text-sm font-medium text-navy">Duration:</span>
            <button
              type="button"
              onClick={() => setDays('all')}
              className={cn(
                'rounded-full px-3 py-1 text-sm font-medium',
                days === 'all' ? 'bg-sunset text-white' : 'bg-sand text-muted ring-1 ring-navy/10',
              )}
            >
              All days
            </button>
            {DAY_FILTERS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setDays(day)}
                className={cn(
                  'rounded-full px-3 py-1 text-sm font-medium',
                  days === day ? 'bg-sunset text-white' : 'bg-sand text-muted ring-1 ring-navy/10',
                )}
              >
                {day}D
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((pkg, index) => (
              <PackageCard key={pkg.slug} pkg={pkg} index={index} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-muted">
            No published packages match these filters. Please{' '}
            <Link to="/contact" className="font-medium text-teal underline-offset-2 hover:underline">
              contact us
            </Link>{' '}
            for a custom quote.
          </p>
        )}
      </Container>
    </>
  )
}
