'use client';
import React, { useState, useEffect, useRef } from 'react';

import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

import { CaretDown, ArrowUpRight, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import CodayLogo from '@/assets/images/coday_logo.png';
import Image from 'next/image';
import { LanguageSwitcher } from '@/widgets/navigation/LanguageSwitcher';

import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { getNavItems } from '@/widgets/navigation/config';
import { NavDropdown } from '@/widgets/navigation/NavDropdown';
import dynamic from 'next/dynamic';
import '@/widgets/navigation/MobileReadyNav.css';

const MobileNavOverlay = dynamic(
  () => import('@/widgets/navigation/MobileNavOverlay').then((m) => m.MobileNavOverlay),
  {
    ssr: false,
  }
);

interface CardNavProps {
  className?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const MobileReadyNav: React.FC<CardNavProps> = ({
  className = '',
  buttonBgColor = 'var(--color-primary-700)', // Semantic token from theme
  buttonTextColor = 'var(--color-text-inverse)',
}) => {
  const t = useTranslations('common');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // UX States
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  // Smart Scroll Logic - Native Implementation
  useEffect(() => {
    // Initialize state properly on mount (e.g. if loaded midway down the page)
    lastScrollY.current = window.scrollY;

    // Defer the initial state update to avoid cascading render warning
    requestAnimationFrame(() => {
      if (window.scrollY > 50) setIsScrolled(true);
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const previous = lastScrollY.current;

      // Determine direction
      if (currentScrollY > previous && currentScrollY > 150) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }

      // Determine scrolled state (for transparency/blur)
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveCategory(null);
      setIsMobileOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Handle outside click to close
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

  return (
    <header className={`card-nav-container ${className}`} ref={navRef}>
      {/* Floating Pill */}
      <nav
        className={`nav-pill ${isScrolled ? 'scrolled' : 'at-top'} ${!isVisible ? 'nav-hidden' : ''}`}
        aria-label="Hauptnavigation"
      >
        <Link
          href="/"
          className="nav-pill-logo"
          title="Zur Startseite"
          aria-label="Coday - Zur Startseite"
        >
          <Image
            src={CodayLogo}
            alt="Coday Webdesign Agentur Wetzlar Logo"
            width={48}
            height={48}
            className="logo-icon w-12 h-12 object-contain"
            priority={true}
            fetchPriority="high"
          />
          <span className="logo-text text-lg">Coday</span>
          <span className="sr-only"> – Zur Startseite</span>
        </Link>

        {/* Desktop Links (Center) */}
        <div className="nav-desktop-links hidden lg:flex">
          {items.map((item) => (
            <div
              key={item.label}
              className="nav-item-wrapper"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`nav-pill-link relative z-10 ${activeCategory === item.label ? 'active bg-slate-100' : 'hover:bg-slate-50'}`}
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
              <div
                className={`nav-dropdown absolute left-1/2 -translate-x-1/2 transition motion-reduce:duration-[0.01ms] duration-300 ease-out origin-top ${
                  activeCategory === item.label
                    ? 'opacity-100 translate-y-0 scale-100 blur-none pointer-events-auto'
                    : 'opacity-0 -translate-y-2 scale-95 blur-sm pointer-events-none'
                }`}
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
                          {activeTabs[item.label] === idx && <div className="active-indicator" />}
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
                            {item.groups.length === 1 && (
                              <div className="dropdown-group-title">{t(activeGroup!.title)}</div>
                            )}

                            {activeGroup!.links.map((link, i) => (
                              <Link
                                key={i}
                                href={link.href}
                                prefetch={false}
                                className="dropdown-link-item group"
                                onClick={() => setActiveCategory(null)}
                                aria-label={t(link.label)}
                                title={t(link.label)}
                              >
                                <div className="link-icon-wrapper" aria-hidden="true">
                                  <OptimizedIcon icon={ArrowUpRight} className="link-arrow" />
                                </div>
                                <div className="link-text">
                                  <span className="link-label">{t(link.label)}</span>
                                  {link.desc && (
                                    <span className="link-desc" aria-hidden="true">
                                      {t(link.desc)}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            ))}
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
              </div>
            </div>
          ))}
        </div>

        {/* Actions (Right) */}
        <div className="nav-pill-actions">
          {/* Desktop/Tablet Only Actions */}
          <div className="nav-desktop-actions hidden lg:flex items-center gap-3">
            <NavDropdown
              title={t('nav.local.title')}
              items={[
                { label: t('nav.local.hessen'), href: '/standorte/hessen' },
                { label: t('nav.local.wetzlar'), href: '/standorte/wetzlar' },
                {
                  label: t('nav.local.arzt_wetzlar'),
                  href: '/branchen/gesundheitswesen/arzt-wetzlar',
                },
                {
                  label: t('nav.local.arzt_giessen'),
                  href: '/branchen/gesundheitswesen/arzt-giessen',
                },
                { label: t('nav.local.handwerker_wetzlar'), href: '/branchen/handwerker/wetzlar' },
                { label: t('nav.local.kfz_werkstatt'), href: '/branchen/automobil/kfz-werkstatt' },
                {
                  label: t('nav.local.kfz_mechatroniker'),
                  href: '/branchen/automobil/kfz-mechatroniker',
                },
                { label: t('nav.local.autohaendler'), href: '/branchen/automobil/autohaendler' },
              ]}
            />
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
          <div className="mobile-only-actions lg:hidden flex items-center gap-3">
            <React.Suspense fallback={null}>
              <LanguageSwitcher />
            </React.Suspense>
            <button
              className={`mobile-menu-trigger p-2 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-[0.9] transition-transform motion-reduce:duration-[0.01ms] ${isMobileOpen ? 'is-open' : ''}`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileOpen}
            >
              <div className="hamburger-icon">
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </div>
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

export default MobileReadyNav;
