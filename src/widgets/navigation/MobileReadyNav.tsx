import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { OptimizedIcon } from '../../shared/ui/OptimizedIcon';

import { CaretDown, ArrowUpRight, ArrowRight, List, X } from '@phosphor-icons/react';
import CodayLogo from '../../assets/images/coday_logo.svg';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Magnetic } from '../../shared/ui/Magnetic';

import { useLocation } from 'react-router-dom';
import { LocalizedLink as Link } from '../../shared/ui/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { getNavItems } from './config';
import { MobileNavOverlay } from './MobileNavOverlay';
import './MobileReadyNav.css';

interface CardNavProps {
  className?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const MobileReadyNav: React.FC<CardNavProps> = ({
  className = '',
  buttonBgColor = '#137A7A', // Darker Teal for >4.5:1 contrast
  buttonTextColor = '#fff',
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

  // Close dropdown on route change
  useEffect(() => {
    const timer = setTimeout(() => setActiveCategory(null), 0);
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

  const handleMouseEnter = (label: string) => {
    setActiveCategory(label);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  // Dropdown Animation Variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      filter: 'blur(10px)',
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 12, // Gap between pill and dropdown
      scale: 1,
      filter: 'blur(0px)',
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
      filter: 'blur(10px)',
      transition: { duration: 1.15 },
    },
  };

  return (
    <header className={`card-nav-container ${className}`} ref={navRef}>
      {/* Floating Pill */}
      <motion.nav
        className={`nav-pill ${isScrolled ? 'scrolled' : 'at-top'} ${!isVisible ? 'nav-hidden' : ''}`}
        aria-label="Hauptnavigation"
      >
        {/* Logo */}

        <Link to="/" className="nav-pill-logo" aria-label="Zur Startseite">
          <img src={CodayLogo} alt="Coday Logo" className="logo-icon w-12 h-12 object-contain" />
          <span className="logo-text text-lg">Coday</span>
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
                  className={`nav-pill-link relative z-10 ${activeCategory === item.label ? 'active' : ''}`}
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
                  {activeCategory === item.label && (
                    <motion.div
                      layoutId="nav-pill-active"
                      className="absolute inset-0 bg-slate-100 rounded-full -z-10"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              </Magnetic>

              {/* Focused Dropdown */}
              <AnimatePresence>
                {activeCategory === item.label && (
                  <motion.div
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
                                <motion.div
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
                                {item.groups.length === 1 && (
                                  <div className="dropdown-group-title">{t(activeGroup.title)}</div>
                                )}

                                {activeGroup.links.map((link, i) => (
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
                                      {link.desc && (
                                        <span className="link-desc">{t(link.desc)}</span>
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
                  </motion.div>
                )}
              </AnimatePresence>
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
              style={{ backgroundColor: '#B7791F', color: '#fff' }}
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
          <div className="lg:hidden flex items-center gap-3">
            <React.Suspense fallback={null}>
              <LanguageSwitcher />
            </React.Suspense>
            <motion.button
              className="mobile-menu-trigger"
              onClick={() => setIsMobileOpen(true)}
              aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
              whileTap={{ scale: 0.9 }}
            >
              <OptimizedIcon icon={isMobileOpen ? X : List} className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

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
