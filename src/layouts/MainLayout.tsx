import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton/WhatsAppButton'
import { SplashScreen } from '@/components/SplashScreen/SplashScreen'
import { cn } from '@/lib/cn'

function isOverHeroPath(pathname: string): boolean {
  if (pathname === '/') return true
  return /^\/destinations\/[^/]+$/.test(pathname)
}

export function MainLayout() {
  const { pathname } = useLocation()
  const overHero = isOverHeroPath(pathname)

  return (
    <div className="flex min-h-svh flex-col">
      <SplashScreen />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-navy focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Header overHero={overHero} />

      <main
        id="main-content"
        className={cn('flex-1', !overHero && 'pt-[var(--header-offset,7.5rem)]')}
      >
        <Outlet />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
