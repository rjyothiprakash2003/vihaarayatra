import { SEO } from '@/components/SEO/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { DestinationCard } from '@/components/DestinationCard/DestinationCard';
import { Container } from '@/components/UI/Container';
import { SectionHeading } from '@/components/UI/SectionHeading';
import { Reveal } from '@/components/UI/Reveal';
import { destinations } from '@/data/destinations';
import { breadcrumbJsonLd, buildGraph } from '@/utils/seo';

export function DestinationsPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
  ];

  return (
    <>
      <SEO
        title="Destinations | Southeast Asia & Beyond"
        description="Explore Singapore, Malaysia, Thailand, Indonesia, Sri Lanka, Hong Kong, Vietnam, and Cambodia with destination guides from VihaaraYatra."
        path="/destinations"
        jsonLd={buildGraph([breadcrumbJsonLd(crumbs)])}
      />

      <Container as="section" className="py-12 sm:py-16">
        <Breadcrumbs items={crumbs} className="mb-8" />
        <Reveal>
          <SectionHeading
            eyebrow="Where we plan"
            title="Our destinations"
            subtitle="In-depth inspiration, practical FAQs, and package pairings for each country we cover."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map((dest, index) => (
            <DestinationCard key={dest.slug} destination={dest} index={index} />
          ))}
        </div>
      </Container>
    </>
  );
}