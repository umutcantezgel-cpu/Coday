"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { ChartBar, ArrowRight, MagnifyingGlass, FileText } from '@phosphor-icons/react';
import { Button } from '@/shared/ui/Button';

import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import CountUp from '@/shared/ui/CountUp';
import { motion } from 'motion/react';

export function UxAuditClient() {
  const t = useTranslations();

  const analysisItems = t.raw('ux_audit_page.what_we_analyze.items') as {
    title: string;
    desc: string;
  }[];
  const deliverables = t.raw('ux_audit_page.deliverables.items') as string[];

  return (
    <>
      

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-background-light">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-bold mb-8 border border-orange-100">
            <OptimizedIcon icon={ChartBar} className="w-4 h-4" />
            <span>{t('ux_audit_page.hero.badge')}</span>
          </span>

          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-secondary mb-8 tracking-tight">
            <BlurText
              text={t('ux_audit_page.hero.title_prefix')}
              delay={100}
              animateBy="words"
              className="inline-block mr-4"
            />
            <GradientText
              colors={['#F59E0B', '#EF4444', '#EC4899']}
              animationSpeed={6}
              className="inline-block"
            >
              {t('ux_audit_page.hero.title_suffix')}
            </GradientText>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
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
          <div className="text-6xl font-black mb-4">
            <CountUp from={0} to={35} duration={2} />%
          </div>
          <div className="text-xl font-medium text-orange-100">
            {t('ux_audit_page.stats.conversion_label')}
          </div>
        </div>
      </section>

      {/* What We Analyze */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-16 text-center">
            {t('ux_audit_page.what_we_analyze.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analysisItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <OptimizedIcon icon={MagnifyingGlass} className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">
            {t('ux_audit_page.deliverables.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {deliverables.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-5 bg-slate-800 border border-slate-700 rounded-xl"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
                  <OptimizedIcon icon={FileText} />
                </div>
                <span className="font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <RelevantFAQs serviceId="ux-audit" className="mb-24" />
    </>
  );
};


