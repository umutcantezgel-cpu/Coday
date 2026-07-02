import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/shared/lib/utils';
import { baseButtonStyles, buttonVariants, buttonSizes } from '@/shared/ui/ButtonStyles';

/**
 * SEO Content Section – Adds keyword-rich, crawlable text to the homepage.
 * Solves: "Wörter aus H1-Überschrift nicht im Text" and "Nur 306 Wörter" warnings.
 * Renders as a clean, readable text block with proper semantic structure.
 */
export const SeoContentSection: React.FC = () => {
  const t = useTranslations('home');

  const paragraphs = t.raw('seo_content.paragraphs') as string[];

  return (
    <section aria-labelledby="seo-content-heading" className="py-[var(--space-section)] bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="seo-content-heading"
          className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-secondary mb-4 leading-tight"
        >
          {t('seo_content.title', { defaultValue: 'Ihre Webdesign Agentur in Wetzlar' })}
        </h2>
        <p className="text-lg text-secondary-700 font-medium mb-8">
          {t('seo_content.subtitle', {
            defaultValue:
              'Websites, die wirklich neue Kunden gewinnen – für Handwerker, Praxen und lokale Unternehmen.',
          })}
        </p>

        <div className="prose prose-lg prose-slate max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base sm:text-lg text-slate-600 leading-[1.8] mb-6 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/booking"
            className={cn(
              baseButtonStyles,
              buttonVariants['primary'],
              buttonSizes['lg'],
              'inline-flex'
            )}
          >
            {t('seo_content.cta', { defaultValue: 'Kostenloses Erstgespräch vereinbaren' })}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};
