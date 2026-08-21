'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  Sparkle,
  Briefcase,
  Users,
  Heart,
  Laptop,
  Globe,
  ArrowRight,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr';

import CareerPathBuilder from '@/features/careers/CareerPathBuilder';
import PerksGrid from '@/features/careers/PerksGrid';

export function CareerOverviewClient() {
  const t = useTranslations('careers');
  const locale = useLocale();
  const isEn = locale === 'en';

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
              const isActive = tab.href === '/career';
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
        <section className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-bold tracking-wide uppercase shadow-xs">
            <OptimizedIcon icon={Sparkle} className="w-4 h-4 text-primary" weight="fill" />
            <span>{t('hero.badge')}</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-secondary tracking-tight">
            <span>{t('hero.title_start')} </span>
            <GradientText
              colors={['#147a7a', '#2563eb', '#147a7a']}
              animationSpeed={8}
              className="inline-block"
            >
              {t('hero.title_gradient')}
            </GradientText>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            {t('hero.desc')}
          </p>

          {/* Quick Value Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-xs">
              <OptimizedIcon icon={Globe} className="w-4 h-4 text-primary" />
              100% Remote (DE)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-xs">
              <OptimizedIcon icon={Laptop} className="w-4 h-4 text-blue-600" />
              M3/M4 Max Gear
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-xs">
              <OptimizedIcon icon={Sparkle} className="w-4 h-4 text-amber-500" weight="fill" />
              2.500 €+ Weiterbildungsbudget
            </span>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Link
              href="/career/jobs"
              className="bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary/90 transition-all text-sm shadow-md flex items-center gap-2"
            >
              <span>{t('hero.cta')}</span>
              <OptimizedIcon icon={ArrowRight} className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Career Path Section */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
              Transparente Entwicklung
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-secondary">
              {t('path.title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">{t('path.desc')}</p>
          </div>
          <CareerPathBuilder />
        </section>

        {/* Perks Section */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
              Spitzen-Ausstattung & Kultur
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-secondary">
              {t('perks.title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">{t('perks.desc')}</p>
          </div>
          <PerksGrid />
        </section>

        {/* Open Positions Section */}
        <section
          id="jobs"
          className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-lg"
        >
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="font-display font-bold text-3xl text-secondary">{t('jobs.title')}</h2>
              <p className="text-slate-500 text-sm">{t('jobs.hero_desc')}</p>
            </div>

            <ul className="space-y-4" role="list">
              {[
                {
                  title: 'Senior Frontend Engineer (Next.js 15 & React 19)',
                  type: t('jobs.details.type'),
                  time: t('jobs.details.fulltime'),
                },
                {
                  title: 'UI/UX & Design Systems Specialist',
                  type: t('jobs.details.type'),
                  time: t('jobs.details.fulltime'),
                },
                {
                  title: 'Technical SEO & Performance Growth Manager',
                  type: t('jobs.details.type'),
                  time: t('jobs.details.parttime'),
                },
              ].map((job, idx) => (
                <li key={idx} className="list-none">
                  <Link
                    href="/career/jobs"
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all group"
                  >
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {job.type}
                        </span>
                        <span>•</span>
                        <span>{job.time}</span>
                      </div>
                    </div>
                    <span className="mt-4 sm:mt-0 px-4 py-2 bg-slate-50 text-slate-700 font-bold rounded-xl text-xs group-hover:bg-primary group-hover:text-white transition-all flex items-center gap-1.5 self-start sm:self-center">
                      <span>{t('jobs.button')}</span>
                      <OptimizedIcon icon={ArrowRight} className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
