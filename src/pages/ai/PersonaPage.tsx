import React from 'react';
import { useParams } from 'react-router';
import { motion } from 'motion/react';
import { getAiPersonaBySlug, aiPersonas } from '@/shared/data/ai-personas';
import { SeoHead } from '@/shared/ui/SeoHead';
import { JsonLd } from '@/shared/ui/JsonLd';
import { GlobalCTA } from '@/shared/ui/GlobalCTA';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  Target,
  CheckCircle,
  CaretDown,
  Lightning,
  WarningCircle,
  Trophy,
  ShieldCheck,
  RocketLaunch,
} from '@phosphor-icons/react';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

export async function loader({ params }: { params: { persona: string } }) {
  const data = getAiPersonaBySlug(params.persona);
  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }
  return { data };
}

export function meta({ data }: { data: { data: ReturnType<typeof getAiPersonaBySlug> } }) {
  if (!data?.data) return [{ title: '404 - Seite nicht gefunden' }];

  const p = data.data;
  return [{ title: p.metaTitle }, { name: 'description', content: p.metaDescription }];
}

export async function prerender() {
  return aiPersonas.map((p) => `/ai/fuer/${p.slug}`);
}

export default function PersonaPage() {
  const { persona } = useParams();
  const personaData = getAiPersonaBySlug(persona || '');

  if (!personaData) {
    return <div>Daten nicht gefunden</div>;
  }

  return (
    <div className="bg-slate-50 min-h-dvh pt-24 pb-16">
      <SeoHead
        title={personaData.metaTitle}
        description={personaData.metaDescription}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'Branchen', url: 'https://www.codayweb.de/ai/fuer' },
          { name: personaData.persona, url: `https://www.codayweb.de/ai/fuer/${personaData.slug}` },
        ]}
      />

      <JsonLd
        pageUrl={`https://www.codayweb.de/ai/fuer/${personaData.slug}`}
        pageType="service"
        data={{
          service: {
            name: `Webdesign für ${personaData.persona}`,
            description: personaData.metaDescription,
            serviceType: 'Webdesign & Digitalisierung',
            audience: {
              '@type': 'Audience',
              audienceType: personaData.persona,
            },
          },
          faq: {
            questions: personaData.faqs.map((faq) => ({
              question: faq.question,
              answer: faq.answer,
            })),
          },
        }}
      />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <Breadcrumbs className="mb-8" />

        {/* HERO SECTION: Identification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-600 font-semibold text-sm mb-6">
              <OptimizedIcon icon={Target} className="w-4 h-4 text-primary" />
              <span>Speziallösung für: {personaData.persona}</span>
            </div>

            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-secondary mb-6 leading-tight">
              Webdesign & Digitalisierung für <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {personaData.persona}
              </span>
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mb-10 leading-relaxed font-medium">
              {personaData.introText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <OptimizedIcon icon={Lightning} className="w-8 h-8 text-primary mb-3" />
                <span className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-1">
                  Performance
                </span>
                <span className="font-bold text-lg text-secondary">Enterprise Speed</span>
              </div>
              <div className="flex flex-col p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <OptimizedIcon icon={ShieldCheck} className="w-8 h-8 text-accent mb-3" />
                <span className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-1">
                  Compliance
                </span>
                <span className="font-bold text-lg text-secondary">100% DSGVO-konform</span>
              </div>
              <div className="flex flex-col p-5 bg-slate-50 rounded-2xl border border-slate-100 sm:col-span-2 lg:col-span-1">
                <OptimizedIcon icon={RocketLaunch} className="w-8 h-8 text-primary mb-3" />
                <span className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-1">
                  Time to Value
                </span>
                <span className="font-bold text-lg text-secondary">{personaData.roiTimeline}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* NEUROMARKETING GRID: Agitation vs Resolution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Pain Points (Agitation) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-red-50/50 rounded-3xl p-8 border border-red-100"
          >
            <h2 className="font-display font-bold text-2xl text-secondary mb-6 flex items-center gap-3">
              <OptimizedIcon icon={WarningCircle} className="w-8 h-8 text-red-500" />
              Kennen Sie diese Herausforderungen?
            </h2>
            <ul className="space-y-4">
              {personaData.painPoints.map((pain, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <span className="text-slate-700 font-medium">{pain}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Goals (Aspiration) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-green-50/50 rounded-3xl p-8 border border-green-100"
          >
            <h2 className="font-display font-bold text-2xl text-secondary mb-6 flex items-center gap-3">
              <OptimizedIcon icon={Trophy} className="w-8 h-8 text-green-500" />
              Ihre neuen digitalen Ziele
            </h2>
            <ul className="space-y-4">
              {personaData.goals.map((goal, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <OptimizedIcon
                    icon={CheckCircle}
                    className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-slate-700 font-medium">{goal}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CODAY SOLUTION */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full" />
          <h2 className="font-display font-black text-3xl text-secondary mb-6 relative z-10">
            Die Coday Lösung
          </h2>
          <div className="prose prose-lg prose-slate max-w-none text-slate-600 relative z-10">
            <p className="text-xl leading-relaxed">{personaData.codaySolution}</p>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-display font-black text-3xl md:text-4xl text-secondary mb-4">
              Häufige Fragen
            </h2>
            <p className="text-lg text-slate-600">
              Spezifische Antworten für {personaData.persona}.
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {personaData.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer font-semibold text-secondary select-none text-lg">
                  {faq.question}
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 group-open:bg-primary/10 transition-colors">
                    <OptimizedIcon
                      icon={CaretDown}
                      className="w-5 h-5 text-slate-400 group-open:text-primary group-open:-rotate-180 transition-all duration-300"
                    />
                  </div>
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
