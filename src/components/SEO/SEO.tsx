import { Helmet } from 'react-helmet-async';
import { siteInfo } from '@/data/site';
import { useTheme } from '@/context/ThemeContext';
import { absoluteUrl, SITE_URL } from '@/utils/seo';

const DEFAULT_OG = '/logos/logo-horizontal.svg';

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  path,
  image,
  type = 'website',
  jsonLd,
  noindex = false,
}: SEOProps) {
  const { theme } = useTheme();
  const canonical = absoluteUrl(path);
  const fullTitle = title.includes(siteInfo.name) ? title : `${title} | ${siteInfo.name}`;
  const ogImage = absoluteUrl(image ?? DEFAULT_OG);
  const robots = noindex ? 'noindex, nofollow' : 'index, follow';
  const themeColor = theme === 'dark' ? '#0F1612' : '#1B3A2F';

  const ldPayload = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content={themeColor} />
      <meta name="color-scheme" content="light dark" />

      <meta property="og:site_name" content={siteInfo.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_SG" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="alternate" hrefLang="en" href={canonical} />
      <meta property="og:image:alt" content={`${siteInfo.name} - ${title}`} />
      <meta name="application-name" content={siteInfo.name} />
      <link rel="home" href={SITE_URL} />

      {ldPayload?.map((node, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(node)}
        </script>
      ))}
    </Helmet>
  );
}