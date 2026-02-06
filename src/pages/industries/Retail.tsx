import React from 'react';
import { useTranslation } from 'react-i18next';
import BlurText from '../../shared/ui/BlurText';
import GradientText from '../../shared/ui/GradientText';
import OmnichannelStrategies from '../../features/industries/retail/OmnichannelStrategies';
import LoyaltyLoop from '../../features/industries/retail/LoyaltyLoop';
import PosSyncDemo from '../../features/industries/retail/PosSyncDemo';

const Retail: React.FC = () => {
  const { t } = useTranslation('industries');

  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                {t('retail.hero.label')}
              </span>
              <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
                <BlurText
                  text={t('retail.features.hero_tags').split('\n')[0]}
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="inline-block"
                />
                <br />
                <GradientText
                  colors={['#A855F7', '#D946EF', '#EC4899']}
                  animationSpeed={4}
                  className="inline-block"
                >
                  {t('retail.features.hero_tags').split('\n')[1]}
                </GradientText>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                {t('retail.features.hero_desc')}
              </p>
              <div className="flex gap-4 mb-12">
                <button className="bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors">
                  {t('retail.features.cta_pos')}
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
    </div>
  );
};

export default Retail;
