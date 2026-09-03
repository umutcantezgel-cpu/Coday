'use client';
import React from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations } from 'next-intl';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import RevenueUpliftSimulator from '@/features/ecommerce/RevenueUpliftSimulator';
import HeadlessVsShopifyGrid from '@/features/ecommerce/HeadlessVsShopifyGrid';
import ConversionFunnelMap from '@/features/ecommerce/ConversionFunnelMap';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';

export function EcommerceDevelopmentClient() {
  const t = useTranslations('services');

  return (
    <div className="bg-surface-base min-h-dvh">
      {/* Hero Section */}
      <section className="relative pt-4 pb-16 md:pt-6 md:pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="text-sapphire font-bold tracking-wider uppercase text-sm mb-4 block">
              {t('ecommerce_page.hero.badge')}
            </span>
            <h1 className="block font-display font-black text-5xl sm:text-7xl lg:text-8xl text-content-base mb-8 tracking-tight text-balance">
              <BlurText
                text={t('ecommerce_page.hero.title_anim')}
                delay={100}
                animateBy="words"
                direction="top"
                className="inline-block me-4"
              />{' '}
              <GradientText
                colors={['#10B981', '#3B82F6', '#8B5CF6']}
                animationSpeed={4}
                className="inline-block"
              >
                {t('ecommerce_page.hero.title_static')}
              </GradientText>
            </h1>
            <p className="text-xl text-content-muted leading-relaxed max-w-prose text-pretty max-w-2xl mx-auto mb-12">
              {t('ecommerce_page.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Revenue Uplift - NEW HIGH COMPLEXITY SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 -mt-12 relative z-20">
        <RevenueUpliftSimulator />
      </section>

      {/* Architecture Grid - NEW HIGH COMPLEXITY SECTION */}
      <section className="py-24 bg-surface-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeadlessVsShopifyGrid />
        </div>
      </section>

      {/* Funnel Map - NEW HIGH COMPLEXITY SECTION */}
      <section className="py-24 bg-surface-elevated relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConversionFunnelMap />
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="py-24 bg-surface-base border-t border-surface-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold mb-8 text-content-base">
            {t('ecommerce_page.seo_content.title')}
          </h2>
          <div className="space-y-6 text-lg text-content-muted leading-relaxed">
            {(t.raw('ecommerce_page.seo_content.paragraphs') as string[])?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Relevant FAQs */}
      <section className="py-24 bg-surface-light">
        <SeoContentBlock
          title={t('ecommerce_page.seoText.title')}
          text={`${t('ecommerce_page.seoText.content')} ${t('ecommerce_page.hero.title_prefix')} ${t('ecommerce_page.hero.title_suffix')}`}
        />
        {/* The page's own @graph already carries an FAQPage (#faq). */}
        <RelevantFAQs serviceId="web-development" emitSchema={false} />
      </section>
    </div>
  );
}
