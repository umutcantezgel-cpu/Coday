'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { industriesData } from '@/shared/data/industries';
import {
  Buildings as Building2,
  Hammer,
  Stethoscope,
  Scales as Scale,
  ForkKnife as Utensils,
  ShoppingCart,
  Briefcase,
  RocketLaunch as Rocket,
  Car,
  House,
  MagnifyingGlass,
  ArrowRight,
  CheckCircle,
  Star,
  ShieldCheck,
  Lightning,
  TrendUp,
  X,
  Sparkle,
} from '@phosphor-icons/react/dist/ssr';

import { industryHeroImages, industryFallbackImage } from '@/shared/data/industryImages';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';

const iconMap: Record<string, React.ElementType> = {
  hammer: Hammer,
  apartment: Building2,
  local_hospital: Stethoscope,
  gavel: Scale,
  restaurant: Utensils,
  shopping_cart: ShoppingCart,
  business_center: Briefcase,
  rocket_launch: Rocket,
  directions_car: Car,
};

const categoryIndustryMap: Record<string, string[]> = {
  all: [
    'handwerk-bau',
    'aerzte-gesundheit',
    'anwaelte-kanzleien',
    'unternehmensberatung',
    'gastronomie-hotellerie',
    'retail',
    'immobilien',
    'automobil',
    'startups-tech',
  ],
  craft: ['handwerk-bau', 'automobil'],
  healthcare: ['aerzte-gesundheit'],
  legal: ['anwaelte-kanzleien'],
  services: ['unternehmensberatung', 'startups-tech'],
  hospitality: ['gastronomie-hotellerie'],
  retail: ['retail'],
  realestate: ['immobilien'],
};

