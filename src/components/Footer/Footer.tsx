import { Link } from 'react-router-dom';
import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { footerQuickLinks } from '@/data/navigation';
import { siteInfo } from '@/data/site';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { Container } from '@/components/UI/Container';

const year = new Date().getFullYear();

export function Footer() {
  const waHref = buildWhatsAppUrl();

  return (
    <footer className="border-t border-navy/10 bg-navy text-ivory">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block rounded-lg focus-visible:ring-2 focus-visible:ring-sunset">
              <img
                src="/logos/logo-horizontal-dark.svg"
                alt={siteInfo.name}
                className="h-10 w-auto"
                width={200}
                height={44}
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/85">{siteInfo.aboutSummary}</p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-teal">
              Quick links
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {footerQuickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-ivory/85 transition hover:text-white hover:underline underline-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="text-ivory/85 transition hover:text-white hover:underline underline-offset-2"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-teal">
              Destinations
            </h2>
            <ul className="mt-4 columns-2 gap-4 text-sm">
              {siteInfo.destinations.map((dest) => (
                <li key={dest.slug} className="mb-2 break-inside-avoid">
                  <Link
                    to={`/destinations/${dest.slug}`}
                    className="text-ivory/85 transition hover:text-white hover:underline underline-offset-2"
                  >
                    {dest.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-teal">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-ivory/85">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
                <address className="not-italic">{siteInfo.address.full}</address>
              </li>
              {siteInfo.phones.map((phone) => (
                <li key={phone.number} className="flex gap-2">
                  <Phone className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
                  <span>
                    <span className="text-ivory/70">{phone.label}: </span>
                    <a href={`tel:${phone.number}`} className="hover:text-white hover:underline">
                      {phone.display}
                    </a>
                  </span>
                </li>
              ))}
              <li className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
                <span>
                  {siteInfo.hours.weekdays}
                  <br />
                  {siteInfo.hours.weekends}
                </span>
              </li>
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-teal transition hover:text-white"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  WhatsApp {siteInfo.whatsapp.primaryDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-ivory/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteInfo.established}-{year} {siteInfo.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="hover:text-white hover:underline underline-offset-2">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white hover:underline underline-offset-2">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}