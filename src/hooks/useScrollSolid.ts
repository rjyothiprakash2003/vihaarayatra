import { useEffect, useState } from 'react';

const DEFAULT_THRESHOLD = 48;

export function useScrollSolid(threshold = DEFAULT_THRESHOLD): boolean {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return solid;
}