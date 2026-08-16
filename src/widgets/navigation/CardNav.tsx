'use client';
import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Code, CaretDown, ArrowUpRight, ArrowRight, List, X } from '@phosphor-icons/react/dist/ssr';
import { LanguageSwitcher } from '@/widgets/navigation/LanguageSwitcher';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { getNavItems } from '@/widgets/navigation/config';
import '@/widgets/navigation/CardNav.css';

const MobileNavOverlay = dynamic(
  () => import('@/widgets/navigation/MobileNavOverlay').then((mod) => mod.MobileNavOverlay),
  { ssr: false }
);

interface CardNavProps {
  className?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  className = '',
  buttonBgColor = 'var(--color-primary-700)', // Semantic token from theme
  buttonTextColor = 'var(--color-text-inverse)',
}) => {
  const t = useTranslations('common');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Get translated items
  const items = getNavItems();

  // Track active tabs for content inside dropdowns
  const [activeTabs, setActiveTabs] = useState<Record<string, number>>(() => {
    const initialTabs: Record<string, number> = {};
    items.forEach((item) => {
      initialTabs[item.label] = 0;
    });
    return initialTabs;
  });

  // Close dropdown on route change
  useEffect(() => {
    const timer = setTimeout(() => setActiveCategory(null), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Handle outside click and Escape key to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveCategory(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveCategory(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveCategory(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 300);
  };

  // Dropdown Animation Variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 12, // Gap between pill and dropdown
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };

  return (
    <header role="banner" className={`card-nav-container ${className}`} ref={navRef}>
      {/* Floating Pill */}
      <nav className="nav-pill" aria-label="Hauptnavigation">
        <Link
          href="/"
          className="nav-pill-logo"
          title="Zur Startseite"
          aria-label="Coday - Zur Startseite"
        >
          <OptimizedIcon icon={Code} className="logo-icon" aria-hidden="true" />
          <span className="logo-text">Coday</span>
          <span className="sr-only"> – Zur Startseite</span>
        </Link>

        {/* Desktop Links (Center) */}
        <div className="nav-desktop-container-nuclear">
          {items.map((item) => (
            <div
              key={item.label}
              className="nav-item-wrapper"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`nav-pill-link ${activeCategory === item.label ? 'active' : ''}`}
                aria-expanded={activeCategory === item.label}
                onClick={() => setActiveCategory(activeCategory === item.label ? null : item.label)}
              >
                {t(item.label)}
                <OptimizedIcon
                  icon={CaretDown}
                  className={`nav-chevron ${activeCategory === item.label ? 'rotate' : ''}`}
                />
              </button>

              {/* Focused Dropdown */}
              <AnimatePresence>
                {activeCategory === item.label && (
                  <m.div
                    className="nav-dropdown"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    style={
                      {
                        '--accent-color': item.bgColor,
                        '--text-color': item.textColor,
                      } as React.CSSProperties
                    }
                  >
                    <div className="dropdown-inner">
                      {/* Optional Sidebar for Multi-Group */}
                      {item.groups && item.groups.length > 1 && (
                        <div className="dropdown-sidebar">
                          {item.groups.map((group, idx) => (
                            <button
                              key={group.title}
                              className={`dropdown-sidebar-item ${activeTabs[item.label] === idx ? 'active' : ''}`}
                              onMouseEnter={() =>
                                setActiveTabs((prev) => ({ ...prev, [item.label]: idx }))
                              }
                            >
                              {t(group.title)}
                              {activeTabs[item.label] === idx && (
                                <m.div
                                  layoutId={`active-indicator-${item.label}`}
                                  className="active-indicator"
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Content Grid */}
                      <div className="dropdown-content">
                        {item.groups && item.groups.length > 0 ? (
                          // Show active group
                          (() => {
                            const activeIndex = activeTabs[item.label] || 0;
                            const activeGroup =
                              item.groups.length > 1 ? item.groups[activeIndex] : item.groups[0];

                            return (
                              <div className="dropdown-links-grid">
                                {/* Title if single group */}
                                {item.groups.length === 1 && activeGroup && (
                                  <div className="dropdown-group-title">{t(activeGroup.title)}</div>
                                )}

                                {activeGroup?.links?.map((link, i) => {
                                  const isExternal = link.href.startsWith('http');
                                  const LinkComponent = (
                                    isExternal ? 'a' : Link
                                  ) as React.ElementType;
                                  const linkProps = isExternal
                                    ? {
                                        href: link.href,
                                        target: '_blank',
                                        rel: 'noopener noreferrer',
                                      }
                                    : {
                                        href: link.href,
                                        ...(link.locale ? { locale: link.locale } : {}),
                                      };

                                  return (
                                    <div key={i} className="dropdown-link-item group relative">
                                      <div className="link-icon-wrapper" aria-hidden="true">
                                        <OptimizedIcon icon={ArrowUpRight} className="link-arrow" />
                                      </div>
                                      <div className="link-text">
                                        <LinkComponent
                                          {...linkProps}
                                          aria-label={
                                            isExternal
                                              ? `${t(link.label)} (Website)`
                                              : t(link.label)
                                          }
                                          className="link-label before:absolute before:inset-0 focus:outline-none focus-visible:ring-0"
                                          onClick={() => setActiveCategory(null)}
                                        >
                                          {t(link.label)}
                                        </LinkComponent>
                                        {link.desc && (
                                          <span className="link-desc" aria-hidden="true">
                                            {t(link.desc)}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })()
                        ) : (
                          // No groups (fallback)
                          <div className="dropdown-links-grid">
                            {item.links?.map((link, i) => (
                              <Link
                                key={i}
                                href={link.href}
                                {...(link.locale ? { locale: link.locale } : {})}
                                className="dropdown-link-item"
                                onClick={() => setActiveCategory(null)}
                              >
                                {t(link.label)}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Actions (Right) */}
        <div className="nav-pill-actions">
          {/* Desktop/Tablet Only Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <React.Suspense fallback={null}>
              <LanguageSwitcher />
            </React.Suspense>

            <Link
              href="/pricing"
              className="nav-pill-cta hidden xl:flex"
              style={{
                backgroundColor: 'var(--color-accent-700)',
                color: 'var(--color-text-inverse)',
              }}
            >
              <span>{t('nav.packages.label', { defaultValue: 'Pakete' })}</span>
              <OptimizedIcon icon={ArrowRight} className="cta-arrow" />
            </Link>

            <Link
              href="/contact"
              className="nav-pill-cta"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            >
              <span>{t('nav.cta_booking', { defaultValue: 'Termin' })}</span>
              <OptimizedIcon icon={ArrowRight} className="cta-arrow" />
            </Link>
          </div>

          {/* Mobile Hamburger (Visible only on mobile) */}
          <div className="lg:hidden flex items-center gap-2">
            <React.Suspense fallback={null}>
              <LanguageSwitcher />
            </React.Suspense>
            <button
              className="mobile-menu-trigger p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsMobileOpen(true)}
              aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileOpen}
            >
              <OptimizedIcon icon={isMobileOpen ? X : List} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileNavOverlay
        items={items}
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </header>
  );
};

export default CardNav;
