'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import { motion } from 'motion/react';
import { getUseCaseBySlug, getAllUseCases } from '@/shared/data/ai-usecases';
import { SeoHead } from '@/shared/ui/SeoHead';
import { JsonLd } from '@/shared/ui/JsonLd';
import { GlobalCTA } from '@/shared/ui/GlobalCTA';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { TrendUp, WarningCircle, Lightbulb, ArrowRight, CodeBlock } from '@phosphor-icons/react';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

export async function loader({ params }: { params: { scenario: string } }) {
  const data = getUseCaseBySlug(params.scenario);
  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }
  return { data };
}

export function meta({ data }: { data: { data: ReturnType<typeof getUseCaseBySlug> } }) {
  if (!data?.data) return [{ title: '404 - Use-Case nicht gefunden' }];

  const p = data.data;
  return [
    { title: `${p.de.title} | Coday Use-Cases` },
    { name: 'description', content: p.de.description },
  ];
}

export async function prerender() {
  return getAllUseCases().map((uc) => `/ai/usecase/${uc.slug}`);
}

export default function UseCasePage() {
  const params = useParams();
  const scenario = params?.scenario as string;
  const slugStr = Array.isArray(scenario) ? scenario[0] : scenario;
  const useCase = getUseCaseBySlug(slugStr || '');

  if (!useCase) {
    return <div>Use-Case nicht gefunden</div>;
  }

  return (
    <div className="bg-slate-50 min-h-dvh pt-24 pb-16">
      <SeoHead
        title={`${useCase.de.title} | Coday`}
        description={useCase.de.description}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'Use-Cases', url: 'https://www.codayweb.de/ai/usecase' },
          { name: useCase.de.title, url: `https://www.codayweb.de/ai/usecase/${useCase.slug}` },
        ]}
      />

      <JsonLd
        pageUrl={`https://www.codayweb.de/ai/usecase/${useCase.slug}`}
        pageType="article"
        data={{
          article: {
            headline: useCase.de.title,
            description: useCase.de.description,
            image: '/images/og-image.jpg',
            author: 'Umutcan Tezgel',
            datePublished: new Date().toISOString().split('T')[0],
            articleSection: 'Case Studies',
            keywords: useCase.techStack,
          },
          howTo: {
            name: `How to implement: ${useCase.de.title}`,
            description: useCase.de.solution,
            step: useCase.de.steps.map((step) => ({
              name: step.name,
              text: step.text,
            })),
          },
        }}
      />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <Breadcrumbs className="mb-8" />

        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-600 font-semibold text-sm">
                <span>{useCase.category}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm">
                <span>{useCase.clientIndustry}</span>
              </div>
            </div>

            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-secondary mb-6 leading-tight">
              {useCase.de.title}
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mb-10 leading-relaxed font-medium">
              {useCase.de.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {useCase.techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-sm font-mono"
                >
                  <OptimizedIcon icon={CodeBlock} className="w-4 h-4" aria-hidden="true" />
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* METRICS DASHBOARD */}
        <div className="mb-16">
          <h2 className="font-display font-black text-3xl text-secondary mb-6 flex items-center gap-3">
            <OptimizedIcon icon={TrendUp} className="w-8 h-8 text-primary" aria-hidden="true" />
            Outcome Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCase.metrics.map((metric, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4">
                  <span
                    className={`inline-flex items-center justify-center px-3 py-1 text-sm font-bold rounded-full ${
                      metric.uplift.startsWith('+')
                        ? 'bg-green-100 text-green-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {metric.uplift}
                  </span>
                </div>
                <h3 className="text-slate-500 font-semibold uppercase tracking-wider text-xs mb-4 pr-16">
                  {metric.name}
                </h3>
                <div className="flex items-end gap-4 mt-2">
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-400 line-through decoration-red-400 mb-1">
                      Davor
                    </span>
                    <span className="text-xl font-bold text-slate-500">{metric.before}</span>
                  </div>
                  <OptimizedIcon icon={ArrowRight} className="w-6 h-6 text-slate-300 mb-1" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="text-sm text-primary font-medium mb-1">Danach</span>
                    <span className="text-3xl font-black text-secondary">{metric.after}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PROBLEM VS SOLUTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-red-50/50 rounded-3xl p-8 border border-red-100">
            <h2 className="font-display font-bold text-2xl text-secondary mb-4 flex items-center gap-3">
              <OptimizedIcon icon={WarningCircle} className="w-8 h-8 text-red-500" aria-hidden="true" />
              Die Herausforderung
            </h2>
            <p className="text-slate-700 leading-relaxed">{useCase.de.problem}</p>
          </div>
          <div className="bg-green-50/50 rounded-3xl p-8 border border-green-100">
            <h2 className="font-display font-bold text-2xl text-secondary mb-4 flex items-center gap-3">
              <OptimizedIcon icon={Lightbulb} className="w-8 h-8 text-green-500" aria-hidden="true" />
              Unsere Lösung
            </h2>
            <p className="text-slate-700 leading-relaxed">{useCase.de.solution}</p>
          </div>
        </div>

        {/* HOW TO STEPS */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-16">
          <h2 className="font-display font-black text-3xl text-secondary mb-8">
            Implementierungs-Schritte
          </h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {useCase.de.steps.map((step, idx) => (
              <div
                key={idx}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                  {idx + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
                  <h3 className="font-bold text-lg text-secondary mb-2">{step.name}</h3>
                  <p className="text-slate-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <GlobalCTA />
    </div>
  );
}
