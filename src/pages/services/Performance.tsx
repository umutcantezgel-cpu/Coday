import React from 'react';
import { useTranslation } from 'react-i18next';
import BlurText from '../../shared/ui/BlurText';
import GradientText from '../../shared/ui/GradientText';
import CountUp from '../../shared/ui/CountUp';
import SpeedSimulator from '../../features/performance/SpeedSimulator';
import LostRevenueCalc from '../../features/performance/LostRevenueCalc';
import CoreWebVitalsChart from '../../features/performance/CoreWebVitalsChart';

const Performance: React.FC = () => {
  const { t } = useTranslation('services');

  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
            {t('performance_page.hero.badge')}
          </span>
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-secondary mb-8 tracking-tight">
            <BlurText
              text={t('performance_page.hero.title_prefix')}
              delay={100}
              animateBy="words"
              direction="top"
              className="inline-block me-4"
            />
            <GradientText
              colors={['#FFD700', '#FF8C00', '#FF4500']}
              animationSpeed={3}
              className="inline-block"
            >
              {t('performance_page.hero.title_suffix')}
            </GradientText>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
            {t('performance_page.hero.description')}
          </p>
        </div>
      </section>

      {/* Speed Simulator - NEW HIGH COMPLEXITY SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 -mt-12 relative z-20">
        <SpeedSimulator />
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
            {t('performance_page.google_values.badge')}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-4">
            {t('performance_page.google_values.title')}
          </h2>
          <p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: t('performance_page.google_values.description') }}
          />
        </div>
        <CoreWebVitalsChart />
      </section>

      {/* Lost Revenue Calculator - NEW HIGH COMPLEXITY SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <LostRevenueCalc />
      </section>

      <section className="py-24 bg-surface-dark text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-black text-primary mb-2">
              <CountUp from={0} to={99} duration={2} />%
            </div>
            <div className="uppercase tracking-widest text-sm text-gray-400">
              {t('performance_page.metrics.score')}
            </div>
          </div>
          <div>
            <div className="text-5xl font-black text-primary mb-2">
              <CountUp from={0} to={0.5} duration={2} />s
            </div>
            <div className="uppercase tracking-widest text-sm text-gray-400">
              {t('performance_page.metrics.load_time')}
            </div>
          </div>
          <div>
            <div className="text-5xl font-black text-primary mb-2">0</div>
            <div className="uppercase tracking-widest text-sm text-gray-400">
              {t('performance_page.metrics.shift')}
            </div>
          </div>
          <div>
            <div className="text-5xl font-black text-primary mb-2">100%</div>
            <div className="uppercase tracking-widest text-sm text-gray-400">
              {t('performance_page.metrics.eco')}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Performance;
