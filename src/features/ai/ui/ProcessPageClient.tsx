'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { useParams } from 'next/navigation';

import { motion } from 'motion/react';
import { aiProcesses } from '@/shared/data/ai-processes';
import { SeoHead } from '@/shared/ui/SeoHead';
import { JsonLd } from '@/shared/ui/JsonLd';
import { GlobalCTA } from '@/shared/ui/GlobalCTA';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  CaretLeft,
  CaretRight,
  Clock,
  Wrench,
  CheckCircle,
  Users,
  Target,
} from '@phosphor-icons/react';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

export async function loader({ params }: { params: { schritt: string } }) {
  const data = aiProcesses.find((p) => p.slug === params.schritt);
  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }
  return { data };
}

export function meta({ data }: { data: { data: (typeof aiProcesses)[0] } }) {
  if (!data?.data) return [{ title: '404 - Prozess-Schritt nicht gefunden' }];

  const p = data.data;
  return [
    { title: `Schritt ${p.number}: ${p.de.title} | Webdesign Prozess` },
    { name: 'description', content: p.de.description },
  ];
}

export async function prerender() {
  return aiProcesses.map((p) => `/ai/prozess/${p.slug}`);
}

export default function ProcessPage() {
  const params = useParams();
  const schritt = params?.schritt as string;
  const processData = aiProcesses.find((p) => p.slug === schritt);

  if (!processData) {
    return <div>Prozess-Schritt nicht gefunden</div>;
  }

  const totalSteps = aiProcesses.length;
  const progressPercentage = (processData.number / totalSteps) * 100;

  return (
    <div className="bg-slate-50 min-h-dvh pt-24 pb-16">
      <SeoHead
        title={`Schritt ${processData.number}: ${processData.de.title} | Coday Webdesign Prozess`}
        description={processData.de.description}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'Prozess', url: 'https://www.codayweb.de/ai/prozess' },
          {
            name: processData.de.title,
            url: `https://www.codayweb.de/ai/prozess/${processData.slug}`,
          },
        ]}
      />

      <JsonLd
        pageUrl={`https://www.codayweb.de/ai/prozess/${processData.slug}`}
        pageType="article"
        data={{
          article: {
            headline: processData.de.title,
            description: processData.de.description,
            image: '/images/og-image.jpg',
            author: 'Umutcan Tezgel',
            datePublished: new Date().toISOString().split('T')[0],
            articleSection: 'Process Documentation',
          },
          howTo: {
            name: `Prozess-Schritt: ${processData.de.title}`,
            description: processData.de.description,
            totalTime: processData.duration.isoDuration,
            tool: processData.tools,
            step: processData.de.microSteps.map((step) => ({
              name: step.name,
              text: step.text,
            })),
          },
        }}
      />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <Breadcrumbs className="mb-8" />

        {/* FUNNEL PROGRESS TRACKER */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Schritt {processData.number} von {totalSteps}
            </span>
            <span className="text-sm font-medium text-primary">{processData.category}</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-secondary mb-6 leading-tight">
              {processData.de.title}
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mb-10 leading-relaxed font-medium">
              {processData.de.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <OptimizedIcon icon={Clock} className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Dauer</p>
                  <p className="font-medium text-secondary">{processData.duration.text}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <OptimizedIcon icon={Wrench} className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Tools</p>
                  <p className="font-medium text-secondary">{processData.tools.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RESPONSIBILITY SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-primary/5 rounded-3xl p-8 border border-primary/20">
            <h2 className="font-display font-bold text-2xl text-secondary mb-4 flex items-center gap-3">
              <OptimizedIcon icon={Target} className="w-8 h-8 text-primary" />
              Unsere Rolle (Coday)
            </h2>
            <p className="text-slate-700 leading-relaxed font-medium">{processData.codayRole}</p>
          </div>
          <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200">
            <h2 className="font-display font-bold text-2xl text-secondary mb-4 flex items-center gap-3">
              <OptimizedIcon icon={Users} className="w-8 h-8 text-slate-500" />
              Ihre Rolle (Klient)
            </h2>
            <p className="text-slate-700 leading-relaxed font-medium">{processData.clientRole}</p>
          </div>
        </div>

        {/* DELIVERABLES */}
        <div className="mb-16">
          <h2 className="font-display font-black text-3xl text-secondary mb-6 flex items-center gap-3">
            <OptimizedIcon icon={CheckCircle} className="w-8 h-8 text-green-500" />
            Deliverables am Ende dieses Schritts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {processData.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-3 shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                <span className="font-semibold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MICRO STEPS (HOW-TO) */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-16">
          <h2 className="font-display font-black text-3xl text-secondary mb-8">Detail-Ablauf</h2>
          <div className="space-y-6">
            {processData.de.microSteps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center shrink-0 border border-slate-200 mt-1">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-secondary mb-1">{step.name}</h3>
                  <p className="text-slate-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PREV / NEXT FUNNEL NAVIGATION */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-16">
          {processData.previousStep ? (
            <Link
              href={`/ai/prozess/${processData.previousStep}`}
              className="flex items-center gap-3 bg-white border border-slate-200 px-6 py-4 rounded-2xl hover:border-primary hover:text-primary transition-colors motion-reduce:duration-[0.01ms] flex-1"
            >
              <OptimizedIcon icon={CaretLeft} className="w-6 h-6 shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                  Vorheriger Schritt
                </p>
                <p className="font-semibold">
                  {aiProcesses.find((p) => p.slug === processData.previousStep)?.de.title}
                </p>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {processData.nextStep ? (
            <Link
              href={`/ai/prozess/${processData.nextStep}`}
              className="flex items-center justify-end text-right gap-3 bg-white border border-slate-200 px-6 py-4 rounded-2xl hover:border-primary hover:text-primary transition-colors motion-reduce:duration-[0.01ms] flex-1"
            >
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                  Nächster Schritt
                </p>
                <p className="font-semibold">
                  {aiProcesses.find((p) => p.slug === processData.nextStep)?.de.title}
                </p>
              </div>
              <OptimizedIcon icon={CaretRight} className="w-6 h-6 shrink-0" />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>

      <GlobalCTA />
    </div>
  );
}
