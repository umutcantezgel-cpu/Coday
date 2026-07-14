'use client';
import React from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations } from 'next-intl';
import { Link as NavLink } from '@/i18n/navigation';
import { servicesData } from '@/shared/data/services';
import Image from 'next/image';
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
} from '@phosphor-icons/react/dist/ssr';

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
const RelevantFAQs = dynamic(() =>
  import('@/features/faq/ui/RelevantFAQs').then((mod) => mod.RelevantFAQs)
);
const TechStackShowcase = dynamic(() =>
  import('@/widgets/services/TechStackShowcase').then((mod) => mod.TechStackShowcase)
);
const TestimonialCard = dynamic(() =>
  import('@/shared/ui/TestimonialCard').then((mod) => mod.TestimonialCard)
);

export function WebDevelopmentClient() {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');
  const categoryData = servicesData['web-development'];
  const features = Object.values(categoryData);

  const webDevTechStack: TechItem[] = [
    { name: 'Next.js', category: 'Frontend', iconNode: <OptimizedIcon icon={Stack} size="lg" /> },
    { name: 'React', category: 'Frontend', iconNode: <OptimizedIcon icon={Code} size="lg" /> },
    {
      name: 'Tailwind CSS',
      category: 'Frontend',
      iconNode: <OptimizedIcon icon={PaintBrush} size="lg" />,
    },
    { name: 'TypeScript', category: 'Frontend', iconNode: <OptimizedIcon icon={Code} size="lg" /> },
    { name: 'Node.js', category: 'Backend', iconNode: <OptimizedIcon icon={Database} size="lg" /> },
    {
      name: 'Supabase',
      category: 'Backend',
      iconNode: <OptimizedIcon icon={Database} size="lg" />,
    },
    {
      name: 'PostgreSQL',
      category: 'Backend',
      iconNode: <OptimizedIcon icon={Database} size="lg" />,
    },
    { name: 'Sanity', category: 'CMS', iconNode: <OptimizedIcon icon={Stack} size="lg" /> },
    { name: 'Vercel', category: 'Deployment', iconNode: <OptimizedIcon icon={Cloud} size="lg" /> },
    { name: 'GitHub', category: 'Tools', iconNode: <OptimizedIcon icon={Code} size="lg" /> },
  ];

  return (
    <div className="bg-surface-base pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 text-center lg:text-start">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-action-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              {t('web_development_page.hero.label')}
            </span>
            <h1 className="block font-display font-black text-4xl sm:text-6xl text-content-base mb-6 text-balance">
              <BlurText
                text={t('web_development_page.hero.title_anim')}
                delay={100}
                animateBy="words"
                className="block"
              />{' '}
              <span className="text-action-primary">
                {t('web_development_page.hero.title_static')}
              </span>
            </h1>
            <p className="text-xl text-content-muted leading-relaxed max-w-prose text-pretty max-w-3xl lg:mx-0 mx-auto">
              {t('web_development_page.hero.description')}
            </p>
          </div>
          <div className="relative hidden lg:block">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-2 scale-105"
            ></div>
            {webDevImages.hero && (
              <Image
                src={webDevImages.hero.src}
                alt={t(webDevImages.hero.alt as any)}
                width={800}
                height={600}
                className="relative rounded-3xl shadow-flat-lg w-full h-auto transform -rotate-1 hover:rotate-0 transition motion-reduce:duration-[0.01ms] duration-500 bg-surface-elevated p-2"
                priority={true}
              />
            )}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="bg-surface-elevated p-10 lg:p-12 rounded-3xl border border-red-100 shadow-flat relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none"></div>
            <span className="text-red-500 font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('web_development_page.problem.label')}
            </span>
            <h2 className="font-display font-bold text-3xl text-content-base mb-6 text-balance">
              {t('web_development_page.problem.title')}
            </h2>
            <p className="text-lg text-content-muted leading-relaxed max-w-prose text-pretty relative z-10">
              {t('web_development_page.problem.description')}
            </p>
          </div>
          <div className="bg-primary/5 p-10 lg:p-12 rounded-3xl border border-primary/20 shadow-flat relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none"></div>
            <span className="text-action-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('web_development_page.solution.label')}
            </span>
            <h2 className="font-display font-bold text-3xl text-content-base mb-6 text-balance">
              {t('web_development_page.solution.title')}
            </h2>
            <p className="text-lg text-content-muted leading-relaxed max-w-prose text-pretty relative z-10">
              {t('web_development_page.solution.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <TechStackShowcase
        technologies={webDevTechStack}
        title={t('web_development_page.tech_stack.title')}
        subtitle={t('web_development_page.tech_stack.description')}
      />

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-surface-elevated p-8 rounded-2xl shadow-flat border border-border-muted hover:shadow-flat-lg transition motion-reduce:duration-[0.01ms] duration-300 group hover:scale-[0.97] ease-spring block relative overflow-hidden h-full"
            >
              <div className="absolute top-0 end-0 w-32 h-32 bg-secondary/5 rounded-bl-full -me-8 -mt-8 transition-transform motion-reduce:duration-[0.01ms] group-hover:scale-[0.97] ease-spring"></div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-action-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors motion-reduce:duration-[0.01ms] relative z-10">
                <OptimizedIcon icon={iconMap[feature.icon] || Code} />
              </div>
              <h3 className="font-display font-bold text-xl text-content-base mb-3 group-hover:text-action-primary transition-colors motion-reduce:duration-[0.01ms] relative z-10">
                <NavLink
                  href={`/services/web-development/${feature.slug}`}
                  className="before:absolute before:inset-0 before:z-30 hover:underline"
                >
                  {t(feature.titleKey as any)}
                </NavLink>
              </h3>
              <p className="text-content-muted leading-relaxed max-w-prose text-pretty mb-4 relative z-40">
                {t(feature.descriptionKey as any)}
              </p>
              <div className="text-action-primary font-bold text-sm uppercase tracking-wide flex items-center opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] transform translate-y-2 group-hover:translate-y-0 relative z-40">
                {tCommon('actions.read_more')}{' '}
                <OptimizedIcon icon={ArrowRight} className="ms-1 text-sm" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Visualizer */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-action-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('web_development_page.architecture.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-content-base mb-6 text-balance">
              <BlurText
                text={t('web_development_page.architecture.title')}
                delay={100}
                animateBy="words"
              />
            </h2>
            <p className="text-lg text-content-muted mb-6 leading-relaxed max-w-prose text-pretty">
              {t('web_development_page.architecture.description')}
            </p>
          </div>
          <ArchitectureVisualizer />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="bg-sapphire rounded-3xl p-12 shadow-flat-lg text-white">
          <h2 className="font-display font-bold text-3xl mb-6 text-balance">
            {t('web_development_page.cta.title')}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {t('web_development_page.cta.description')}
          </p>
          <NavLink
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-action-primary rounded-xl bg-surface-elevated hover:bg-surface-muted shadow-lg hover:shadow-xl transition motion-reduce:duration-[0.01ms]"
          >
            {t('web_development_page.cta.button')}
            <OptimizedIcon icon={RocketLaunch} className="ms-2" />
          </NavLink>
        </div>
      </section>
    </div>
  );
}
