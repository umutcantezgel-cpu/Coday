"use client";

import React from 'react';
import { useLocale } from 'next-intl';

/**
 * Accessibility skip-link. Allows keyboard users to jump directly to #main-content.
 * Visible only when focused (screen-reader and keyboard-only friendly).
 */
export const SkipLink: React.FC = () => {
  const locale = useLocale();
  const label = locale === 'en' ? 'Skip to main content' : 'Zum Hauptinhalt springen';

  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
        focus:px-4 focus:py-2 focus:rounded-lg
        focus:bg-white focus:text-gray-900 focus:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2
        
        font-medium text-sm
        transition-all
      "
    >
      {label}
    </a>
  );
};
