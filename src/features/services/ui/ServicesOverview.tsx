import React from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Code, Palette, RocketLaunch, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { getTranslations } from 'next-intl/server';
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
    <div className="bg-background-light">
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
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              {t('hero.label')}
            </span>

            <noscript>
              <style>{`.js-only { display: none; }`}</style>
              <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-4">
                {t('hero.title')}
              </h1>
              <div className="text-xl text-slate-600 leading-relaxed mb-6">
                {(t.raw('hero.rotating') as string[])?.[0] || 'Web-Design'}
              </div>
            </noscript>

            <div className="js-only">
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
              <div className="max-w-2xl min-h-[60px]">
                <RotatingText
                  texts={
                    (t.raw('hero.rotating') as string[]) || ['Web-Design', 'Web-Entwicklung', 'SEO']
                  }
                  rotationInterval={3500}
                  staggerFrom="first"
                  staggerDuration={0.025}
                  mainClassName="text-xl text-slate-600 leading-relaxed"
                />
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl transform rotate-2"></div>
            <OptimizedImage
              src={serviceImages.hero!.src}
              alt={t(serviceImages.hero!.alt)}
              className="relative rounded-3xl shadow-flat-lg w-full transform -rotate-1 hover:rotate-0 transition motion-reduce:duration-[0.01ms] duration-500"
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
              className="h-full border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/20 transition motion-reduce:duration-[0.01ms] duration-500 ease-out bg-white rounded-2xl md:aspect-[1/1.618]"
            >
              <div className="group relative p-6 md:p-8 block h-full flex flex-col">
                {/* Decorative Background Image */}
                <div className="absolute top-0 end-0 w-64 h-64 opacity-[0.02] transform translate-x-12 rtl:-translate-x-12 -translate-y-12 group-hover:scale-110 group-hover:opacity-[0.05] transition motion-reduce:duration-[0.01ms] duration-700 rounded-bl-[100px] rtl:rounded-br-[100px] rtl:rounded-bl-none overflow-hidden pointer-events-none ease-out">
                  {serviceImages[cat.imageKey || 'hero'] && (
                    <OptimizedImage
                      src={serviceImages[cat.imageKey || 'hero']!.src}
                      alt=""
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                </div>
                <div
                  className={`absolute top-0 end-0 w-32 h-32 ${cat.color} opacity-[0.03] rounded-bl-[100px] rtl:rounded-br-[100px] rtl:rounded-bl-none transition-transform motion-reduce:duration-[0.01ms] duration-700 ease-out group-hover:scale-[1.3] group-hover:opacity-[0.06]`}
                ></div>

                <div className="relative z-10 flex-grow">
                  <div
                    className={`w-14 h-14 ${cat.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 transition motion-reduce:duration-[0.01ms] duration-500 group-hover:scale-110 group-hover:bg-opacity-20 group-hover:-rotate-3 shadow-sm`}
                  >
                    <OptimizedIcon
                      icon={cat.icon}
                      weight="duotone"
                      className={`text-3xl ${cat.color.replace('bg-', 'text-')}`}
                    />
                  </div>

                  <h3 className="font-display font-bold text-xl md:text-2xl text-secondary mb-3 group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms] duration-300">
                    <NavLink
                      href={cat.link}
                      className="before:absolute before:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
                    >
                      {cat.title}
                    </NavLink>
                  </h3>
                  <p className="text-base text-slate-600 mb-8 leading-[1.618]">{cat.description}</p>
                </div>
                <div className="flex items-center text-primary font-bold tracking-wide uppercase text-sm mt-auto transition motion-reduce:duration-[0.01ms] duration-300 group-hover:tracking-wider pointer-events-none">
                  {t('cta.more')}
                  <OptimizedIcon
                    icon={ArrowRight}
                    weight="bold"
                    className="ms-3 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform motion-reduce:duration-[0.01ms] duration-300 ease-out"
                  />
                </div>
              </div>
            </BentoCard>
          ))}
        </MagicBento>
      </section>

      {/* Methodology / Trust Signals */}
      <section className="py-20 md:py-32 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-secondary mb-6 leading-tight">
              {t('methodology.title', { fallback: 'Präzises Handwerk statt Massenabfertigung.' })}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-[1.8]">
              {t('methodology.description', {
                fallback:
                  'Als Solo-Agentur arbeite ich direkt mit Ihnen zusammen – ohne Projektmanager oder stille Post. Sie erhalten maßgeschneiderte Lösungen, die auf modernsten Web-Technologien basieren und echte Ergebnisse liefern. Von der ersten Konzeption bis zum finalen Launch.',
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: '01',
                title: 'Analyse & Strategie',
                desc: 'Tiefgreifendes Verständnis Ihrer Geschäftsziele. Keine Schablonen, sondern fundierte Architektur-Entscheidungen.',
              },
              {
                step: '02',
                title: 'Design & Entwicklung',
                desc: 'Performante Umsetzung mit Next.js und React. Pixelperfektes Design, das Vertrauen schafft und konvertiert.',
              },
              {
                step: '03',
                title: 'Launch & Skalierung',
                desc: 'Reibungsloses Deployment, technische SEO-Optimierung und kontinuierliche Performance-Überwachung.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group border-l border-gray-200 pl-6 hover:border-primary transition-colors duration-500"
              >
                <span className="block text-sm font-bold text-primary mb-2 tracking-wider">
                  {item.step}
                </span>
                <h3 className="text-xl font-display font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs for Rich Snippets */}
      <RelevantFAQs
        serviceId={['web-development', 'web-design', 'seo']}
        className="bg-gray-50 border-t border-gray-100"
      />

      {/* CTA with GlareHover */}
      <section className="py-12 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="font-display font-bold text-3xl text-secondary mb-8">
            {t('cta.ready')}
          </div>
          <GlareHover glareColor="#ffffff" glareOpacity={0.4} className="inline-block rounded-xl">
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
