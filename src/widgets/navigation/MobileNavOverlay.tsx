"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CaretDown, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { LanguageSwitcher } from '@/widgets/navigation/LanguageSwitcher';
import { NavItem } from '@/widgets/navigation/config';
import '@/widgets/navigation/MobileReadyNav.css';

import { useFocusTrap } from '@/shared/hooks/useFocusTrap';

interface MobileNavOverlayProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavOverlay: React.FC<MobileNavOverlayProps> = ({ items, isOpen, onClose }) => {
  const t = useTranslations('common');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const containerRef = useFocusTrap(isOpen);
  const shouldReduceMotion = useReducedMotion();

  const toggleItem = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  // Lock body scroll and handle escape key
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overscrollBehavior = 'none';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
      document.body.classList.add('mobile-nav-open');
    } else {
      document.documentElement.style.overflow = '';
      document.documentElement.style.overscrollBehavior = '';
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
      document.body.classList.remove('mobile-nav-open');
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.overscrollBehavior = '';
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
      document.body.classList.remove('mobile-nav-open');
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Full-screen overlay variants
  const overlayVariants = {
    closed: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : '100%',

      transition: {
        duration: 0.4,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
      },
    },
    open: {
      opacity: 1,
      x: 0,

      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : '100%',

      transition: {
        duration: 0.3,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
      },
    },
  };

  // Content stagger variants
  const containerVariants = {
    open: {
      transition: {
        staggerChildren: 0.05, // 50ms Delay pro Item
        delayChildren: 0.15,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
      },
    },
    closed: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,

      transition: {
        duration: 0.4,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
      },
    },
  };
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={containerRef}
          className="mobile-overlay-container"
          initial="closed"
          animate="open"
          exit="exit"
          variants={overlayVariants}
          aria-hidden={!isOpen}
        >
          {/* Scrollable Content */}
          <div className="mobile-content-scroll pt-24">
            <motion.nav
              className="mobile-nav-list"
              aria-label={t('nav.mobile.label', { defaultValue: 'Mobile Navigation' })}
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
                  <motion.button
                    className={`mobile-accordion-trigger ${expandedItem === item.label ? 'active' : ''}`}
                    onClick={() => toggleItem(item.label)}
                    aria-expanded={expandedItem === item.label}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-xl font-bold tracking-tight text-white">
                      {t(item.label)}
                    </span>
                    <OptimizedIcon
                      icon={CaretDown}
                      className={`w-5 h-5 transition-transform duration-300 ${
                        expandedItem === item.label
                          ? 'rotate-180 text-primary-400'
                          : 'text-slate-400'
                      }`}
                    />
                  </motion.button>

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
                                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 pl-2 border-l-2 border-slate-700">
                                    {t(group.title)}
                                  </h4>
                                )}
                                <div className="space-y-1">
                                  {group.links.map((link) => {
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
                                      : { href: link.href };

                                    return (
                                      <LinkComponent
                                        key={link.href}
                                        {...linkProps}
                                        className="mobile-link-item"
                                        onClick={onClose}
                                      >
                                        <span className="font-medium text-slate-200">
                                          {t(link.label)}
                                        </span>
                                        {link.desc && (
                                          <span className="text-xs text-slate-400 line-clamp-1">
                                            {t(link.desc)}
                                          </span>
                                        )}
                                      </LinkComponent>
                                    );
                                  })}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="space-y-1">
                              {item.links?.map((link) => {
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
                                  : { href: link.href };

                                return (
                                  <LinkComponent
                                    key={link.href}
                                    {...linkProps}
                                    className="mobile-link-item"
                                    onClick={onClose}
                                  >
                                    <span className="font-medium text-slate-200">
                                      {t(link.label)}
                                    </span>
                                  </LinkComponent>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.nav>
          </div>

          {/* Footer (Fixed at bottom) */}
          <div className="mobile-footer-actions">
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex-shrink-0">
                <LanguageSwitcher />
              </div>
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-semibold active:scale-[0.98] transition-transform shadow-lg shadow-primary/25"
                onClick={onClose}
              >
                <span>{t('nav.cta_booking', { defaultValue: 'Termin buchen' })}</span>
                <OptimizedIcon icon={ArrowRight} className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
