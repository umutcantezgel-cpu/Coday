"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { SquaresFour, ArrowRight, Check, FigmaLogo, Code } from '@phosphor-icons/react';
import { Button } from '@/shared/ui/Button';

import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import { motion } from 'motion/react';

export function DesignSystemsClient() {
  const t = useTranslations('services');

  const benefits = t.raw('design_systems_page.benefits.items') as {
    title: string;
    desc: string;
  }[];
  const components = t.raw('design_systems_page.components.items') as string[];

  return (
    <>
      

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-surface-base">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-8 border border-indigo-100">
            <OptimizedIcon icon={SquaresFour} className="w-4 h-4" />
            <span>{t('design_systems_page.hero.badge')}</span>
          </span>

          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-content-base mb-8 tracking-tight text-balance">
            <BlurText
              text={t('design_systems_page.hero.title_prefix')}
              delay={100}
              animateBy="words"
              className="inline-block mr-4"
            />
            <GradientText
              colors={['#6366F1', '#8B5CF6', '#A78BFA']}
              animationSpeed={6}
              className="inline-block"
            >
              {t('design_systems_page.hero.title_suffix')}
            </GradientText>
          </h1>
          <p className="text-xl text-content-muted leading-relaxed max-w-prose text-pretty max-w-2xl mx-auto mb-12">
            {t('design_systems_page.hero.description')}
          </p>
          <Button size="lg" variant="primary" rightIcon={<OptimizedIcon icon={ArrowRight} />}>
            {t('design_systems_page.hero.cta')}
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-16 text-center text-balance">
            {t('design_systems_page.benefits.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold text-indigo-900 mb-3">{benefit.title}</h3>
                <p className="text-indigo-700">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-12 text-center text-balance">
            {t('design_systems_page.components.title')}
          </h2>

          <div className="space-y-4">
            {components.map((component, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 bg-slate-800 border border-slate-700 rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <OptimizedIcon icon={Check} weight="bold" />
                </div>
                <span className="text-lg font-medium">{component}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-surface-elevated">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold mb-6 text-balance">
            {t('design_systems_page.workflow.title')}
          </h2>
          <p className="text-xl text-content-muted mb-12">
            {t('design_systems_page.workflow.description')}
          </p>

          {/* Figma to Code Visual */}
          <div className="flex items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-3">
                <OptimizedIcon icon={FigmaLogo} className="text-4xl text-white text-balance" />
              </div>
              <span className="font-bold text-slate-700">Figma</span>
            </div>
            <OptimizedIcon icon={ArrowRight} className="text-4xl text-slate-300 text-balance" />
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-3">
                <OptimizedIcon icon={Code} className="text-4xl text-white text-balance" />
              </div>
              <span className="font-bold text-slate-700">React</span>
            </div>
          </div>
        </div>
      </section>
      <RelevantFAQs serviceId="design-systems" className="mb-24" />
    </>
  );
};


