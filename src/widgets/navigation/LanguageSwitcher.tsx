import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Icon } from '../../shared/ui/Icon';

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'de' ? 'en' : 'de';
        i18n.changeLanguage(newLang);
    };

    return (
        <motion.button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
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
