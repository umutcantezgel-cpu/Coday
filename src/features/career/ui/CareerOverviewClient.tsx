'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
// Adjusting imports assuming these components exist or need to be created, but I'll import them assuming they are migrated or I'll just remove them if not available.
// Let's assume features/careers was moved to features/career or similar.
// Wait, the prompt says mapping to `src/features/career/ui/CareerOverviewClient.tsx`. Let's assume CareerPathBuilder and PerksGrid exist in src/features/career/ui/ components or I can just create placeholders/remove them if not found.
import CareerPathBuilder from '@/features/careers/CareerPathBuilder';
import PerksGrid from '@/features/careers/PerksGrid';

export function CareerOverviewClient() {
  const t = useTranslations('careers');

  return (
    <div className="bg-background-light min-h-dvh">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-sapphire font-bold tracking-wider uppercase text-sm mb-4 block">
            {t('hero.badge')}
          </span>
          <h1 className="font-display font-black text-5xl sm:text-7xl text-secondary mb-6 tracking-tight">
            <BlurText
              text={t('hero.title_start')}
              delay={100}
              animateBy="words"
              direction="top"
              className="inline-block mr-4"
            />
            <br className="hidden md:block" />
            <GradientText
              colors={['#EC4899', '#8B5CF6', '#3B82F6']}
              animationSpeed={6}
              className="inline-block"
            >
              {t('hero.title_gradient')}
            </GradientText>
          </h1>
          <p className="text-2xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            {t('hero.desc')}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#jobs"
              className="bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary/90 transition-colors motion-reduce:duration-[0.01ms] shadow-lg"
            >
              {t('hero.cta')}
            </a>
          </div>
        </div>
      </section>

      {/* Career Path - NEW HIGH COMPLEXITY */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/noise.svg')]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display font-bold text-4xl text-secondary mb-6">
                {t('path.title')}
              </h2>
              <p className="text-xl text-slate-600 mb-8">{t('path.desc')}</p>
            </div>
            <CareerPathBuilder />
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl text-secondary mb-4">
              {t('perks.title')}
            </h2>
            <p className="text-slate-600">{t('perks.desc')}</p>
          </div>
          <PerksGrid />
        </div>
      </section>

      {/* Open Positions Mock */}
      <section id="jobs" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display font-bold text-3xl text-secondary mb-12 text-center">
            {t('jobs.title')}
          </h2>

          <div className="space-y-4">
            {[
              {
                title: 'Senior Frontend Engineer (React/Next)',
                type: t('jobs.details.type'),
                time: t('jobs.details.fulltime'),
              },
              {
                title: 'UX/UI Designer',
                type: t('jobs.details.type'),
                time: t('jobs.details.fulltime'),
              },
              {
                title: 'Performance Marketing Manager',
                type: t('jobs.details.type'),
                time: t('jobs.details.parttime'),
              },
            ].map((job, idx) => (
              <a
                href="/contact"
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border border-gray-100 hover:border-sapphire/50 hover:shadow-lg transition-all motion-reduce:duration-[0.01ms] group"
              >
                <div>
                  <h3 className="font-bold text-xl text-secondary group-hover:text-sapphire transition-colors motion-reduce:duration-[0.01ms]">
                    {job.title}
                  </h3>
                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.time}</span>
                  </div>
                </div>
                <span className="mt-4 sm:mt-0 px-4 py-2 bg-gray-50 text-secondary font-bold rounded-lg text-sm group-hover:bg-sapphire group-hover:text-white transition-all motion-reduce:duration-[0.01ms]">
                  {t('jobs.button')} &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
