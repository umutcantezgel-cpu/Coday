'use client';
import React from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  RocketLaunch,
  ArrowRight,
  X,
  MinusCircle,
  Check,
  CheckCircle,
  ArrowDown,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/shared/ui/Button';

import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import LogoLoop from '@/shared/ui/LogoLoop';
import { m } from 'motion/react';

interface ProcessStep {
  title: string;
  desc: string;
}
interface FaqItem {
  q: string;
  a: string;
}

export function MigrationClient() {
  const t = useTranslations('services');

  const processSteps = (t.raw('migration_page.process.steps') as ProcessStep[]) || [];
  const faqItems = (t.raw('migration_page.faq.items') as FaqItem[]) || [];
  const beforeItems = (t.raw('migration_page.before_after.before.items') as string[]) || [];
  const afterItems = (t.raw('migration_page.before_after.after.items') as string[]) || [];
  const fromTech = (t.raw('migration_page.technologies.from') as string[]) || [];
  const toTech = (t.raw('migration_page.technologies.to') as string[]) || [];

  // Safe access checks
  const safeProcessSteps = Array.isArray(processSteps) ? processSteps : [];
  const safeFaqItems = Array.isArray(faqItems) ? faqItems : [];
  const safeBeforeItems = Array.isArray(beforeItems) ? beforeItems : [];
  const safeAfterItems = Array.isArray(afterItems) ? afterItems : [];
  const safeFromTech = Array.isArray(fromTech) ? fromTech : [];
  const safeToTech = Array.isArray(toTech) ? toTech : [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-surface-base">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-bold mb-8 border border-purple-100">
            <OptimizedIcon icon={RocketLaunch} className="w-4 h-4" />
            <span>{t('migration_page.hero.label')}</span>
          </span>

          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-content-base mb-8 tracking-tight leading-[1.1] text-balance">
            <BlurText
              text={t('migration_page.hero.title_prefix')}
              delay={100}
              animateBy="words"
              className="inline-block mr-4"
            />{' '}
            <GradientText
              colors={['#8B5CF6', '#7C3AED', '#6D28D9']}
              animationSpeed={6}
              className="inline-block drop-shadow-sm [text-shadow:0_2px_10px_rgba(109,40,217,0.15)]"
            >
              {t('migration_page.hero.title_suffix')}
            </GradientText>
          </h1>
          <p className="text-xl text-content-muted leading-relaxed max-w-prose text-pretty max-w-2xl mx-auto mb-12">
            {t('migration_page.hero.description')}
          </p>
          <Button size="lg" variant="primary" rightIcon={<OptimizedIcon icon={ArrowRight} />}>
            {t('migration_page.hero.cta')}
          </Button>
        </div>
      </section>

      {/* Before / After Comparison */}
      <section className="py-24 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 text-balance">
              {t('migration_page.before_after.title')}
            </h2>
            <p className="text-xl text-content-muted">
              {t('migration_page.before_after.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Before */}
            <div className="bg-red-50 border border-red-200 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <OptimizedIcon icon={X} className="text-red-500 text-xl" weight="bold" />
                </div>
                <h3 className="text-xl font-bold text-red-700">
                  {t('migration_page.before_after.before.label')}
                </h3>
              </div>
              <ul className="space-y-4">
                {safeBeforeItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <OptimizedIcon
                      icon={MinusCircle}
                      className="text-red-400 mt-1 flex-shrink-0"
                      weight="fill"
                    />
                    <span className="text-red-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="bg-green-50 border border-green-200 rounded-3xl p-8 transform md:translate-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <OptimizedIcon icon={Check} className="text-green-500 text-xl" weight="bold" />
                </div>
                <h3 className="text-xl font-bold text-green-700">
                  {t('migration_page.before_after.after.label')}
                </h3>
              </div>
              <ul className="space-y-4">
                {safeAfterItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <OptimizedIcon
                      icon={CheckCircle}
                      className="text-green-500 mt-1 flex-shrink-0"
                      weight="fill"
                    />
                    <span className="text-green-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Process */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 text-balance">
              {t('migration_page.process.title')}
            </h2>
            <p className="text-xl text-slate-400">{t('migration_page.process.description')}</p>
          </div>

          <ol className="grid md:grid-cols-4 gap-6">
            {safeProcessSteps.map((step, i) => (
              <m.li
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 h-full">
                  <div
                    aria-hidden="true"
                    className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center mb-4 text-lg"
                  >
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </div>
                {/* Connector line (except for last) */}
                {i < safeProcessSteps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-slate-700 to-slate-500 transform -translate-y-1/2"
                  />
                )}
              </m.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Supported Technologies */}
      <section className="py-20 bg-surface-elevated overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-3xl font-display font-bold mb-4 text-balance">
            {t('migration_page.technologies.title')}
          </h2>
          <p className="text-lg text-content-muted">
            {t('migration_page.technologies.description')}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <LogoLoop
            speed={30}
            direction="right"
            logos={safeFromTech.map((tech) => ({
              node: (
                <div className="px-6 py-3 bg-red-50 border border-red-100 rounded-full mx-2 whitespace-nowrap transition motion-reduce:duration-[0.01ms] duration-300 hover:scale-[0.97] ease-spring hover:shadow-md hover:bg-red-100 cursor-default">
                  <span className="font-bold text-red-800">{tech}</span>
                </div>
              ),
            }))}
          />
          <div aria-hidden="true" className="text-center py-4">
            <OptimizedIcon
              icon={ArrowDown}
              className="text-3xl text-slate-400 animate-bounce motion-reduce:animate-none text-balance"
            />
          </div>
          <LogoLoop
            speed={30}
            direction="left"
            logos={safeToTech.map((tech) => ({
              node: (
                <div className="px-6 py-3 bg-green-50 border border-green-100 rounded-full mx-2 whitespace-nowrap transition motion-reduce:duration-[0.01ms] duration-300 hover:scale-[0.97] ease-spring hover:shadow-md hover:bg-green-100 cursor-default">
                  <span className="font-bold text-green-800">{tech}</span>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-surface-base">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-balance">
            {t('migration_page.faq.title')}
          </h2>
          <div className="space-y-6">
            {safeFaqItems.map((item, i) => (
              <div
                key={i}
                className="bg-surface-elevated p-8 rounded-2xl shadow-sm border border-slate-100"
              >
                <h3 className="text-lg font-bold mb-3">{item.q}</h3>
                <p className="text-content-muted leading-relaxed max-w-prose text-pretty">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoContentBlock
        title={t('migration_page.seoText.title')}
        text={t('migration_page.seoText.content')}
      />
      <RelevantFAQs serviceId="migration" className="mb-24" />
    </>
  );
}