export function IndustryOverviewClient() {
  const t = useTranslations('industries');
  const locale = useLocale();
  const isEn = locale === 'en';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = [
    { key: 'all', label: t('overview.filters.all'), icon: Building2 },
    { key: 'craft', label: t('overview.filters.craft'), icon: Hammer },
    { key: 'healthcare', label: t('overview.filters.healthcare'), icon: Stethoscope },
    { key: 'legal', label: t('overview.filters.legal'), icon: Scale },
    { key: 'services', label: t('overview.filters.services'), icon: Briefcase },
    { key: 'hospitality', label: t('overview.filters.hospitality'), icon: Utensils },
    { key: 'retail', label: t('overview.filters.retail'), icon: ShoppingCart },
    { key: 'realestate', label: t('overview.filters.realestate'), icon: House },
  ];

  const allIndustries = Object.values(industriesData);

  const filteredIndustries = useMemo(() => {
    return allIndustries.filter((industry) => {
      const matchesCategory =
        activeCategory === 'all' ||
        (categoryIndustryMap[activeCategory] &&
          categoryIndustryMap[activeCategory].includes(industry.slug));

      const titleText = t(industry.title).toLowerCase();
      const excerptText = t(
        industry.hero.excerpt || industry.hero.subheadline || industry.hero.headline
      ).toLowerCase();
      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        query === '' || titleText.includes(query) || excerptText.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [allIndustries, activeCategory, searchQuery, t]);

  return (
    <main className="bg-background-light min-h-dvh pt-4 pb-20 md:pt-6 md:pb-28">
      {/* 1. ASYMMETRIC VALUE HERO */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 lg:mb-16">
        <div className="mb-6 flex justify-start">
          <Breadcrumbs />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (7 cols): Strong Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-bold tracking-wide uppercase shadow-xs">
              <OptimizedIcon icon={Sparkle} className="w-4 h-4 text-primary" weight="fill" />
              <span>{t('overview.badge')}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-secondary tracking-tight leading-[1.1]">
              <span>{t('overview.headline_prefix')} </span>
              <GradientText
                colors={['#147a7a', '#2563eb', '#147a7a']}
                animationSpeed={8}
                className="inline-block"
              >
                {t('overview.headline_gradient')}
              </GradientText>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
              {t('overview.description')}
            </p>

            {/* Quick Search & Trust Bar */}
            <div className="pt-2 space-y-4">
              <div className="relative max-w-xl">
                <OptimizedIcon
                  icon={MagnifyingGlass}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('overview.search_placeholder')}
                  className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-xs text-sm sm:text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md"
                    aria-label="Clear search"
                  >
                    <OptimizedIcon icon={X} className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Review Authority Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://maps.app.goo.gl/9SagecgXw7Vf5csH7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:border-primary/50 hover:text-primary transition-all shadow-xs"
                >
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <OptimizedIcon key={i} icon={Star} className="w-3.5 h-3.5" weight="fill" />
                    ))}
                  </div>
                  <span>5.0 · Google (Wetzlar)</span>
                </a>
                <a
                  href="https://www.provenexpert.com/de-de/coday-webagentur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:border-primary/50 hover:text-primary transition-all shadow-xs"
                >
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <OptimizedIcon key={i} icon={Star} className="w-3.5 h-3.5" weight="fill" />
                    ))}
                  </div>
                  <span>5.0 · ProvenExpert</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Live Performance Matrix Card */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-xl space-y-6 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {isEn ? 'Industry Benchmarks' : 'Branchen-Kennzahlen'}
                  </span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
                  Next.js 15 Headless
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-primary mb-1">
                    <OptimizedIcon icon={TrendUp} className="w-4 h-4" weight="bold" />
                    <span className="text-2xl font-black font-display text-slate-900">+140%</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">
                    {isEn ? 'Avg. Lead Conversion' : 'Ø Mehr qualifizierte Leads'}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                    <OptimizedIcon icon={Lightning} className="w-4 h-4" weight="bold" />
                    <span className="text-2xl font-black font-display text-slate-900">
                      &lt; 0.3s
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">
                    {isEn ? 'Server Response Time' : 'Ladezeit (Sub-Sekunde)'}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                    <OptimizedIcon icon={ShieldCheck} className="w-4 h-4" weight="bold" />
                    <span className="text-2xl font-black font-display text-slate-900">100%</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">
                    {isEn ? 'GDPR & GoBD Compliance' : 'DSGVO & Rechtssicherheit'}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-purple-600 mb-1">
                    <OptimizedIcon icon={CheckCircle} className="w-4 h-4" weight="bold" />
                    <span className="text-2xl font-black font-display text-slate-900">100%</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">
                    {isEn ? 'Code Ownership' : 'Quellcode-Eigentum'}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/calculator"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 transition-all text-sm shadow-md"
                >
                  <span>{t('overview.cta_banner.calculator_btn')}</span>
                  <OptimizedIcon icon={ArrowRight} className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE CATEGORY FILTER BAR */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <OptimizedIcon icon={Icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. ASYMMETRIC BENTO GRID FOR INDUSTRIES */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {filteredIndustries.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 max-w-xl mx-auto p-8">
            <OptimizedIcon
              icon={MagnifyingGlass}
              className="w-12 h-12 text-slate-300 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {isEn ? 'No industry matches found' : 'Keine Branche gefunden'}
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              {isEn
                ? 'Try searching with another keyword or reset category filters.'
                : 'Versuchen Sie einen anderen Suchbegriff oder setzen Sie den Filter zurück.'}
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-xs"
            >
              {isEn ? 'Reset Filters' : 'Filter zurücksetzen'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredIndustries.map((industry) => {
              const Icon = iconMap[industry.icon] || Building2;
              const image = industryHeroImages[industry.slug] || industryFallbackImage;

              return (
                <div
                  key={industry.slug}
                  className="group relative flex flex-col justify-between p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                >
                  {/* Subtle Background Image with Smooth Hover Scale */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
                    <OptimizedImage
                      src={image.src}
                      alt={t(industry.title)}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-white/70 pointer-events-none" />

                  {/* Card Content */}
                  <div className="relative z-10 space-y-4">
                    {/* Top Row: Icon + Performance Badge */}
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-xs">
                        <Icon size={28} />
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <OptimizedIcon
                          icon={Lightning}
                          className="w-3 h-3 text-amber-500"
                          weight="fill"
                        />
                        {t('overview.card.speed_guarantee')}
                      </span>
                    </div>

                    {/* Title with Localized Link (No hardcoded locale!) */}
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 group-hover:text-primary transition-colors leading-snug">
                      <Link
                        href={`/branchen/${industry.slug}`}
                        className="before:absolute before:inset-0 focus:outline-none"
                      >
                        {t(industry.title)}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {t(
                        industry.hero.excerpt || industry.hero.subheadline || industry.hero.headline
                      )}
                    </p>

                    {/* Feature Highlights Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {industry.solutions.slice(0, 2).map((sol, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-100"
                        >
                          {t(sol.title)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: CTA Arrow */}
                  <div className="relative z-10 pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-primary font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 group-hover:underline">
                      {t('overview.card.view_solution')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <OptimizedIcon
                        icon={ArrowRight}
                        className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. TECHNOLOGY & ROI COMPARISON MATRIX */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lg">
          <div className="max-w-3xl mb-10 space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-wider block">
              {t('overview.comparison.badge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-secondary tracking-tight">
              {t('overview.comparison.title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t('overview.comparison.subtitle')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/4">
                    Kriterium
                  </th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-3/8 bg-slate-50/50 rounded-t-xl">
                    {t('overview.comparison.col_generic')}
                  </th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-primary w-3/8 bg-primary/5 rounded-t-xl">
                    {t('overview.comparison.col_coday')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-900">
                    {t('overview.comparison.row1_title')}
                  </td>
                  <td className="py-4 px-4 text-slate-500 bg-slate-50/30">
                    {t('overview.comparison.row1_generic')}
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-900 bg-primary/5 text-primary">
                    ✓ {t('overview.comparison.row1_coday')}
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-900">
                    {t('overview.comparison.row2_title')}
                  </td>
                  <td className="py-4 px-4 text-slate-500 bg-slate-50/30">
                    {t('overview.comparison.row2_generic')}
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-900 bg-primary/5 text-primary">
                    ✓ {t('overview.comparison.row2_coday')}
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-900">
                    {t('overview.comparison.row3_title')}
                  </td>
                  <td className="py-4 px-4 text-slate-500 bg-slate-50/30">
                    {t('overview.comparison.row3_generic')}
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-900 bg-primary/5 text-primary">
                    ✓ {t('overview.comparison.row3_coday')}
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-900">
                    {t('overview.comparison.row4_title')}
                  </td>
                  <td className="py-4 px-4 text-slate-500 bg-slate-50/30">
                    {t('overview.comparison.row4_generic')}
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-900 bg-primary/5 text-primary">
                    ✓ {t('overview.comparison.row4_coday')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED CLIENT PROOF & REAL REFERENCES */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-primary font-bold text-xs uppercase tracking-wider block">
            {t('overview.proof.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-secondary">
            {t('overview.proof.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">{t('overview.proof.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Batherm Haustechnik */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-primary/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Handwerk & TGA
              </span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <OptimizedIcon key={i} icon={Star} className="w-3.5 h-3.5" weight="fill" />
                ))}
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {t('overview.proof.batherm_title')}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('overview.proof.batherm_desc')}
            </p>
          </div>

          {/* MS Schlüsseldienst Wetzlar */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-primary/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Lokale Dominanz
              </span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <OptimizedIcon key={i} icon={Star} className="w-3.5 h-3.5" weight="fill" />
                ))}
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {t('overview.proof.schluessel_title')}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('overview.proof.schluessel_desc')}
            </p>
          </div>

          {/* Lindener Ratsstuben */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-primary/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Gastronomie & Event
              </span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <OptimizedIcon key={i} icon={Star} className="w-3.5 h-3.5" weight="fill" />
                ))}
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {t('overview.proof.ratsstuben_title')}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('overview.proof.ratsstuben_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 6. CONVERSION CTA BANNER */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-secondary via-secondary to-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden text-center max-w-5xl mx-auto space-y-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-primary-200 text-xs font-bold uppercase tracking-wider border border-white/15">
            {t('overview.cta_banner.badge')}
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-balance max-w-3xl mx-auto">
            {t('overview.cta_banner.title')}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('overview.cta_banner.description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/booking"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all text-sm shadow-lg flex items-center justify-center gap-2"
            >
              <span>{t('overview.cta_banner.button')}</span>
              <OptimizedIcon icon={ArrowRight} className="w-4 h-4" />
            </Link>

            <Link
              href="/calculator"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all text-sm border border-white/20"
            >
              <span>{t('overview.cta_banner.calculator_btn')}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
