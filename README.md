# Vihaara Yatra International Tours

**Version:** `1.1`  
**Repository:** [github.com/rjyothiprakash2003/vihaarayatra](https://github.com/rjyothiprakash2003/vihaarayatra)  
**Production domain:** [https://vihaarayatra.com/](https://vihaarayatra.com/)

Premium static website for **Vihaara Yatra International Tours**, a Singapore-based international travel agency established in **2016**.

This project is a production-ready React SPA with destination pages, multi-duration tour packages, gallery, travel guides, WhatsApp enquiry flows, SEO metadata, and deployment configs for Vercel, Netlify, and Cloudflare Pages.

---

## Table of contents

1. [Features](#features)
2. [Pages & routes](#pages--routes)
3. [Tech stack](#tech-stack)
4. [Requirements](#requirements)
5. [Getting started](#getting-started)
6. [Scripts](#scripts)
7. [Project structure](#project-structure)
8. [Brand & design](#brand--design)
9. [Content & data](#content--data)
10. [WhatsApp & enquiry forms](#whatsapp--enquiry-forms)
11. [SEO](#seo)
12. [Accessibility & performance](#accessibility--performance)
13. [Images & attribution](#images--attribution)
14. [Deployment](#deployment)
15. [Versioning](#versioning)
16. [Content accuracy notes](#content-accuracy-notes)
17. [License / usage](#license--usage)

---

## Features

- Full-screen **takeoff splash screen** (session-based)
- Brand-first homepage hero highlighting **Vihaara Yatra International Tours**
- Sticky navigation, announcement bar, floating WhatsApp button
- **8 destination landing pages** with FAQs, related packages, and destination-only photography
- **Tour packages** with **3-10 day duration dropdowns** and indicative pricing
- Group tours page (Singapore, Malaysia, Thailand, Sri Lanka; Dubai subject to confirmation)
- Auto-scrolling **photo gallery** plus filterable lightbox grid
- Travel guides with featured layout
- Contact page with validated enquiry form
- Privacy Policy, Terms & Conditions, custom 404
- JSON-LD structured data, sitemap, robots.txt, Open Graph / Twitter cards
- SPA routing fallbacks for static hosts

---

## Pages & routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/destinations` | Destinations index |
| `/destinations/:slug` | Singapore, Malaysia, Thailand, Indonesia, Sri Lanka, Hong Kong, Vietnam, Cambodia |
| `/packages` | Tour packages (category + duration filters) |
| `/packages/:slug` | Package detail with duration dropdown |
| `/group-tours` | Group tours |
| `/gallery` | Photo gallery |
| `/travel-guides` | Travel guides index |
| `/travel-guides/:slug` | Guide article |
| `/contact` | Contact + enquiry |
| `/privacy-policy` | Privacy Policy |
| `/terms-and-conditions` | Terms & Conditions |
| `*` | Custom 404 |

---

## Tech stack

| Layer | Choice |
|---|---|
| UI | React 19 + TypeScript |
| Bundler | Vite 8 |
| Styling | Tailwind CSS v4 |
| Motion | Framer Motion |
| Routing | React Router 7 |
| SEO | React Helmet Async |
| Icons | Lucide React |
| Hosting | Static (`dist/`) on Vercel / Netlify / Cloudflare Pages |

---

## Requirements

- Node.js **20+** recommended
- npm 10+

---

## Getting started

```bash
git clone https://github.com/rjyothiprakash2003/vihaarayatra.git
cd vihaarayatra
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Typecheck + production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

---

## Project structure

```text
vihaarayatra/
├── public/
│   ├── favicon/           # Favicon + PWA icons
│   ├── logos/             # Brand SVG/PNG variants
│   ├── images/            # OG default image
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── site.webmanifest
│   ├── _redirects         # Netlify / Cloudflare SPA fallback
│   └── _headers
├── src/
│   ├── assets/logos/
│   ├── components/        # Header, Footer, Gallery, Forms, SEO, Splash, UI
│   ├── config/            # Form provider settings
│   ├── data/              # destinations, packages, gallery, guides, site, nav
│   ├── hooks/
│   ├── layouts/
│   ├── pages/             # Route-level pages
│   ├── routes/
│   ├── styles/ (via index.css)
│   └── utils/             # WhatsApp + SEO helpers
├── netlify.toml
├── vercel.json
├── IMAGE_ATTRIBUTION.md
├── TESTING_REPORT.md
├── CHANGELOG.md
└── README.md
```

---

## Brand & design

Warm travel theme (not blue-only):

| Token | Role | Hex |
|---|---|---|
| Forest (`navy` token) | Headings, nav solid state | `#1B3A2F` |
| Deep forest | Dark sections / overlays | `#0F241C` |
| Sunset | Primary CTAs | `#FF8A00` |
| Teal | Accents / links | `#0D9488` |
| Coral | Price highlights | `#E85D4C` |
| Sand / Ivory | Surfaces | `#F3E8D8` / `#FBF7F0` |

Typography: **Plus Jakarta Sans** (display) + **Inter** (body).

---

## Content & data

Editable content lives in TypeScript modules (no CMS required):

| File | Purpose |
|---|---|
| `src/data/site.ts` | Company profile, phones, hours, values |
| `src/data/destinations.ts` | Destination copy, attractions, FAQs, SEO |
| `src/data/packages.ts` | Packages + 3-10 day duration/price options |
| `src/data/gallery.ts` | Gallery images + attribution |
| `src/data/travelGuides.ts` | Guide articles |
| `src/data/navigation.ts` | Main nav links |

---

## WhatsApp & enquiry forms

- Primary WhatsApp: `https://wa.me/919491946014`
- Prefill helpers: `src/utils/whatsapp.ts`
- Enquiry form: `src/components/EnquiryForm/EnquiryForm.tsx`

To enable email delivery via FormSubmit:

1. Open `src/config/forms.ts`
2. Set `FORM_SUBMIT_EMAIL` to the business inbox
3. Complete FormSubmit activation once

If email is empty, the form opens a WhatsApp handoff with the enquiry details. Never commit private API keys.

---

## SEO

- Per-page titles/descriptions via `src/components/SEO/SEO.tsx`
- Canonical base: `https://vihaarayatra.com`
- JSON-LD helpers in `src/utils/seo.ts` (Organization / TravelAgency, WebSite, Breadcrumbs, FAQ)
- `public/robots.txt` + `public/sitemap.xml`
- Favicon / theme-color / web app manifest

After DNS cutover, redirect apex/www variants to the preferred host at the CDN layer.

---

## Accessibility & performance

- Semantic landmarks, skip link, focus styles, labelled forms
- Lightbox keyboard support (Escape / previous / next)
- `prefers-reduced-motion` respected for splash, reveal, and marquee
- Lazy loading for below-the-fold images; priority loading for heroes
- Route-level code splitting for non-home pages

Measure Lighthouse on the real production host before claiming scores.

---

## Images & attribution

Gallery and destination photography are sourced from Unsplash under the Unsplash License.  
See **`IMAGE_ATTRIBUTION.md`** and photographer fields in `src/data/gallery.ts`.

Brand logos in `public/logos/` are project assets for Vihaara Yatra International Tours.

---

## Deployment

### Vercel

- Framework: Vite
- Build: `npm run build`
- Output: `dist`
- SPA rewrites: `vercel.json`

### Netlify

- Config: `netlify.toml`
- Publish: `dist`
- SPA rewrite status `200` for `/*`

### Cloudflare Pages

- Build: `npm run build`
- Output: `dist`
- SPA fallback to `index.html` for non-asset routes
- Optional: `public/_routes.json`

---

## Versioning

Current release: **1.1** (`package.json` → `1.1.0`)

See **`CHANGELOG.md`** for release notes.

Git tag: `v1.1`

---

## Content accuracy notes

- Package prices are **legacy / indicative** and must be reconfirmed
- STB licence #2989 is shown with a verification caveat
- No fabricated reviews, ratings, awards, or inclusions
- Dubai group tours are listed only as advertised and subject to confirmation

---

## License / usage

Source is published for the Vihaara Yatra International Tours website project.  
Business trademarks, logo artwork, and customer data remain the property of their respective owners.  
Third-party photos remain under their original Unsplash licenses.
