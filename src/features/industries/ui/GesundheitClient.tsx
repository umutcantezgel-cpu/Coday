'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { SeoHead } from '@/shared/ui/SeoHead';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { IMAGES } from '@/shared/config/images';

import PatientJourneyMap from '@/features/industries/healthcare/PatientJourneyMap';
import WaitingRoomRoiCalculator from '@/features/industries/healthcare/WaitingRoomRoiCalculator';
import TrustBadgeGrid from '@/features/industries/healthcare/TrustBadgeGrid';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';

const Gesundheit: React.FC = () => {
  const t = useTranslations('industries');

  return (
    <div className="bg-background-light min-h-dvh">
      <SeoHead
        title="Software für das Gesundheitswesen & E-Health | Coday"
        description={t('aerzte-gesundheit.hero.subheadline')}
        pageType="service"
        schemaData={{
          service: {
            name: `${t('aerzte-gesundheit.hero.headline')}`,
            description: t('aerzte-gesundheit.hero.subheadline'),
            serviceType: 'Healthcare Software Development',
          },
        }}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={IMAGES.industries.healthcare.hero}
            alt="Medical professional with digital tools"
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
                {t('aerzte-gesundheit.title')}
              </span>
              <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
                <BlurText
                  text={t('aerzte-gesundheit.hero.headline')}
                  delay={100}
                  animateBy="words"
                  className="inline-block mr-3"
                />
                <br />
                <GradientText
                  colors={['#10B981', '#34D399', '#059669']}
                  animationSpeed={4}
                  className="inline-block"
                >
                  {t('aerzte-gesundheit.hero.subheadline')}
                </GradientText>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                {t('aerzte-gesundheit.hero.subheadline')}
              </p>
              <div className="flex gap-4 mb-12">
                <button className="active:scale-[0.97] bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors motion-reduce:duration-[0.01ms]">
                  {t('aerzte-gesundheit.customFeatures.service_funnel.steps.leads', {
                    defaultValue: 'Anfrage starten',
                  })}
                </button>
              </div>
            </div>

            <div className="relative">
              <WaitingRoomRoiCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Patient Journey - NEW HIGH COMPLEXITY */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <PatientJourneyMap />
        </div>
      </section>

      {/* Trust & Compliance Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl text-secondary mb-4">
              {t('aerzte-gesundheit.solutions.team_vorstellung.title')}
            </h2>
            <p className="text-slate-600">
              {t('aerzte-gesundheit.solutions.team_vorstellung.description')}
            </p>
          </div>

          <TrustBadgeGrid />
        </div>
      </section>
      <RelevantFAQs
        serviceId={['web-development', 'seo']}
        className="bg-gray-50 border-t border-gray-100"
      />
    </div>
  );
};
export default Gesundheit;
