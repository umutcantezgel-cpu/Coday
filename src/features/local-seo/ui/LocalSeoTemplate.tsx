'use client';

import React from 'react';
import { SeoHead } from '@/shared/ui/SeoHead';
import { Button } from '@/shared/ui/Button';
import { Link } from '@/i18n/navigation';
import { SeoLocalExpertiseBlock } from '@/features/industries/ui/SeoLocalExpertiseBlock';
import { CheckCircle, MapPin } from '@phosphor-icons/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import { LocalSchemaBuilder } from './LocalSchemaBuilder';

interface LocalSeoContent {
  target: string;
  type: 'location' | 'industry-location';
  meta: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    description: string;
  };
  localDominance: {
    title: string;
    description: string;
    points: string[];
  };
  contentSections: {
    title: string;
    content: string;
  }[];
  faq: {
    q: string;
    a: string;
  }[];
}

interface LocalSeoTemplateProps {
  content: LocalSeoContent;
  cityData?: any; // For mapping
}

export const LocalSeoTemplate: React.FC<LocalSeoTemplateProps> = ({ content, cityData }) => {
  return (
    <div className="bg-background-light min-h-dvh">
      {/* Dynamic SEO Meta Tags via JSON content */}
      <SeoHead
        title={content.meta.title}
        description={content.meta.description}
        pageType="service"
      />
      {cityData && <LocalSchemaBuilder city={cityData} />}

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-gradient-to-br from-bg-primary to-bg-secondary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-primary-500 font-bold uppercase tracking-wider text-sm mb-4 block">
            {content.hero.headline}
          </h1>
          <h2 className="block font-display font-black text-4xl sm:text-6xl text-secondary-900 mb-6 tracking-tight">
            <BlurText text={content.hero.subheadline} delay={50} animateBy="words" />
          </h2>
          <p className="text-xl text-secondary-800 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            {content.hero.description}
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Kostenlose Strategy Session
            </Button>
          </Link>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {content.contentSections.map((section, idx) => (
              <div key={idx} className="prose prose-lg prose-slate max-w-none">
                <h2 className="text-3xl font-display font-bold text-secondary-900 mb-6">
                  {section.title}
                </h2>
                <div
                  className="text-secondary-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Dominance Section */}
      <section className="py-24 bg-aurora-white border-t border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-4 block">
                Lokale Marktführerschaft
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary-900 mb-6">
                {content.localDominance.title}
              </h2>
              <p className="text-lg text-secondary-800 font-medium mb-8">
                {content.localDominance.description}
              </p>
              <ul className="space-y-4">
                {content.localDominance.points.map((point, idx) => (
                  <li key={idx} className="flex items-start text-secondary-800 font-medium">
                    <OptimizedIcon
                      icon={CheckCircle}
                      className="text-primary-500 mr-3 flex-shrink-0 mt-1"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
              <OptimizedIcon icon={MapPin} className="text-primary-500 w-24 h-24 mb-6 opacity-80" />
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                {content.target.split('-').join(' ').toUpperCase()}
              </h3>
              <p className="text-secondary-800 font-medium text-center">
                Digitale Transformation vor Ort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-neutral-50 relative border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary-900 mb-4">
              Häufige Fragen zu {content.target.split('-').join(' ').toUpperCase()}
            </h2>
          </div>
          <div className="space-y-6">
            {content.faq.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-secondary-900 mb-3">{item.q}</h3>
                <p className="text-secondary-800 font-medium leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}

      <section className="py-24 px-4 bg-gradient-to-br from-primary-900/10 to-bg-primary text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-secondary-900 mb-6">
            Bereit für messbares Wachstum?
          </h2>
          <p className="text-xl text-secondary-800 font-medium mb-10 leading-relaxed">
            Lassen Sie uns gemeinsam herausfinden, wie wir Ihr Unternehmen durch High-End Webdesign
            an die Spitze bringen.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg" className="shadow-xl shadow-primary-500/20">
              Jetzt Kontakt aufnehmen
            </Button>
          </Link>
        </div>
      </section>
      <SeoLocalExpertiseBlock />
    </div>
  );
};
