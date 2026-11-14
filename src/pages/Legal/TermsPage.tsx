import { SEO } from '@/components/SEO/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { Container } from '@/components/UI/Container';
import { SectionHeading } from '@/components/UI/SectionHeading';
import { Reveal } from '@/components/UI/Reveal';
import { siteInfo } from '@/data/site';
import { breadcrumbJsonLd, buildGraph } from '@/utils/seo';

export function TermsPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Terms & Conditions', path: '/terms-and-conditions' },
  ];
  const updated = '14 November 2025';

  return (
    <>
      <SEO
        title="Terms & Conditions"
        description={`Booking terms for ${siteInfo.name}: quotations, payments, cancellations, liability, and travel documentation for Singapore-based customers.`}
        path="/terms-and-conditions"
        jsonLd={buildGraph([breadcrumbJsonLd(crumbs)])}
      />

      <Container as="section" className="py-12 sm:py-16">
        <Breadcrumbs items={crumbs} className="mb-8" />
        <Reveal>
          <SectionHeading
            title="Terms & Conditions"
            subtitle={`Last updated: ${updated}. These terms govern use of this website and bookings made with ${siteInfo.name}.`}
          />
        </Reveal>

        <Reveal className="mt-10 max-w-3xl space-y-6 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="font-display text-lg font-semibold text-navy">1. Agency role</h2>
            <p className="mt-2">
              VihaaraYatra acts as an intermediary arranging transport, accommodation, and related travel services
              with third-party suppliers. Your contract for many services is directly with those suppliers, subject
              to their terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">2. Quotations &amp; pricing</h2>
            <p className="mt-2">
              Prices shown on this website are indicative unless confirmed in writing. Final quotes depend on
              availability, exchange rates, fuel surcharges, taxes, and seasonal factors. You must reconfirm rates
              and inclusions before making payment.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">3. Bookings &amp; payment</h2>
            <p className="mt-2">
              A booking is confirmed only when you accept our written itinerary and pay any required deposit. Balance
              due dates and accepted payment methods will be stated on your invoice. Failure to pay on time may result
              in cancellation of reservations and forfeiture of deposits permitted by suppliers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">4. Passport, visa &amp; health</h2>
            <p className="mt-2">
              You are responsible for valid passports, visas, vaccinations, and travel insurance suitable for your
              destination. We provide general guidance but do not guarantee entry clearance; immigration decisions rest
              with authorities.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">5. Changes &amp; cancellations</h2>
            <p className="mt-2">
              Amendment and cancellation charges depend on supplier rules and how close to departure changes are made.
              We will pass on applicable fees and our reasonable service charges as disclosed at booking. Force
              majeure events may limit refunds available from suppliers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">6. Group tours</h2>
            <p className="mt-2">
              Group departures generally require a minimum number of participants (currently {siteInfo.groupTours.minimumPax}
              {' '}
              travellers unless otherwise agreed). We may reschedule or combine groups when minimum numbers are not met,
              with your consent where required.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">7. Liability</h2>
            <p className="mt-2">
              To the fullest extent permitted by Singapore law, we are not liable for loss or damage arising from acts
              of suppliers, government actions, weather, civil unrest, personal illness, or events beyond our
              reasonable control. Our liability for proven negligence is limited to the fees paid to us for the affected
              booking, except where mandatory consumer protections apply.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">8. Website use</h2>
            <p className="mt-2">
              Content on this site is for general information. Unauthorised copying of text or images is prohibited.
              External links are provided for convenience; we do not control third-party sites.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">9. Governing law</h2>
            <p className="mt-2">
              These terms are governed by the laws of the Republic of Singapore. Disputes shall be subject to the
              exclusive jurisdiction of the Singapore courts, without prejudice to any mandatory rights you may have
              under consumer protection laws in your country of residence.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">10. Licence information</h2>
            <p className="mt-2">{siteInfo.stbLicenceNote}</p>
          </section>
        </Reveal>
      </Container>
    </>
  );
}