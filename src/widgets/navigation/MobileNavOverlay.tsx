import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LocalizedLink as Link } from '../../shared/ui/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../shared/ui/Icon';
import { LanguageSwitcher } from './LanguageSwitcher';
import { NavItem } from './config';
// CardNav.css removed

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

  // Prevent scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-overlay"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="mobile-overlay-header">
            <Link to="/" className="nav-pill-logo" onClick={onClose}>
              <Icon name="code" className="logo-icon" />
              <span className="logo-text">Coday</span>
            </Link>
            <button className="mobile-close-btn" onClick={onClose} aria-label="Close Menu">
              <Icon name="x" />
            </button>
          </div>

          <div className="mobile-menu-items">
            {items.map((item) => (
              <div key={item.label} className="mobile-item-group">
                <button
                  className="mobile-item-trigger"
                  onClick={() => toggleItem(item.label)}
                  aria-expanded={expandedItem === item.label}
                >
                  {t(item.label)}
                  <Icon
                    name="chevron-down"
                    className={`nav-chevron ${expandedItem === item.label ? 'rotate' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {expandedItem === item.label && (
                    <motion.div
                      className="mobile-sub-list"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.groups
                        ? item.groups.map((group) => (
                            <div key={group.title} className="mobile-sub-group">
                              {item.groups!.length > 1 && (
                                <div className="text-xs uppercase text-slate-400 font-bold mb-2 mt-2">
                                  {t(group.title)}
                                </div>
                              )}
                              {group.links.map((link) => (
                                <Link
                                  key={link.href}
                                  to={link.href}
                                  className="mobile-sub-link"
                                  onClick={onClose}
                                >
                                  {t(link.label)}
                                </Link>
                              ))}
                            </div>
                          ))
                        : item.links?.map((link) => (
                            <Link
                              key={link.href}
                              to={link.href}
                              className="mobile-sub-link"
                              onClick={onClose}
                            >
                              {t(link.label)}
                            </Link>
                          ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mobile-footer">
            <div className="flex justify-center mb-4">
              <LanguageSwitcher />
            </div>
            <Link to="/contact" className="mobile-cta-btn" onClick={onClose}>
              {t('buttons.start_project') || 'Projekt starten'}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
