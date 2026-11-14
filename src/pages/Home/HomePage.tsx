import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Languages,
  MapPin,
  MessageCircle,
  Sparkles,
  Users,
} from 'lucide-react'
import { SEO } from '@/components/SEO/SEO'
import { DestinationCard } from '@/components/DestinationCard/DestinationCard'
import { PackageCard } from '@/components/PackageCard/PackageCard'
import { GalleryMarquee } from '@/components/Gallery/GalleryMarquee'
import { HeroBannerSlider } from '@/components/Hero/HeroBannerSlider'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { SectionHeading } from '@/components/UI/SectionHeading'
import { Reveal } from '@/components/UI/Reveal'
import { destinations, type DestinationSlug } from '@/data/destinations'
import { packages } from '@/data/packages'
import { siteInfo } from '@/data/site'
import { buildGraph, organizationJsonLd, websiteJsonLd } from '@/utils/seo'
import { buildWhatsAppUrl, destinationWhatsAppMessage } from '@/utils/whatsapp'

const HERO_OG_IMAGE = destinations[0]?.heroImage
  ?? 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=2400&q=80'

const trustItems = [
  { icon: Building2, label: `Established ${siteInfo.established}` },
  { icon: MapPin, label: `${siteInfo.base}-based travel agency` },
  { icon: Languages, label: `Multilingual: ${siteInfo.languages.join(', ')}` },
  { icon: Sparkles, label: 'Personalized planning' },
  { icon: Users, label: 'Group & custom itineraries' },
]

export function HomePage() {
  const [heroDestination, setHeroDestination] = useState<DestinationSlug>(
    destinations[0]?.slug ?? 'singapore',
  )

  const heroWaUrl = buildWhatsAppUrl(
    destinationWhatsAppMessage(
      destinations.find((d) => d.slug === heroDestination)?.name ?? 'Southeast Asia',
    ),
  )

  return (
    <>
      <SEO
        title="Vihaara Yatra International Tours | Singapore, Malaysia & Thailand Holidays"
        description="Explore international holiday packages to Singapore, Malaysia, Thailand and other destinations with Vihaara Yatra International Tours. Plan your next journey with our travel team."
        path="/"
        image={HERO_OG_IMAGE}
        jsonLd={buildGraph([organizationJsonLd(), websiteJsonLd()])}
      />

      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-navy-deep">
        <HeroBannerSlider />
        <div
          className="absolute inset-0 z-10 bg-linear-to-t from-navy-deep via-[#1B3A2F]/70 to-[#FF8A00]/25"
          aria-hidden
        />

        <Container className="relative z-20 pb-24 pt-28 sm:pb-28 sm:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sunset">
              Established {siteInfo.established} in Singapore
            </p>
            <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Vihaara Yatra
              <span className="mt-2 block text-[0.55em] font-semibold tracking-[0.12em] text-sand uppercase sm:mt-3">
                International Tours
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Explore beyond boundaries. Extraordinary destinations, unforgettable experiences, and
              personalized international holidays in Telugu, English, and Tamil.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="primary" size="lg" to="/destinations">
                Explore Destinations
              </Button>
              <Button
                variant="secondary"
                size="lg"
                to="/contact"
                className="border-white text-white hover:bg-white hover:text-navy-deep"
              >
                Plan Your Journey
              </Button>
            </div>

            <div className="mt-10 flex max-w-md flex-col gap-3 rounded-2xl bg-white/12 p-4 ring-1 ring-white/25 backdrop-blur-sm sm:flex-row sm:items-end">
              <label className="flex-1 text-left">
                <span className="mb-1.5 block text-xs font-medium text-white/80">Quick destination</span>
                <select
                  value={heroDestination}
                  onChange={(e) => setHeroDestination(e.target.value as DestinationSlug)}
                  className="w-full rounded-xl border border-white/20 bg-navy-deep/80 px-3 py-2.5 text-sm text-white focus:border-sunset focus:outline-none focus:ring-2 focus:ring-sunset/30"
                >
                  {destinations.map((d) => (
                    <option key={d.slug} value={d.slug} className="text-navy">
                      {d.name}
                    </option>
                  ))}
                </select>
              </label>
              <Button
                variant="primary"
                size="md"
                href={heroWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <MessageCircle className="size-4" aria-hidden />
                Enquire
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="border-b border-navy/10 bg-sand py-10">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {trustItems.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-sm font-medium leading-snug text-navy">{label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Destinations"
              title="Popular destinations we plan"
              subtitle="Eight Southeast Asian highlights, each with practical guidance for families, groups, and first-time visitors."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((dest, index) => (
              <DestinationCard key={dest.slug} destination={dest} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand/60 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Packages"
              title="Featured tour programmes"
              subtitle="Pick a duration from 3 to 10 days. Advertised starting prices are indicative and must be reconfirmed before booking."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {packages.map((pkg, index) => (
              <PackageCard key={pkg.slug} pkg={pkg} index={index} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="ghost" to="/packages">
              View all packages
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why Vihaara Yatra"
              title="Thoughtful planning, honest communication"
              subtitle="We focus on clarity and care, not invented statistics, so you can book with realistic expectations."
              align="center"
              className="mx-auto"
            />
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteInfo.coreValues.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.05} as="article">
                <div className="h-full rounded-2xl border border-navy/10 bg-surface p-6 shadow-sm">
                  <h3 className="font-display text-lg font-semibold text-navy">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-deep py-16 text-white sm:py-24">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
          alt="Travellers enjoying a scenic international journey"
          className="absolute inset-0 size-full object-cover opacity-35"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-navy-deep/75" aria-hidden />
        <Container className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <SectionHeading
              eyebrow="Group tours"
              title="Singapore, Malaysia, Thailand & Sri Lanka"
              subtitle="End-to-end group travel for parties of six or more. Dubai is also mentioned among advertised group destinations, subject to current confirmation."
              className="[&_h2]:text-white [&_p]:text-white/80 [&_.text-teal]:text-sunset"
            />
          </div>
          <Button variant="primary" size="lg" to="/group-tours">
            Explore Group Tours
          </Button>
        </Container>
      </section>

      <section className="overflow-hidden py-16 sm:py-24">
        <Container>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Gallery"
              title="Moments from the road"
              subtitle="A continuous scroll of destination photography. Open the full gallery for lightbox viewing."
            />
            <Button variant="secondary" size="sm" to="/gallery" className="shrink-0">
              View All Photos
            </Button>
          </Reveal>
        </Container>
        <div className="mt-10">
          <GalleryMarquee />
        </div>
      </section>

      <section className="bg-linear-to-br from-teal/15 via-ivory to-sunset/15 py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
            Let&apos;s Plan Your Next Adventure
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Message us on WhatsApp for the fastest reply, or send a structured enquiry. We will follow up
            with tailored options.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-5" aria-hidden />
              Chat on WhatsApp
            </Button>
            <Button variant="secondary" size="lg" to="/contact">
              Request Quote
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
