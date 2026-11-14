import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { destinations } from '@/data/destinations'
import { cn } from '@/lib/cn'

const INTERVAL_MS = 5000

const slides = destinations.map((destination) => ({
  id: destination.slug,
  name: destination.name,
  image: destination.heroImage.replace('w=1920', 'w=2400'),
  alt: `${destination.name} travel destination`,
}))

interface HeroBannerSliderProps {
  className?: string
}

export function HeroBannerSlider({ className }: HeroBannerSliderProps) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (paused || reduceMotion || slides.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion])

  const active = slides[index] ?? slides[0]

  return (
    <div
      className={cn('absolute inset-0 overflow-hidden', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
      aria-roledescription="carousel"
      aria-label="Destination highlight banners"
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.img
          key={active.id}
          src={active.image}
          alt={active.alt}
          width={2400}
          height={1600}
          fetchPriority={index === 0 ? 'high' : 'low'}
          decoding="async"
          className="absolute inset-0 size-full object-cover"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      <img
        src={slides[(index + 1) % slides.length]?.image}
        alt=""
        aria-hidden
        className="pointer-events-none absolute size-0 opacity-0"
        decoding="async"
      />

      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur-sm sm:bottom-8">
        <span className="mr-1 hidden text-xs font-medium text-white/85 sm:inline">
          {active.name}
        </span>
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.name} banner`}
            aria-current={slideIndex === index}
            onClick={() => goTo(slideIndex)}
            className={cn(
              'h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset',
              slideIndex === index ? 'w-7 bg-sunset' : 'w-2.5 bg-white/55 hover:bg-white/85',
            )}
          />
        ))}
      </div>
    </div>
  )
}
