'use client';

import React from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { MagicBento, BentoCard } from '@/shared/ui/MagicBento';
import GearSetup from '@/features/benefits/GearSetup';
import { useTranslations, useLocale } from 'next-intl';
import { SeoHead } from '@/shared/ui/SeoHead';
import { Link } from '@/i18n/navigation';
import {
  RocketLaunch,
  Heart,
  ChartBar,
  Users,
  Lightning,
  Globe,
  WarningCircle,
  Sparkle,
  ShieldCheck,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';

interface BenefitItem {
  icon: string;
  title: string;
  text: string;
}

const Benefits: React.FC = () => {
  const t = useTranslations('careers');
  const locale = useLocale();
  const isEn = locale === 'en';

  const rawBenefits = t.raw('benefits.items');
  const benefits: BenefitItem[] = Array.isArray(rawBenefits) ? rawBenefits : [];

  const iconMap: Record<string, React.ElementType> = {
    rocket_launch: RocketLaunch,
    heart: Heart,
    chart_bar: ChartBar,
    users: Users,
    lightning: Lightning,
    globe: Globe,
  };

  const effects = ['tilt', 'spotlight', 'glow', 'tilt', 'spotlight', 'glow'];

  const enrichedBenefits = benefits.map((b, i) => ({
    ...b,
    effect: effects[i % effects.length],
  }));

  return (
    <div className="bg-slate-50/50 min-h-dvh pt-16 pb-20 md:pt-20 md:pb-28">
      <SeoHead
        title={`${t('benefits.hero.title')} | Coday Benefits`}
        description={t('benefits.hero.desc')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="text-center mb-20 max-w-4xl mx-auto relative">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-gradient-to-r from-primary-500/10 via-indigo-500/10 to-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10"
            aria-hidden="true"
          />

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-800 border border-primary-200/80 mb-6 shadow-xs">
            <OptimizedIcon icon={Sparkle} className="w-3.5 h-3.5 text-primary-700" />
            {t('benefits.hero.badge')}
          </span>

          <h1 className="block font-display font-black text-4xl sm:text-5xl md:text-6xl text-slate-900 mb-6 tracking-tight leading-[1.15]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-primary-900 to-slate-900">
              {t('benefits.hero.title')}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            {t('benefits.hero.desc')}
          </p>

          {/* Quick Trust Highlights */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold shadow-xs">
              <OptimizedIcon icon={Lightning} className="w-4 h-4 text-amber-600" />
              {isEn ? 'Apple M3/M4 Max Gear' : 'Apple M3/M4 Max Setup'}
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold shadow-xs">
              <OptimizedIcon icon={Globe} className="w-4 h-4 text-emerald-600" />
              {isEn ? '100% Remote & Workations' : '100% Remote & Workations'}
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold shadow-xs">
              <OptimizedIcon icon={RocketLaunch} className="w-4 h-4 text-primary-700" />
              {isEn ? '€2,500+ Learning Budget' : '2.500 €+ Weiterbildung'}
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold shadow-xs">
              <OptimizedIcon icon={ShieldCheck} className="w-4 h-4 text-blue-600" />
              {isEn ? 'Direct Profit Share' : 'Echte Gewinnbeteiligung'}
            </span>
          </div>
        </section>

        {/* Benefits Grid Section */}
        <section className="mb-28">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="inline-block text-primary-700 font-bold uppercase tracking-wider text-xs mb-2 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
              {isEn ? 'Work Environment' : 'Arbeitsumfeld'}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
              {t('benefits.grid_title')}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">{t('benefits.grid_subtitle')}</p>
          </div>

          <MagicBento columns={3} gap={24} className="max-w-7xl mx-auto">
            {enrichedBenefits.map((benefit, i) => (
              <BentoCard
                key={i}
                effect={benefit.effect}
                spotlightColor="rgba(59, 130, 246, 0.15)"
                glowColor="rgba(147, 51, 234, 0.2)"
                className="h-full bg-white text-left shadow-flat border border-slate-200/80 rounded-2xl hover:border-primary-300 transition-colors"
              >
                <div className="p-8 h-full flex flex-col items-start text-left">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 via-indigo-50 to-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform motion-reduce:duration-[0.01ms] border border-primary-100/50 shadow-xs">
                    <OptimizedIcon
                      icon={iconMap[benefit.icon] || WarningCircle}
                      className="text-2xl text-primary-700"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-left">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-left font-normal text-base">
                    {benefit.text}
                  </p>
                </div>
              </BentoCard>
            ))}
          </MagicBento>
        </section>

        {/* Gear Setup Section */}
        <section className="mb-28">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="inline-block text-primary-700 font-bold uppercase tracking-wider text-xs mb-2 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
              {isEn ? 'Hardware Freedom' : 'Hardware-Freiheit'}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
              {t('benefits.gear_title')}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">{t('benefits.gear_subtitle')}</p>
          </div>
          <GearSetup />
        </section>

        {/* CTA Banner */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white border border-slate-800 text-center relative overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 bg-gradient-to-r from-primary-900/30 via-indigo-900/20 to-amber-900/20 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-500/20 text-primary-300 border border-primary-500/30">
              <OptimizedIcon icon={Sparkle} className="w-3.5 h-3.5 text-primary-400" />
              {isEn ? 'Join Our Engineering Team' : 'Werde Teil unseres Teams'}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              {isEn
                ? 'Ready for the Next Chapter in Modern Web Engineering?'
                : 'Bereit für den nächsten Schritt in der modernen Webentwicklung?'}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {isEn
                ? 'Check out our current vacancies or submit an open application. We are continuously searching for ambitious engineers and designers across Wetzlar, Hesse, and Germany.'
                : 'Entdecke unsere offenen Vakanzen oder sende uns eine aussagekräftige Initiativbewerbung. Wir suchen kontinuierlich ambitionierte Entwickler und Designer in Wetzlar, Hessen und deutschlandweit.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/career/jobs"
                className="px-6 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all shadow-lg hover:shadow-primary-600/30 flex items-center gap-2"
              >
                <span>{isEn ? 'View Open Positions' : 'Offene Stellen ansehen'}</span>
                <OptimizedIcon icon={ArrowRight} className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold transition-colors border border-slate-700"
              >
                {isEn ? 'Speculative Application' : 'Initiativbewerbung senden'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Benefits;
