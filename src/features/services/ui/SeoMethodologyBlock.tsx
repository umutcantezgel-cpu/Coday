import React from 'react';
import { useLocale } from 'next-intl';

export const SeoMethodologyBlock: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const locale = useLocale();
  const isDe = locale !== 'en';

  if (!children) return null;

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100 mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          {isDe ? 'Coday Qualitätsanspruch & Methodik' : 'Coday Quality Standard & Methodology'}
        </h2>
        <div className="prose prose-lg text-gray-600 max-w-none text-pretty">{children}</div>
      </div>
    </section>
  );
};
