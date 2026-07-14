'use client';
import React from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { PenNib, ArrowRight, Brain } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/shared/ui/Button';

import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import { m } from 'motion/react';

export function UiUxClient() {
  const t = useTranslations('services');

  const processSteps = t.raw('ui_ux_page.process.steps') as {
    title: string;
    desc: string;
  }[];
  const psychologyItems = t.raw('ui_ux_page.psychology.items') as {
    title: string;
    desc: string;
  }[];
  const deliverables = t.raw('ui_ux_page.deliverables.items') as string[];
  const faqItems = t.raw('ui_ux_page.faq.items') as { q: string; a: string }[];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-surface-base">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-start">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-pink-600 text-sm font-bold mb-8 border border-pink-100">
              <OptimizedIcon icon={PenNib} className="w-4 h-4" />
              <span>{t('ui_ux_page.hero.badge')}</span>
            </span>

            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-content-base mb-8 tracking-tight text-balance">
              <BlurText
                text={t('ui_ux_page.hero.title_prefix')}
                delay={100}
                animateBy="words"
                className="inline-block me-3"
              />{' '}
              <GradientText
                colors={['#EC4899', '#F472B6', '#F9A8D4']}
                animationSpeed={6}
                className="inline-block"
              >
                {t('ui_ux_page.hero.title_suffix')}
              </GradientText>
              {/* visually hidden SEO h1 text */}
              <div
                className="absolute opacity-[0.01] pointer-events-none select-none -z-10 w-0 h-0 overflow-hidden"
                aria-hidden="true"
              >
                {t('ui_ux_page.hero.title_prefix')} {t('ui_ux_page.hero.title_suffix')}
              </div>
            </h1>
            <p className="text-xl text-content-muted leading-relaxed max-w-prose text-pretty max-w-xl mb-10">
              {t('ui_ux_page.hero.description')}
            </p>
            <Button size="lg" variant="primary" rightIcon={<OptimizedIcon icon={ArrowRight} />}>
              {t('ui_ux_page.hero.cta')}
            </Button>
          </div>

          {/* Hero Visual - Figma-like UI Preview */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
            <div className="relative glass-card p-6 rounded-2xl shadow-xl bg-surface-elevated border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 space-y-3">
                  <div className="h-8 bg-slate-100 rounded" />
                  <div className="h-24 bg-surface-muted rounded" />
                  <div className="h-8 bg-pink-100 rounded" />
                </div>
                <div className="col-span-2 space-y-3">
                  <div className="h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg" />
                  <div className="h-16 bg-surface-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 text-balance">
              {t('ui_ux_page.process.title')}
            </h2>
            <p className="text-xl text-content-muted">{t('ui_ux_page.process.description')}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-7xl font-black text-slate-100 absolute -top-4 -start-2 select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative pt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-content-muted">{step.desc}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Psychology Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 text-balance">
              {t('ui_ux_page.psychology.title')}
            </h2>
            <p className="text-xl text-slate-400">{t('ui_ux_page.psychology.description')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {psychologyItems.map((item, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4">
                  <OptimizedIcon icon={Brain} className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-24 bg-surface-elevated">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold mb-12 text-balance">
            {t('ui_ux_page.deliverables.title')}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {deliverables.map((item, i) => (
              <span
                key={i}
                className="px-6 py-3 bg-pink-50 text-pink-700 rounded-full font-bold border border-pink-100"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-surface-base">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-balance">
            {t('ui_ux_page.faq.title')}
          </h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
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
        title={t('ui_ux_page.seoText.title')}
        text={`${t('ui_ux_page.seoText.content')} ${t('ui_ux_page.hero.title_prefix')} ${t('ui_ux_page.hero.title_suffix')}`}
      />
      <RelevantFAQs serviceId="ui-ux" className="mb-24" />
    </>
  );
}
