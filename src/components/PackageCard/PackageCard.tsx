import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MessageCircle } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { TravelPackage } from '@/data/packages'
import { buildWhatsAppUrl, packageWhatsAppMessage } from '@/utils/whatsapp'
import { Button } from '@/components/UI/Button'
import { cn } from '@/lib/cn'

interface PackageCardProps {
  pkg: TravelPackage
  className?: string
  index?: number
}

export function PackageCard({ pkg, className, index = 0 }: PackageCardProps) {
  const reduceMotion = useReducedMotion()
  const defaultDuration =
    pkg.durations.find((d) => d.legacyAdvertised) ?? pkg.durations[0]
  const [days, setDays] = useState(defaultDuration?.days ?? 4)

  const selected = useMemo(
    () => pkg.durations.find((d) => d.days === days) ?? defaultDuration,
    [pkg.durations, days, defaultDuration],
  )

  const waUrl = buildWhatsAppUrl(
    packageWhatsAppMessage(`${pkg.title} (${selected?.label ?? ''})`),
  )

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-40px' },
        transition: { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <motion.article {...motionProps} className={cn('group flex h-full flex-col', className)}>
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-shadow hover:shadow-lg">
        <Link
          to={`/packages/${pkg.slug}`}
          className="relative block aspect-[16/10] overflow-hidden bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sunset"
        >
          <img
            src={pkg.image}
            alt={pkg.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
            loading="lazy"
            decoding="async"
          />
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <Link
            to={`/packages/${pkg.slug}`}
            className="font-display text-xl font-semibold text-navy transition-colors hover:text-teal"
          >
            {pkg.title}
          </Link>

          <label className="mt-3 block text-sm text-muted">
            <span className="mb-1.5 flex items-center gap-1.5 font-medium text-navy">
              <Calendar className="size-4 text-teal" aria-hidden />
              Duration
            </span>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full rounded-xl border border-navy/15 bg-ivory px-3 py-2.5 text-sm text-body focus:border-sunset focus:outline-none focus:ring-2 focus:ring-sunset/30"
            >
              {pkg.durations.map((option) => (
                <option key={option.days} value={option.days}>
                  {option.label}
                  {option.amount != null ? ` - from ${option.priceDisplay}` : ' - On request'}
                </option>
              ))}
            </select>
          </label>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{pkg.shortDescription}</p>

          <div className="mt-4 flex flex-wrap items-baseline gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              {selected?.amount != null ? 'From' : 'Price'}
            </span>
            <span className="font-display text-2xl font-semibold text-coral">
              {selected?.priceDisplay ?? 'On request'}
            </span>
          </div>

          <p className="mt-2 inline-flex w-fit rounded-full bg-sand px-3 py-1 text-xs font-medium text-muted ring-1 ring-navy/10">
            Rates subject to reconfirmation
          </p>

          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            <Button
              variant="primary"
              size="sm"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none"
            >
              <MessageCircle className="size-4" aria-hidden />
              Enquire now
            </Button>
            <Button variant="ghost" size="sm" to={`/packages/${pkg.slug}`}>
              Details
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
