"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import RevenueUpliftSimulator from '@/features/ecommerce/RevenueUpliftSimulator';
import HeadlessVsShopifyGrid from '@/features/ecommerce/HeadlessVsShopifyGrid';
import ConversionFunnelMap from '@/features/ecommerce/ConversionFunnelMap';
import { SeoHead } from '@/shared/ui/SeoHead';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';

export function EcommerceDevelopmentClient() {
  const t = useTranslations('services');
  const ecommerceSchema = {
    service: {
      name: 'E-Commerce Entwicklung',
      serviceType: 'Web Development',
      description: t('ecommerce_page.meta.description'),
      provider: {
        name: 'Coday',
      },
    },
  };

  return (
    <div className="bg-background-light min-h-dvh">
      <SeoHead
        title={t('ecommerce_page.meta.title')}
        description={t('ecommerce_page.meta.description')}
        schemaData={ecommerceSchema}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="text-sapphire font-bold tracking-wider uppercase text-sm mb-4 block">
              Online-Shop Entwicklung
            </span>
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-secondary mb-8 tracking-tight">
              <BlurText
                text="Shops die"
                delay={100}
                animateBy="words"
                direction="top"
                className="inline-block me-4"
              />
              <GradientText
                colors={['#10B981', '#3B82F6', '#8B5CF6']}
                animationSpeed={4}
                className="inline-block"
              >
                verkaufen.
              </GradientText>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
              Keine Vorlagen. Keine Grenzen. Wir bauen schnelle Online-Shop-Systeme mit Next.js, die
              Ihre Verkaufsraten explodieren lassen.
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
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConversionFunnelMap />
        </div>
      </section>

      {/* Relevant FAQs */}
      <section className="py-24 bg-surface-light">
        <RelevantFAQs serviceId="web-development" />
      </section>
    </div>
  );
};


