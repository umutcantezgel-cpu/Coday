'use client';

import React, { useState, useMemo } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { wikiEntities } from '@/features/knowledge/model/entities';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import {
  BookBookmark,
  EnvelopeSimple,
  VideoCamera,
  FilePdf,
  Question,
  MagnifyingGlass,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';

export default function WikiHub() {
  const t = useTranslations('knowledge.wiki');
  const locale = useLocale();
  const isEn = locale === 'en';

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const knowledgeNav = [
    { label: isEn ? 'Tech Wiki' : 'Tech-Wiki', href: '/knowledge/wikihub', icon: BookBookmark },
    {
      label: isEn ? 'Newsletter' : 'Newsletter',
      href: '/knowledge/newsletter',
      icon: EnvelopeSimple,
    },
    { label: isEn ? 'Academy' : 'Academy & Videos', href: '/knowledge/academy', icon: VideoCamera },
    { label: isEn ? 'Whitepapers' : 'Whitepapers', href: '/knowledge/whitepapers', icon: FilePdf },
    { label: isEn ? 'FAQ' : 'FAQ & Support', href: '/knowledge/faq', icon: Question },
  ];

  const categories = ['All', 'Tech', 'Business', 'Design'];

  const filteredEntities = useMemo(() => {
    return wikiEntities.filter((entity) => {
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        entity.displayName.toLowerCase().includes(q) ||
        entity.aliases.some((a) => a.toLowerCase().includes(q)) ||
        entity.relatedEntities.some((r) => r.toLowerCase().includes(q));
      const matchesCategory = activeCategory === 'All' || entity.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <main className="bg-background-light min-h-dvh pt-4 pb-20 md:pt-6 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-start">
          <Breadcrumbs />
        </div>

        <nav aria-label="Knowledge Navigation" className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs gap-1 sm:gap-2 overflow-x-auto max-w-full">
            {knowledgeNav.map((tab) => {
              const isActive = tab.href === '/knowledge/wikihub';
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

        <div className="grid lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              {isEn ? 'Engineering & AI Glossary' : 'Entwickler- & KI-Glossar'}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary tracking-tight">
              <span>AI & Tech </span>
              <GradientText
                colors={['#147a7a', '#2563eb', '#147a7a']}
                animationSpeed={8}
                className="inline-block"
              >
                Wiki
              </GradientText>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="relative">
              <OptimizedIcon
                icon={MagnifyingGlass}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"
              />
              <input
                id="wiki-search"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('search_placeholder')}
                aria-label={t('search_aria')}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-xs text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-secondary text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                aria-pressed={isActive}
              >
                {cat === 'All' ? t('categories.all') : cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredEntities.map((entity) => (
            <Link
              key={entity.slug}
              href={`/knowledge/wiki/${entity.slug}`}
              className="group bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary uppercase tracking-wider">
                    {entity.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">/{entity.slug}</span>
                </div>

                <h2 className="text-xl font-bold font-display text-slate-900 group-hover:text-primary transition-colors">
                  {entity.displayName}
                </h2>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {entity.aliases &&
                    entity.aliases.length > 0 &&
                    entity.aliases.slice(0, 2).map((alias, idx) => (
                      <span
                        key={`alias-${idx}`}
                        className="text-[11px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200"
                      >
                        {alias}
                      </span>
                    ))}
                  {entity.relatedEntities &&
                    entity.relatedEntities.slice(0, 3).map((rel, idx) => (
                      <span
                        key={`rel-${idx}`}
                        className="text-[11px] bg-primary/5 text-primary px-2 py-0.5 rounded-md border border-primary/10"
                      >
                        #{rel}
                      </span>
                    ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-primary transition-colors">
                <span>{isEn ? 'Read article' : 'Artikel lesen'}</span>
                <OptimizedIcon
                  icon={ArrowRight}
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          ))}
        </div>

        {filteredEntities.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-xl mx-auto shadow-xs">
            <OptimizedIcon
              icon={MagnifyingGlass}
              className="w-12 h-12 text-slate-300 mx-auto mb-4"
            />
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {isEn ? 'No terms found' : 'Keine Begriffe gefunden'}
            </h3>
            <p className="text-sm text-slate-500">
              {isEn
                ? 'Try adjusting your search query or switching the category filter.'
                : 'Versuche es mit einem anderen Suchbegriff oder wechsle die Kategorie.'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
