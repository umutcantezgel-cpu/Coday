'use client';

import React from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  CheckCircle,
  ShieldCheck,
  Lightning,
  Sparkle,
  MapPin,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import ValuesDeck from '@/features/culture/ValuesDeck';
import TeamGallery from '@/features/culture/TeamGallery';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const Culture: React.FC = () => {
  const t = useTranslations('careers');
  const values = (t.raw('culture.values.items') as string[]) || [];

  return (
    <div className="bg-slate-50/50 min-h-dvh">
      {/* Hero Section */}
      <section className="relative pt-4 pb-12 md:pt-6 md:pb-16 px-4 text-center">
        {/* Subtle Background Glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-gradient-to-r from-primary-500/10 via-indigo-500/10 to-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-800 border border-primary-200/80 mb-6 shadow-xs">
            <OptimizedIcon icon={Sparkle} className="w-3.5 h-3.5 text-primary-700" />
            {t('culture.hero.badge')}
          </span>

          <h1 className="block font-display font-black text-4xl sm:text-6xl lg:text-7xl text-slate-900 mb-6 tracking-tight leading-[1.1]">
            <BlurText
              text={t('culture.hero.title_start')}
              delay={80}
              animateBy="words"
              className="inline-block mr-3"
            />
            <GradientText
              colors={['#0f172a', '#4338ca', '#0f172a']}
              animationSpeed={6}
              className="inline-block font-black"
            >
              {t('culture.hero.title_gradient')}
            </GradientText>
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-8 max-w-3xl mx-auto font-normal">
            {t('culture.hero.desc')}
          </p>

          {/* Trust Highlights */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold shadow-xs">
              <OptimizedIcon icon={ShieldCheck} className="w-4 h-4 text-primary-700" />
              100% Inhabergeführt
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold shadow-xs">
              <OptimizedIcon icon={Lightning} className="w-4 h-4 text-amber-600" />
              Sub-Sekunden Speed
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold shadow-xs">
              <OptimizedIcon icon={MapPin} className="w-4 h-4 text-emerald-600" />
              Standort Wetzlar / Hessen
            </span>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden border-y border-slate-800/80">
        <div
          className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <ValuesDeck />
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 text-left space-y-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-500/20 text-primary-300 border border-primary-500/30">
                Qualitätsstandards
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                {t('culture.values.title')}
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed font-normal">
                {t('culture.values.desc')}
              </p>

              <ul className="space-y-3.5 pt-2" role="list">
                {values.map((val, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-200 text-base">
                    <OptimizedIcon
                      icon={CheckCircle}
                      className="text-emerald-400 w-5 h-5 mt-0.5 flex-shrink-0"
                    />
                    <span>{val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Anti-Agency & Craftsmanship Section */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block text-primary-700 font-bold uppercase tracking-wider text-xs mb-2 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
              Handwerk & Philosophie
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
              {t('culture.team.title')}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">{t('culture.team.desc')}</p>
          </div>

          <TeamGallery />

          {/* Direct CTA Banner */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 text-center relative overflow-hidden shadow-xl">
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary-900/30 via-transparent to-amber-900/20 pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Bereit für ein Webprojekt ohne Agentur-Umwege?
              </h3>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Lassen Sie uns in einem unverbindlichen 15-Minuten-Erstgespräch über Ihre Website,
                Ihre Ziele und das optimale Vorgehen sprechen.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all shadow-lg hover:shadow-primary-600/30 flex items-center gap-2"
                >
                  <span>Kostenloses Erstgespräch anfragen</span>
                  <OptimizedIcon icon={ArrowRight} className="w-4 h-4" />
                </Link>
                <Link
                  href="/work"
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold transition-colors border border-slate-700"
                >
                  Ausgewählte Arbeiten
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Culture;
