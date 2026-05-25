"use client";

import React from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Code, Palette, RocketLaunch, ArrowRight } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { Link as NavLink } from '@/i18n/navigation';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { serviceImages } from '@/shared/data/serviceImages';
import ScrollFloat from '@/shared/ui/ScrollFloat';
import { cn } from '@/shared/lib/utils';
import { baseButtonStyles, buttonVariants, buttonSizes } from '@/shared/ui/ButtonStyles';
// Premium UI Components
import RotatingText from '@/shared/ui/RotatingText';
import { MagicBento, BentoCard } from '@/shared/ui/MagicBento';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { SeoHead } from '@/shared/ui/SeoHead';

// Lazy load heavy components below the fold
const GlareHover = React.lazy(() => import('@/shared/ui/GlareHover'));
const RelevantFAQs = React.lazy(() =>
  import('@/features/faq/ui/RelevantFAQs').then((m) => ({ default: m.RelevantFAQs }))
);

const Services: React.FC = () => {
  const t = useTranslations('services') as any;

  const categories = [
    {
      icon: Code,
      title: t('categories.web_development.title'),
      description: t('categories.web_development.description'),
      link: '/services/web-development',
      color: 'bg-blue-500',
      imageKey: 'development',
      effect: 'spotlight' as const,
    },
    {
      icon: Palette,
      title: t('categories.web_design.title'),
      description: t('categories.web_design.description'),
      link: '/services/web-design',
      color: 'bg-purple-500',
      imageKey: 'webdesign',
      effect: 'glow' as const,
    },
    {
      icon: RocketLaunch,
      title: t('categories.seo.title'),
      description: t('categories.seo.description'),
      link: '/services/seo',
      color: 'bg-emerald-500',
      imageKey: 'growth',
      effect: 'spotlight' as const,
    },
  ];

  return (
    <div className="bg-background-light">
      <SeoHead
        title={t('meta.title', { defaultValue: 'Unsere Leistungen in Wetzlar | Coday' })}
        description={t('meta.description', {
          defaultValue:
            'High-End Webentwicklung, Design & Strategie aus Wetzlar, Hessen für Ihren digitalen Erfolg.',
        })}
        pageType="service"
        schemaData={{
          service: {
            name: t('hero.title', { defaultValue: 'Webentwicklung & Design Wetzlar' }),
            description: t('meta.description', {
              defaultValue:
                'High-End Webentwicklung, Design & Strategie aus Wetzlar, Hessen für Ihren digitalen Erfolg.',
            }),
            serviceType: 'Web Design and Development',
          },
        }}
      />
      {/* Header with Hero Image */}
      <section className="pt-12 pb-8 md:pt-24 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-start">
            <div className="mb-4 flex justify-center lg:justify-start">
              <Breadcrumbs />
            </div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              {t('hero.label')}
            </span>
            <ScrollFloat
              animationDuration={0.8}
              ease="back.out(1.7)"
              scrollStart="top bottom"
              scrollEnd="center center"
              stagger={0.02}
              containerClassName="!my-0 mb-4"
              textClassName="font-display font-black text-4xl sm:text-6xl text-secondary"
            >
              {t('hero.title')}
            </ScrollFloat>
            <div className="max-w-2xl">
              <RotatingText
                texts={(t.raw('hero.rotating') as string[]) || ['Web-Design', 'Web-Entwicklung', 'SEO']}
                rotationInterval={3500}
                staggerFrom="first"
                staggerDuration={0.025}
                mainClassName="text-xl text-slate-600 leading-relaxed"
              />
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl transform rotate-2"></div>
            <OptimizedImage
              src={serviceImages.hero!.src}
              alt={t(serviceImages.hero!.alt)}
              className="relative rounded-3xl shadow-flat-lg w-full transform -rotate-1 hover:rotate-0 transition-all duration-500"
              priority
            />
          </div>
        </div>
      </section>

      {/* Categories Grid with MagicBento */}
      <section className="pb-20 md:pb-32 px-4 sm:px-6 lg:px-8">
        <MagicBento columns={3} gap={32} className="max-w-7xl mx-auto">
          {categories.map((cat, index) => (
            <BentoCard
              key={index}
              effect={cat.effect}
              spotlightColor="rgba(20, 122, 122, 0.15)"
              glowColor="rgba(139, 92, 246, 0.3)"
              className="h-full border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/20 transition-all duration-500 ease-out bg-white rounded-2xl md:aspect-[1/1.618]"
            >
              <NavLink
                href={cat.link}
                className="group relative p-6 md:p-8 block h-full flex flex-col"
              >
                {/* Decorative Background Image */}
                <div className="absolute top-0 end-0 w-64 h-64 opacity-[0.02] transform translate-x-12 rtl:-translate-x-12 -translate-y-12 group-hover:scale-110 group-hover:opacity-[0.05] transition-all duration-700 rounded-bl-[100px] rtl:rounded-br-[100px] rtl:rounded-bl-none overflow-hidden pointer-events-none ease-out">
                  {serviceImages[cat.imageKey || 'hero'] && (
                    <OptimizedImage
                      src={serviceImages[cat.imageKey || 'hero']!.src}
                      alt=""
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                </div>
                <div
                  className={`absolute top-0 end-0 w-32 h-32 ${cat.color} opacity-[0.03] rounded-bl-[100px] rtl:rounded-br-[100px] rtl:rounded-bl-none transition-transform duration-700 ease-out group-hover:scale-[1.3] group-hover:opacity-[0.06]`}
                ></div>

                <div className="relative z-10 flex-grow">
                  <div
                    className={`w-14 h-14 ${cat.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-opacity-20 group-hover:-rotate-3 shadow-sm`}
                  >
                    <OptimizedIcon
                      icon={cat.icon}
                      weight="duotone"
                      className={`text-3xl ${cat.color.replace('bg-', 'text-')}`}
                    />
                  </div>

                  <h3 className="font-display font-bold text-xl md:text-2xl text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="text-base text-slate-600 mb-8 leading-[1.618]">{cat.description}</p>
                </div>
                <div className="flex items-center text-primary font-bold tracking-wide uppercase text-sm mt-auto transition-all duration-300 group-hover:tracking-wider">
                  {t('cta.more')}
                  <OptimizedIcon
                    icon={ArrowRight}
                    weight="bold"
                    className="ms-3 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300 ease-out"
                  />
                </div>
              </NavLink>
            </BentoCard>
          ))}
        </MagicBento>
      </section>

      {/* FAQs for Rich Snippets */}
      <React.Suspense fallback={<div className="min-h-[200px]" />}>
        <RelevantFAQs
          serviceId={['web-development', 'web-design', 'seo']}
          className="bg-gray-50 border-t border-gray-100"
        />
      </React.Suspense>

      {/* CTA with GlareHover */}
      <section className="py-12 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <ScrollFloat
            animationDuration={0.8}
            ease="back.out(1.7)"
            scrollStart="top bottom"
            scrollEnd="center center"
            stagger={0.02}
            containerClassName="!my-0 mb-8"
            textClassName="font-display font-bold text-3xl text-secondary"
          >
            {t('cta.ready')}
          </ScrollFloat>
          <React.Suspense
            fallback={
              <div className="h-14 w-40 bg-gray-200 rounded-xl animate-pulse inline-block" />
            }
          >
            <GlareHover glareColor="#ffffff" glareOpacity={0.4} className="inline-block rounded-xl">
              <NavLink
                href="/contact"
                className={cn(baseButtonStyles, buttonVariants.primary, buttonSizes.lg)}
              >
                {t('cta.button')}
                <OptimizedIcon icon={ArrowRight} className="ms-2 rtl:rotate-180" />
              </NavLink>
            </GlareHover>
          </React.Suspense>
        </div>
      </section>
    </div>
  );
};

export default Services;
