import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Accessibility skip-link. Allows keyboard users to jump directly to #main-content.
 * Visible only when focused (screen-reader and keyboard-only friendly).
 */
export const SkipLink: React.FC = () => {
    const { i18n } = useTranslation();
    const label = i18n.language === 'en' ? 'Skip to main content' : 'Zum Hauptinhalt springen';

    return (
        <a
            href="#main-content"
            className="
        sr-only focus:not-sr-only
        focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
        focus:px-4 focus:py-2 focus:rounded-lg
        focus:bg-white focus:text-gray-900 focus:shadow-lg focus:ring-2 focus:ring-blue-500
        focus:outline-none
        font-medium text-sm
        transition-all
      "
        >
            {label}
        </a>
    );
};
