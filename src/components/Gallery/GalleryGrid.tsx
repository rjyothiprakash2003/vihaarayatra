import { useMemo, useState } from 'react';
import { galleryImages, type GalleryCategory, type GalleryImage } from '@/data/gallery';
import { GALLERY_CATEGORY_LABELS } from '@/components/Gallery/galleryLabels';
import { Lightbox } from '@/components/Gallery/Lightbox';
import { cn } from '@/lib/cn';

const CATEGORIES = ['all', ...new Set(galleryImages.map((img) => img.category))] as Array<
  GalleryCategory | 'all'
>;

interface GalleryGridProps {
  images?: GalleryImage[];
  className?: string;
}

export function GalleryGrid({ images = galleryImages, className }: GalleryGridProps) {
  const [filter, setFilter] = useState<GalleryCategory | 'all'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return images;
    return images.filter((img) => img.category === filter);
  }, [filter, images]);

  const openAt = (id: string) => {
    const idx = filtered.findIndex((img) => img.id === id);
    if (idx >= 0) setLightboxIndex(idx);
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
        {CATEGORIES.filter((cat) => cat === 'all' || images.some((i) => i.category === cat)).map(
          (cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={filter === cat}
              onClick={() => setFilter(cat)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                filter === cat
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white text-muted ring-1 ring-navy/10 hover:text-navy',
              )}
            >
              {GALLERY_CATEGORY_LABELS[cat]}
            </button>
          ),
        )}
      </div>

      <ul
        className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3"
        aria-live="polite"
      >
        {filtered.map((img, index) => (
          <li key={img.id} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => openAt(img.id)}
              className="group w-full overflow-hidden rounded-xl text-left shadow-sm ring-1 ring-navy/10 transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-sunset"
            >
              <img
                src={img.thumb}
                alt={img.alt}
                width={800}
                height={600}
                loading={index < 6 ? 'eager' : 'lazy'}
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
              <span className="block bg-white px-3 py-2 text-xs text-muted">{img.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-muted">No images in this category yet.</p>
      ) : null}

      {lightboxIndex !== null ? (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      ) : null}
    </div>
  );
}