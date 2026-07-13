'use client';

import React from 'react';
import { m } from 'motion/react';
import { SeoHead } from '@/shared/ui/SeoHead';
import { Button } from '@/shared/ui/Button';
import { Link } from '@/i18n/navigation';
import { SeoLocalExpertiseBlock } from '@/features/industries/ui/SeoLocalExpertiseBlock';
import { CheckCircle, MapPin, CaretDown, CaretUp } from '@phosphor-icons/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import BlurText from '@/shared/ui/BlurText';
import { LocalSchemaBuilder } from '@/features/local-seo/ui/LocalSchemaBuilder';
import { GamifiedRoiCalculator } from './GamifiedRoiCalculator';
import { IndustryToolEmbed } from './IndustryToolEmbed';

// Temporary fallback for icon rendering
const getIconByName = (name: string) => {
  // Can be extended with a real map
  return CheckCircle;
};

export const GamifiedIndustryTemplate: React.FC<{ content: any; cityData?: any }> = ({
  content,
  cityData,
}) => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  // Fallback for content that hasn't been 10x-ed yet by the agent
  if (!content.bentoGrid) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-20 text-center flex-col bg-background-light">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-6" />
        <h2 className="text-3xl font-display font-bold text-secondary-900 mb-4">
          Content wird gamifiziert...
        </h2>
        <p className="text-secondary-600 max-w-md">
          Die AI verarbeitet gerade die 10x Content-Expansion für diese Branche. Bitte laden Sie die
          Seite in wenigen Augenblicken neu.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background-light min-h-dvh overflow-x-hidden">
      <SeoHead
        title={content.meta.title}
        description={content.meta.description}
        pageType="service"
      />
      {cityData && <LocalSchemaBuilder city={cityData} />}

      {/* 1. GAMIFIED HERO */}
      <section className="relative min-h-[90dvh] flex flex-col justify-center pt-32 pb-24 px-4 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-bg-primary/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <m.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-50 text-primary-600 font-bold uppercase tracking-wider text-xs mb-6 border border-secondary-100 shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-primary-500 mr-2 animate-pulse" />
              {content.hero.headline}
            </m.span>
            <h1 className="font-display font-black text-5xl sm:text-7xl text-secondary-900 mb-6 tracking-tight leading-[1.1]">
              <BlurText text={content.hero.subheadline} delay={30} animateBy="words" />
            </h1>
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-secondary-600 font-medium leading-relaxed mb-10 max-w-xl"
            >
              {content.hero.description}
            </m.p>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-xl shadow-primary-500/20 hover:scale-105 transition-transform duration-300"
                >
                  Unverbindliche Analyse
                </Button>
              </Link>
            </m.div>
          </div>

          <div className="relative">
            {/* Gamified Floating Stats */}
            <div className="grid grid-cols-2 gap-4">
              {content.hero.metrics?.map((metric: any, idx: number) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1, type: 'spring', stiffness: 100 }}
                  className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 hover:border-primary-200 transition-colors duration-300 group"
                >
                  <div className="text-4xl font-black font-display text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {metric.value}
                    <span className="text-primary-500">{metric.suffix}</span>
                  </div>
                  <div className="text-sm font-bold text-secondary-500 uppercase tracking-wide">
                    {metric.label}
                  </div>
                </m.div>
              ))}
            </div>
            {/* Abstract Decorative Element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-200 to-transparent opacity-30 blur-3xl rounded-full" />
          </div>
        </div>
      </section>

      {/* 2. GAMIFIED ROI CALCULATOR */}
      <section className="py-24 px-4 bg-white relative z-20 -mt-10">
        <div className="max-w-6xl mx-auto">
          <GamifiedRoiCalculator industryName={content.target.replace('-', ' ').toUpperCase()} />
        </div>
      </section>

      {/* 2.5 EXTERNAL TOOL EMBED */}
      <IndustryToolEmbed industryKey={content.target} />

      {/* 3. BENTO GRID */}
      <section className="py-24 bg-secondary-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-black text-secondary-900 mb-6">
              {content.bentoGrid.title}
            </h2>
            <p className="text-xl text-secondary-600 font-medium">{content.bentoGrid.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
            {content.bentoGrid.cards?.map((card: any, idx: number) => {
              const isTall = card.size === 'tall';
              const isLarge = card.size === 'large';
              const Icon = getIconByName(card.icon);

              return (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 flex flex-col ${
                    isTall ? 'md:row-span-2' : ''
                  } ${isLarge ? 'md:col-span-2' : ''}`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-6 text-primary-600">
                    <OptimizedIcon icon={Icon} className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-secondary-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed font-medium mt-auto">
                    {card.text}
                  </p>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PROCESS STICKY SCROLL */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="lg:sticky lg:top-32 h-fit">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm mb-4 block">
                Der Ablauf
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-secondary-900 mb-6">
                Wie wir Ihre Agentur skalieren
              </h2>
              <p className="text-xl text-secondary-600 font-medium mb-10">
                Ein transparenter, gamifizierter Prozess von der ersten Analyse bis zur lokalen
                Marktführerschaft.
              </p>

              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-secondary-200 hover:border-primary-500 hover:text-primary-600 transition-colors"
                >
                  Projekt anfragen
                </Button>
              </Link>
            </div>
            <div className="space-y-8">
              {content.processSteps?.map((step: any, idx: number) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  className="bg-secondary-50 rounded-3xl p-8 md:p-10 border border-secondary-100"
                >
                  <h3 className="text-2xl font-bold font-display text-secondary-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEEP FAQ */}
      <section className="py-32 bg-secondary-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">Häufige Fragen</h2>
            <p className="text-xl text-secondary-400 font-medium">
              Alles, was Sie über unsere Zusammenarbeit wissen müssen.
            </p>
          </div>
          <div className="space-y-4">
            {content.faq?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="bg-secondary-800/50 border border-secondary-700/50 rounded-2xl overflow-hidden cursor-pointer hover:bg-secondary-800 transition-colors"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="p-6 flex justify-between items-center">
                  <h3 className="text-lg font-bold pr-8">{item.q}</h3>
                  <div className="text-primary-500 flex-shrink-0">
                    {openFaq === idx ? (
                      <CaretUp size={24} weight="bold" />
                    ) : (
                      <CaretDown size={24} weight="bold" />
                    )}
                  </div>
                </div>
                {openFaq === idx && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-6 pb-6 text-secondary-300 font-medium leading-relaxed"
                  >
                    {item.a}
                  </m.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <SeoLocalExpertiseBlock />
    </div>
  );
};
