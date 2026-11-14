import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-sunset text-white shadow-md shadow-sunset/25 hover:bg-sunset/90 focus-visible:ring-sunset',
  secondary:
    'border-2 border-navy bg-transparent text-navy hover:bg-navy hover:text-white focus-visible:ring-navy',
  ghost: 'bg-transparent text-navy hover:bg-navy/5 focus-visible:ring-navy',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  to: string;
  href?: undefined;
} & Omit<React.ComponentProps<typeof Link>, 'to' | 'className' | 'children'>;

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    to?: undefined;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ('to' in rest && rest.to) {
    const { to, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link to={to} className={base} {...linkRest}>
        {children}
      </Link>
    );
  }

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a href={href} className={base} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { type = 'button', ...buttonRest } = rest as ButtonAsButton;
  return (
    <button type={type} className={base} {...buttonRest}>
      {children}
    </button>
  );
}