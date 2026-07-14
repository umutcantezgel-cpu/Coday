'use client';

import React from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { DownloadSimple } from '@phosphor-icons/react/dist/ssr';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { whitepaperData } from '@/shared/data/whitepapers';
import { useTranslations, useLocale } from 'next-intl';

const Whitepapers: React.FC = () => {
  const t = useTranslations('knowledge');
  const locale = useLocale();
  const currentLang = locale as 'de' | 'en';

  return (
    <main className="bg-background-light min-h-dvh pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-display font-black text-5xl md:text-6xl text-gradient mb-6">
            {t('whitepapers.title')}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t('whitepapers.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {whitepaperData.map((paper) => (
            <article
              key={paper.id}
              className="flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow motion-reduce:duration-[0.01ms] duration-300 group"
            >
              <div className="h-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <OptimizedImage
                  src={paper.image}
                  alt={paper.content[currentLang].alt}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform motion-reduce:duration-[0.01ms] duration-700"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="w-12 h-16 bg-white shadow-lg rounded-sm transform -rotate-6 border border-gray-200 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-gray-400 rotate-90">PDF</span>
                  </div>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  {paper.content[currentLang].tag}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {paper.content[currentLang].title}
                </h3>
                <p className="text-slate-500 mb-8 flex-1">
                  {paper.content[currentLang].description}
                </p>

                <a
                  href={paper.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl border-2 border-slate-100 text-gray-900 font-bold hover:border-blue-500 hover:text-blue-600 transition-colors motion-reduce:duration-[0.01ms] flex items-center justify-center group-hover:bg-blue-50"
                >
                  <OptimizedIcon icon={DownloadSimple} className="mr-2" />
                  {t('whitepapers.download')}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};
export default Whitepapers;
