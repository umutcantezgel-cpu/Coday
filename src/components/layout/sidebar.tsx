'use client';

import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { m, AnimatePresence } from 'motion/react';
import { CaretDown, List } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils';

export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  subItems?: { label: string; href: string }[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarItem[];
  defaultCollapsed?: boolean;
}

export function Sidebar({ items, defaultCollapsed = false, className, ...props }: SidebarProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(defaultCollapsed);
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({});

  const toggleMenu = (id: string) => {
    if (isSidebarCollapsed) {
      setIsSidebarCollapsed(false);
      setOpenMenus((prev) => ({ ...prev, [id]: true }));
      return;
    }
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside
      className={cn(
        'flex flex-col border-r border-neutral-200 bg-white h-full overflow-y-auto no-scrollbar',
        isSidebarCollapsed ? 'w-16' : 'w-64',
        className
      )}
      {...(props as any)}
    >
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 sticky top-0 bg-white z-10 min-h-[64px]">
        <span
          className={cn(
            'font-semibold tracking-tight whitespace-nowrap transition-[transform,opacity] duration-[150ms] ease-out active:duration-[80ms]',
            isSidebarCollapsed ? 'opacity-0 pointer-events-none overflow-hidden' : 'opacity-100'
          )}
        >
          Menu
        </span>
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={cn(
            'p-2 -m-2 rounded-md hover:bg-neutral-100 text-neutral-600 transition-[transform,opacity] duration-[150ms] ease-out active:duration-[80ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 active:scale-[0.97] min-h-[44px] min-w-[44px] flex items-center justify-center',
            isSidebarCollapsed ? 'mx-auto' : ''
          )}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <List className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex flex-col gap-1 p-2" aria-label="Sidebar Navigation">
        {items.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isOpen = openMenus[item.id];

          return (
            <div key={item.id} className="flex flex-col">
              {hasSubItems ? (
                <button
                  onClick={() => toggleMenu(item.id)}
                  aria-expanded={isOpen && !isSidebarCollapsed}
                  className="flex items-center justify-between w-full p-2 rounded-md hover:bg-neutral-100 text-neutral-700 transition-[transform,opacity] duration-[150ms] ease-out active:duration-[80ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 active:scale-[0.97] min-h-[44px]"
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {item.icon && (
                      <span className="flex-shrink-0 flex items-center justify-center w-5 h-5">
                        {item.icon}
                      </span>
                    )}
                    <span
                      className={cn(
                        'whitespace-nowrap font-medium text-sm transition-[transform,opacity] duration-[150ms] ease-out active:duration-[80ms]',
                        isSidebarCollapsed
                          ? 'opacity-0 pointer-events-none -translate-x-2 overflow-hidden'
                          : 'opacity-100 translate-x-0'
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                  <CaretDown
                    className={cn(
                      'w-4 h-4 flex-shrink-0 transition-[transform,opacity] duration-[150ms] ease-out active:duration-[80ms]',
                      isSidebarCollapsed
                        ? 'opacity-0 pointer-events-none overflow-hidden'
                        : 'opacity-100',
                      isOpen && !isSidebarCollapsed ? 'rotate-180' : ''
                    )}
                  />
                </button>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-100 text-neutral-700 transition-[transform,opacity] duration-[150ms] ease-out active:duration-[80ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 active:scale-[0.97] min-h-[44px]"
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  {item.icon && (
                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5">
                      {item.icon}
                    </span>
                  )}
                  <span
                    className={cn(
                      'whitespace-nowrap font-medium text-sm transition-[transform,opacity] duration-[150ms] ease-out active:duration-[80ms]',
                      isSidebarCollapsed
                        ? 'opacity-0 pointer-events-none -translate-x-2 overflow-hidden'
                        : 'opacity-100 translate-x-0'
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              )}

              <AnimatePresence initial={false}>
                {hasSubItems && isOpen && !isSidebarCollapsed && (
                  <m.div
                    key={`${item.id}-submenu`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="flex flex-col overflow-hidden"
                  >
                    <div className="flex flex-col gap-1 pl-10 pr-2 mt-1 pb-1">
                      {item.subItems?.map((subItem, idx) => (
                        <Link
                          key={idx}
                          href={subItem.href}
                          tabIndex={0}
                          aria-hidden={false}
                          className="py-2 px-3 text-sm rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-[transform,opacity] duration-[150ms] ease-out active:duration-[80ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 active:scale-[0.97] min-h-[44px] flex items-center"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
