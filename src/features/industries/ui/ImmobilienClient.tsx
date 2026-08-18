'use client';

import React from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Cube, ShieldCheck, At } from '@phosphor-icons/react/dist/ssr';
import { SeoHead } from '@/shared/ui/SeoHead';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { IMAGES } from '@/shared/config/images';

import VirtualTourTeaser from '@/features/industries/real-estate/VirtualTourTeaser';
import DigitalExposeDemo from '@/features/industries/real-estate/DigitalExposeDemo';
import PropertyRoiCalculator from '@/features/industries/real-estate/PropertyRoiCalculator';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';

const iconMap: Record<string, React.ElementType> = {
  view_in_ar: Cube,
  domain_verification: ShieldCheck,
  alternate_email: At,
};

const Immobilien: React.FC = () => {
  const t = useTranslations('industries') as any;

  return (
    <div className="bg-background-light min-h-dvh">
      <SeoHead
        title={`${t('immobilien-makler.title')} | Coday Real Estate`}
        description={t('immobilien-makler.hero.subheadline')}
        pageType="service"
        schemaData={{
          service: {
            name: `${t('immobilien-makler.title')}`,
            description: t('immobilien-makler.hero.subheadline'),
            serviceType: 'Real Estate Software Solutions',
          },
        }}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={IMAGES.industries.realEstate.hero}
            alt={t(
              'immobilien-makler.hero.image_alt',
              'Webdesign Wetzlar – Immobilienmakler Websites & Portale'
            )}
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background-light via-white/50 to-background-light" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-6 block">
                {t('overview.label')}
              </span>
              <h1 className="block font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
                <BlurText
                  text={t('immobilien-makler.hero.headline')}
                  delay={100}
                  animateBy="words"
                  className="inline-block mr-2"
                />
                <br />{' '}
                <GradientText
                  colors={['#3B82F6', '#6366F1', '#8B5CF6']}
                  animationSpeed={4}
                  className="inline-block"
                >
                  {t('immobilien-makler.title')}
                </GradientText>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                {t('immobilien-makler.hero.subheadline')}
              </p>
              <div className="flex gap-4 mb-12">
                <button className="active:scale-[0.97] bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors motion-reduce:duration-[0.01ms]">
                  {t('immobilien-makler.features.virtual_tour.cta')}
                </button>
              </div>

              <PropertyRoiCalculator />
            </div>

            <div className="relative">
              <div className="absolute top-0 right-0 w-full h-full bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
              <VirtualTourTeaser />
              <p className="text-center text-xs text-gray-400 mt-4">
                {t('immobilien-makler.features.virtual_tour.disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Expose Section - NEW HIGH COMPLEXITY */}
      <section className="py-24 bg-surface-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16 text-center">
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('immobilien-makler.features.expose_section.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-6">
              {t('immobilien-makler.features.expose_section.title')}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('immobilien-makler.features.expose_section.description')}
            </p>
          </div>

          <DigitalExposeDemo />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'view_in_ar',
                title: t('immobilien-makler.features.grid.staging.title'),
                desc: t('immobilien-makler.features.grid.staging.desc'),
              },
              {
                icon: 'domain_verification',
                title: t('immobilien-makler.features.grid.login.title'),
                desc: t('immobilien-makler.features.grid.login.desc'),
              },
              {
                icon: 'alternate_email',
                title: t('immobilien-makler.features.grid.followup.title'),
                desc: t('immobilien-makler.features.grid.followup.desc'),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition motion-reduce:duration-[0.01ms] border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform motion-reduce:duration-[0.01ms] duration-300">
                  <OptimizedIcon icon={iconMap[item.icon] || Cube} />
                </div>
                <p className="font-bold text-xl text-secondary mb-3">{item.title}</p>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoContentBlock
        title={t('immobilien-makler.seoText.title')}
        text={`${t('immobilien-makler.seoText.content')} ${t('immobilien-makler.hero.headline')} ${t('immobilien-makler.hero.title_suffix')}`}
      />
      <RelevantFAQs
        serviceId={['web-development', 'seo']}
        className="bg-gray-50 border-t border-gray-100"
      />
    </div>
  );
};
export default Immobilien;
