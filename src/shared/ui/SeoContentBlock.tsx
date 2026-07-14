import React from 'react';

import { SeoTextInjector } from '@/features/seo/ui/SeoTextInjector';

interface SeoContentBlockProps {
  title?: string;
  text?: string;
  h1?: string;
}

export const SeoContentBlock: React.FC<SeoContentBlockProps> = ({ title, text, h1 }) => {
  // If there's specific text from translation, we show it, but we ALSO always show the generic SeoTextInjector
  const paragraphs = text ? text.split('\n').filter((p) => p.trim() !== '') : [];

  return (
    <section className="bg-white py-8 px-4 border-t border-gray-100">
      <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
        {title && <h2 className="text-3xl font-display font-bold text-secondary mb-8">{title}</h2>}
        {paragraphs.length > 0 &&
          paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-600 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
      </div>
      <SeoTextInjector title={title} h1={h1 || title} />
    </section>
  );
};
