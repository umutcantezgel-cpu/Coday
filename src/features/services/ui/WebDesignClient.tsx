'use client';
import React from 'react';

import { useTranslations } from 'next-intl';
import { Link as NavLink } from '@/i18n/navigation';
import BlurText from '@/shared/ui/BlurText';
import { servicesData } from '@/shared/data/services';
import Image from 'next/image';
import { brandingImages } from '@/shared/data/serviceImages';
import DesignSystemShowcase from '@/features/web-design/DesignSystemShowcase';
import PsychologyGrid from '@/features/web-design/PsychologyGrid';
import BeforeAfterReveal from '@/features/web-design/BeforeAfterReveal';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  Palette,
  SquaresFour,
  RocketLaunch,
  CheckCircle,
  ArrowRight,
  PenNib,
  MagicWand,
} from '@phosphor-icons/react';
import { TechStackShowcase, TechItem } from '@/widgets/services/TechStackShowcase';
const iconMap: Record<string, React.ElementType> = {
  palette: Palette,
  widgets: SquaresFour,
  rocket: RocketLaunch,
};
import { SeoHead } from '@/shared/ui/SeoHead';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';

export function WebDesignClient() {
  const t = useTranslations('services');

  const webDesignTechStack: TechItem[] = [
    { name: 'Figma', category: 'Design', iconNode: <OptimizedIcon icon={PenNib} size="lg" /> },
    {
      name: 'Framer',
      category: 'Prototyping',
      iconNode: <OptimizedIcon icon={MagicWand} size="lg" />,
    },
    {
      name: 'Webflow',
      category: 'Implementation',
      iconNode: <OptimizedIcon icon={SquaresFour} size="lg" />,
    },
    {
      name: 'Next.js',
      category: 'Frontend',
      iconNode: <OptimizedIcon icon={RocketLaunch} size="lg" />,
    },
    {
      name: 'Tailwind CSS',
      category: 'Styling',
      iconNode: <OptimizedIcon icon={Palette} size="lg" />,
    },
    {
      name: 'React',
      category: 'Frontend',
      iconNode: <OptimizedIcon icon={SquaresFour} size="lg" />,
    },
  ];

  // Fallback if key doesn't match perfectly, but it should be 'web-design'
  const categoryData = servicesData['web-design'];
  // We will map over these but use translated strings
  // We will map over these but use translated strings
  const features = categoryData ? Object.values(categoryData) : [];

  return (
    <div className="bg-surface-base pt-24 pb-16">
      <SeoHead
        title={t('web_design_page.meta.title')}
        description={t('web_design_page.meta.description')}
        pageType="service"
        schemaData={{
          service: {
            name: 'Web Design',
            description: t('web_design_page.meta.description'),
            serviceType: 'Web Design',
          },
        }}
      />
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center lg:text-start">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-sapphire font-bold tracking-wider uppercase text-sm mb-4 block">
              {t('web_design_page.hero.label')}
            </h1>
            <h2 className="block font-display font-black text-4xl sm:text-6xl text-content-base mb-6 text-balance">
              <BlurText
                text={t('web_design_page.hero.title_prefix')}
                delay={100}
                animateBy="words"
                className="block"
              />{' '}
              <span className="text-sapphire">{t('web_design_page.hero.title_suffix')}</span>
            </h2>
            <p className="text-xl text-content-muted leading-relaxed max-w-prose text-pretty max-w-3xl lg:mx-0 mx-auto">
              {t('web_design_page.hero.description')}
            </p>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-primary/10 rounded-[2rem] transform rotate-3 scale-95"></div>
            <Image
              src={brandingImages.hero?.src || ''}
              alt={brandingImages.hero?.alt || ''}
              width={800}
              height={600}
              className="relative rounded-[2rem] shadow-flat-lg w-full h-auto transform -rotate-2 hover:rotate-0 transition motion-reduce:duration-[0.01ms] duration-500 bg-surface-elevated p-2"
              priority={true}
            />
          </div>
        </div>
      </section>

      {/* Problem & Solution - NEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Problem */}
          <div className="bg-surface-elevated p-10 lg:p-12 rounded-3xl border border-red-100 shadow-flat relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none"></div>
            <span className="text-red-500 font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('web_design_page.problem.label')}
            </span>
            <h2 className="font-display font-bold text-3xl text-content-base mb-6 text-balance">
              {t('web_design_page.problem.title')}
            </h2>
            <p className="text-lg text-content-muted leading-relaxed max-w-prose text-pretty relative z-10">
              {t('web_design_page.problem.description')}
            </p>
          </div>
          {/* Solution */}
          <div className="bg-primary/5 p-10 lg:p-12 rounded-3xl border border-primary/20 shadow-flat relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none"></div>
            <span className="text-sapphire font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('web_design_page.solution.label')}
            </span>
            <h2 className="font-display font-bold text-3xl text-content-base mb-6 text-balance">
              {t('web_design_page.solution.title')}
            </h2>
            <p className="text-lg text-content-muted leading-relaxed max-w-prose text-pretty relative z-10">
              {t('web_design_page.solution.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Design System Showcase - NEW HIGH COMPLEXITY SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <span className="text-sapphire font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('web_design_page.design_system.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-content-base mb-6 whitespace-pre-line text-balance">
              {t('web_design_page.design_system.title')}
            </h2>
            <p className="text-lg text-content-muted mb-6 leading-relaxed max-w-prose text-pretty">
              {t('web_design_page.design_system.description')}
            </p>
            <ul className="space-y-4 mb-8">
              {(t.raw('web_design_page.design_system.items') as string[]).map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-content-muted font-medium">
                  <OptimizedIcon icon={CheckCircle} className="text-sapphire" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <DesignSystemShowcase />
        </div>
      </section>

      {/* Before/After Visual - NEW HIGH COMPLEXITY SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="text-center mb-16">
          <span className="text-sapphire font-bold uppercase tracking-wider text-sm mb-2 block">
            {t('web_design_page.before_after.label')}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-content-base mb-4 text-balance">
            {t('web_design_page.before_after.title')}
          </h2>
          <p className="text-lg text-content-muted max-w-2xl mx-auto">
            {t('web_design_page.before_after.description')}
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <BeforeAfterReveal />
        </div>
      </section>

      {/* Psychology of UI - NEW HIGH COMPLEXITY SECTION */}
      <section className="bg-surface-light py-24 mb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <span className="text-sapphire font-bold uppercase tracking-wider text-sm mb-4 block">
                {t('web_design_page.psychology.label')}
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-content-base mb-6 text-balance">
                {t('web_design_page.psychology.title')}
              </h2>
              <p className="text-lg text-content-muted mb-6 leading-relaxed max-w-prose text-pretty">
                {t('web_design_page.psychology.description')}
              </p>
            </div>
          </div>

          <PsychologyGrid />
        </div>
      </section>

      {/* UX Process Timeline - EXISTING BUT REFINED */}
      <section className="bg-secondary py-24 mb-24 text-white overflow-hidden relative">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4 text-balance">
              {t('web_design_page.process.title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('web_design_page.process.description')}
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-0 w-full h-1 bg-surface-elevated/10 -translate-y-1/2 hidden lg:block"
            ></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              {(
                t.raw('services_data.shared.design_process') as {
                  number: string;
                  title: string;
                  description: string;
                }[]
              ).map((phase, idx) => (
                <div
                  key={idx}
                  className="relative bg-surface-elevated/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-surface-elevated/10 transition-colors motion-reduce:duration-[0.01ms] group"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -top-6 start-8 bg-primary text-white font-bold text-xl w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border-4 border-secondary group-hover:scale-[0.97] ease-spring transition-transform motion-reduce:duration-[0.01ms]"
                  >
                    {phase.number}
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-3">{phase.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-prose text-pretty">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <TechStackShowcase
        technologies={webDesignTechStack}
        title={t('web_design_page.tech_stack.title')}
        subtitle={t('web_design_page.tech_stack.description')}
      />

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            // Map the feature slug to the translation key

            return (
              <div
                key={index}
                className="bg-surface-elevated p-8 rounded-2xl shadow-flat border border-border-muted hover:shadow-flat-lg transition motion-reduce:duration-[0.01ms] duration-300 group hover:scale-[0.97] ease-spring block relative overflow-hidden h-full"
              >
                <div className="absolute top-0 end-0 w-32 h-32 bg-secondary/5 rounded-bl-full -me-8 -mt-8 transition-transform motion-reduce:duration-[0.01ms] group-hover:scale-[0.97] ease-spring"></div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-sapphire mb-6 group-hover:bg-sapphire group-hover:text-white transition-colors motion-reduce:duration-[0.01ms] relative z-10">
                  <OptimizedIcon icon={iconMap[feature.icon] || Palette} />
                </div>
                <h3 className="font-display font-bold text-xl text-content-base mb-3 group-hover:text-sapphire transition-colors motion-reduce:duration-[0.01ms] relative z-10">
                  <NavLink
                    href={`/services/web-design/${feature.slug}`}
                    className="before:absolute before:inset-0 before:z-30 hover:underline"
                  >
                    {t(feature.titleKey)}
                  </NavLink>
                </h3>
                <p className="text-content-muted leading-relaxed max-w-prose text-pretty mb-4 relative z-40">
                  {t(feature.descriptionKey)}
                </p>
                <div className="text-sapphire font-bold text-sm uppercase tracking-wide flex items-center opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] transform translate-y-2 group-hover:translate-y-0 relative z-40">
                  {t('actions.read_more')}{' '}
                  <OptimizedIcon icon={ArrowRight} className="ms-1 text-sm" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Relevant FAQs */}
      <RelevantFAQs serviceId="web-design" className="mb-24" />

      {/* Case Study Teaser - NEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="bg-secondary text-white rounded-3xl p-10 lg:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
          <div className="md:w-1/2 relative z-10">
            <span className="text-action-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('web_design_page.case_study.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6 text-balance">
              {t('web_design_page.case_study.title')}
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-prose text-pretty">
              {t('web_design_page.case_study.description')}
            </p>
            <NavLink
              href="/work/batherm"
              className="inline-flex items-center justify-center px-6 py-3 font-bold text-content-base rounded-xl bg-primary hover:bg-surface-elevated transition motion-reduce:duration-[0.01ms] shadow-glow"
            >
              {t('actions.read_more')}
              <OptimizedIcon icon={ArrowRight} className="ms-2" />
            </NavLink>
          </div>
          <div className="md:w-1/2 relative z-10 w-full">
            <div className="aspect-video bg-surface-elevated/5 rounded-2xl border border-white/10 p-2 shadow-2xl backdrop-blur-sm transform rotate-2 hover:rotate-0 transition-transform motion-reduce:duration-[0.01ms] duration-500 overflow-hidden">
              {/* Replace with actual case study image if available */}
              <div className="w-full h-full bg-slate-800 rounded-xl flex items-center justify-center">
                <OptimizedIcon
                  icon={Palette}
                  size="xl"
                  className="text-action-primary/50"
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
