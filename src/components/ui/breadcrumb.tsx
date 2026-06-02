import * as React from 'react';
import Link from 'next/link';
import { CaretRight } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

/**
 * A reusable Breadcrumb component.
 */
export function Breadcrumb({ items, separator, className, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex', className)} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="px-2 py-1 -mx-2 rounded-md transition duration-150 ease-out active:scale-[0.97] hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 min-h-11 flex items-center justify-center"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    'px-2 py-1 -mx-2 flex items-center min-h-11',
                    isLast ? 'text-neutral-900 font-medium' : ''
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="opacity-60 flex-shrink-0 text-neutral-400">
                  {separator || <CaretRight weight="bold" className="w-3.5 h-3.5" />}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
