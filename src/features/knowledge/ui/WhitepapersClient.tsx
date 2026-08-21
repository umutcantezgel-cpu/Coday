'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import {
  DownloadSimple,
  BookBookmark,
  EnvelopeSimple,
  VideoCamera,
  FilePdf,
  Question,
  Sparkle,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { whitepaperData } from '@/shared/data/whitepapers';

const Whitepapers: React.FC = () => {
  const t = useTranslations('knowledge');
  const locale = useLocale();
  const isEn = locale === 'en';
  const currentLang = locale as 'de' | 'en';

  const knowledgeNav = [
    { label: isEn ? 'Tech Wiki' : 'Tech-Wiki', href: '/knowledge/wiki', icon: BookBookmark },
    {
      label: isEn ? 'Newsletter' : 'Newsletter',
      href: '/knowledge/newsletter',
      icon: EnvelopeSimple,
    },
    { label: isEn ? 'Academy' : 'Academy & Videos', href: '/knowledge/academy', icon: VideoCamera },
    { label: isEn ? 'Whitepapers' : 'Whitepapers', href: '/knowledge/whitepapers', icon: FilePdf },
    { label: isEn ? 'FAQ' : 'FAQ & Support', href: '/knowledge/faq', icon: Question },
  ];

  return (
    <main className="bg-background-light min-h-dvh pt-4 pb-20 md:pt-6 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex justify-start">
          <Breadcrumbs />
        </div>

        {/* Knowledge Subnavigation */}
        <nav aria-label="Knowledge Navigation" className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs gap-1 sm:gap-2 overflow-x-auto max-w-full">
            {knowledgeNav.map((tab) => {
              const isActive = tab.href === '/knowledge/whitepapers';
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-white shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <OptimizedIcon
                    icon={Icon}
                    className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`}
                    weight={isActive ? 'fill' : 'regular'}
                  />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Header Section */}
        <div className="text-left space-y-4 mb-12">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
            {isEn ? 'Reports & Technical Guides' : 'Reports & Technische Leitfäden'}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary tracking-tight">
            <span>{isEn ? 'Expert ' : 'Praxisnahe '}</span>
            <GradientText
              colors={['#147a7a', '#2563eb', '#147a7a']}
              animationSpeed={8}
              className="inline-block"
            >
              {t('whitepapers.title')}
            </GradientText>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            {t('whitepapers.subtitle')}
          </p>
        </div>

        {/* Whitepapers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whitepaperData.map((paper) => (
            <article
              key={paper.id}
              className="flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300 group justify-between"
            >
              <div>
                <div className="h-56 relative overflow-hidden bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
                  <OptimizedImage
                    src={paper.image}
                    alt={paper.content[currentLang].alt}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-sm">
                      <OptimizedIcon
                        icon={FilePdf}
                        className="w-4 h-4 text-rose-600"
                        weight="fill"
                      />
                      PDF Report
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <span className="inline-block text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-0.5 rounded-md">
                    {paper.content[currentLang].tag}
                  </span>
                  <h2 className="text-xl font-bold font-display text-slate-900 leading-snug group-hover:text-primary transition-colors">
                    {paper.content[currentLang].title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {paper.content[currentLang].description}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <a
                  href={paper.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <OptimizedIcon icon={DownloadSimple} className="w-4 h-4" />
                  <span>{t('whitepapers.download')}</span>
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
