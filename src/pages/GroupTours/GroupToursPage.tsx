import { MessageCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { Button } from '@/components/UI/Button';
import { Container } from '@/components/UI/Container';
import { SectionHeading } from '@/components/UI/SectionHeading';
import { Reveal } from '@/components/UI/Reveal';
import { siteInfo } from '@/data/site';
import { destinationBySlug } from '@/data/destinations';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { breadcrumbJsonLd, buildGraph } from '@/utils/seo';

const groupDestinations = [
  { slug: 'singapore' as const, note: 'City highlights, family parks, and combined regional hops.' },
  { slug: 'malaysia' as const, note: 'Kuala Lumpur towers, highland escapes, and island add-ons.' },
  { slug: 'thailand' as const, note: 'Bangkok culture paired with Pattaya or southern beaches.' },
  { slug: 'sri-lanka' as const, note: 'Scenic hill-country routes and southern fort towns.' },
];

export function GroupToursPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Group Tours', path: '/group-tours' },
  ];

  const minPax = siteInfo.groupTours.minimumPax;

  return (
    <>
      <SEO
        title="Group Tours | Six or More Travellers"
        description={`Organised group departures for ${minPax}+ travellers across Singapore, Malaysia, Thailand, and Sri Lanka. Dubai programmes subject to confirmation.`}
        path="/group-tours"
        jsonLd={buildGraph([breadcrumbJsonLd(crumbs)])}
      />

      <Container as="section" className="py-12 sm:py-16">
        <Breadcrumbs items={crumbs} className="mb-8" />
        <Reveal>
          <SectionHeading
            eyebrow="Together on the road"
            title="Group tour experiences"
            subtitle={siteInfo.groupTours.note}
          />
        </Reveal>

        <Reveal className="mt-8 flex items-start gap-4 rounded-2xl border border-teal/30 bg-teal/5 p-6">
          <Users className="mt-0.5 size-8 shrink-0 text-teal" aria-hidden />
          <div>
            <p className="font-display text-lg font-semibold text-navy">Minimum {minPax} travellers</p>
            <p className="mt-1 text-sm text-muted">
              Group departures are designed for parties of at least {minPax} guests. Smaller families can still{' '}
              <Link to="/contact" className="font-medium text-teal underline-offset-2 hover:underline">
                enquire
              </Link>{' '}
              for private arrangements.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {groupDestinations.map((item) => {
            const dest = destinationBySlug[item.slug];
            return (
              <Reveal key={item.slug} as="article">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
                  <img
                    src={dest.cardImage}
                    alt={dest.name}
                    className="aspect-[16/9] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-display text-xl font-semibold text-navy">{dest.name}</h2>
                    <p className="mt-2 flex-1 text-sm text-muted">{item.note}</p>
                    <Button variant="ghost" size="sm" to={`/destinations/${item.slug}`} className="mt-4 self-start">
                      Destination guide
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-10 rounded-2xl border border-navy/10 bg-ivory p-6">
          <h2 className="font-display text-lg font-semibold text-navy">Dubai &amp; other routes</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Dubai and additional long-haul combinations may be available subject to confirmation with our
            team. Share your preferred dates, group size, and budget so we can check partner availability and
            current visa requirements before quoting.
          </p>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap gap-3">
          <Button
            variant="primary"
            size="lg"
            href={buildWhatsAppUrl(
              `Hello VihaaraYatra, we are a group of ${minPax} or more travellers interested in a group tour. Please share available options.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="size-5" aria-hidden />
            Discuss group departure
          </Button>
          <Button variant="secondary" size="lg" to="/packages">
            View sample packages
          </Button>
        </Reveal>
      </Container>
    </>
  );
}