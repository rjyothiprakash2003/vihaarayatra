import { siteInfo } from '@/data/site'

export const SITE_URL = siteInfo.website.replace(/\/$/, '')

export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized === '/' ? '' : normalized}`
}

export function organizationJsonLd() {
  return {
    '@type': 'TravelAgency',
    '@id': `${SITE_URL}/#organization`,
    name: siteInfo.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logos/logo-horizontal.svg`,
    image: `${SITE_URL}/logos/logo-horizontal.svg`,
    telephone: siteInfo.phones.map((p) => p.number),
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteInfo.address.line,
      addressLocality: siteInfo.address.city,
      postalCode: siteInfo.address.postalCode,
      addressCountry: 'SG',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '21:00',
      },
    ],
    description: siteInfo.aboutSummary,
    areaServed: siteInfo.destinations.map((d) => d.name),
    availableLanguage: siteInfo.languages,
  }
}

export function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: siteInfo.name,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildGraph(nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}
