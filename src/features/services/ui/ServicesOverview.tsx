import React from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Code, Palette, RocketLaunch, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { getTranslations } from 'next-intl/server';
import { Link as NavLink } from '@/i18n/navigation';
import Image from 'next/image';
import { serviceImages } from '@/shared/data/serviceImages';
import ScrollFloat from '@/shared/ui/ScrollFloat';
import { cn } from '@/shared/lib/utils';
import { baseButtonStyles, buttonVariants, buttonSizes } from '@/shared/ui/ButtonStyles';

// Premium UI Components
import RotatingText from '@/shared/ui/RotatingText';
import { MagicBento, BentoCard } from '@/shared/ui/MagicBento';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { SeoHead } from '@/shared/ui/SeoHead';

import GlareHover from '@/shared/ui/GlareHover';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';

export const ServicesOverview = async () => {
  const t = await getTranslations('services');

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
    <div className="bg-surface-base">
      <SeoHead
        title={t('meta.title', { fallback: 'Unsere Leistungen in Wetzlar | Coday' })}
        description={t('meta.description', {
          fallback:
            'High-End Webentwicklung, Design & Strategie aus Wetzlar, Hessen für Ihren digitalen Erfolg.',
        })}
        pageType="service"
        schemaData={{
          service: {
            name: t('hero.title', { fallback: 'Webentwicklung & Design Wetzlar' }),
            description: t('meta.description', {
              fallback:
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
            <span className="text-action-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              {t('hero.label')}
            </span>

            <noscript>
              <style>{`.js-only { display: none; }`}</style>
            </noscript>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-content-base mb-4 text-balance">
              <ScrollFloat
                as="span"
                animationDuration={0.8}
                ease="back.out(1.7)"
                scrollStart="top bottom"
                scrollEnd="center center"
                stagger={0.02}
                containerClassName="!my-0 block"
              >
                {t('hero.title')}
              </ScrollFloat>
            </h1>

            <div className="text-xl text-content-muted leading-relaxed max-w-prose text-pretty mb-6">
              <span className="js-only block max-w-2xl min-h-[60px]">
                <RotatingText
                  texts={
                    (t.raw('hero.rotating') as string[]) || ['Web-Design', 'Web-Entwicklung', 'SEO']
                  }
                  rotationInterval={3500}
                  staggerFrom="first"
                  staggerDuration={0.025}
                  mainClassName="text-xl text-content-muted leading-relaxed max-w-prose"
                />
              </span>
              <noscript>{(t.raw('hero.rotating') as string[])?.[0] || 'Web-Design'}</noscript>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-action-primary/20 to-transparent rounded-3xl transform rotate-2"></div>
            <Image
              src={serviceImages.hero!.src}
              alt={t(serviceImages.hero!.alt)}
              width={800}
              height={600}
              className="relative rounded-3xl shadow-flat-lg w-full h-auto transform -rotate-1 hover:rotate-0 transition motion-reduce:duration-[0.01ms] duration-300 hover:scale-[0.97] ease-spring"
              priority={true}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Categories Grid with MagicBento */}
      <section aria-label="Service categories" className="pb-20 md:pb-32 px-4 sm:px-6 lg:px-8">
        <MagicBento columns={3} gap={32} className="max-w-7xl mx-auto">
          {categories.map((cat, index) => (
            <BentoCard
              key={index}
              effect={cat.effect}
              spotlightColor="rgba(20, 122, 122, 0.15)"
              glowColor="rgba(139, 92, 246, 0.3)"
              className="h-full border border-border-muted shadow-sm hover:scale-[0.97] hover:border-action-primary/20 transition motion-reduce:duration-[0.01ms] duration-300 ease-spring bg-surface-elevated rounded-2xl md:aspect-[1/1.618]"
            >
              <div className="group relative p-6 md:p-8 block h-full flex flex-col">
                {/* Decorative Background Image */}
                <div className="absolute top-0 end-0 w-64 h-64 opacity-[0.02] transform translate-x-12 rtl:-translate-x-12 -translate-y-12 group-hover:scale-[0.97] ease-spring group-hover:opacity-[0.05] transition motion-reduce:duration-[0.01ms] duration-700 rounded-bl-[100px] rtl:rounded-br-[100px] rtl:rounded-bl-none overflow-hidden pointer-events-none ease-out">
                  {serviceImages[cat.imageKey || 'hero'] && (
                    <Image
                      src={serviceImages[cat.imageKey || 'hero']!.src}
                      alt={cat.title}
                      width={256}
                      height={256}
                      className="w-full h-full object-cover mix-blend-multiply"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div
                  className={`absolute top-0 end-0 w-32 h-32 ${cat.color} opacity-[0.03] rounded-bl-[100px] rtl:rounded-br-[100px] rtl:rounded-bl-none transition-transform motion-reduce:duration-[0.01ms] duration-700 ease-out group-hover:scale-[1.3] group-hover:opacity-[0.06]`}
                ></div>

                <div className="relative z-10 flex-grow">
                  <div
                    className={`w-14 h-14 ${cat.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 transition motion-reduce:duration-[0.01ms] duration-500 shadow-sm`}
                  >
                    <OptimizedIcon
                      icon={cat.icon}
                      size="lg"
                      weight="duotone"
                      className={`text-3xl ${cat.color.replace('bg-', 'text-')}`}
                    />
                  </div>

                  <p className="font-display font-bold text-xl md:text-2xl text-content-base mb-3 group-hover:text-action-primary transition-colors motion-reduce:duration-[0.01ms] duration-300">
                    <NavLink
                      href={cat.link}
                      className="before:absolute before:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 rounded-md"
                    >
                      {cat.title}
                    </NavLink>
                  </p>
                  <p className="text-base text-content-muted mb-8 leading-relaxed max-w-prose text-pretty">
                    {cat.description}
                  </p>
                </div>
                <div className="flex items-center text-action-primary font-bold tracking-wide uppercase text-sm mt-auto transition motion-reduce:duration-[0.01ms] duration-300 group-hover:tracking-wider pointer-events-none">
                  {t('cta.more')}
                  <OptimizedIcon
                    icon={ArrowRight}
                    weight="bold"
                    className="ms-3 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform motion-reduce:duration-[0.01ms] duration-300 ease-spring"
                  />
                </div>
              </div>
            </BentoCard>
          ))}
        </MagicBento>
      </section>

      {/* Methodology / Trust Signals */}
      <section className="py-20 md:py-32 bg-surface-elevated border-t border-border-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-content-base mb-6 leading-tight text-balance">
              {t('methodology.title', { fallback: 'Präzises Handwerk statt Massenabfertigung.' })}
            </h2>
            <p className="text-lg md:text-xl text-content-muted leading-relaxed max-w-prose text-pretty">
              {t('methodology.description', {
                fallback:
                  'Als Solo-Agentur arbeite ich direkt mit Ihnen zusammen – ohne Projektmanager oder stille Post. Sie erhalten maßgeschneiderte Lösungen, die auf modernsten Web-Technologien basieren und echte Ergebnisse liefern. Von der ersten Konzeption bis zum finalen Launch.',
              })}
            </p>
          </div>

          <ol className="grid md:grid-cols-3 gap-8 md:gap-12">
            {(
              [
                {
                  step: '01',
                  title: t('methodology.steps.01.title', { fallback: 'Analyse & Strategie' }),
                  desc: t('methodology.steps.01.desc', {
                    fallback:
                      'Tiefgreifendes Verständnis Ihrer Geschäftsziele. Keine Schablonen, sondern fundierte Architektur-Entscheidungen.',
                  }),
                },
                {
                  step: '02',
                  title: t('methodology.steps.02.title', { fallback: 'Design & Entwicklung' }),
                  desc: t('methodology.steps.02.desc', {
                    fallback:
                      'Performante Umsetzung mit Next.js und React. Pixelperfektes Design, das Vertrauen schafft und konvertiert.',
                  }),
                },
                {
                  step: '03',
                  title: t('methodology.steps.03.title', { fallback: 'Launch & Skalierung' }),
                  desc: t('methodology.steps.03.desc', {
                    fallback:
                      'Reibungsloses Deployment, technische SEO-Optimierung und kontinuierliche Performance-Überwachung.',
                  }),
                },
              ] as const
            ).map((item, i) => (
              <li
                key={i}
                className="group border-l border-border-subtle pl-6 hover:border-action-primary transition-colors duration-300 hover:scale-[0.97] ease-spring hover:cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  className="block text-sm font-bold text-action-primary mb-2 tracking-wider"
                >
                  {item.step}
                </span>
                <p className="text-xl font-display font-bold text-content-base mb-3 group-hover:text-action-primary transition-colors duration-300">
                  {item.title}
                </p>
                <p className="text-content-muted leading-relaxed max-w-prose text-pretty">
                  {item.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQs for Rich Snippets */}
      <RelevantFAQs
        serviceId={['web-development', 'web-design', 'seo']}
        className="bg-surface-muted border-t border-border-muted"
      />

      {/* CTA with GlareHover */}
      <section className="py-12 md:py-20 bg-surface-elevated border-t border-border-muted">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl text-content-base mb-8 text-balance">
            {t('cta.ready')}
          </h2>
          <GlareHover
            glareColor="#ffffff"
            glareOpacity={0.4}
            className="inline-block rounded-xl hover:scale-[0.97] transition-transform duration-300 ease-spring"
          >
            <NavLink
              href="/contact"
              className={cn(baseButtonStyles, buttonVariants.primary, buttonSizes.lg)}
            >
              {t('cta.button')}
              <OptimizedIcon icon={ArrowRight} className="ms-2 rtl:rotate-180" />
            </NavLink>
          </GlareHover>
        </div>
      </section>
    </div>
  );
};
