"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link as NavLink } from '@/i18n/navigation';
import { servicesData } from '@/shared/data/services';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { webDevImages } from '@/shared/data/serviceImages';
import BlurText from '@/shared/ui/BlurText';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { TechItem } from '@/widgets/services/TechStackShowcase';
import {
  Stack,
  Code,
  Database,
  PaintBrush,
  ArrowRight,
  RocketLaunch,
  CheckCircle,
  ShoppingCart,
  Cloud,
  Palette,
  SquaresFour,
  MagnifyingGlass,
  Gauge,
  Lightbulb,
  Lightning,
  ChartBar,
  ShieldCheck,
  Users,
} from '@phosphor-icons/react';

const iconMap: Record<string, React.ElementType> = {
  layers: Stack,
  code: Code,
  database: Database,
  brush: PaintBrush,
  shopping_cart: ShoppingCart,
  cloud: Cloud,
  palette: Palette,
  widgets: SquaresFour,
  rocket: RocketLaunch,
  search: MagnifyingGlass,
  speed: Gauge,
  lightbulb: Lightbulb,
  lightning: Lightning,
  chart_bar: ChartBar,
  shield_check: ShieldCheck,
  users: Users,
};

// Next.js App router compatible lazy loading
import dynamic from 'next/dynamic';

const ArchitectureVisualizer = dynamic(() => import('@/features/web-dev/ArchitectureVisualizer'));
const CodeQualitySimulator = dynamic(() => import('@/features/web-dev/CodeQualitySimulator'));
const SecurityGrid = dynamic(() => import('@/features/web-dev/SecurityGrid'));
const RelevantFAQs = dynamic(() => import('@/features/faq/ui/RelevantFAQs').then(mod => mod.RelevantFAQs));
const TechStackShowcase = dynamic(() => import('@/widgets/services/TechStackShowcase').then(mod => mod.TechStackShowcase));
const TestimonialCard = dynamic(() => import('@/shared/ui/TestimonialCard').then(mod => mod.TestimonialCard));

export function WebDevelopmentClient() {
  const t = useTranslations('services');
  const categoryData = servicesData['web-development'];
  const features = Object.values(categoryData);

  const webDevTechStack: TechItem[] = [
    { name: 'Next.js', category: 'Frontend', iconNode: <OptimizedIcon icon={Stack} size="lg" /> },
    { name: 'React', category: 'Frontend', iconNode: <OptimizedIcon icon={Code} size="lg" /> },
    { name: 'Tailwind CSS', category: 'Frontend', iconNode: <OptimizedIcon icon={PaintBrush} size="lg" /> },
    { name: 'TypeScript', category: 'Frontend', iconNode: <OptimizedIcon icon={Code} size="lg" /> },
    { name: 'Node.js', category: 'Backend', iconNode: <OptimizedIcon icon={Database} size="lg" /> },
    { name: 'Supabase', category: 'Backend', iconNode: <OptimizedIcon icon={Database} size="lg" /> },
    { name: 'PostgreSQL', category: 'Backend', iconNode: <OptimizedIcon icon={Database} size="lg" /> },
    { name: 'Sanity', category: 'CMS', iconNode: <OptimizedIcon icon={Stack} size="lg" /> },
    { name: 'Vercel', category: 'Deployment', iconNode: <OptimizedIcon icon={Cloud} size="lg" /> },
    { name: 'GitHub', category: 'Tools', iconNode: <OptimizedIcon icon={Code} size="lg" /> },
  ];

  return (
    <div className="bg-background-light pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 text-center lg:text-start">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              {t('services.web_development_page.hero.label')}
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6">
              <BlurText
                text={t('services.web_development_page.hero.title_anim')}
                delay={100}
                animateBy="words"
                className="block"
              />
              <span className="text-primary">{t('services.web_development_page.hero.title_static')}</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl lg:mx-0 mx-auto">
              {t('services.web_development_page.hero.description')}
            </p>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-2 scale-105"></div>
            {webDevImages.hero && (
              <OptimizedImage
                src={webDevImages.hero.src}
                alt={t(webDevImages.hero.alt as any)}
                className="relative rounded-3xl shadow-flat-lg w-full transform -rotate-1 hover:rotate-0 transition-all duration-500 bg-white p-2"
                priority
              />
            )}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="bg-white p-10 lg:p-12 rounded-3xl border border-red-100 shadow-flat relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none"></div>
            <span className="text-red-500 font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('services.web_development_page.problem.label')}
            </span>
            <h2 className="font-display font-bold text-3xl text-secondary mb-6">
              {t('services.web_development_page.problem.title')}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed relative z-10">
              {t('services.web_development_page.problem.description')}
            </p>
          </div>
          <div className="bg-primary/5 p-10 lg:p-12 rounded-3xl border border-primary/20 shadow-flat relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none"></div>
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('services.web_development_page.solution.label')}
            </span>
            <h2 className="font-display font-bold text-3xl text-secondary mb-6">
              {t('services.web_development_page.solution.title')}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed relative z-10">
              {t('services.web_development_page.solution.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <TechStackShowcase
        technologies={webDevTechStack}
        title={t('services.web_development_page.tech_stack.title')}
        subtitle={t('services.web_development_page.tech_stack.description')}
      />

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <NavLink
              key={index}
              href={`/services/web-development/${feature.slug}`}
              className="bg-white p-8 rounded-2xl shadow-flat border border-gray-100 hover:shadow-flat-lg transition-all duration-300 group hover:-translate-y-1 block relative overflow-hidden h-full"
            >
              <div className="absolute top-0 end-0 w-32 h-32 bg-secondary/5 rounded-bl-full -me-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors relative z-10">
                <OptimizedIcon icon={iconMap[feature.icon] || Code} />
              </div>
              <h3 className="font-display font-bold text-xl text-secondary mb-3 group-hover:text-primary transition-colors relative z-10">
                {/* Check if translation exists first */}
                {t(feature.titleKey as any)}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4 relative z-10">
                {t(feature.descriptionKey as any)}
              </p>
              <div className="text-primary font-bold text-sm uppercase tracking-wide flex items-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 relative z-10">
                {t('common.actions.read_more')} <OptimizedIcon icon={ArrowRight} className="ms-1 text-sm" />
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Architecture Visualizer */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('services.web_development_page.architecture.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
              <BlurText
                text={t('services.web_development_page.architecture.title')}
                delay={100}
                animateBy="words"
              />
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {t('services.web_development_page.architecture.description')}
            </p>
          </div>
          <ArchitectureVisualizer />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="bg-sapphire rounded-3xl p-12 shadow-flat-lg text-white">
          <h2 className="font-display font-bold text-3xl mb-6">
            {t('services.web_development_page.cta.title')}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {t('services.web_development_page.cta.description')}
          </p>
          <NavLink
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary rounded-xl bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all"
          >
            {t('services.web_development_page.cta.button')}
            <OptimizedIcon icon={RocketLaunch} className="ms-2" />
          </NavLink>
        </div>
      </section>
    </div>
  );
}
