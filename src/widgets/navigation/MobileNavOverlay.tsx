'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { m, AnimatePresence, useReducedMotion } from 'motion/react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CaretDown, ArrowRight, X } from '@phosphor-icons/react/dist/ssr';
import { LanguageSwitcher } from '@/widgets/navigation/LanguageSwitcher';
import { NavItem } from '@/widgets/navigation/config';
import '@/widgets/navigation/MobileReadyNav.css';

import { useFocusTrap } from '@/shared/hooks/useFocusTrap';
import { useScrollLock } from '@/hooks/use-scroll-lock';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleItem = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  // Lock body scroll
  useScrollLock(isOpen);

  // handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
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
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
    closed: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      transition: {
        duration: 0.3,
      },
    },
  };
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <m.div
          ref={containerRef}
          className="mobile-overlay-container"
          initial="closed"
          animate="open"
          exit="exit"
          variants={overlayVariants}
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.mobile.label', { defaultValue: 'Mobile Navigation' })}
        >
          {/* Custom Premium Header */}
          <div className="mobile-header">
            <Link
              href="/"
              className="mobile-logo"
              onClick={onClose}
              aria-label="Coday - Zur Startseite"
            >
              <span className="text-2xl font-bold text-slate-900 tracking-tight">Coday</span>
            </Link>
            <button
              className="mobile-close-btn"
              onClick={onClose}
              aria-label={t('close', { defaultValue: 'Schließen' })}
            >
              <OptimizedIcon icon={X} className="w-6 h-6 text-slate-800" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="mobile-content-scroll">
            <m.nav
              className="mobile-nav-list"
              aria-label={t('nav.mobile.label', { defaultValue: 'Mobile Navigation' })}
              variants={containerVariants}
              initial="closed"
              animate="open"
            >
              {items.map((item) => (
                <m.div key={item.label} className="mobile-group-wrapper" variants={itemVariants}>
                  <m.button
                    className={`mobile-accordion-trigger ${expandedItem === item.label ? 'active' : ''}`}
                    onClick={() => toggleItem(item.label)}
                    aria-expanded={expandedItem === item.label}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl font-normal tracking-tight text-slate-900">
                      {t(item.label)}
                    </span>
                    <OptimizedIcon
                      icon={CaretDown}
                      className={`w-5 h-5 transition-transform motion-reduce:duration-[0.01ms] duration-300 ${
                        expandedItem === item.label
                          ? 'rotate-180 text-primary-700'
                          : 'text-slate-500'
                      }`}
                    />
                  </m.button>

                  <AnimatePresence initial={false}>
                    {expandedItem === item.label && (
                      <m.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mobile-accordion-content">
                          {item.groups ? (
                            item.groups.map((group, groupIdx) => (
                              <div key={groupIdx} className="mb-6 last:mb-2">
                                {item.groups!.length > 1 && (
                                  <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3 pl-2 border-l-2 border-primary-600">
                                    {t(group.title)}
                                  </h4>
                                )}
                                <div className="space-y-1">
                                  {group.links.map((link, linkIdx) => {
                                    const isExternal = link.href.startsWith('http');

                                    const LinkComponent = (
                                      isExternal ? 'a' : Link
                                    ) as React.ElementType;
                                    const linkProps = isExternal
                                      ? {
                                          href: link.href,
                                          target: '_blank',
                                          rel: 'noopener noreferrer',
                                          locale: false,
                                        }
                                      : {
                                          href: link.href,
                                          ...(link.locale ? { locale: link.locale } : {}),
                                        };

                                    return (
                                      <LinkComponent
                                        key={`${link.href}-${linkIdx}`}
                                        {...linkProps}
                                        className="mobile-link-item"
                                        onClick={onClose}
                                        aria-label={t(link.label)}
                                        title={t(link.label)}
                                      >
                                        <span className="font-semibold text-slate-900">
                                          {t(link.label)}
                                        </span>
                                        {link.desc && (
                                          <span
                                            className="text-xs text-slate-600 line-clamp-1"
                                            aria-hidden="true"
                                          >
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
                              {item.links?.map((link, linkIdx) => {
                                const isExternal = link.href.startsWith('http');
                                const LinkComponent = (
                                  isExternal ? 'a' : Link
                                ) as React.ElementType;
                                const linkProps = isExternal
                                  ? {
                                      href: link.href,
                                      target: '_blank',
                                      rel: 'noopener noreferrer',
                                      locale: false,
                                    }
                                  : {
                                      href: link.href,
                                      ...(link.locale ? { locale: link.locale } : {}),
                                    };

                                return (
                                  <LinkComponent
                                    key={`${link.href}-${linkIdx}`}
                                    {...linkProps}
                                    className="mobile-link-item"
                                    onClick={onClose}
                                  >
                                    <span className="font-semibold text-slate-900">
                                      {t(link.label)}
                                    </span>
                                  </LinkComponent>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              ))}
            </m.nav>
          </div>

          {/* Footer (Fixed at bottom) */}
          <div className="mobile-footer-actions">
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex-shrink-0">
                <LanguageSwitcher />
              </div>
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 text-white py-3.5 rounded-xl font-bold active:scale-[0.98] transition-transform motion-reduce:duration-[0.01ms] shadow-lg shadow-primary-700/25"
                onClick={onClose}
              >
                <span>{t('nav.cta_booking', { defaultValue: 'Termin buchen' })}</span>
                <OptimizedIcon icon={ArrowRight} className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
