import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/cn'

interface ThemeToggleProps {
  className?: string
  solid?: boolean
}

export function ThemeToggle({ className, solid = true }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset focus-visible:ring-offset-2',
        solid
          ? 'bg-sand text-navy ring-1 ring-navy/10 hover:bg-sunset/15'
          : 'bg-white/15 text-white ring-1 ring-white/25 hover:bg-white/25',
        className,
      )}
    >
      {isDark ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
    </button>
  )
}
