import { useMemo } from 'react'
import { SEO } from '@/components/SEO/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { GalleryMarquee } from '@/components/Gallery/GalleryMarquee'
import { GalleryGrid } from '@/components/Gallery/GalleryGrid'
import { Container } from '@/components/UI/Container'
import { SectionHeading } from '@/components/UI/SectionHeading'
import { Reveal } from '@/components/UI/Reveal'
import { galleryImages } from '@/data/gallery'
import { breadcrumbJsonLd, buildGraph } from '@/utils/seo'

export function GalleryPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
  ]

  const uniqueImages = useMemo(() => {
    const seen = new Set<string>()
    return galleryImages.filter((img) => {
      if (seen.has(img.src)) return false
      seen.add(img.src)
      return true
    })
  }, [])

  return (
    <>
      <SEO
        title="Photo Gallery | Southeast Asia Travel"
        description="Browse Vihaara Yatra travel photography from Singapore, Malaysia, Thailand, and neighbouring destinations. Auto-scrolling inspiration gallery with unique images."
        path="/gallery"
        jsonLd={buildGraph([breadcrumbJsonLd(crumbs)])}
      />

      <Container as="section" className="py-12 sm:py-16">
        <Breadcrumbs items={crumbs} className="mb-8" />
        <Reveal>
          <SectionHeading
            eyebrow="Visual inspiration"
            title="Gallery"
            subtitle="Unique destination photos with continuous auto-scroll. Pause by hovering. Browse the grid below for filters and lightbox."
          />
        </Reveal>
      </Container>

      <section className="pb-8">
        <GalleryMarquee />
      </section>

      <Container as="section" className="pb-16">
        <Reveal className="mt-4">
          <GalleryGrid images={uniqueImages} />
        </Reveal>
      </Container>
    </>
  )
}
