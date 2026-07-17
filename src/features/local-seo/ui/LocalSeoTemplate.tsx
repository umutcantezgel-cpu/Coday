'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { SeoHead } from '@/shared/ui/SeoHead';
import { Button } from '@/shared/ui/Button';
import { Link } from '@/i18n/navigation';
import { SeoLocalExpertiseBlock } from '@/features/industries/ui/SeoLocalExpertiseBlock';
import { SeoTextInjector } from '@/features/seo/ui/SeoTextInjector';
import { CheckCircle, MapPin } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import BlurText from '@/shared/ui/BlurText';
import GradientText from '@/shared/ui/GradientText';
import { LocalSchemaBuilder } from './LocalSchemaBuilder';

interface LocalSeoContent {
  target: string;
  displayName?: string;
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
  cta_title?: string;
  cta_text?: string;
  cta_btn?: string;
}

interface LocalSeoTemplateProps {
  content: LocalSeoContent;
  cityData?: any; // For mapping
}

export const LocalSeoTemplate: React.FC<LocalSeoTemplateProps> = ({ content, cityData }) => {
  const locale = useLocale();
  const isEn = locale === 'en';

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
          <span className="text-primary-500 font-bold uppercase tracking-wider text-sm mb-4 block">
            {content.hero.headline}
          </span>
          <h1 className="sr-only">{content.hero.subheadline}</h1>
          <div
            aria-hidden="true"
            className="block font-display font-black text-4xl sm:text-6xl text-secondary-900 mb-6 tracking-tight"
          >
            <BlurText text={content.hero.subheadline} delay={50} animateBy="words" />
          </div>
          <p className="text-xl text-secondary-800 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            <span className="sr-only">{content.hero.headline}</span>
            {content.hero.description}
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              {isEn ? 'Free Strategy Session' : 'Kostenlose Strategy Session'}
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
                {isEn ? 'Local Market Leadership' : 'Lokale Marktführerschaft'}
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
              <p className="text-2xl font-bold text-secondary-900 mb-2">
                {content.displayName || content.target.split('-').join(' ')}
              </p>
              <p className="text-secondary-800 font-medium text-center">
                {isEn ? 'Digital Transformation on Site.' : 'Digitale Transformation vor Ort.'}
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
              {isEn ? 'Frequently Asked Questions about ' : 'Häufige Fragen zu '}
              {content.displayName || content.target.split('-').join(' ')}
            </h2>
          </div>
          <div className="space-y-6">
            {content.faq.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <p className="text-lg font-bold text-secondary-900 mb-3">{item.q}</p>
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
            {content.cta_title ||
              (isEn
                ? `Ready for Measurable Growth in ${content.displayName || content.target.split('-').join(' ')}?`
                : `Bereit für messbares Wachstum in ${content.displayName || content.target.split('-').join(' ')}?`)}
          </h2>
          <p className="text-xl text-secondary-800 font-medium mb-10 leading-relaxed">
            {content.cta_text ||
              (isEn
                ? `Let us find out together how we can take your business to the top through high-end web design in ${content.displayName || content.target.split('-').join(' ')}.`
                : `Lassen Sie uns gemeinsam herausfinden, wie wir Ihr Unternehmen durch High-End Webdesign in ${content.displayName || content.target.split('-').join(' ')} an die Spitze bringen.`)}
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg" className="shadow-xl shadow-primary-500/20">
              {content.cta_btn || (isEn ? 'Get in Touch Now' : 'Jetzt Kontakt aufnehmen')}
            </Button>
          </Link>
        </div>
      </section>

      <SeoLocalExpertiseBlock industryName={content.displayName || content.target}>
        <SeoTextInjector title={content.target} h1={content.hero.subheadline} />
      </SeoLocalExpertiseBlock>
    </div>
  );
};
