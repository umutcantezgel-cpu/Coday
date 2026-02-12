import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LocalizedLink as Link } from '../../shared/ui/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../shared/ui/Icon';
import { LanguageSwitcher } from './LanguageSwitcher';
import { NavItem } from './config';
import './MobileReadyNav.css';

interface MobileNavOverlayProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavOverlay: React.FC<MobileNavOverlayProps> = ({ items, isOpen, onClose }) => {
  const { t } = useTranslation('common');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleItem = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  // Lock body scroll and handle escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-nav-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-nav-open');
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-nav-open');
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Full-screen overlay variants
  const overlayVariants = {
    closed: {
      opacity: 0,
      y: '-100%',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] as any },
    },
    open: {
      opacity: 1,
      y: 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] as any },
    },
    exit: {
      opacity: 0,
      y: '-20%', // Slide up slightly on exit
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 0.3, ease: 'easeIn' as any },
    },
  };

  // Content stagger variants
  const containerVariants = {
    open: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, y: 15, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="mobile-overlay-container"
          initial="closed"
          animate="open"
          exit="exit"
          variants={overlayVariants}
          aria-hidden={!isOpen}
        >
          {/* Header (Mimics Navbar) */}
          <div className="mobile-header">
            <Link to="/" className="mobile-logo" onClick={onClose}>
              <Icon name="code" className="w-6 h-6 text-slate-900" />
              <span className="font-bold text-xl text-slate-900">Coday</span>
            </Link>
            <button
              onClick={onClose}
              className="mobile-close-btn"
              aria-label={t('nav.close', { defaultValue: 'Close Menu' })}
            >
              <Icon name="x" className="w-8 h-8 text-slate-900" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="mobile-content-scroll">
            <motion.div
              className="mobile-nav-list"
              variants={containerVariants}
              initial="closed"
              animate="open"
            >
              {items.map((item) => (
                <motion.div
                  key={item.label}
                  className="mobile-group-wrapper"
                  variants={itemVariants}
                >
                  <button
                    className={`mobile-accordion-trigger ${expandedItem === item.label ? 'active' : ''}`}
                    onClick={() => toggleItem(item.label)}
                    aria-expanded={expandedItem === item.label}
                  >
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                      {t(item.label)}
                    </span>
                    <Icon
                      name="chevron-down"
                      className={`w-5 h-5 transition-transform duration-300 ${
                        expandedItem === item.label ? 'rotate-180 text-primary' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {expandedItem === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mobile-accordion-content">
                          {item.groups ? (
                            item.groups.map((group, idx) => (
                              <div key={idx} className="mb-6 last:mb-2">
                                {item.groups!.length > 1 && (
                                  <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3 pl-2 border-l-2 border-slate-200">
                                    {t(group.title)}
                                  </h4>
                                )}
                                <div className="space-y-1">
                                  {group.links.map((link) => (
                                    <Link
                                      key={link.href}
                                      to={link.href}
                                      className="mobile-link-item"
                                      onClick={onClose}
                                    >
                                      <span className="font-medium text-slate-700">
                                        {t(link.label)}
                                      </span>
                                      {link.desc && (
                                        <span className="text-xs text-slate-500 line-clamp-1">
                                          {t(link.desc)}
                                        </span>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="space-y-1">
                              {item.links?.map((link) => (
                                <Link
                                  key={link.href}
                                  to={link.href}
                                  className="mobile-link-item"
                                  onClick={onClose}
                                >
                                  <span className="font-medium text-slate-700">
                                    {t(link.label)}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Footer (Fixed at bottom) */}
          <div className="mobile-footer-actions">
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex-shrink-0">
                <LanguageSwitcher />
              </div>
              <Link
                to="/contact"
                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl font-semibold active:scale-[0.98] transition-transform"
                onClick={onClose}
              >
                <span>{t('nav.cta_booking', { defaultValue: 'Termin buchen' })}</span>
                <Icon name="arrow-right" className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
