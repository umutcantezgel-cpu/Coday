'use client';

import React, { useState, useMemo } from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { m, AnimatePresence } from 'motion/react';
import { MagnifyingGlass, CaretDown, X } from '@phosphor-icons/react';
import { JsonLd } from '@/shared/ui/JsonLd';
import { getFAQs, getFAQCategories } from '@/features/faq/model';
import TroubleshooterWizard from '@/features/faq/ui/TroubleshooterWizard';

const FAQ = () => {
  const t = useTranslations('faq');
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItem, setOpenItem] = useState<string | null>(null);

  const faqs = getFAQs(locale);
  const categories = getFAQCategories(locale);

  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        searchTerm === '' ||
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, faqs]);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(id);
    setOpenItem(null); // Close accordion on category switch
  };

  return (
    <main className="min-h-dvh bg-background-light pt-24 pb-20">
      <JsonLd
        pageType="faq"
        data={{
          faq: {
            questions: faqs.map((f) => ({
              question: f.question,
              answer: f.answer,
            })),
          },
        }}
      />

      {/* Hero & Search */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-black text-4xl md:text-5xl text-gradient mb-4"
        >
          {t('hero.title')}
        </m.h1>
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-500 mb-8"
        >
          {t('hero.subtitle')}
        </m.p>

        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlass className="h-6 w-6 text-slate-400" />
          </div>
          <label htmlFor="faq-search" className="sr-only">
            {t('search.placeholder')}
          </label>
          <input
            id="faq-search"
            type="search"
            className="block w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg text-lg transition-shadow motion-reduce:duration-[0.01ms]"
            placeholder={t('search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="active:scale-[0.97] absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              aria-label={t('search.clear')}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </m.div>
      </div>

      {/* Troubleshooter Wizard */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <TroubleshooterWizard />
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 overflow-x-auto">
        <div
          className="flex justify-center space-x-2 min-w-max pb-2"
          role="group"
          aria-label={t('categories.all')}
        >
          <button
            onClick={() => handleCategoryClick('all')}
            className={`active:scale-[0.97] px-6 py-2 rounded-full text-sm font-bold transition motion-reduce:duration-[0.01ms] ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
            aria-pressed={selectedCategory === 'all'}
          >
            {t('categories.all')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`active:scale-[0.97] px-6 py-2 rounded-full text-sm font-bold transition motion-reduce:duration-[0.01ms] flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
              aria-pressed={selectedCategory === cat.id}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {filteredFAQs.length > 0 ? (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredFAQs.map((faq) => (
                <m.div
                  key={faq.id}
                  layoutId={faq.id}
                  className={`bg-white rounded-2xl border transition-colors motion-reduce:duration-[0.01ms] overflow-hidden ${
                    openItem === faq.id
                      ? 'border-blue-500 shadow-md ring-1 ring-blue-500'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <h3>
                    <button
                      id={`faq-trigger-${faq.id}`}
                      onClick={() => toggleItem(faq.id)}
                      className="active:scale-[0.97] w-full flex justify-between items-center p-6 text-left focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:rounded-xl"
                      aria-expanded={openItem === faq.id}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      <span className="font-display font-bold text-lg text-slate-900 pr-8">
                        {faq.question}
                      </span>
                      <CaretDown
                        className={`h-5 w-5 text-slate-500 transition-transform motion-reduce:duration-[0.01ms] duration-300 ${
                          openItem === faq.id ? 'rotate-180 text-blue-500' : ''
                        }`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence>
                    {openItem === faq.id && (
                      <m.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        <div
                          id={`faq-answer-${faq.id}`}
                          role="region"
                          aria-labelledby={`faq-trigger-${faq.id}`}
                          className="px-6 pb-6 text-slate-600 leading-relaxed prose prose-blue max-w-none"
                        >
                          {/* Simple markdown rendering or just text with line breaks */}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: faq.answer
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\n/g, '<br />'),
                            }}
                          />
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              ))}
            </m.div>
          ) : (
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <MagnifyingGlass className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('search.no_results')}</h3>
              <p className="text-slate-500">{t('cta.text')}</p>
              <button
                onClick={() => setSearchTerm('')}
                className="active:scale-[0.97] mt-4 text-blue-600 font-bold hover:underline"
              >
                {t('search.clear')}
              </button>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-blue-600 rounded-3xl p-12 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-black text-white mb-4">{t('cta.title')}</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">{t('cta.text')}</p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-colors motion-reduce:duration-[0.01ms]"
            >
              {t('cta.button')}
            </Link>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-700 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>

      <SeoContentBlock title={t('seoText.title')} text={t('seoText.content')} />
    </main>
  );
};

export default FAQ;
