'use client';

import React from 'react';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { SeoHead } from '@/shared/ui/SeoHead';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { IMAGES } from '@/shared/config/images';

import CraftsmanLeadCalculator from '@/features/industries/handwerk/CraftsmanLeadCalculator';
import RecruitingFunnelDemo from '@/features/industries/handwerk/RecruitingFunnelDemo';
import LocalDominanceMap from '@/features/industries/handwerk/LocalDominanceMap';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import { IndustryToolEmbed } from '@/features/industries/ui/IndustryToolEmbed';
import { ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';

const Handwerk: React.FC = () => {
  const t = useTranslations('industries') as any;

  return (
    <div className="bg-background-light min-h-dvh">
      <SeoHead
        title={`${t('handwerk-bau.hero.title_1')} ${t('handwerk-bau.hero.title_2')} | Coday`}
        description={t('handwerk-bau.hero.description')}
        pageType="service"
        schemaData={{
          service: {
            name: `${t('handwerk-bau.hero.title_1')} ${t('handwerk-bau.hero.title_2')}`,
            description: t('handwerk-bau.hero.description'),
            serviceType: 'Craftsman Software Solutions',
          },
        }}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={IMAGES.industries.handwerk.hero}
            alt={t(
              'handwerk-bau.hero.image_alt',
              'Webdesign Wetzlar – Handwerker & Bauunternehmen Website'
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
                {t('handwerk-bau.hero.headline')}
              </span>
              <h1 className="block font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
                <BlurText
                  text={t('handwerk-bau.title')}
                  delay={100}
                  animateBy="words"
                  className="inline-block mr-2"
                />
                <br />{' '}
                <GradientText
                  colors={['#F59E0B', '#D97706', '#B45309']}
                  animationSpeed={4}
                  className="inline-block"
                >
                  {t('handwerk-bau.hero.subheadline')}
                </GradientText>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                {t('handwerk-bau.hero.subheadline')}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://handwerker-akquise-rouge.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="active:scale-[0.97] bg-amber-500 text-slate-950 px-6 py-3 rounded-xl font-bold hover:bg-amber-400 transition-all motion-reduce:duration-[0.01ms] shadow-lg shadow-amber-500/20 inline-flex items-center gap-2"
                >
                  <span>Handwerker-Akquise Kanal öffnen</span>
                  <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
                  <ArrowSquareOut weight="bold" className="w-4 h-4" />
                </a>
                <button className="active:scale-[0.97] bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors motion-reduce:duration-[0.01ms]">
                  {t('buttons.cta_analysis', { ns: 'common' })}
                </button>
              </div>
            </div>

            <div className="relative">
              <CraftsmanLeadCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Live Akquise-Kanal Handwerk & Bau */}
      <IndustryToolEmbed industryKey="handwerk-bau" theme="light" />

      {/* Recruiting Section - NEW HIGH COMPLEXITY */}
      <section className="py-24 bg-aurora-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {t('handwerk-bau.features.recruiting.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-secondary mb-6">
              {t('handwerk-bau.features.recruiting.title')}
              <br />
              {t('handwerk-bau.features.recruiting.subtitle')}
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {t('handwerk-bau.features.recruiting.description')}
            </p>
          </div>

          <RecruitingFunnelDemo />
        </div>
      </section>

      {/* Local SEO Section - NEW HIGH COMPLEXITY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <LocalDominanceMap />
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                {t('handwerk-bau.features.local_dominance.label')}
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-6">
                {t('handwerk-bau.features.local_dominance.title')}
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                {t('handwerk-bau.features.local_dominance.description')}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-700 font-bold">
                  <OptimizedIcon icon={CheckCircle} className="text-green-500 mr-3" />
                  {t('common.features.google_maps')}
                </li>
                <li className="flex items-center text-slate-700 font-bold">
                  <OptimizedIcon icon={CheckCircle} className="text-green-500 mr-3" />
                  {t('common.features.regional_pages')}
                </li>
                <li className="flex items-center text-slate-700 font-bold">
                  <OptimizedIcon icon={CheckCircle} className="text-green-500 mr-3" />
                  {t('common.features.review_management')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SeoContentBlock
        title={t('handwerk-bau.seoText.title')}
        text={`${t('handwerk-bau.seoText.content')} ${t('handwerk-bau.hero.headline')} ${t('handwerk-bau.hero.title_suffix')}`}
      />
      <RelevantFAQs
        serviceId={['web-development', 'seo']}
        className="bg-gray-50 border-t border-gray-100"
      />
    </div>
  );
};

export default Handwerk;
