import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '../../shared/ui/Icon';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getNavItems } from './config';
import './CardNav.css';

interface NavLink {
  label: string;
  href: string;
  ariaLabel?: string;
}

interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
}

interface CardNavProps {
  // items is now optional or we ignore it in favor of internal config
  items?: NavItem[]; // Keeping for backward compat but will use internal
  className?: string; // Wrapper class
  ease?: string; // Deprecated, kept for compat
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const COLLAPSED_HEIGHT = 60;

const CardNav: React.FC<CardNavProps> = ({
  items: _ignoredItems, // We use internal getNavItems for i18n
  className = '',
  baseColor = '#fff',
  menuColor = '#1e293b',
  buttonBgColor = '#1A9A9A',
  buttonTextColor = '#fff',
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Get translated items
  const items = getNavItems();

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  // Animation Variants
  const containerVariants = {
    closed: {
      height: COLLAPSED_HEIGHT,
      transition: {
        duration: 0.35,
        ease: 'easeInOut' as const,
        staggerDirection: -1,
        when: 'afterChildren',
      },
    },
    open: {
      height: 'auto', // Allow dynamic height
      transition: {
        duration: 0.35,
        ease: 'easeInOut' as const,
        staggerChildren: 0.05,
        when: 'beforeChildren',
      },
    },
  };

  const cardVariants = {
    closed: { y: 30, opacity: 0, transition: { duration: 0.2 } },
    open: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' as const } },
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <motion.nav
        className={`card-nav ${isOpen ? 'open' : ''} overflow-hidden`}
        style={{ backgroundColor: baseColor }}
        role="navigation"
        aria-label="Hauptnavigation"
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={containerVariants}
      >
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            role="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
            tabIndex={0}
            style={{ color: menuColor }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <Link
            to="/"
            className="logo-container"
            onClick={() => isOpen && setIsOpen(false)}
            aria-label="Zur Startseite"
          >
            <Icon name="code" className="logo-icon" />
            <span className="logo-text">Coday</span>
          </Link>

          <div className="nav-actions flex items-center gap-3">
            <React.Suspense
              fallback={<div className="w-10 h-10 rounded-full bg-slate-100/50 animate-pulse" />}
            >
              <LanguageSwitcher />
            </React.Suspense>
            <Link
              to="/contact"
              className="card-nav-cta-button"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              onClick={() => isOpen && setIsOpen(false)}
            >
              Schließ dich an
            </Link>
          </div>
        </div>

        <AnimatePresence>
          <motion.div className="card-nav-content" aria-hidden={!isOpen}>
            {items.slice(0, 6).map((item, idx) => (
              <motion.div
                key={`${item.label}-${idx}`}
                className="nav-card"
                style={{ backgroundColor: item.bgColor, color: item.textColor }}
                variants={cardVariants}
              >
                <div className="nav-card-label">{t(item.label)}</div>
                <div className="nav-card-links">
                  {item.links?.map((lnk, i) => (
                    <Link
                      key={`${lnk.label}-${i}`}
                      className="nav-card-link group"
                      to={lnk.href}
                      aria-label={t(lnk.ariaLabel || lnk.label)}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon
                        name="arrow-up-right"
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden="true"
                      />
                      {t(lnk.label)}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default CardNav;
