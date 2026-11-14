import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Destination } from '@/data/destinations';
import { cn } from '@/lib/cn';

interface DestinationCardProps {
  destination: Destination;
  className?: string;
  index?: number;
}

export function DestinationCard({ destination, className, index = 0 }: DestinationCardProps) {
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-40px' },
        transition: { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <motion.article {...motionProps} className={cn('group', className)}>
      <Link
        to={`/destinations/${destination.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-surface shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
          <img
            src={destination.cardImage}
            alt={destination.name}
            width={800}
            height={600}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
            loading={index < 4 ? 'eager' : 'lazy'}
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy/60 via-transparent to-transparent opacity-80"
            aria-hidden
          />
          <p className="absolute bottom-3 left-4 right-4 font-display text-lg font-semibold text-white drop-shadow">
            {destination.name}
          </p>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="line-clamp-3 text-sm leading-relaxed text-muted">{destination.shortDescription}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal transition-colors group-hover:text-navy">
            Explore {destination.name}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}