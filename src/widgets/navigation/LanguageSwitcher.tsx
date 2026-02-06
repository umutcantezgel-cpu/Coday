import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';

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
      className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100/10 hover:bg-slate-200/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Sprache wechseln / Switch Language"
      title="Switch Language"
    >
      <span className="font-bold text-xs uppercase tracking-wider">
        {i18n.language === 'de' ? 'DE' : 'EN'}
      </span>
    </motion.button>
  );
};
