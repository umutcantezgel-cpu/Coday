'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { getAiCostBySlug, getAllAiCostSlugs } from '@/shared/data/ai-costs';
import { SeoHead } from '@/shared/ui/SeoHead';
import { JsonLd } from '@/shared/ui/JsonLd';
import { GlobalCTA } from '@/shared/ui/GlobalCTA';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  CheckCircle,
  ChartLineUp,
  ClockCounterClockwise,
  CaretDown,
  CurrencyEur,
  Lightbulb,
} from '@phosphor-icons/react';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

export async function loader({ params }: { params: { branche: string } }) {
  const data = getAiCostBySlug(params.branche);
  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }
  return { data };
}

export function meta({ data }: { data: { data: ReturnType<typeof getAiCostBySlug> } }) {
  if (!data?.data) return [{ title: '404 - Branche nicht gefunden' }];

  return [
    { title: data.data.metaTitle },
    { name: 'description', content: data.data.metaDescription },
  ];
}

export async function prerender() {
  return getAllAiCostSlugs().map((slug) => `/ai/kosten/${slug}`);
}

export default function AiCostPage() {
  const params = useParams();
  const branche = params?.branche as string;
  const costData = getAiCostBySlug(typeof branche === 'string' ? branche : branche?.[0] || '');

  if (!costData) {
    return <div>Branche nicht gefunden</div>;
  }

  return (
    <div className="bg-slate-50 min-h-dvh pt-24 pb-16">
      <SeoHead
        title={costData.metaTitle}
        description={costData.metaDescription}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'AI & Kosten', url: 'https://www.codayweb.de/ai/kosten' },
          { name: costData.branche, url: `https://www.codayweb.de/ai/kosten/${costData.slug}` },
        ]}
      />

      <JsonLd
        pageUrl={`https://www.codayweb.de/ai/kosten/${costData.slug}`}
        pageType="service"
        data={{
          service: {
            name: `Website & Digitalisierungs-Kosten für ${costData.branche}`,
            description: costData.metaDescription,
            serviceType: 'Web Development & Digitalization',
            offers: {
              '@type': 'Offer',
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: costData.costMin,
                maxPrice: costData.costMax,
                priceCurrency: 'EUR',
              },
            },
          },
          faq: {
            questions: costData.faqs.map((faq) => ({
              question: faq.question,
              answer: faq.answer,
            })),
          },
        }}
      />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <Breadcrumbs className="mb-8" />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-4 block">
              Preis-Analyse 2026
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl text-secondary mb-6 leading-tight">
              Website & Digitalisierungs-Kosten für <br className="hidden md:block" />
              <span className="text-primary">{costData.branche}</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mb-8">
              Transparente Preisaufschlüsselung und ROI-Berechnung für hochkonvertierende digitale
              Plattformen in der Branche {costData.branche}.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <OptimizedIcon icon={CurrencyEur} className="w-8 h-8" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-1">
                    Investitionsrahmen
                  </div>
                  <div className="font-display font-bold text-2xl text-secondary">
                    {costData.costMin.toLocaleString('de-DE')}€ –{' '}
                    {costData.costMax.toLocaleString('de-DE')}€
                  </div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-300" />
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                  <OptimizedIcon icon={ClockCounterClockwise} className="w-8 h-8" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-1">
                    Durchschnittlicher ROI
                  </div>
                  <div className="font-bold text-lg text-secondary">
                    // @ts-expect-error
                    {costData?.roi_timeline?.split('(')[0]?.trim()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Cost Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-display font-bold text-2xl text-secondary flex items-center gap-3">
              <OptimizedIcon icon={ChartLineUp} className="w-6 h-6 text-primary" aria-hidden="true" />
              Detaillierte Kostenaufschlüsselung
            </h2>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <ul className="divide-y divide-slate-100">
                {costData.breakdown.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors motion-reduce:duration-[0.01ms]"
                  >
                    <div className="font-semibold text-secondary">{item.item}</div>
                    <div className="text-slate-600 font-mono bg-slate-100 px-4 py-1.5 rounded-lg whitespace-nowrap">
                      {item.costMin.toLocaleString('de-DE')}€ -{' '}
                      {item.costMax.toLocaleString('de-DE')}€
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Value Factors */}
          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl text-secondary flex items-center gap-3">
              <OptimizedIcon icon={Lightbulb} className="w-6 h-6 text-accent" aria-hidden="true" />
              Werttreiber
            </h2>
            <div className="bg-secondary text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] pointer-events-none" />
              <ul className="space-y-4 relative z-10">
                {costData.factors.map((factor, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <OptimizedIcon
                      icon={CheckCircle}
                      className="w-5 h-5 text-accent mt-1 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-slate-300 text-sm leading-relaxed">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <h2 className="font-display font-bold text-2xl text-secondary mb-8 text-center">
            Häufige Fragen zur Digitalisierung ({costData.branche})
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {costData.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer font-semibold text-secondary select-none">
                  {faq.question}
                  <OptimizedIcon
                    icon={CaretDown}
                    className="w-5 h-5 text-slate-400 group-open:-rotate-180 transition-transform motion-reduce:duration-[0.01ms] duration-300"
                  />
                </summary>
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      <GlobalCTA />
    </div>
  );
}
