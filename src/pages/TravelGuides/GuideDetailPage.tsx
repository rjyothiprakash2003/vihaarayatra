import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import type { ReactNode } from 'react';
import { SEO } from '@/components/SEO/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { Button } from '@/components/UI/Button';
import { Container } from '@/components/UI/Container';
import { Reveal } from '@/components/UI/Reveal';
import { travelGuideBySlug } from '@/data/travelGuides';
import { destinationBySlug } from '@/data/destinations';
import { breadcrumbJsonLd, buildGraph } from '@/utils/seo';

function formatParagraph(text: string): ReactNode {
  const segments = text.split(/\*\*(.*?)\*\*/g);
  return segments.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-navy">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function GuideDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? travelGuideBySlug[slug] : undefined;

  if (!guide) {
    return <Navigate to="/travel-guides" replace />;
  }

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Travel Guides', path: '/travel-guides' },
    { name: guide.title, path: `/travel-guides/${guide.slug}` },
  ];

  return (
    <>
      <SEO
        title={guide.seo.title}
        description={guide.seo.description}
        path={`/travel-guides/${guide.slug}`}
        image={guide.coverImage}
        type="article"
        jsonLd={buildGraph([breadcrumbJsonLd(crumbs)])}
      />

      <article>
        <div className="relative max-h-[420px] overflow-hidden bg-navy-deep">
          <img
            src={guide.coverImage}
            alt=""
            className="h-[420px] w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy-deep/90 to-transparent" aria-hidden />
        </div>

        <Container className="py-12 sm:py-16">
          <Breadcrumbs items={crumbs} className="mb-8" />
          <Reveal>
            <p className="flex items-center gap-2 text-sm text-muted">
              <Calendar className="size-4 text-teal" aria-hidden />
              {new Date(guide.publishedDate).toLocaleDateString('en-SG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-navy sm:text-4xl">{guide.title}</h1>
            <p className="mt-4 max-w-3xl text-lg text-muted">{guide.excerpt}</p>
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap gap-2">
            {guide.destinations.map((destSlug) => (
              <Link
                key={destSlug}
                to={`/destinations/${destSlug}`}
                className="rounded-full bg-teal/10 px-3 py-1 text-sm font-medium text-teal hover:bg-teal/20"
              >
                {destinationBySlug[destSlug].name}
              </Link>
            ))}
          </Reveal>

          <Reveal className="mt-10 max-w-3xl space-y-5 text-body leading-relaxed text-muted">
            {guide.content.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{formatParagraph(paragraph)}</p>
            ))}
          </Reveal>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button variant="primary" to="/contact">
              Plan with our team
            </Button>
            <Button variant="ghost" to="/travel-guides">
              More guides
            </Button>
          </div>
        </Container>
      </article>
    </>
  );
}