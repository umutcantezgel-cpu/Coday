import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

import { CaretDown, ArrowUpRight, ArrowRight } from '@phosphor-icons/react';
import CodayLogo from '@/assets/images/coday_logo.svg';
import { LanguageSwitcher } from '@/widgets/navigation/LanguageSwitcher';
import { Magnetic } from '@/shared/ui/Magnetic';

import { useLocation } from 'react-router-dom';
import { LocalizedLink as Link } from '@/shared/ui/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { getNavItems } from '@/widgets/navigation/config';
import { MobileNavOverlay } from '@/widgets/navigation/MobileNavOverlay';
import '@/widgets/navigation/MobileReadyNav.css';

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
  const { t } = useTranslation('common');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // UX States
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  // Smart Scroll Logic - Native Implementation
  useEffect(() => {
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const lastScrollY = useRef(0);

  const location = useLocation();
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
  }, [location.pathname]);

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
    <header role="banner" className={`card-nav-container ${className}`} ref={navRef}>
      {/* Floating Pill */}
      <nav
        role="navigation"
        className={`nav-pill ${isScrolled ? 'scrolled' : 'at-top'} ${!isVisible ? 'nav-hidden' : ''}`}
        aria-label="Hauptnavigation"
      >
        <Link to="/" className="nav-pill-logo" title="Zur Startseite">
          <img
            src={CodayLogo}
            alt=""
            aria-hidden="true"
            className="logo-icon w-12 h-12 object-contain"
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
              <Magnetic>
                <button
                  className={`nav-pill-link relative z-10 ${activeCategory === item.label ? 'active bg-slate-100' : 'hover:bg-slate-50'}`}
                  aria-expanded={activeCategory === item.label}
                  onClick={() =>
                    setActiveCategory(activeCategory === item.label ? null : item.label)
                  }
                >
                  {t(item.label)}
                  <OptimizedIcon
                    icon={CaretDown}
                    className={`nav-chevron ${activeCategory === item.label ? 'rotate' : ''}`}
                  />
                </button>
              </Magnetic>

              {/* Focused Dropdown */}
              <div
                className={`nav-dropdown absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out origin-top ${
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
                                to={link.href}
                                className="dropdown-link-item group"
                                onClick={() => setActiveCategory(null)}
                              >
                                <div className="link-icon-wrapper">
                                  <OptimizedIcon icon={ArrowUpRight} className="link-arrow" />
                                </div>
                                <div className="link-text">
                                  <span className="link-label">{t(link.label)}</span>
                                  {link.desc && <span className="link-desc">{t(link.desc)}</span>}
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
                            to={link.href}
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
            <React.Suspense fallback={null}>
              <LanguageSwitcher />
            </React.Suspense>

            <Link
              to="/packages"
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
              to="/contact"
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
            <motion.button
              className={`mobile-menu-trigger p-2 min-w-[44px] min-h-[44px] flex items-center justify-center ${isMobileOpen ? 'is-open' : ''}`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileOpen}
              whileTap={{ scale: 0.9 }}
            >
              <div className="hamburger-icon">
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </div>
            </motion.button>
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
