import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CaretDown } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';
import { getFAQs } from '../model';

interface Props {
  serviceId: string | string[];
  title?: string;
  className?: string;
}

export const RelevantFAQs: React.FC<Props> = ({ serviceId, title, className = '' }) => {
  const { t, i18n } = useTranslation(['faq', 'common']);
  const faqs = getFAQs(i18n.language);
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

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white mb-10 text-center">
          {title || t('hero.title')}
        </h2>
        <div className="space-y-4">
          {relevant.map((faq) => (
            <motion.div
              key={faq.id}
              className={`bg-white dark:bg-slate-800 rounded-2xl border transition-colors overflow-hidden ${
                openItem === faq.id
                  ? 'border-blue-500 shadow-md ring-1 ring-blue-500'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
              }`}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="font-display font-bold text-lg text-slate-900 dark:text-white pr-8">
                  {faq.question}
                </span>
                <CaretDown
                  className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${
                    openItem === faq.id ? 'rotate-180 text-blue-500' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openItem === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 leading-relaxed prose prose-blue dark:prose-invert max-w-none">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: faq.answer
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\n/g, '<br />'),
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="/knowledge/faq"
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            {t('categories.all')} →
          </a>
        </div>
      </div>
    </section>
  );
};
