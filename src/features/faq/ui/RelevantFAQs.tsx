'use client';
import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { CaretDown } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { m } from 'motion/react';
import { Link } from '@/i18n/navigation';
import { getFAQs } from '@/features/faq/model';

interface Props {
  serviceId: string | string[];
  title?: string;
  className?: string;
  /**
   * Emit this block's FAQPage JSON-LD. Set to false on pages whose own `@graph`
   * already carries an FAQPage — two FAQPage nodes in one document is the same
   * rich-result validity risk as two AggregateRating nodes.
   */
  emitSchema?: boolean;
}

export const RelevantFAQs: React.FC<Props> = ({
  serviceId,
  title,
  className = '',
  emitSchema = true,
}) => {
  const t = useTranslations('faq');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const faqs = getFAQs(locale);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const relevant = faqs
    .filter((faq) => {
      if (Array.isArray(serviceId)) {
        return faq.relatedServices?.some((s) => serviceId.includes(s));
      }
      return faq.relatedServices?.includes(serviceId);
    })
    .slice(0, 5);

  if (relevant.length === 0) return null;

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: relevant.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />'),
      },
    })),
  };

  return (
    <section className={`py-16 ${className}`}>
      {emitSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-black text-slate-900  mb-10 text-center">
          {title || tCommon('generic_detail.faq.title')}
        </h2>
        <div className="space-y-4">
          {relevant.map((faq) => (
            <m.div
              key={faq.id}
              className={`bg-white  rounded-2xl border transition-colors motion-reduce:duration-[0.01ms] overflow-hidden ${
                openItem === faq.id
                  ? 'border-blue-500 shadow-md ring-1 ring-blue-500'
                  : 'border-slate-200  hover:border-blue-300'
              }`}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="active:scale-[0.97] w-full flex justify-between items-center p-6 text-left focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:rounded-xl"
                aria-expanded={openItem === faq.id}
                aria-controls={`relevant-faq-answer-${faq.id}`}
              >
                <span className="font-display font-bold text-lg text-slate-900  pr-8">
                  {faq.question}
                </span>
                <CaretDown
                  className={`h-5 w-5 text-slate-500 transition-transform motion-reduce:duration-[0.01ms] duration-300 ${
                    openItem === faq.id ? 'rotate-180 text-blue-500' : ''
                  }`}
                />
              </button>
              {openItem === faq.id && (
                <div
                  id={`relevant-faq-answer-${faq.id}`}
                  role="region"
                  className="px-6 pb-6 text-slate-600  leading-relaxed prose prose-blue  max-w-none"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: faq.answer
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br />'),
                    }}
                  />
                </div>
              )}
            </m.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/knowledge/faq" className="text-blue-600  font-bold hover:underline">
            {t('categories.all')} →
          </Link>
        </div>
      </div>
    </section>
  );
};
