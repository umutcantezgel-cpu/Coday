'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import { MagicBento, BentoCard } from '@/shared/ui/MagicBento';
import GearSetup from '@/features/benefits/GearSetup';
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
  Briefcase,
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

  const careerNav = [
    { label: isEn ? 'Overview' : 'Übersicht', href: '/career', icon: Sparkle },
    { label: isEn ? 'Open Jobs' : 'Offene Stellen', href: '/career/jobs', icon: Briefcase },
    { label: isEn ? 'Culture & Values' : 'Kultur & Werte', href: '/career/culture', icon: Users },
    { label: isEn ? 'Perks & Benefits' : 'Benefits', href: '/career/benefits', icon: Heart },
  ];

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
              const isActive = tab.href === '/career/benefits';
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

        {/* Hero */}
        <section className="text-center mb-16 max-w-4xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <OptimizedIcon icon={Sparkle} className="w-3.5 h-3.5 text-primary" weight="fill" />
            {t('benefits.hero.badge')}
          </span>

          <h1 className="block font-display font-black text-4xl sm:text-6xl lg:text-7xl text-secondary tracking-tight">
            <span>{isEn ? 'Our ' : 'Exklusive '}</span>
            <GradientText
              colors={['#147a7a', '#2563eb', '#147a7a']}
              animationSpeed={8}
              className="inline-block"
            >
              {isEn ? 'Perks & Benefits' : 'Benefits & Vorteile'}
            </GradientText>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
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
              <OptimizedIcon icon={RocketLaunch} className="w-4 h-4 text-primary" />
              {isEn ? '€2,500+ Learning Budget' : '2.500 €+ Weiterbildung'}
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold shadow-xs">
              <OptimizedIcon icon={ShieldCheck} className="w-4 h-4 text-blue-600" />
              {isEn ? 'Direct Profit Share' : 'Echte Gewinnbeteiligung'}
            </span>
          </div>
        </section>

        {/* Benefits Grid Section */}
        <section className="mb-20">
          <div className="text-center mb-12 max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
              {isEn ? 'Work Environment' : 'Arbeitsumfeld'}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary">
              {t('benefits.grid_title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">{t('benefits.grid_subtitle')}</p>
          </div>

          <MagicBento columns={3} gap={24} className="max-w-7xl mx-auto">
            {enrichedBenefits.map((benefit, i) => (
              <BentoCard
                key={i}
                effect={benefit.effect}
                spotlightColor="rgba(20, 122, 122, 0.15)"
                glowColor="rgba(37, 99, 235, 0.2)"
                className="h-full bg-white text-left shadow-xs border border-slate-200 rounded-3xl hover:border-primary/40 transition-all p-8"
              >
                <div className="h-full flex flex-col items-start text-left">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center mb-6 border border-primary/20 shadow-xs">
                    <OptimizedIcon
                      icon={iconMap[benefit.icon] || WarningCircle}
                      className="text-2xl text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-left">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-left text-sm">{benefit.text}</p>
                </div>
              </BentoCard>
            ))}
          </MagicBento>
        </section>

        {/* Gear Setup Section */}
        <section className="mb-20">
          <div className="text-center mb-12 max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
              {isEn ? 'Hardware Freedom' : 'Hardware-Freiheit'}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary">
              {t('benefits.gear_title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">{t('benefits.gear_subtitle')}</p>
          </div>
          <GearSetup />
        </section>

        {/* CTA Banner */}
        <section className="p-8 sm:p-12 rounded-3xl bg-secondary text-white border border-slate-800 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary-200">
              <OptimizedIcon icon={Sparkle} className="w-3.5 h-3.5 text-primary-300" />
              {isEn ? 'Join Our Engineering Team' : 'Werde Teil unseres Teams'}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              {isEn
                ? 'Ready for the Next Chapter in Modern Web Engineering?'
                : 'Bereit für den nächsten Schritt in der modernen Webentwicklung?'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isEn
                ? 'Check out our current vacancies or submit an open application. We are continuously searching for ambitious engineers and designers across Wetzlar, Hesse, and Germany.'
                : 'Entdecke unsere offenen Vakanzen oder sende uns eine aussagekräftige Initiativbewerbung. Wir suchen kontinuierlich ambitionierte Entwickler und Designer in Wetzlar, Hessen und deutschlandweit.'}
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
                href="/career"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all border border-white/20 text-sm"
              >
                {isEn ? 'Explore Career Overview' : 'Zur Karriere-Übersicht'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Benefits;
