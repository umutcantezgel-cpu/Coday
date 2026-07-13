'use client';

import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { m, AnimatePresence } from 'motion/react';
import { List, X } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  items: NavItem[];
}

export function Navbar({ logo, items, className, ...props }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={cn('relative z-50 w-full', className)} {...props}>
      {/* Top Navbar Layer */}
      <div className="relative z-20 bg-white border-b border-neutral-200">
        <nav
          aria-label="Main Navigation"
          className="container mx-auto px-4 h-16 flex items-center justify-between"
        >
          <div className="flex-shrink-0 flex items-center">
            {logo || (
              <Link
                href="/"
                className="text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 rounded-md min-h-[44px] flex items-center px-2 -ml-2"
              >
                Coday
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-[transform,opacity] duration-[150ms] ease-out active:duration-[80ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 rounded-md px-2 py-1 min-h-[44px] flex items-center active:scale-[0.97]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] rounded-md text-neutral-600 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 active:scale-[0.97] transition-[transform,opacity] duration-[150ms] ease-out active:duration-[80ms] cursor-pointer -mr-2"
            aria-expanded={isOpen}
            aria-controls={isOpen ? 'mobile-menu' : undefined}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className="absolute top-full left-0 w-full overflow-hidden z-10 md:hidden pointer-events-none">
        <AnimatePresence>
          {isOpen && (
            <m.div
              key="mobile-menu"
              id="mobile-menu"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="bg-white border-b border-neutral-200 shadow-lg pointer-events-auto"
              role="navigation"
              aria-label="Mobile Navigation"
            >
              <div className="flex flex-col py-2 px-2 gap-1">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-md transition-[transform,opacity] duration-[150ms] ease-out active:duration-[80ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 active:scale-[0.97] flex items-center min-h-[44px]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
