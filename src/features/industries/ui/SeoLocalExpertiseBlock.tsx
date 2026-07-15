import React from 'react';
import { useLocale } from 'next-intl';

export const SeoLocalExpertiseBlock: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const locale = useLocale();
  const isDe = locale !== 'en';

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          {isDe
            ? 'Lokale Webdesign Expertise für Wetzlar, Gießen & Hessen'
            : 'Local Web Design Expertise for Wetzlar, Gießen & Hesse'}
        </h2>
        <div className="prose prose-lg text-gray-600 max-w-none text-pretty">{children}</div>
      </div>
    </section>
  );
};
