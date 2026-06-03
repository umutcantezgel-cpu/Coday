'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'id'> {
  tabs: Tab[];
  defaultValue?: string;
  onChange?: (id: string) => void;
  id?: string;
}

/**
 * A reusable Tabs component using Framer Motion.
 */
export function Tabs({ tabs, defaultValue, onChange, className, id, ...props }: TabsProps) {
  const reactId = React.useId();
  const layoutIdPrefix = id || reactId;
  const [activeTab, setActiveTab] = React.useState(defaultValue || tabs[0]?.id);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (tabs.length === 0) return;
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== currentIndex) {
      e.preventDefault();
      const nextTabId = tabs[nextIndex].id;
      setActiveTab(nextTabId);
      tabRefs.current[nextIndex]?.focus();
      onChange?.(nextTabId);
    }
  };

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex items-center gap-1.5 p-1.5 bg-neutral-100 rounded-lg overflow-x-auto no-scrollbar"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                'relative min-h-11 min-w-11 px-4 py-2 text-sm font-medium transition-colors duration-150 ease-out outline-none rounded-md flex-shrink-0 cursor-pointer active:scale-[0.97]',
                'focus-visible:ring-2 focus-visible:ring-neutral-950',
                isActive ? 'text-neutral-950' : 'text-neutral-600 hover:text-neutral-900'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId={`${layoutIdPrefix}-indicator`}
                  className="absolute inset-0 bg-white rounded-md shadow-sm"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 35,
                    mass: 1,
                  }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 focus-visible:outline-none" tabIndex={-1}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            tabIndex={0}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 rounded-md"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
