import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/ui/Icon';
import BlurText from '../../shared/ui/BlurText';
import GradientText from '../../shared/ui/GradientText';
import ServiceFunnelVisualizer from '../../features/industries/services/ServiceFunnelVisualizer';
import LeadQualificationSimulator from '../../features/industries/services/LeadQualificationSimulator';
import CrmIntegrationFlow from '../../features/industries/services/CrmIntegrationFlow';

const Dienstleistung: React.FC = () => {
  const { t } = useTranslation('industries');

  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                {t('dienstleistung.hero.label')}
              </span>
              <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
                <BlurText
                  text={t('dienstleistung.features.hero_tags').split('\n')[0]}
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="inline-block"
                />
                <br />
                <GradientText
                  colors={['#3B82F6', '#2563EB', '#1D4ED8']}
                  animationSpeed={4}
                  className="inline-block"
                >
                  {t('dienstleistung.features.hero_tags').split('\n')[1]}
                </GradientText>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                {t('dienstleistung.features.hero_desc')}
              </p>
              <div className="flex gap-4 mb-12">
                <button className="bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors">
                  {t('dienstleistung.features.cta_funnel')}
                </button>
              </div>
            </div>

            <div className="relative">
              <LeadQualificationSimulator />
            </div>
          </div>
        </div>
      </section>

      {/* Funnel Visualizer - NEW HIGH COMPLEXITY */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ServiceFunnelVisualizer />
        </div>
      </section>

      {/* CRM Tech Stack */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CrmIntegrationFlow />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            {[
              {
                icon: 'filter_alt',
                title: t('dienstleistung.features.grid.qual.title'),
                desc: t('dienstleistung.features.grid.qual.desc'),
              },
              {
                icon: 'schedule_send',
                title: t('dienstleistung.features.grid.nurture.title'),
                desc: t('dienstleistung.features.grid.nurture.desc'),
              },
              {
                icon: 'insights',
                title: t('dienstleistung.features.grid.roi.title'),
                desc: t('dienstleistung.features.grid.roi.desc'),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 border border-gray-100 rounded-2xl bg-white hover:shadow-xl transition-all"
              >
                <Icon name={item.icon} className="text-4xl text-blue-600 mb-4" />
                <h3 className="font-bold text-xl text-secondary mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dienstleistung;
