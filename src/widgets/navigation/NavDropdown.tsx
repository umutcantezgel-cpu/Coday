'use client';
import React, { useState, useRef, useId, useCallback } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

interface DropdownItem {
  label: string;
  href: string;
  icon?: React.ElementType;
  locale?: string;
}

interface NavDropdownProps {
  title: string;
  items: DropdownItem[];
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuId = useId();
  const buttonId = useId();
  const pathname = usePathname() || '';
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const setMenuItemRef = useCallback(
    (index: number) => (el: HTMLAnchorElement | null) => {
      menuItemsRef.current[index] = el;
    },
    []
  );

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const closeAndRestoreFocus = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeAndRestoreFocus();
    }
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      // Focus first menu item after render
      requestAnimationFrame(() => {
        menuItemsRef.current[0]?.focus();
      });
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIsOpen(true);
      requestAnimationFrame(() => {
        menuItemsRef.current[items.length - 1]?.focus();
      });
    }
  };

  const handleMenuItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const nextIndex = index < items.length - 1 ? index + 1 : 0;
        menuItemsRef.current[nextIndex]?.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prevIndex = index > 0 ? index - 1 : items.length - 1;
        menuItemsRef.current[prevIndex]?.focus();
        break;
      }
      case 'Home': {
        e.preventDefault();
        menuItemsRef.current[0]?.focus();
        break;
      }
      case 'End': {
        e.preventDefault();
        menuItemsRef.current[items.length - 1]?.focus();
        break;
      }
      case 'Escape': {
        e.preventDefault();
        closeAndRestoreFocus();
        break;
      }
      case 'Tab': {
        setIsOpen(false);
        break;
      }
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        id={buttonId}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        className={`flex items-center space-x-1 text-sm font-medium transition-colors motion-reduce:duration-[0.01ms] min-h-[44px]
          ${isOpen ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span>{title}</span>
        <CaretDown
          className={`w-4 h-4 transition-transform motion-reduce:duration-[0.01ms] duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      <div
        id={menuId}
        aria-label={title}
        className={`absolute top-full left-1/2 -translate-x-1/2 w-64 pt-2 transition motion-reduce:duration-[0.01ms] duration-200 origin-top
          ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-50/50 overflow-hidden p-2 ring-1 ring-black/5 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {items.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                locale={item.locale as any}
                ref={setMenuItemRef(index)}
                tabIndex={isOpen ? 0 : -1}
                aria-current={isActive ? 'page' : undefined}
                className={`
                  flex items-center space-x-3 px-4 py-3 min-h-[44px] rounded-xl transition motion-reduce:duration-[0.01ms] duration-200
                  ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-slate-50 hover:text-gray-900'}
                `}
                onClick={() => setIsOpen(false)}
                onKeyDown={(e: React.KeyboardEvent) => handleMenuItemKeyDown(e, index)}
              >
                {item.icon && (
                  <OptimizedIcon
                    icon={item.icon}
                    className={`text-xl ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}
                  />
                )}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
