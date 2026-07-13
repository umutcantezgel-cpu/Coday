'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Funnel, PaperPlaneRight, ChartLineUp } from '@phosphor-icons/react';
import { SeoHead } from '@/shared/ui/SeoHead';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import ServiceFunnelVisualizer from '@/features/industries/services/ServiceFunnelVisualizer';
import LeadQualificationSimulator from '@/features/industries/services/LeadQualificationSimulator';
import CrmIntegrationFlow from '@/features/industries/services/CrmIntegrationFlow';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';

const iconMap: Record<string, React.ElementType> = {
  filter_alt: Funnel,
  schedule_send: PaperPlaneRight,
  insights: ChartLineUp,
};

const Dienstleistung: React.FC = () => {
  const t = useTranslations('industries');

  return (
    <div className="bg-background-light min-h-dvh">
      <SeoHead
        title="Dienstleistungen skalieren & automatisieren | Coday"
        description={t('unternehmensberatung.hero.subheadline')}
        pageType="service"
        schemaData={{
          service: {
            name: `${t('unternehmensberatung.hero.headline')}`,
            description: t('unternehmensberatung.hero.subheadline'),
            serviceType: 'Service Automation Software',
          },
        }}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-primary font-bold tracking-wider uppercase text-sm mb-6 block">
                {t('unternehmensberatung.title')}
              </h1>
              <h2 className="block font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
                <BlurText
                  text={t('unternehmensberatung.hero.headline')}
                  delay={100}
                  animateBy="words"
                  className="inline-block"
                />
                <br />
                <GradientText
                  colors={['#3B82F6', '#2563EB', '#1D4ED8']}
                  animationSpeed={4}
                  className="inline-block"
                >
                  {t('unternehmensberatung.hero.subheadline')}
                </GradientText>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                {t('unternehmensberatung.hero.subheadline')}
              </p>
              <div className="flex gap-4 mb-12">
                <button className="active:scale-[0.97] bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors motion-reduce:duration-[0.01ms]">
                  {t('unternehmensberatung.customFeatures.termin_kalender.title')}
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
                title: t('unternehmensberatung.solutions.whitepaper_funnels.title'),
                desc: t('unternehmensberatung.solutions.whitepaper_funnels.description'),
              },
              {
                icon: 'schedule_send',
                title: t('unternehmensberatung.solutions.case_studies.title'),
                desc: t('unternehmensberatung.solutions.case_studies.description'),
              },
              {
                icon: 'insights',
                title: t('unternehmensberatung.solutions.webinare.title'),
                desc: t('unternehmensberatung.solutions.webinare.description'),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 border border-gray-100 rounded-2xl bg-white hover:shadow-xl transition motion-reduce:duration-[0.01ms]"
              >
                <OptimizedIcon
                  icon={iconMap[item.icon] || ChartLineUp}
                  className="text-4xl text-blue-600 mb-4"
                />
                <h3 className="font-bold text-xl text-secondary mb-2">{item.title}</h3>
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
export default Dienstleistung;
