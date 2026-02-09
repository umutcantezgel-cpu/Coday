import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === 'de' ? 'en' : 'de';

    // Get current path segments
    const pathname = location.pathname;
    const segments = pathname.split('/').filter(Boolean);

    // Replace language segment
    if (['de', 'en'].includes(segments[0])) {
      segments[0] = newLang;
    } else {
      // If no lang prefix (e.g. root), prepend
      segments.unshift(newLang);
    }

    const newPath = '/' + segments.join('/');
    navigate(newPath);
  };

  return (
    <motion.button
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/50 hover:border-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
      onClick={toggleLanguage}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={
        i18n.language === 'de'
          ? 'Switch to English'
          : 'Auf Deutsch wechseln'
      }
      title="Switch Language"
    >
      <Icon name="globe" className="w-4 h-4 opacity-70" />
      <span className="font-bold text-xs uppercase tracking-wider">
        {i18n.language === 'de' ? 'DE' : 'EN'}
      </span>
    </motion.button>
  );
};
