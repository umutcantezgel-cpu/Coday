import React from 'react';

interface SeoContentBlockProps {
  title?: string;
  text?: string;
}

export const SeoContentBlock: React.FC<SeoContentBlockProps> = ({ title, text }) => {
  if (!title || !text) return null;

  // Split text by newlines into paragraphs
  const paragraphs = text.split('\n').filter((p) => p.trim() !== '');

  return (
    <section className="bg-white py-16 px-4 border-t border-gray-100">
      <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
        <h2 className="text-3xl font-display font-bold text-secondary mb-8">{title}</h2>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-600 leading-relaxed mb-6">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};
