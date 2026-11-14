interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left';

  return (
    <header className={`max-w-3xl ${alignClass} ${className}`.trim()}>
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-3xl font-display font-semibold text-navy sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>
      ) : null}
    </header>
  );
}