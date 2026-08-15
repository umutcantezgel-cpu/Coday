'use client';
import React from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  Database,
  ArrowRight,
  FileText,
  Globe,
  DeviceMobile,
  Watch,
  ShareNetwork,
  Lightning,
  ShieldCheck,
  Code,
  Check,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/shared/ui/Button';

import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import { MagicBento, BentoCard } from '@/shared/ui/MagicBento';
import GlareHover from '@/shared/ui/GlareHover';
import LogoLoop from '@/shared/ui/LogoLoop';
import { m } from 'motion/react';

export function HeadlessCmsClient() {
  const t = useTranslations('services');

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-surface-base">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/5 text-content-base text-sm font-bold mb-8 border border-secondary/10">
              <OptimizedIcon icon={Database} className="w-4 h-4" />
              <span>Content Infrastructure</span>
            </div>

            <h1 className="font-display font-black text-5xl sm:text-7xl text-content-base mb-8 leading-[0.9] text-balance">
              {t('headless_cms_page.hero.title_prefix')}
              <br />
              <span className="text-sapphire">{t('headless_cms_page.hero.title_suffix')}</span>
            </h1>

            <p className="text-xl text-content-muted leading-relaxed max-w-prose text-pretty mb-10 max-w-lg">
              {t('headless_cms_page.hero.description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="primary" rightIcon={<OptimizedIcon icon={ArrowRight} />}>
                {t('headless_cms_page.hero.cta')}
              </Button>
              <Button size="lg" variant="outline">
                View Case Studies
              </Button>
            </div>
          </div>

          {/* Visual: Abstract Content Connection */}
          <div className="relative" aria-hidden="true">
            <GlareHover className="rounded-3xl overflow-hidden shadow-flat bg-surface-elevated border border-primary/10 p-8">
              <div className="flex justify-between items-center mb-12">
                <div className="text-content-muted font-mono text-sm font-bold tracking-wide">
                  Content Source
                </div>
                <div className="text-content-muted font-mono text-sm font-bold tracking-wide">
                  Channels
                </div>
              </div>

              <div className="flex items-center justify-between relative">
                {/* Source Node */}
                <div className="w-24 h-24 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center relative z-10 shadow-sm">
                  <OptimizedIcon icon={FileText} className="text-4xl text-primary text-balance" />
                  <div className="absolute -bottom-8 text-content-base font-bold text-sm">
                    Sanity.io
                  </div>
                </div>

                {/* Connection Lines */}
                <div className="h-1 flex-1 bg-gradient-to-r from-primary/30 to-blue-500/30 mx-4 relative overflow-hidden rounded-full">
                  <m.div
                    className="absolute inset-y-0 left-0 w-8 bg-white/80 blur-sm"
                    animate={{ x: ['0%', '500%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                  />
                </div>

                {/* Output Nodes */}
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center shadow-sm">
                      <OptimizedIcon icon={Globe} className="text-xl text-blue-500" />
                    </div>
                    <span className="text-content-base text-sm font-bold">Web</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl border border-purple-100 flex items-center justify-center shadow-sm">
                      <OptimizedIcon icon={DeviceMobile} className="text-xl text-purple-500" />
                    </div>
                    <span className="text-content-base text-sm font-bold">App</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-50 rounded-xl border border-green-100 flex items-center justify-center shadow-sm">
                      <OptimizedIcon icon={Watch} className="text-xl text-green-500" />
                    </div>
                    <span className="text-content-base text-sm font-bold">IoT</span>
                  </div>
                </div>
              </div>
            </GlareHover>
          </div>
        </div>
      </section>

      {/* Why Headless - Bento Grid */}
      <section className="py-24 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-6 text-balance">
              {t('headless_cms_page.why_headless.title')}
            </h2>
            <p className="text-xl text-content-muted max-w-2xl mx-auto">
              {t('headless_cms_page.why_headless.description')}
            </p>
          </div>

          <MagicBento className="grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            <BentoCard className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div aria-hidden="true" className="absolute right-4 top-4 opacity-20">
                <OptimizedIcon
                  icon={ShareNetwork}
                  className="text-6xl text-sapphire text-balance"
                />
              </div>
              <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                <p className="text-2xl font-bold text-content-base mb-2">
                  {t('headless_cms_page.why_headless.items.omnichannel.title')}
                </p>
                <p className="text-content-muted">
                  {t('headless_cms_page.why_headless.items.omnichannel.desc')}
                </p>
              </div>
            </BentoCard>
            <BentoCard className="md:col-span-1 md:row-span-1 bg-surface-muted">
              <div aria-hidden="true" className="absolute right-4 top-4 opacity-20">
                <OptimizedIcon icon={Lightning} className="text-6xl text-yellow-500 text-balance" />
              </div>
              <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                <p className="text-2xl font-bold text-content-base mb-2">
                  {t('headless_cms_page.why_headless.items.performance.title')}
                </p>
                <p className="text-content-muted">
                  {t('headless_cms_page.why_headless.items.performance.desc')}
                </p>
              </div>
            </BentoCard>
            <BentoCard className="md:col-span-1 md:row-span-1 bg-surface-muted">
              <div aria-hidden="true" className="absolute right-4 top-4 opacity-20">
                <OptimizedIcon
                  icon={ShieldCheck}
                  className="text-6xl text-green-500 text-balance"
                />
              </div>
              <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                <p className="text-2xl font-bold text-content-base mb-2">
                  {t('headless_cms_page.why_headless.items.security.title')}
                </p>
                <p className="text-content-muted">
                  {t('headless_cms_page.why_headless.items.security.desc')}
                </p>
              </div>
            </BentoCard>
            <BentoCard className="md:col-span-2 md:row-span-1 bg-white border border-slate-200 shadow-sm text-slate-900">
              <div aria-hidden="true" className="absolute right-4 top-4 opacity-15">
                <OptimizedIcon icon={Code} className="text-6xl text-primary-700 text-balance" />
              </div>
              <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                <p className="text-2xl font-bold mb-2 text-slate-900">
                  {t('headless_cms_page.why_headless.items.dev_friendly.title')}
                </p>
                <p className="text-slate-600">
                  {t('headless_cms_page.why_headless.items.dev_friendly.desc')}
                </p>
              </div>
            </BentoCard>
          </MagicBento>
        </div>
      </section>

      {/* CMS Comparison */}
      <section className="py-24 bg-surface-muted border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 text-balance text-slate-900">
              {t('headless_cms_page.cms_comparison.title')}
            </h2>
            <p className="text-xl text-slate-600">
              {t('headless_cms_page.cms_comparison.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sanity */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl transition motion-reduce:duration-[0.01ms] relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-red-50 text-red-700 border-b border-l border-red-100 text-xs font-bold px-3 py-1 rounded-bl-xl">
                {t('headless_cms_page.cms_comparison.sanity.badge')}
              </div>
              <p className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-900">
                Sanity.io
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed max-w-prose text-pretty">
                {t('headless_cms_page.cms_comparison.sanity.desc')}
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-600">
                <li className="flex gap-2 items-center">
                  <OptimizedIcon icon={Check} className="text-emerald-600 w-4 h-4" /> GROQ Query
                  Language
                </li>
                <li className="flex gap-2 items-center">
                  <OptimizedIcon icon={Check} className="text-emerald-600 w-4 h-4" /> Real-time
                  Collab
                </li>
                <li className="flex gap-2 items-center">
                  <OptimizedIcon icon={Check} className="text-emerald-600 w-4 h-4" /> Customizable
                  Studio
                </li>
              </ul>
            </div>

            {/* Contentful */}
            <div className="bg-white text-slate-900 p-8 rounded-3xl shadow-xl border-2 border-primary-600 transform md:-translate-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                {t('headless_cms_page.cms_comparison.contentful.badge')}
              </div>
              <p className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-900">
                Contentful
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed max-w-prose text-pretty">
                {t('headless_cms_page.cms_comparison.contentful.desc')}
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-600">
                <li className="flex gap-2 items-center">
                  <OptimizedIcon icon={Check} className="text-primary-600 w-4 h-4" /> Enterprise
                  Grade SLA
                </li>
                <li className="flex gap-2 items-center">
                  <OptimizedIcon icon={Check} className="text-primary-600 w-4 h-4" /> Strict Content
                  Models
                </li>
                <li className="flex gap-2 items-center">
                  <OptimizedIcon icon={Check} className="text-primary-600 w-4 h-4" /> Global CDN
                </li>
              </ul>
            </div>

            {/* Strapi */}
            <div className="bg-surface-elevated p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition motion-reduce:duration-[0.01ms] relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-purple-500/10 text-purple-600 text-xs font-bold px-3 py-1 rounded-bl-xl">
                {t('headless_cms_page.cms_comparison.strapi.badge')}
              </div>
              <p className="text-2xl font-bold mb-4 flex items-center gap-2">Strapi</p>
              <p className="text-content-muted mb-6 leading-relaxed max-w-prose text-pretty">
                {t('headless_cms_page.cms_comparison.strapi.desc')}
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-500">
                <li className="flex gap-2 items-center">
                  <OptimizedIcon icon={Check} className="text-green-500 w-4 h-4" /> Self-Hosted
                </li>
                <li className="flex gap-2 items-center">
                  <OptimizedIcon icon={Check} className="text-green-500 w-4 h-4" /> REST & GraphQL
                </li>
                <li className="flex gap-2 items-center">
                  <OptimizedIcon icon={Check} className="text-green-500 w-4 h-4" /> 100% Data
                  Control
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Loop */}
      <section className="py-16 bg-surface-elevated overflow-hidden">
        <LogoLoop
          logos={[
            { node: <span className="text-2xl font-bold text-slate-400">Sanity</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Contentful</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Strapi</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Storyblok</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Next.js</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Vercel</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Cloudinary</span> },
            { node: <span className="text-2xl font-bold text-slate-400">Algolia</span> },
          ]}
          speed={30}
          direction="left"
        />
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-surface-base">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-balance">
            {t('headless_cms_page.faq.title')}
          </h2>
          <div className="space-y-6">
            {(() => {
              const faqItems = t.raw('headless_cms_page.faq.items');
              if (!Array.isArray(faqItems)) return null;

              return faqItems.map((item: { q: string; a: string }, i: number) => (
                <div
                  key={i}
                  className="bg-surface-elevated p-8 rounded-2xl shadow-sm border border-slate-100"
                >
                  <p className="text-lg font-bold mb-3">{item.q}</p>
                  <p className="text-content-muted leading-relaxed max-w-prose text-pretty">
                    {item.a}
                  </p>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      <SeoContentBlock
        title={t('headless_cms_page.seoText.title')}
        text={`${t('headless_cms_page.seoText.content')} ${t('headless_cms_page.hero.title_prefix')} ${t('headless_cms_page.hero.title_suffix')}`}
      />
      <RelevantFAQs serviceId="headless-cms" className="mb-24" />
    </>
  );
}
