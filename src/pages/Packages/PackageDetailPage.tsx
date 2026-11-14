import { useMemo, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { Calendar, MessageCircle } from 'lucide-react'
import { SEO } from '@/components/SEO/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { EnquiryForm } from '@/components/EnquiryForm/EnquiryForm'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { SectionHeading } from '@/components/UI/SectionHeading'
import { Reveal } from '@/components/UI/Reveal'
import { packages } from '@/data/packages'
import { destinationBySlug } from '@/data/destinations'
import { buildWhatsAppUrl, packageWhatsAppMessage } from '@/utils/whatsapp'
import { breadcrumbJsonLd, buildGraph } from '@/utils/seo'

export function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const pkg = packages.find((p) => p.slug === slug)
  const defaultDuration = pkg?.durations.find((d) => d.legacyAdvertised) ?? pkg?.durations[0]
  const [days, setDays] = useState(defaultDuration?.days ?? 4)
  const selected = useMemo(() => {
    if (!pkg || !defaultDuration) return null
    return pkg.durations.find((d) => d.days === days) ?? defaultDuration
  }, [pkg, days, defaultDuration])

  if (!pkg || !selected) {
    return <Navigate to="/packages" replace />
  }

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/packages' },
    { name: pkg.title, path: `/packages/${pkg.slug}` },
  ]

  const waUrl = buildWhatsAppUrl(packageWhatsAppMessage(`${pkg.title} (${selected.label})`))

  return (
    <>
      <SEO
        title={`${pkg.title} | ${selected.label} Tour Package`}
        description={pkg.shortDescription}
        path={`/packages/${pkg.slug}`}
        image={pkg.image}
        jsonLd={buildGraph([breadcrumbJsonLd(crumbs)])}
      />

      <Container as="section" className="py-12 sm:py-16">
        <Breadcrumbs items={crumbs} className="mb-8" />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-navy/10">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="aspect-[16/10] w-full object-cover"
                loading="eager"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display text-3xl font-semibold text-navy sm:text-4xl">{pkg.title}</h1>

            <label className="mt-5 block">
              <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-navy">
                <Calendar className="size-4 text-teal" aria-hidden />
                Choose duration (3-10 days)
              </span>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full rounded-xl border border-navy/15 bg-sand px-3 py-3 text-sm text-body focus:border-sunset focus:outline-none focus:ring-2 focus:ring-sunset/30"
              >
                {pkg.durations.map((option) => (
                  <option key={option.days} value={option.days}>
                    {option.label}
                    {option.amount != null ? ` - from ${option.priceDisplay}` : ' - On request'}
                  </option>
                ))}
              </select>
            </label>

            <p className="mt-5">
              <span className="text-xs font-medium uppercase text-muted">
                {selected.amount != null ? 'From ' : 'Price '}
              </span>
              <span className="font-display text-3xl font-semibold text-coral">
                {selected.priceDisplay}
              </span>
            </p>
            <p className="mt-4 text-body leading-relaxed text-muted">{pkg.shortDescription}</p>

            <p className="mt-4 rounded-xl bg-sunset/10 px-4 py-3 text-sm text-navy ring-1 ring-sunset/25">
              {pkg.priceNote}
            </p>

            {pkg.airTicketsSeparate ? (
              <p className="mt-3 text-sm font-medium text-muted">
                International air tickets are typically quoted separately unless reconfirmed otherwise at
                booking.
              </p>
            ) : null}

            <h2 className="mt-10 font-display text-xl font-semibold text-navy">Programme highlights</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              {pkg.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Destinations covered</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {pkg.destinations.map((destSlug) => (
                  <li key={destSlug}>
                    <Link
                      to={`/destinations/${destSlug}`}
                      className="rounded-full bg-teal/10 px-3 py-1 text-sm font-medium text-teal hover:bg-teal/20"
                    >
                      {destinationBySlug[destSlug].name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="primary" href={waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" aria-hidden />
                Enquire on WhatsApp
              </Button>
              <Button variant="secondary" to={`/contact?package=${encodeURIComponent(pkg.slug)}`}>
                Request quote
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="mt-16" id="enquire">
          <Reveal>
            <SectionHeading
              title="Send an enquiry"
              subtitle="We will confirm current pricing, hotels, and inclusions in writing."
            />
            <EnquiryForm className="mt-8" />
          </Reveal>
        </div>
      </Container>
    </>
  )
}
