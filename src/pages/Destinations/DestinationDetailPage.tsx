import { useMemo } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { SEO } from '@/components/SEO/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { PackageCard } from '@/components/PackageCard/PackageCard'
import { EnquiryForm } from '@/components/EnquiryForm/EnquiryForm'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { SectionHeading } from '@/components/UI/SectionHeading'
import { Reveal } from '@/components/UI/Reveal'
import { destinationBySlug, type DestinationSlug } from '@/data/destinations'
import { packages } from '@/data/packages'
import { galleryImages, type GalleryCategory } from '@/data/gallery'
import { breadcrumbJsonLd, buildGraph, faqJsonLd } from '@/utils/seo'
import { buildWhatsAppUrl, destinationWhatsAppMessage } from '@/utils/whatsapp'

function isDestinationSlug(slug: string | undefined): slug is DestinationSlug {
  return slug !== undefined && slug in destinationBySlug
}

export function DestinationDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const valid = isDestinationSlug(slug)
  const destination = valid ? destinationBySlug[slug] : null

  const relatedPackages = useMemo(() => {
    if (!valid) return []
    return packages.filter((pkg) => pkg.destinations.includes(slug))
  }, [valid, slug])

  const relatedImages = useMemo(() => {
    if (!destination || !valid) return []
    const category = slug as GalleryCategory
    const fromGallery = galleryImages.filter((img) => img.category === category)
    const unique = fromGallery.filter(
      (img, index, arr) => arr.findIndex((x) => x.src === img.src) === index,
    )
    if (unique.length > 0) return unique
    return [
      {
        id: `${slug}-hero`,
        src: destination.heroImage,
        thumb: destination.cardImage,
        alt: destination.name,
        caption: destination.name,
      },
    ]
  }, [destination, slug, valid])

  if (!valid || !destination) {
    return <Navigate to="/destinations" replace />
  }

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: destination.name, path: `/destinations/${slug}` },
  ]

  const waUrl = buildWhatsAppUrl(destinationWhatsAppMessage(destination.name))

  return (
    <>
      <SEO
        title={destination.seo.title}
        description={destination.seo.description}
        path={`/destinations/${slug}`}
        image={destination.heroImage}
        jsonLd={buildGraph([breadcrumbJsonLd(crumbs), faqJsonLd(destination.faqs)])}
      />

      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-navy-deep sm:min-h-[60vh]">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="absolute inset-0 size-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-navy/55 to-sunset/20" aria-hidden />
        <Container className="relative z-10 pb-12 pt-28 sm:pt-32">
          <Breadcrumbs
            items={crumbs}
            className="mb-6 [&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/50"
          />
          <p className="text-sm font-semibold uppercase tracking-widest text-sunset">{destination.tagline}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-white sm:text-5xl">
            {destination.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{destination.shortDescription}</p>
          <Button
            variant="primary"
            className="mt-6"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="size-4" aria-hidden />
            Enquire about {destination.name}
          </Button>
        </Container>
      </section>

      <Container as="section" className="py-12 sm:py-16">
        <Reveal>
          <div className="max-w-3xl space-y-4 text-body leading-relaxed text-muted">
            <p>{destination.longIntroduction}</p>
            <p className="italic text-navy/80">{destination.travelInspiration}</p>
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <SectionHeading
            title="Highlights & attractions"
            subtitle={`Only ${destination.name}-related imagery and notes.`}
          />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {destination.attractions.map((attr, index) => {
              const image = relatedImages[index % relatedImages.length]
              return (
                <li
                  key={attr.name}
                  className="overflow-hidden rounded-2xl border border-navy/10 bg-surface shadow-sm"
                >
                  <img
                    src={image.thumb ?? image.src}
                    alt={`${attr.name} in ${destination.name}`}
                    className="aspect-[16/10] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-navy">{attr.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{attr.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <SectionHeading title={`${destination.name} photo moments`} />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedImages.map((img) => (
              <li key={img.id} className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-navy/10">
                <img
                  src={img.thumb ?? img.src}
                  alt={img.alt}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <SectionHeading title="Frequently asked questions" />
          <dl className="mt-8 space-y-6">
            {destination.faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-navy/10 bg-sand/50 p-5">
                <dt className="font-display font-semibold text-navy">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {relatedPackages.length > 0 ? (
          <Reveal className="mt-14">
            <SectionHeading
              title="Related packages"
              subtitle="Programmes that include this destination. Prices subject to reconfirmation."
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {relatedPackages.map((pkg, index) => (
                <PackageCard key={pkg.slug} pkg={pkg} index={index} />
              ))}
            </div>
          </Reveal>
        ) : null}

        <div className="mt-14" id="enquire">
          <Reveal>
            <SectionHeading
              title="Plan your trip"
              subtitle={`Tell us your dates and group size for ${destination.name}.`}
            />
            <EnquiryForm className="mt-8" />
          </Reveal>
        </div>
      </Container>
    </>
  )
}
