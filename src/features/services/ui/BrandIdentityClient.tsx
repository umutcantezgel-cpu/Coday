'use client';
import React from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/shared/ui/Button';

import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import { m } from 'motion/react';

export function BrandIdentityClient() {
  const t = useTranslations('services');

  const tags = t.raw('brand_identity_page.digital_branding.tags') as string[];
  const processSteps = t.raw('brand_identity_page.process.steps') as {
    title: string;
    desc: string;
  }[];
  const deliverables = t.raw('brand_identity_page.deliverables.items') as string[];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-surface-base">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-start">
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-content-base mb-8 tracking-tight text-balance">
              <BlurText
                text={t('brand_identity_page.hero.title_prefix')}
                delay={100}
                animateBy="words"
                direction="top"
                className="inline-block me-3"
              />{' '}
              <GradientText
                colors={['#8B5CF6', '#A78BFA', '#C4B5FD']}
                animationSpeed={6}
                className="inline-block"
              >
                {t('brand_identity_page.hero.title_suffix')}
              </GradientText>
              {/* visually hidden SEO h1 text */}
              <div
                className="absolute opacity-[0.01] pointer-events-none select-none -z-10 w-0 h-0 overflow-hidden"
                aria-hidden="true"
              >
                {t('brand_identity_page.hero.title_prefix')}{' '}
                {t('brand_identity_page.hero.title_suffix')}
              </div>
            </h1>
            <p className="text-xl text-content-muted leading-relaxed max-w-prose text-pretty max-w-xl mb-10">
              {t('brand_identity_page.hero.description')}
            </p>
            <Button size="lg" variant="primary" rightIcon={<OptimizedIcon icon={ArrowRight} />}>
              {t('brand_identity_page.hero.cta')}
            </Button>
          </div>

          {/* Hero Visual - Color Palette Grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-secondary rounded-be-3xl rounded-ts-lg shadow-lg" />
              <div className="h-32 bg-primary rounded-bs-3xl rounded-te-lg shadow-lg" />
              <div className="h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-te-3xl rounded-bs-lg shadow-lg" />
              <div className="h-32 bg-slate-800 rounded-ts-3xl rounded-be-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Digital Branding Tags */}
      <section className="py-24 bg-surface-elevated text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display font-bold text-3xl mb-6 text-balance">
            {t('brand_identity_page.digital_branding.title')}
          </h2>
          <p className="text-content-muted mb-12 max-w-2xl mx-auto">
            {t('brand_identity_page.digital_branding.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-6 py-3 bg-purple-50 text-purple-700 rounded-full font-bold border border-purple-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-16 text-center text-balance">
            {t('brand_identity_page.process.title')}
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center mb-4">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-24 bg-surface-elevated">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold mb-12 text-balance">
            {t('brand_identity_page.deliverables.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {deliverables.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-surface-muted rounded-xl">
                <OptimizedIcon icon={CheckCircle} className="text-green-500" weight="fill" />
                <span className="font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoContentBlock
        title={t('brand_identity_page.seoText.title')}
        text={`${t('brand_identity_page.seoText.content')} ${t('brand_identity_page.hero.title_prefix')} ${t('brand_identity_page.hero.title_suffix')}`}
      />
      <RelevantFAQs serviceId="brand-identity" className="mb-24" />
    </>
  );
}
