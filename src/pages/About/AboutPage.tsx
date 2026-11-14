import { SEO } from '@/components/SEO/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { SectionHeading } from '@/components/UI/SectionHeading'
import { Reveal } from '@/components/UI/Reveal'
import { siteInfo } from '@/data/site'
import { destinations } from '@/data/destinations'
import { breadcrumbJsonLd, buildGraph, organizationJsonLd } from '@/utils/seo'

const ABOUT_HERO =
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80'
const ABOUT_TEAM =
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'
const ABOUT_MAP =
  'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80'

export function AboutPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]

  return (
    <>
      <SEO
        title="About Us | Singapore-Based International Tours"
        description={siteInfo.aboutSummary}
        path="/about"
        image={ABOUT_HERO}
        jsonLd={buildGraph([organizationJsonLd(), breadcrumbJsonLd(crumbs)])}
      />

      <section className="relative overflow-hidden bg-navy-deep">
        <img
          src={ABOUT_HERO}
          alt="Travel planning and international journeys"
          className="absolute inset-0 size-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy-deep via-navy-deep/85 to-navy/40" />
        <Container className="relative z-10 py-16 sm:py-24">
          <Breadcrumbs
            items={crumbs}
            className="mb-8 [&_a]:text-white/75 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/50"
          />
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sunset">Our story</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">
            Vihaara Yatra International Tours
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">{siteInfo.aboutSummary}</p>
        </Container>
      </section>

      <Container as="section" className="py-12 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <img
              src={ABOUT_TEAM}
              alt="Travellers on an international road trip"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg ring-1 ring-navy/10"
              loading="lazy"
            />
          </Reveal>
          <Reveal className="space-y-4 text-body leading-relaxed text-muted">
            <h2 className="font-display text-2xl font-semibold text-navy">A Singapore base since {siteInfo.established}</h2>
            <p>
              Since {siteInfo.established}, Vihaara Yatra has operated from {siteInfo.base}, helping
              travellers from India, Singapore, and the wider region discover well-paced itineraries across
              Southeast Asia. We combine practical logistics (visas, transfers, hotel choices) with the
              human follow-up that multilingual families expect.
            </p>
            <p>{siteInfo.aboutContactPerson}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="primary" to="/contact">
                Get in touch
              </Button>
              <Button variant="secondary" to="/destinations">
                View destinations
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <SectionHeading
            title="What we stand for"
            subtitle="These principles guide how we plan and communicate."
          />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteInfo.coreValues.map((value) => (
              <li
                key={value.title}
                className="rounded-2xl border border-navy/10 bg-surface p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold text-navy">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="overflow-hidden rounded-3xl">
            <img
              src={ABOUT_MAP}
              alt="Southeast Asian limestone bay landscape"
              className="aspect-[16/10] w-full object-cover"
              loading="lazy"
            />
          </Reveal>
          <Reveal className="flex flex-col justify-center rounded-3xl bg-sand p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-navy">Languages we support</h2>
            <p className="mt-3 text-muted">
              Consultations are available in{' '}
              <strong className="font-medium text-navy">{siteInfo.languages.join(', ')}</strong>, so you
              can clarify room layouts, dietary needs, and group manifests in the language you prefer.
            </p>
            <h3 className="mt-8 font-display text-lg font-semibold text-navy">Where we take you</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {destinations.map((d) => (
                <li
                  key={d.slug}
                  className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-navy ring-1 ring-navy/10"
                >
                  {d.name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-12 rounded-2xl border border-sunset/30 bg-sunset/10 p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold text-navy">Licence &amp; registration</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{siteInfo.stbLicenceNote}</p>
        </Reveal>
      </Container>
    </>
  )
}
