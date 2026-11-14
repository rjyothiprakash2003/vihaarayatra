import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, MessageCircle, X } from 'lucide-react'
import { mainNavigation } from '@/data/navigation'
import { siteInfo } from '@/data/site'
import { useTheme } from '@/context/ThemeContext'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { Container } from '@/components/UI/Container'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { cn } from '@/lib/cn'

interface HeaderProps {
  overHero?: boolean
}

export function Header({ overHero: _overHero = false }: HeaderProps) {
  const { theme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const location = useLocation()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const waHref = buildWhatsAppUrl()
  const logoSrc =
    theme === 'dark' ? '/logos/logo-horizontal-dark.svg' : '/logos/logo-horizontal.svg'

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
      'whitespace-nowrap rounded-lg px-2 py-1 text-sm font-semibold transition-colors lg:px-2.5',
      isActive ? 'text-teal' : 'text-navy hover:text-teal',
    )

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="hidden border-b border-white/10 bg-[#1B3A2F] text-[#FBF7F0] sm:block">
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
        className="border-b border-navy/10 bg-sand text-navy shadow-sm dark:bg-surface"
      >
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
          <Link to="/" className="flex shrink-0 items-center rounded-lg focus-visible:ring-2">
            <img
              src={logoSrc}
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
            <ThemeToggle solid />
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/contact"
                className="rounded-lg px-3 py-2 text-sm font-bold text-navy transition-colors hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset"
              >
                Plan Your Trip
              </Link>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2 text-navy hover:bg-navy/5 xl:hidden"
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
                    'rounded-xl px-3 py-2.5 text-base font-semibold',
                    isActive ? 'bg-sand text-teal' : 'text-navy hover:bg-sand',
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
            <Link
              to="/contact"
              className="mt-3 block rounded-xl px-3 py-2.5 text-center text-base font-bold text-navy hover:bg-sand"
              onClick={() => setMenuOpen(false)}
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
