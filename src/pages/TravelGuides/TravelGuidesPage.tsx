import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Calendar } from 'lucide-react'
import { SEO } from '@/components/SEO/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { Container } from '@/components/UI/Container'
import { SectionHeading } from '@/components/UI/SectionHeading'
import { Reveal } from '@/components/UI/Reveal'
import { Button } from '@/components/UI/Button'
import { travelGuides } from '@/data/travelGuides'
import { destinationBySlug } from '@/data/destinations'
import { breadcrumbJsonLd, buildGraph } from '@/utils/seo'

export function TravelGuidesPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Travel Guides', path: '/travel-guides' },
  ]

  const sorted = [...travelGuides].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  )
  const [featured, ...rest] = sorted

  return (
    <>
      <SEO
        title="Travel Guides & Practical Tips"
        description="Clear destination planning guides from Vihaara Yatra: Singapore first-timer advice, KL highlights, Thailand planning, group packing, and language tips."
        path="/travel-guides"
        image={featured?.coverImage}
        jsonLd={buildGraph([breadcrumbJsonLd(crumbs)])}
      />

      <section className="relative overflow-hidden bg-navy-deep">
        <img
          src={featured?.coverImage}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy-deep via-navy-deep/90 to-coral/30" />
        <Container className="relative z-10 py-14 sm:py-20">
          <Breadcrumbs
            items={crumbs}
            className="mb-8 [&_a]:text-white/75 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/45"
          />
          <div className="flex items-center gap-2 text-sunset">
            <BookOpen className="size-5" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-[0.22em]">Travel Guides</span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">
            Clear advice before you fly
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Practical planning notes for Singapore, Malaysia, Thailand, and group travel. Use these guides
            alongside a personalised quote from our team.
          </p>
        </Container>
      </section>

      <Container as="section" className="py-12 sm:py-16">
        {featured ? (
          <Reveal>
            <Link
              to={`/travel-guides/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl bg-sand shadow-lg ring-1 ring-navy/10 lg:grid-cols-2"
            >
              <img
                src={featured.coverImage}
                alt=""
                className="aspect-[16/11] h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-coral">Featured guide</p>
                <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl group-hover:text-teal">
                  {featured.title}
                </h2>
                <p className="mt-3 text-muted">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-sunset">
                  Read guide <ArrowRight className="size-4" aria-hidden />
                </span>
              </div>
            </Link>
          </Reveal>
        ) : null}

        <Reveal className="mt-14">
          <SectionHeading
            title="More guides"
            subtitle="Short, useful articles - not a replacement for confirmed itineraries."
          />
        </Reveal>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((guide, index) => (
            <Reveal key={guide.slug} delay={index * 0.05} as="article">
              <Link
                to={`/travel-guides/${guide.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition hover:shadow-md"
              >
                <img
                  src={guide.coverImage}
                  alt=""
                  className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex items-center gap-2 text-xs text-muted">
                    <Calendar className="size-3.5" aria-hidden />
                    {new Date(guide.publishedDate).toLocaleDateString('en-SG', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-semibold text-navy group-hover:text-teal">
                    {guide.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{guide.excerpt}</p>
                  <p className="mt-4 text-xs font-medium text-teal">
                    {guide.destinations
                      .slice(0, 3)
                      .map((slug) => destinationBySlug[slug].name)
                      .join(', ')}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 rounded-3xl bg-linear-to-br from-sunset/15 via-sand to-teal/15 p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-semibold text-navy">Ready for a tailored plan?</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted">
            Guides help you prepare. Our consultants confirm hotels, transfers, and pricing for your dates.
          </p>
          <Button variant="primary" size="lg" to="/contact" className="mt-6">
            Request a travel quote
          </Button>
        </div>
      </Container>
    </>
  )
}
