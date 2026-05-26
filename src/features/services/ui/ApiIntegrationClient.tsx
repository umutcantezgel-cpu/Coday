"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  PlugsConnected,
  ArrowRight,
  Cpu,
  ShoppingCart,
  Users,
  ChatCircleDots,
  CreditCard,
  FileText,
  ChartBar,
  Timer,
  ShieldCheck,
  Bug,
  Lightning,
  CheckCircle,
} from '@phosphor-icons/react';
import { Button } from '@/shared/ui/Button';

import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import { MagicBento, BentoCard } from '@/shared/ui/MagicBento';
import LogoLoop from '@/shared/ui/LogoLoop';

interface FaqItem {
  q: string;
  a: string;
}

export function ApiIntegrationClient() {
  const t = useTranslations('services');

  return (
    <>
      

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-background-light">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <svg aria-hidden="true" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-slate-200"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-8 border border-blue-100">
              <OptimizedIcon icon={PlugsConnected} className="w-4 h-4" />
              <span>System Automation</span>
            </div>

            <h1 className="font-display font-black text-5xl sm:text-7xl text-secondary mb-8 leading-[0.9]">
              {t('api_integration_page.hero.title_prefix')}
              <br />
              <span className="text-blue-600">{t('api_integration_page.hero.title_suffix')}</span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
              {t('api_integration_page.hero.description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="primary" rightIcon={<OptimizedIcon icon={ArrowRight} />}>
                {t('api_integration_page.hero.cta')}
              </Button>
            </div>
          </div>

          {/* Visual: Connection Grid */}
          <div className="relative">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

              {/* Central Hub */}
              <div className="flex justify-center mb-12 relative">
                <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center shadow-xl relative z-10">
                  <OptimizedIcon icon={Cpu} className="text-4xl text-white" />
                </div>
                {/* Pulsing Rings */}
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping z-0" />
              </div>

              {/* Satellite Nodes */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex flex-col items-center">
                  <OptimizedIcon icon={ShoppingCart} className="text-2xl text-blue-600 mb-2" />
                  <span className="text-xs font-bold text-slate-700">Shopify</span>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100 flex flex-col items-center transform translate-y-8">
                  <OptimizedIcon icon={Users} className="text-2xl text-green-600 mb-2" />
                  <span className="text-xs font-bold text-slate-700">HubSpot</span>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 flex flex-col items-center">
                  <OptimizedIcon icon={ChatCircleDots} className="text-2xl text-purple-600 mb-2" />
                  <span className="text-xs font-bold text-slate-700">Slack</span>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex flex-col items-center">
                  <OptimizedIcon icon={CreditCard} className="text-2xl text-orange-600 mb-2" />
                  <span className="text-xs font-bold text-slate-700">Stripe</span>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex flex-col items-center transform translate-y-8">
                  <OptimizedIcon icon={FileText} className="text-2xl text-red-600 mb-2" />
                  <span className="text-xs font-bold text-slate-700">Drive</span>
                </div>
                <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100 flex flex-col items-center">
                  <OptimizedIcon icon={ChartBar} className="text-2xl text-cyan-600 mb-2" />
                  <span className="text-xs font-bold text-slate-700">Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Automate - Bento Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-6">
              {t('api_integration_page.why_automate.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {t('api_integration_page.why_automate.description')}
            </p>
          </div>

          <MagicBento className="grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            <BentoCard className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -left-20 -top-20 w-72 h-72 bg-indigo-500 rounded-full blur-3xl opacity-50" />
                <div className="absolute right-10 top-10 w-32 h-32 border-4 border-white/10 rounded-full" />
                <div className="absolute right-16 top-16 w-20 h-20 border-4 border-white/10 rounded-full" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20 mb-8">
                  <OptimizedIcon icon={Timer} className="text-4xl text-white" weight="fill" />
                </div>
                <div>
                  <h3 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
                    {t('api_integration_page.why_automate.items.efficiency.title')}
                  </h3>
                  <p className="text-blue-100 text-xl leading-relaxed max-w-md">
                    {t('api_integration_page.why_automate.items.efficiency.desc')}
                  </p>
                </div>
              </div>
            </BentoCard>

            <BentoCard className="md:col-span-1 md:row-span-1 bg-white border border-red-100 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <OptimizedIcon
                  icon={ShieldCheck}
                  className="text-[12rem] text-red-500 transform -rotate-12"
                  weight="fill"
                />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4 text-red-600">
                  <OptimizedIcon icon={Bug} className="text-2xl" weight="fill" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {t('api_integration_page.why_automate.items.errors.title')}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t('api_integration_page.why_automate.items.errors.desc')}
                  </p>
                </div>
              </div>
            </BentoCard>

            <BentoCard className="md:col-span-1 md:row-span-1 bg-white border border-amber-100 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <OptimizedIcon
                  icon={Lightning}
                  className="text-[10rem] text-amber-500 transform rotate-12"
                  weight="fill"
                />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 text-amber-600">
                  <OptimizedIcon icon={Lightning} className="text-2xl" weight="fill" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {t('api_integration_page.why_automate.items.speed.title')}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t('api_integration_page.why_automate.items.speed.desc')}
                  </p>
                </div>
              </div>
            </BentoCard>
          </MagicBento>
        </div>
      </section>

      {/* Connectivity / Supported Tools */}
      <section className="py-24 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            {t('api_integration_page.connectivity.title')}
          </h2>
          <p className="text-lg text-slate-600">
            {t('api_integration_page.connectivity.description')}
          </p>
        </div>

        <div className="py-8">
          <LogoLoop
            speed={40}
            direction="left"
            logos={(
              (t.raw('api_integration_page.connectivity.tools') as string[]) ||
              []
            ).map((tool) => ({
              node: (
                <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm mx-2 whitespace-nowrap">
                  <OptimizedIcon
                    icon={CheckCircle}
                    className="w-5 h-5 text-green-500"
                    weight="fill"
                  />
                  <span className="font-bold text-slate-700">{tool}</span>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background-light">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t('api_integration_page.faq.title')}
          </h2>
          <div className="space-y-6">
            {(
              (t.raw('api_integration_page.faq.items') as FaqItem[]) || []
            ).map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold mb-3">{item.q}</h3>
                <p className="text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <RelevantFAQs serviceId="api-integrations" className="mb-24" />
    </>
  );
};


