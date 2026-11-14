import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SEO } from '@/components/SEO/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { EnquiryForm } from '@/components/EnquiryForm/EnquiryForm';
import { Button } from '@/components/UI/Button';
import { Container } from '@/components/UI/Container';
import { SectionHeading } from '@/components/UI/SectionHeading';
import { Reveal } from '@/components/UI/Reveal';
import { siteInfo } from '@/data/site';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { breadcrumbJsonLd, buildGraph, organizationJsonLd } from '@/utils/seo';

export function ContactPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <SEO
        title="Contact Us | Tampines, Singapore"
        description={`Reach VihaaraYatra at ${siteInfo.address.full}. Phone, WhatsApp, and enquiry form - consultations in Telugu, English, and Tamil.`}
        path="/contact"
        jsonLd={buildGraph([organizationJsonLd(), breadcrumbJsonLd(crumbs)])}
      />

      <Container as="section" className="py-12 sm:py-16">
        <Breadcrumbs items={crumbs} className="mb-8" />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              title="We're here to help"
              subtitle="Share your travel dates, group size, and must-see list - we typically respond fastest on WhatsApp."
            />

            <ul className="mt-8 space-y-5 text-sm text-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                <span>
                  <span className="font-medium text-navy">Office</span>
                  <br />
                  {siteInfo.address.full}
                </span>
              </li>
              {siteInfo.phones.map((phone) => (
                <li key={phone.number} className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                  <span>
                    <span className="font-medium text-navy">{phone.label}</span>
                    <br />
                    <a href={`tel:${phone.number.replace(/\s/g, '')}`} className="hover:text-teal">
                      {phone.display}
                    </a>
                  </span>
                </li>
              ))}
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                <span>
                  <span className="font-medium text-navy">WhatsApp (primary)</span>
                  <br />
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal"
                  >
                    {siteInfo.whatsapp.primaryDisplay}
                  </a>
                  {siteInfo.whatsapp.secondary ? (
                    <>
                      <br />
                      <span className="text-xs">
                        {siteInfo.whatsapp.secondary.label}: {siteInfo.whatsapp.secondary.display}
                      </span>
                    </>
                  ) : null}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                <span>
                  <span className="font-medium text-navy">Hours</span>
                  <br />
                  {siteInfo.hours.weekdays}
                  <br />
                  {siteInfo.hours.weekends}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                <span>
                  <span className="font-medium text-navy">Languages</span>
                  <br />
                  {siteInfo.languages.join(', ')}
                </span>
              </li>
            </ul>

            <Button
              className="mt-8"
              variant="primary"
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" aria-hidden />
              Message on WhatsApp
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <EnquiryForm />
          </Reveal>
        </div>
      </Container>
    </>
  );
}