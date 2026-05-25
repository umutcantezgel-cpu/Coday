import React from 'react';
import { useTranslation } from 'react-i18next';
import BlurText from '@/shared/ui/BlurText';
import { SeoHead } from '@/shared/ui/SeoHead';
import GradientText from '@/shared/ui/GradientText';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { IMAGES } from '@/shared/config/images';

import OmnichannelStrategies from '@/features/industries/retail/OmnichannelStrategies';
import LoyaltyLoop from '@/features/industries/retail/LoyaltyLoop';
import PosSyncDemo from '@/features/industries/retail/PosSyncDemo';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';

const Retail: React.FC = () => {
  const { t } = useTranslation('industries');

  return (
    <div className="bg-background-light min-h-dvh">
      <SeoHead
        title={`${t('ecommerce-retail.hero.headline')} | Coday Retail`}
        description={t('ecommerce-retail.hero.subheadline')}
        pageType="service"
        schemaData={{
          service: {
            name: t('ecommerce-retail.hero.headline'),
            description: t('ecommerce-retail.hero.subheadline'),
            serviceType: 'Retail Software Solutions',
          },
        }}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={IMAGES.industries.retail.hero}
            alt="Modern retail environment"
            className="w-full h-full object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background-light via-white/50 to-background-light" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-6 block">
                {t('ecommerce-retail.title')}
              </span>
              <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
                <BlurText
                  text={t('ecommerce-retail.hero.headline')}
                  delay={100}
                  animateBy="words"
                  className="inline-block"
                />
                <br />
                <GradientText
                  colors={['#A855F7', '#D946EF', '#EC4899']}
                  animationSpeed={4}
                  className="inline-block"
                >
                  {t('ecommerce-retail.hero.subheadline')}
                </GradientText>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                {t('ecommerce-retail.hero.subheadline')}
              </p>
              <div className="flex gap-4 mb-12">
                <button className="bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors">
                  {t('ecommerce-retail.customFeatures.produkt_konfigurator.title')}
                </button>
              </div>
            </div>

            <div className="relative">
              <OmnichannelStrategies />
            </div>
          </div>
        </div>
      </section>

      {/* POS Sync - NEW HIGH COMPLEXITY */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <PosSyncDemo />
        </div>
      </section>

      {/* Loyalty Loop */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoyaltyLoop />
        </div>
      </section>
      <RelevantFAQs
        serviceId={['web-development', 'seo']}
        className="bg-gray-50 border-t border-gray-100"
      />
    </div>
  );
};
export default Retail;
