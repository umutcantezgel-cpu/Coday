'use client';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import { Link as NavLink } from '@/i18n/navigation';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { marketingImages } from '@/shared/data/serviceImages';
import TrafficROICalculator from '@/features/seo/TrafficROICalculator';
import RankingPeriodicTable from '@/features/seo/RankingPeriodicTable';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  CheckCircle,
  Gear,
  FileText,
  MapPin,
  ChartLineUp,
  ArrowRight,
  GoogleLogo,
  MagnifyingGlass,
  Graph,
  Bug,
  Link,
} from '@phosphor-icons/react';
import { TechStackShowcase, TechItem } from '@/widgets/services/TechStackShowcase';
import { SeoHead } from '@/shared/ui/SeoHead';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import { TestimonialCard } from '@/shared/ui/TestimonialCard';

export function SeoClient() {
  const t = useTranslations();

  const seoTechStack: TechItem[] = [
    {
      name: 'Google Search Console',
      category: 'Analytics',
      iconNode: <OptimizedIcon icon={GoogleLogo} size="lg" />,
    },
    {
      name: 'Google Analytics 4',
      category: 'Analytics',
      iconNode: <OptimizedIcon icon={ChartLineUp} size="lg" />,
    },
    {
      name: 'Ahrefs',
      category: 'Research',
      iconNode: <OptimizedIcon icon={MagnifyingGlass} size="lg" />,
    },
    { name: 'Semrush', category: 'Research', iconNode: <OptimizedIcon icon={Graph} size="lg" /> },
    {
      name: 'Screaming Frog',
      category: 'Technical',
      iconNode: <OptimizedIcon icon={Bug} size="lg" />,
    },
    { name: 'Majestic', category: 'Off-Page', iconNode: <OptimizedIcon icon={Link} size="lg" /> },
  ];

  return (
    <div className="bg-background-light min-h-dvh">
      <SeoHead
        title={t('seo_page.meta.title')}
        description={t('seo_page.meta.description')}
        pageType="service"
        schemaData={{
          service: {
            name: 'SEO & Suchmaschinenoptimierung',
            description: t('seo_page.meta.description'),
            serviceType: 'Search Engine Optimization',
          },
        }}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-start">
              <span className="text-sapphire font-bold tracking-wider uppercase text-sm mb-4 block">
                {t('seo_page.hero.badge')}
              </span>
              <h1 className="font-display font-black text-5xl sm:text-7xl text-secondary mb-8 tracking-tight">
                <BlurText
                  text={t('seo_page.hero.title_prefix')}
                  delay={100}
                  animateBy="words"
                  className="block"
                />
                <GradientText
                  colors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
                  animationSpeed={6}
                  className="block"
                >
                  {t('seo_page.hero.title_suffix')}
                </GradientText>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12">
                {t('seo_page.hero.description')}
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform -rotate-2 scale-105"></div>
              <OptimizedImage
                src={marketingImages.hero!.src}
                alt={t(marketingImages.hero!.alt)}
                className="relative rounded-3xl shadow-flat-lg w-full transform rotate-1 hover:rotate-0 transition-all duration-500 bg-white p-2"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution - NEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 mt-12">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Problem */}
          <div className="bg-white p-10 lg:p-12 rounded-3xl border border-red-100 shadow-flat relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none"></div>
            <span className="text-red-500 font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('seo_page.problem.label')}
            </span>
            <h2 className="font-display font-bold text-3xl text-secondary mb-6">
              {t('seo_page.problem.title')}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed relative z-10">
              {t('seo_page.problem.description')}
            </p>
          </div>
          {/* Solution */}
          <div className="bg-primary/5 p-10 lg:p-12 rounded-3xl border border-primary/20 shadow-flat relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none"></div>
            <span className="text-sapphire font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('seo_page.solution.label')}
            </span>
            <h2 className="font-display font-bold text-3xl text-secondary mb-6">
              {t('seo_page.solution.title')}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed relative z-10">
              {t('seo_page.solution.description')}
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator - NEW HIGH COMPLEXITY SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 -mt-12 relative z-20">
        <TrafficROICalculator />
      </section>

      {/* Ranking Factors - NEW HIGH COMPLEXITY SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-12">
          <div>
            <span className="text-sapphire font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('seo_page.ranking_factors.badge')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6 whitespace-pre-line">
              {t('seo_page.ranking_factors.title')}
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {t('seo_page.ranking_factors.description')}
            </p>
          </div>
        </div>
        <RankingPeriodicTable />
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
            <div className="order-2 md:order-1 relative">
              <div className="absolute top-0 end-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl"></div>
              <OptimizedImage
                src={marketingImages.omnichannel!.src}
                alt={t(marketingImages.omnichannel!.alt)}
                className="relative rounded-3xl shadow-lg w-full border border-gray-100"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
                {t('seo_page.dominance.title')}
              </h2>
              <p className="text-lg text-slate-600 mb-6">{t('seo_page.dominance.description')}</p>
              <ul className="space-y-3">
                {(Array.isArray(t.raw('seo_page.dominance.items'))
                  ? (t.raw('seo_page.dominance.items') as string[])
                  : []
                ).map((item, i) => (
                  <li key={i} className="flex items-center text-secondary font-medium">
                    <OptimizedIcon icon={CheckCircle} className="text-sapphire me-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-surface-light rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <OptimizedIcon icon={Gear} />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-secondary">
                {t('seo_page.dominance.cards.technical.title')}
              </h3>
              <p className="text-slate-600">{t('seo_page.dominance.cards.technical.desc')}</p>
            </div>
            <div className="p-8 bg-surface-light rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <OptimizedIcon icon={FileText} />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-secondary">
                {t('seo_page.dominance.cards.content.title')}
              </h3>
              <p className="text-slate-600">{t('seo_page.dominance.cards.content.desc')}</p>
            </div>
            <div className="p-8 bg-surface-light rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <OptimizedIcon icon={MapPin} />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-secondary">
                {t('seo_page.dominance.cards.regional.title')}
              </h3>
              <p className="text-slate-600">{t('seo_page.dominance.cards.regional.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <TechStackShowcase
        technologies={seoTechStack}
        title={t('seo_page.tech_stack.title')}
        subtitle={t('seo_page.tech_stack.description')}
      />

      {/* Testimonial */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-24">
        <TestimonialCard
          quote="Seit Coday unsere SEO-Strategie übernommen hat, verzeichnen wir nicht nur deutlich mehr organischen Traffic, sondern auch wesentlich qualifiziertere Leads. Der ROI dieser Kampagne hat unsere Erwartungen weit übertroffen."
          authorName="Thomas M."
          authorPosition="Geschäftsführer"
          authorCompany="EcoSolutions GmbH"
          rating={5}
        />
      </section>

      {/* Relevant FAQs */}
      <RelevantFAQs serviceId="seo" className="mb-24" />

      {/* SEO Process Timeline */}
      <section className="bg-secondary py-24 mb-24 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              {t('seo_page.process.title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t('seo_page.process.description')}</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden lg:block"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: t('seo_page.process.steps.audit.title'),
                  desc: t('seo_page.process.steps.audit.desc'),
                },
                {
                  step: '02',
                  title: t('seo_page.process.steps.strategy.title'),
                  desc: t('seo_page.process.steps.strategy.desc'),
                },
                {
                  step: '03',
                  title: t('seo_page.process.steps.implementation.title'),
                  desc: t('seo_page.process.steps.implementation.desc'),
                },
                {
                  step: '04',
                  title: t('seo_page.process.steps.monitoring.title'),
                  desc: t('seo_page.process.steps.monitoring.desc'),
                },
              ].map((phase, idx) => (
                <div
                  key={idx}
                  className="relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="absolute -top-6 start-8 bg-primary text-secondary font-bold text-xl w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border-4 border-secondary group-hover:scale-110 transition-transform">
                    {phase.step}
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-3">{phase.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Teaser - NEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="bg-secondary text-white rounded-3xl p-10 lg:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
          <div className="md:w-1/2 relative z-10">
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('seo_page.case_study.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6">
              {t('seo_page.case_study.title')}
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {t('seo_page.case_study.description')}
            </p>
            <NavLink
              href="/work"
              className="inline-flex items-center justify-center px-6 py-3 font-bold text-secondary rounded-xl bg-primary hover:bg-white transition-all shadow-glow"
            >
              {t('actions.read_more')}
              <OptimizedIcon icon={ArrowRight} className="ms-2" />
            </NavLink>
          </div>
          <div className="md:w-1/2 relative z-10 w-full">
            <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 p-2 shadow-2xl backdrop-blur-sm transform rotate-2 hover:rotate-0 transition-transform duration-500 overflow-hidden">
              {/* Replace with actual case study image if available */}
              <div className="w-full h-full bg-slate-800 rounded-xl flex items-center justify-center">
                <OptimizedIcon
                  icon={ChartLineUp}
                  size="xl"
                  className="text-primary/50"
                  weight="duotone"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
