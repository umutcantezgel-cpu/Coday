'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import {
  CheckCircle,
  ShieldCheck,
  Lightning,
  Sparkle,
  Briefcase,
  Users,
  Heart,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';

import ValuesDeck from '@/features/culture/ValuesDeck';
import TeamGallery from '@/features/culture/TeamGallery';

const Culture: React.FC = () => {
  const t = useTranslations('careers');
  const locale = useLocale();
  const isEn = locale === 'en';
  const values = (t.raw('culture.values.items') as string[]) || [];

  const careerNav = [
    { label: isEn ? 'Overview' : 'Übersicht', href: '/career', icon: Sparkle },
    { label: isEn ? 'Open Jobs' : 'Offene Stellen', href: '/career/jobs', icon: Briefcase },
    { label: isEn ? 'Culture & Values' : 'Kultur & Werte', href: '/career/culture', icon: Users },
    { label: isEn ? 'Perks & Benefits' : 'Benefits', href: '/career/benefits', icon: Heart },
  ];

  return (
    <main className="bg-background-light min-h-dvh pt-4 pb-20 md:pt-6 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex justify-start">
          <Breadcrumbs />
        </div>

        {/* Career Subnavigation */}
        <nav aria-label="Career Navigation" className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs gap-1 sm:gap-2">
            {careerNav.map((tab) => {
              const isActive = tab.href === '/career/culture';
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
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

        {/* Hero Section */}
        <section className="relative text-center max-w-4xl mx-auto mb-16 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <OptimizedIcon icon={Sparkle} className="w-3.5 h-3.5 text-primary" weight="fill" />
            {t('culture.hero.badge')}
          </span>

          <h1 className="block font-display font-black text-4xl sm:text-6xl lg:text-7xl text-secondary tracking-tight">
            <span>{t('culture.hero.title_start')} </span>
            <GradientText
              colors={['#147a7a', '#2563eb', '#147a7a']}
              animationSpeed={8}
              className="inline-block"
            >
              {t('culture.hero.title_gradient')}
            </GradientText>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            {t('culture.hero.desc')}
          </p>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
              <OptimizedIcon icon={CheckCircle} className="w-4 h-4 text-emerald-600" />
              <span>100% Inhaberbetreuung</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
              <OptimizedIcon icon={Lightning} className="w-4 h-4 text-amber-500" />
              <span>Sub-0,3s Performance</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
              <OptimizedIcon icon={ShieldCheck} className="w-4 h-4 text-primary" />
              <span>Strikte TypeScript-Standards</span>
            </div>
          </div>
        </section>

        {/* Values Deck Section */}
        <section className="mb-20">
          <div className="text-center mb-12 max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
              Grundsätze
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary">
              {t('culture.values.title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">{t('culture.values.desc')}</p>
          </div>

          <ValuesDeck />

          {/* Values List Strip */}
          <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto">
            <ul className="grid sm:grid-cols-2 gap-4" role="list">
              {values.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                    <OptimizedIcon icon={CheckCircle} className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Anti-Agency Principle / Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12 max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
              Handwerk & Philosophie
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary">
              {t('culture.team.title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">{t('culture.team.desc')}</p>
          </div>

          <TeamGallery />

          {/* Recruiting CTA Banner */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-secondary text-white border border-slate-800 text-center relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary-200 rounded-full text-xs font-bold uppercase tracking-wider">
                {isEn ? 'Join Our Mission' : 'Werde Teil unseres Teams'}
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                {isEn
                  ? 'Ready to redefine web excellence with us?'
                  : 'Bereit, mit uns den Qualitätsstandard neu zu definieren?'}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {isEn
                  ? 'We are always looking for passionate engineers, designers, and growth specialists who take extreme pride in their craft.'
                  : 'Wir suchen stets Entwickler, Designer und Growth-Spezialisten mit handwerklichem Ehrgeiz und Hunger auf Spitzenleistungen.'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="/career/jobs"
                  className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-md flex items-center gap-2 text-sm"
                >
                  <span>{isEn ? 'View Open Positions' : 'Offene Stellen ansehen'}</span>
                  <OptimizedIcon icon={ArrowRight} className="w-4 h-4" />
                </Link>
                <Link
                  href="/career/benefits"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all border border-white/20 text-sm"
                >
                  {isEn ? 'Explore Benefits' : 'Benefits entdecken'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Culture;
