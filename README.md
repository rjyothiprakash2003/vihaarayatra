# VihaaraYatra International Tours

Premium static website for **VihaaraYatra International Tours** — a Singapore-based international travel agency established in 2016.

**Production domain:** https://vihaarayatra.com/

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- React Router
- React Helmet Async
- Lucide React

The site is fully static and deployable to Vercel, Netlify, or Cloudflare Pages.

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

Build output is written to `dist/`.

## Project structure

```
src/
  components/   # Header, Footer, Gallery, forms, SEO, UI
  data/         # Destinations, packages, gallery, guides, site info
  pages/        # Route-level pages
  layouts/      # Main layout shell
  routes/       # React Router configuration
  utils/        # WhatsApp + SEO helpers
public/
  favicon/ logos/ images/
  robots.txt sitemap.xml site.webmanifest
```

## Environment / forms

Enquiry forms default to a **WhatsApp handoff** when no form provider email is configured.

To enable [FormSubmit](https://formsubmit.co/):

1. Open `src/config/forms.ts`
2. Set `FORM_SUBMIT_EMAIL` to your business inbox
3. Confirm the FormSubmit activation email once

Never commit private API keys into the frontend.

## WhatsApp

Primary conversion number (India): `https://wa.me/919491946014`

Prefill helpers live in `src/utils/whatsapp.ts`.

## SEO

- Per-page metadata via `src/components/SEO/SEO.tsx`
- JSON-LD helpers in `src/utils/seo.ts`
- `public/robots.txt`
- `public/sitemap.xml`
- Canonical URLs use `https://vihaarayatra.com`

After DNS cutover, redirect apex/www variants to the preferred host at the CDN/hosting layer.

## Image attribution

See `IMAGE_ATTRIBUTION.md` and photographer fields in `src/data/gallery.ts`.

## Deployment

### Vercel

- Framework preset: Vite
- Build command: `npm run build`
- Output: `dist`
- SPA rewrites are in `vercel.json`

### Netlify

- Uses `netlify.toml` (`publish = "dist"`, SPA `200` rewrite)

### Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- SPA fallback: serve `index.html` for non-asset routes
- Optional: `public/_routes.json` for Pages Functions routing exclusions

## Content accuracy notes

- Advertised package prices are **legacy / indicative** and labelled for reconfirmation
- STB licence #2989 is presented with a verification note — confirm status before promotional claims
- No fabricated reviews, ratings, awards, or inclusions

## Accessibility & performance targets

Aim for WCAG 2.2 AA patterns and strong Lighthouse scores after real hosting + image CDN tuning. Measure with Lighthouse on production URLs; do not claim scores without testing.
