import { SEO } from '@/components/SEO/SEO';
import { Button } from '@/components/UI/Button';
import { Container } from '@/components/UI/Container';

export function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist or has moved."
        path="/404"
        noindex
      />

      <Container as="section" className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-6xl font-semibold text-teal">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-navy">Page not found</h1>
        <p className="mt-2 max-w-md text-muted">
          The link may be outdated or mistyped. Head home or explore our destinations to start planning.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="primary" to="/">
            Back to home
          </Button>
          <Button variant="secondary" to="/destinations">
            Browse destinations
          </Button>
        </div>
      </Container>
    </>
  );
}