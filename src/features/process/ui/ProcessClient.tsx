'use client';

import React from 'react';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import ProjectTimelineAnimation from '@/features/process/ProjectTimelineAnimation';
import TransparencyGrid from '@/features/process/TransparencyGrid';
import { GlobalCTA } from '@/shared/ui';

import { useTranslations } from 'next-intl';

const Process: React.FC = () => {
  const t = useTranslations('process');
  return (
    <div className="bg-background-light min-h-dvh">
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-4 text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
            {t('hero.badge')}
          </span>
          <h1 className="block font-display font-black text-5xl sm:text-7xl text-secondary mb-6 tracking-tight">
            <BlurText
              text={t('hero.title_start')}
              delay={100}
              animateBy="words"
              direction="top"
              className="inline-block mr-4"
            />{' '}
            <GradientText
              colors={['#3B82F6', '#10B981', '#F59E0B']}
              animationSpeed={5}
              className="inline-block"
            >
              {t('hero.title_gradient')}
            </GradientText>
          </h1>
          <p className="text-2xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            {t('hero.desc')}
          </p>
        </div>
      </section>

      {/* Animated Timeline - NEW HIGH COMPLEXITY */}
      <section className="py-24 md:py-32 bg-white relative">
        <h2 className="sr-only">Prozessablauf</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ProjectTimelineAnimation />
        </div>
      </section>

      {/* Transparency Section - NEW HIGH COMPLEXITY */}
      <section className="py-32 md:py-48 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TransparencyGrid />
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-40 md:py-56 bg-gray-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display font-bold text-4xl text-secondary mb-8">
            {t('guarantee.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {(
              (Array.isArray(t.raw('guarantee.items')) ? t.raw('guarantee.items') : []) as Array<{
                title: string;
                desc: string;
              }>
            ).map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GlobalCTA />
    </div>
  );
};

export default Process;
