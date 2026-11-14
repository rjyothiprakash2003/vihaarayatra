import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, MessageCircle, X } from 'lucide-react'
import { mainNavigation } from '@/data/navigation'
import { siteInfo } from '@/data/site'
import { useScrollSolid } from '@/hooks/useScrollSolid'
import { useTheme } from '@/context/ThemeContext'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { cn } from '@/lib/cn'

interface HeaderProps {
  overHero?: boolean
}

export function Header({ overHero = false }: HeaderProps) {
  const scrolled = useScrollSolid(56)
  const solid = scrolled || !overHero
  const { theme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const location = useLocation()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const waHref = buildWhatsAppUrl()
  const useDarkLogo = !solid || theme === 'dark'

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return

    firstLinkRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [menuOpen])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'whitespace-nowrap rounded-lg px-2 py-1 text-sm font-medium transition-colors lg:px-2.5',
      solid
        ? isActive
          ? 'text-sunset'
          : 'text-navy hover:text-teal'
        : isActive
          ? 'text-sunset'
          : 'text-white/90 hover:text-white',
    )

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="hidden border-b border-white/10 bg-linear-to-r from-navy-deep via-[#1B3A2F] to-teal text-[#FBF7F0] sm:block">
        <Container className="flex items-center justify-between gap-4 py-2 text-xs sm:text-sm">
          <p>Your next international adventure starts here.</p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full font-semibold text-[#F3E8D8] transition hover:text-white"
          >
            <MessageCircle className="size-3.5" aria-hidden />
            WhatsApp {siteInfo.whatsapp.primaryDisplay}
          </a>
        </Container>
      </div>

      <nav
        aria-label="Main"
        className={cn(
          'border-b transition-colors duration-300',
          solid
            ? 'border-navy/10 bg-surface/95 text-navy shadow-sm backdrop-blur-md'
            : 'border-transparent bg-transparent text-white',
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
          <Link to="/" className="flex shrink-0 items-center rounded-lg focus-visible:ring-2">
            <img
              src={useDarkLogo ? '/logos/logo-horizontal-dark.svg' : '/logos/logo-horizontal.svg'}
              alt={siteInfo.name}
              className="h-9 w-auto sm:h-10"
              width={180}
              height={40}
            />
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {mainNavigation.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={navLinkClass} end={item.path === '/'}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle solid={solid} />
            <div className="hidden items-center gap-2 sm:flex">
              <Button
                variant={solid ? 'primary' : 'secondary'}
                size="sm"
                to="/contact"
                className={cn(!solid && 'border-white text-white hover:bg-white hover:text-navy-deep')}
              >
                Plan Your Trip
              </Button>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              className={cn(
                'inline-flex items-center justify-center rounded-xl p-2 xl:hidden',
                solid ? 'text-navy hover:bg-navy/5' : 'text-white hover:bg-white/10',
              )}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              {menuOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
            </button>
          </div>
        </Container>
      </nav>

      {menuOpen ? (
        <div id={menuId} className="border-b border-navy/10 bg-surface shadow-lg xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {mainNavigation.map((item, i) => (
              <NavLink
                key={item.path}
                ref={i === 0 ? firstLinkRef : undefined}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'rounded-xl px-3 py-2.5 text-base font-medium',
                    isActive ? 'bg-sand text-sunset' : 'text-navy hover:bg-sand',
                  )
                }
                end={item.path === '/'}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-sm text-muted">Theme</span>
              <ThemeToggle solid />
            </div>
            <Button variant="primary" size="md" to="/contact" className="mt-3 w-full">
              Plan your trip
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
