"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { IMAGES } from '@/shared/config/images';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { QrCode, Moped, Confetti } from '@phosphor-icons/react';
import BlurText from '@/shared/ui/BlurText';
import { SeoHead } from '@/shared/ui/SeoHead';
import GradientText from '@/shared/ui/GradientText';
import TableBookingRoiVisualizer from '@/features/industries/gastronomie/TableBookingRoiVisualizer';
import MenuEngineeringDemo from '@/features/industries/gastronomie/MenuEngineeringDemo';
import ReservationFlowDemo from '@/features/industries/gastronomie/ReservationFlowDemo';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';

const iconMap: Record<string, React.ElementType> = {
  qr_code_2: QrCode,
  delivery_dining: Moped,
  celebration: Confetti,
};

const Gastronomie: React.FC = () => {
  const t = useTranslations('industries');

  return (
    <div className="bg-background-light min-h-dvh">
      <SeoHead
        title="Digitale Lösungen für Gastronomie & Restaurants | Coday"
        description={t('gastronomie-hotellerie.hero.subheadline')}
        pageType="service"
        schemaData={{
          service: {
            name: `${t('gastronomie-hotellerie.hero.headline')}`,
            description: t('gastronomie-hotellerie.hero.subheadline'),
            serviceType: 'Gastronomy Software Solutions',
          },
        }}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={IMAGES.industries.gastronomie.hero}
            alt="Modern restaurant ambience"
            className="w-full h-full object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background-light via-white/50 to-background-light" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-6 block">
                {t('gastronomie-hotellerie.title')}
              </span>
              <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
                <BlurText
                  text={t('gastronomie-hotellerie.hero.headline')}
                  delay={100}
                  animateBy="words"
                  className="inline-block mr-3"
                />
                <br />
                <GradientText
                  colors={['#EF4444', '#F97316', '#F59E0B']}
                  animationSpeed={3}
                  className="inline-block"
                >
                  {t('gastronomie-hotellerie.hero.subheadline')}
                </GradientText>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                {t('gastronomie-hotellerie.hero.subheadline')}
              </p>
              <div className="flex gap-4 mb-12">
                <button className="bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors">
                  {t('gastronomie-hotellerie.features.cta', { defaultValue: 'Termin vereinbaren' })}
                </button>
              </div>
            </div>

            <div className="relative">
              <TableBookingRoiVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Flow Section - NEW HIGH COMPLEXITY */}
      <section className="py-24 bg-white relative border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ReservationFlowDemo />
        </div>
      </section>

      {/* Menu Engineering - NEW HIGH COMPLEXITY */}
      <section className="py-24 bg-surface-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MenuEngineeringDemo />
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl text-secondary mb-4">
              {t('gastronomie-hotellerie.features.title')}
            </h2>
            <p className="text-slate-600">{t('gastronomie-hotellerie.features.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'qr_code_2',
                title: t('gastronomie-hotellerie.solutions.direktbuchung.title'),
                desc: t('gastronomie-hotellerie.solutions.direktbuchung.description'),
              },
              {
                icon: 'delivery_dining',
                title: t('gastronomie-hotellerie.solutions.event_marketing.title'),
                desc: t('gastronomie-hotellerie.solutions.event_marketing.description'),
              },
              {
                icon: 'celebration',
                title: t('gastronomie-hotellerie.solutions.visual_storytelling.title'),
                desc: t('gastronomie-hotellerie.solutions.visual_storytelling.description'),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <OptimizedIcon icon={iconMap[item.icon] || Confetti} />
                </div>
                <h3 className="font-bold text-xl text-secondary mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <RelevantFAQs
        serviceId={['web-development', 'seo']}
        className="bg-gray-50 border-t border-gray-100"
      />
    </div>
  );
};
export default Gastronomie;
