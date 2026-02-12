import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '../../shared/ui/Icon';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLocation } from 'react-router-dom';
import { LocalizedLink as Link } from '../../shared/ui/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { getNavItems } from './config';
import { MobileNavOverlay } from './MobileNavOverlay';
import './CardNav.css';

interface CardNavProps {
  className?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  className = '',
  buttonBgColor = '#137A7A', // Darker Teal for >4.5:1 contrast
  buttonTextColor = '#fff',
}) => {
  const { t } = useTranslation('common');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
      transition: { duration: 0.15 },
    },
  };

  return (
    <div className={`card-nav-container ${className}`} ref={navRef}>
      {/* Floating Pill */}
      <nav className="nav-pill" aria-label="Hauptnavigation">
        {/* Logo */}
        <Link to="/" className="nav-pill-logo" aria-label="Zur Startseite">
          <Icon name="code" className="logo-icon" />
          <span className="logo-text">Coday</span>
        </Link>

        {/* Desktop Links (Center) */}
        <div className="nav-pill-links hidden lg:flex">
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
              >
                {t(item.label)}
                <Icon
                  name="chevron-down"
                  className={`nav-chevron ${activeCategory === item.label ? 'rotate' : ''}`}
                />
              </button>

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
                                      <Icon name="arrow-up-right" className="link-arrow" />
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
          <React.Suspense fallback={null}>
            <LanguageSwitcher />
          </React.Suspense>

          <Link
            to="/packages"
            className="nav-pill-cta hidden sm:flex"
            style={{ backgroundColor: '#B7791F', color: '#fff' }} // Darker Gold for >3:1 contrast against white text (large) or 4.5:1 norm
          >
            <span>{t('nav.packages.label', { defaultValue: 'Pakete' })}</span>
            <Icon name="arrow-right" className="cta-arrow" />
          </Link>

          <Link
            to="/contact"
            className="nav-pill-cta"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            <span>{t('nav.cta_booking', { defaultValue: 'Termin' })}</span>
            <Icon name="arrow-right" className="cta-arrow" />
          </Link>

          {/* Mobile Hamburger (Visible only on mobile) */}
          <div className="lg:hidden ml-2">
            <button
              className="mobile-menu-trigger"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open Menu"
            >
              <Icon name="menu" />
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
    </div>
  );
};

export default CardNav;
