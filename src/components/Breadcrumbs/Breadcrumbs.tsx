import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.path} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight className="size-3.5 shrink-0 text-muted/60" aria-hidden />
              ) : null}
              {isLast ? (
                <span className="font-medium text-navy" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="rounded-sm text-muted underline-offset-2 transition-colors hover:text-navy hover:underline"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}