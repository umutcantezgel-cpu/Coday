import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarBlank } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const ScrollContextCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 100dvh (Hero)
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 inset-x-0 mx-auto w-full max-w-sm md:max-w-md z-50 px-4 hidden lg:block"
        >
          <div className="bg-secondary/90 backdrop-blur-xl border border-white/10 p-3 rounded-full shadow-2xl flex items-center justify-between pl-6">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {t('scroll_cta.ready')}
              </span>
              <span className="text-sm font-bold text-white">{t('scroll_cta.dominate')}</span>
            </div>
            <NavLink
              to="/booking"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <CalendarBlank size={16} />
              {t('scroll_cta.book_audit')}
            </NavLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
