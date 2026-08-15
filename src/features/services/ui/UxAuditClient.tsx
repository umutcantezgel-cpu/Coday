'use client';
import React from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { ChartBar, ArrowRight, MagnifyingGlass, FileText } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/shared/ui/Button';

import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import CountUp from '@/shared/ui/CountUp';
import { m } from 'motion/react';

export function UxAuditClient() {
  const t = useTranslations('services');

  const analysisItems = t.raw('ux_audit_page.what_we_analyze.items') as {
    title: string;
    desc: string;
  }[];
  const deliverables = t.raw('ux_audit_page.deliverables.items') as string[];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-surface-base">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-bold mb-8 border border-orange-100">
            <OptimizedIcon icon={ChartBar} className="w-4 h-4" />
            <span>{t('ux_audit_page.hero.badge')}</span>
          </span>

          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-content-base mb-8 tracking-tight text-balance">
            <BlurText
              text={t('ux_audit_page.hero.title_prefix')}
              delay={100}
              animateBy="words"
              className="inline-block mr-4"
            />{' '}
            <GradientText
              colors={['#F59E0B', '#EF4444', '#EC4899']}
              animationSpeed={6}
              className="inline-block"
            >
              {t('ux_audit_page.hero.title_suffix')}
            </GradientText>
          </h1>
          <p className="text-xl text-content-muted leading-relaxed max-w-prose text-pretty max-w-2xl mx-auto mb-12">
            {t('ux_audit_page.hero.description')}
          </p>
          <Button size="lg" variant="primary" rightIcon={<OptimizedIcon icon={ArrowRight} />}>
            {t('ux_audit_page.hero.cta')}
          </Button>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-6xl font-black mb-4 text-balance">
            <CountUp from={0} to={35} duration={2} />%
          </div>
          <div className="text-xl font-medium text-orange-100">
            {t('ux_audit_page.stats.conversion_label')}
          </div>
        </div>
      </section>

      {/* What We Analyze */}
      <section className="py-24 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-16 text-center text-balance">
            {t('ux_audit_page.what_we_analyze.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analysisItems.map((item, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-muted border border-slate-100 rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <OptimizedIcon icon={MagnifyingGlass} className="text-2xl" />
                </div>
                <p className="text-lg font-bold text-slate-900 mb-2">{item.title}</p>
                <p className="text-content-muted text-sm">{item.desc}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-24 bg-slate-50 text-slate-900 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-12 text-center text-balance text-slate-900">
            {t('ux_audit_page.deliverables.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {deliverables.map((item, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-5 bg-white border border-slate-200 shadow-sm rounded-xl"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center flex-shrink-0 border border-orange-100 shadow-xs">
                  <OptimizedIcon icon={FileText} />
                </div>
                <span className="font-bold text-slate-900">{item}</span>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      <SeoContentBlock
        title={t('ux_audit_page.seoText.title')}
        text={`${t('ux_audit_page.seoText.content')} ${t('ux_audit_page.hero.title_prefix')} ${t('ux_audit_page.hero.title_suffix')}`}
      />
      <RelevantFAQs serviceId="ux-audit" className="mb-24" />
    </>
  );
}
