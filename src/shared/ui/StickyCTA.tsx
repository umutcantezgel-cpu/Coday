'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as NavLink } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { RocketLaunch } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

export const StickyCTA: React.FC = () => {
  const t = useTranslations('common');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px to ensure user has seen the hero
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:hidden pointer-events-none"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-aurora border border-white/50 p-3 pointer-events-auto flex items-center justify-between gap-4">
            <div className="flex-1">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-0.5">
                {t('cta.sticky.label')}
              </span>
              <span className="text-sm font-bold text-secondary leading-tight block">
                {t('cta.sticky.text')}
              </span>
            </div>
            <NavLink
              href="/contact"
              className="bg-gray-900 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors motion-reduce:duration-[0.01ms] flex items-center gap-2 shadow-lg"
            >
              {t('buttons.start_project')}
              <OptimizedIcon icon={RocketLaunch} className="text-white" />
            </NavLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
