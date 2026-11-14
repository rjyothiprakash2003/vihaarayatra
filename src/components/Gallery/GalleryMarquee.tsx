import { useMemo } from 'react'
import { galleryImages } from '@/data/gallery'

export function GalleryMarquee() {
  const unique = useMemo(() => {
    const seen = new Set<string>()
    return galleryImages.filter((img) => {
      if (seen.has(img.src)) return false
      seen.add(img.src)
      return true
    })
  }, [])

  const loop = [...unique, ...unique]

  return (
    <div className="relative w-full overflow-hidden" aria-label="Auto-scrolling photo gallery">
      <div className="gallery-marquee flex w-max gap-4 px-4">
        {loop.map((img, index) => (
          <figure
            key={`${img.id}-${index}`}
            className="w-[280px] shrink-0 overflow-hidden rounded-2xl shadow-md ring-1 ring-navy/10 sm:w-[340px]"
          >
            <img
              src={img.thumb}
              alt={img.alt}
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover"
              loading={index < 6 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <figcaption className="truncate bg-surface px-3 py-2 text-xs text-muted">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
