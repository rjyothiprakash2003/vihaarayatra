import { useEffect, useState } from 'react'
import { Plane } from 'lucide-react'

const SESSION_KEY = 'vy-splash-seen'

interface SplashScreenProps {
  onComplete?: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return sessionStorage.getItem(SESSION_KEY) !== '1'
  })

  useEffect(() => {
    if (!visible) {
      onComplete?.()
      return
    }

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      setVisible(false)
      onComplete?.()
    }, 3200)

    return () => window.clearTimeout(timer)
  }, [visible, onComplete])

  if (!visible) return null

  return (
    <div
      className="splash-screen fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      role="presentation"
      aria-hidden
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#87CEEB] via-[#F4A261] to-[#5C4033]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#3D2914] to-transparent" />
      <div className="absolute inset-x-0 bottom-[18%] h-px bg-sand/40" />
      <p className="relative z-10 px-6 text-center font-display text-2xl font-bold tracking-tight text-white drop-shadow-md sm:text-4xl">
        Vihaara Yatra
        <span className="mt-2 block text-sm font-semibold uppercase tracking-[0.28em] text-sand sm:text-base">
          International Tours
        </span>
      </p>
      <Plane
        className="splash-plane absolute left-[18%] top-[58%] size-14 text-white drop-shadow-lg sm:size-20"
        strokeWidth={1.5}
        aria-hidden
      />
    </div>
  )
}
