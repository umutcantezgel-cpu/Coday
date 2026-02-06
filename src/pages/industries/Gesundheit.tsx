import React from 'react';
import { useTranslation } from 'react-i18next';
import BlurText from '../../shared/ui/BlurText';
import GradientText from '../../shared/ui/GradientText';
import PatientJourneyMap from '../../features/industries/healthcare/PatientJourneyMap';
import WaitingRoomRoiCalculator from '../../features/industries/healthcare/WaitingRoomRoiCalculator';
import TrustBadgeGrid from '../../features/industries/healthcare/TrustBadgeGrid';

const Gesundheit: React.FC = () => {
  const { t } = useTranslation('industries');

  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                {t('gesundheit.hero.label')}
              </span>
              <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
                <BlurText
                  text={t('gesundheit.features.hero_tags').split('\n')[0]}
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="inline-block mr-3"
                />
                <br />
                <GradientText
                  colors={['#10B981', '#34D399', '#059669']}
                  animationSpeed={4}
                  className="inline-block"
                >
                  {t('gesundheit.features.hero_tags').split('\n')[1]}
                </GradientText>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                {t('gesundheit.features.hero_desc')}
              </p>
              <div className="flex gap-4 mb-12">
                <button className="bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors">
                  {t('gesundheit.features.cta_analysis')}
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
              {t('gesundheit.features.trust_title')}
            </h2>
            <p className="text-slate-600">{t('gesundheit.features.trust_desc')}</p>
          </div>

          <TrustBadgeGrid />
        </div>
      </section>
    </div>
  );
};

export default Gesundheit;
