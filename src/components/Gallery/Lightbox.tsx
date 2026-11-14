import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryImage } from '@/data/gallery';
import { cn } from '@/lib/cn';

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  if (event.key !== 'Tab') return;

  const nodes = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
  );
  if (nodes.length === 0) return;

  const first = nodes[0]!;
  const last = nodes[nodes.length - 1]!;

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const image = images[index];
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(index - 1);
  }, [hasPrev, index, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(index + 1);
  }, [hasNext, index, onNavigate]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
      if (panelRef.current) trapFocus(panelRef.current, event);
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, [goNext, goPrev, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close lightbox"
        onClick={onClose}
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        className="relative z-10 flex max-h-full w-full max-w-5xl flex-col"
      >
        <div className="mb-3 flex items-center justify-between gap-4 text-ivory">
          <p className="text-sm text-ivory/80">
            {index + 1} / {images.length}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-ivory transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-sunset"
            aria-label="Close"
          >
            <X className="size-6" aria-hidden />
          </button>
        </div>

        <figure className="relative flex flex-1 flex-col overflow-hidden rounded-2xl bg-black/40 shadow-2xl">
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[min(70vh,720px)] w-full object-contain"
            decoding="async"
          />
          <figcaption className="border-t border-white/10 bg-navy/80 px-4 py-3 text-sm text-ivory sm:px-6">
            <p>{image.caption}</p>
            <p className="mt-1 text-xs text-ivory/70">
              Photo:{' '}
              <a
                href={image.attributionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-teal"
              >
                {image.photographer}
              </a>{' '}
              · {image.licence}
            </p>
          </figcaption>
        </figure>

        <NavControl
          side="left"
          label="Previous image"
          disabled={!hasPrev}
          onClick={goPrev}
          icon={<ChevronLeft className="size-8" />}
        />
        <NavControl
          side="right"
          label="Next image"
          disabled={!hasNext}
          onClick={goNext}
          icon={<ChevronRight className="size-8" />}
        />
      </div>
    </div>
  );
}

function NavControl({
  side,
  label,
  disabled,
  onClick,
  icon,
}: {
  side: 'left' | 'right';
  label: string;
  disabled: boolean;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      className={cn(
        'absolute top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-ivory backdrop-blur transition hover:bg-white/20 disabled:opacity-30',
        side === 'left' ? 'left-2 sm:-left-14' : 'right-2 sm:-right-14',
      )}
    >
      {icon}
    </button>
  );
}