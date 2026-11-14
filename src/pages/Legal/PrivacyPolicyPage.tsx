import { SEO } from '@/components/SEO/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { Container } from '@/components/UI/Container';
import { SectionHeading } from '@/components/UI/SectionHeading';
import { Reveal } from '@/components/UI/Reveal';
import { siteInfo } from '@/data/site';
import { breadcrumbJsonLd, buildGraph } from '@/utils/seo';

export function PrivacyPolicyPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];
  const updated = '14 November 2025';

  return (
    <>
      <SEO
        title="Privacy Policy"
        description={`How ${siteInfo.name} collects, uses, and protects personal data submitted through our website and enquiry channels.`}
        path="/privacy-policy"
        jsonLd={buildGraph([breadcrumbJsonLd(crumbs)])}
      />

      <Container as="section" className="py-12 sm:py-16">
        <Breadcrumbs items={crumbs} className="mb-8" />
        <Reveal>
          <SectionHeading
            title="Privacy Policy"
            subtitle={`Last updated: ${updated}. This policy applies to visitors and customers of ${siteInfo.name}, based in Singapore.`}
          />
        </Reveal>

        <Reveal className="prose-legal mt-10 max-w-3xl space-y-6 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="font-display text-lg font-semibold text-navy">1. Who we are</h2>
            <p className="mt-2">
              {siteInfo.name} ({siteInfo.address.full}) arranges international travel services. For privacy-related
              questions, contact us via the details on our{' '}
              <a href="/contact" className="text-teal underline-offset-2 hover:underline">
                contact page
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">2. Information we collect</h2>
            <p className="mt-2">
              When you submit an enquiry or book travel, we may collect your name, email address, phone number,
              passport details (where required for bookings), travel preferences, payment-related references, and
              correspondence. Technical data such as browser type and approximate location may be collected through
              standard website logs.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">3. How we use your information</h2>
            <p className="mt-2">
              We use personal data to respond to enquiries, prepare quotations, make reservations with airlines and
              hotels, fulfil contracts, comply with applicable law, and improve our services. We do not sell your
              personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">4. Sharing with service providers</h2>
            <p className="mt-2">
              To deliver your trip, we may share necessary details with airlines, accommodation providers, ground
              handlers, insurers, and payment processors. These parties process data only for the purposes we
              specify and subject to their own privacy practices.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">5. WhatsApp and messaging</h2>
            <p className="mt-2">
              If you contact us via WhatsApp or similar messaging apps, your messages are handled according to the
              platform&apos;s terms as well as this policy. Avoid sending sensitive payment card numbers through
              chat; we will direct you to secure payment methods when booking.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">6. Retention and security</h2>
            <p className="mt-2">
              We retain records for as long as needed for bookings, accounting, and dispute resolution, or as required
              by Singapore law. We apply reasonable administrative and technical safeguards, though no online
              transmission is completely risk-free.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">7. Your rights</h2>
            <p className="mt-2">
              Depending on applicable law, you may request access to, correction of, or deletion of your personal data,
              or withdraw consent for marketing. Contact us to exercise these rights; we may need to verify your
              identity.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">8. Changes</h2>
            <p className="mt-2">
              We may update this policy from time to time. Material changes will be reflected on this page with an
              updated date.
            </p>
          </section>
        </Reveal>
      </Container>
    </>
  );
}