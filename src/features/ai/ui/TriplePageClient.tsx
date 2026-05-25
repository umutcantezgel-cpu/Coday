"use client";

import React from 'react';
import { useParams } from 'next/navigation';

import { motion } from 'motion/react';
import { getAiTripleBySlug, aiTriples } from '@/shared/data/ai-triples';
import { SeoHead } from '@/shared/ui/SeoHead';
import { JsonLd } from '@/shared/ui/JsonLd';
import { GlobalCTA } from '@/shared/ui/GlobalCTA';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  MapPin,
  Target,
  Users,
  CheckCircle,
  CaretDown,
  RocketLaunch,
  Globe,
  ChartBar,
} from '@phosphor-icons/react';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

export async function loader({ params }: { params: { slug: string } }) {
  const data = getAiTripleBySlug(params.slug);
  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }
  return { data };
}

export function meta({ data }: { data: { data: ReturnType<typeof getAiTripleBySlug> } }) {
  if (!data?.data) return [{ title: '404 - Seite nicht gefunden' }];

  const triple = data.data;
  return [
    { title: `${triple.service} Agentur in ${triple.city} | Coday` },
    {
      name: 'description',
      content: `Ihr lokaler Experte für ${triple.service} in ${triple.city}. Wir helfen Unternehmen in ${triple.state}, digital zu dominieren.`,
    },
  ];
}

export async function prerender() {
  return aiTriples.map((triple) => `/ai/${triple.slug}`);
}

export default function TriplePage() {
  const { slug } = useParams();
  const slugStr = Array.isArray(slug) ? slug[0] : slug;
  const tripleData = getAiTripleBySlug(slugStr || '');

  if (!tripleData) {
    return <div>Daten nicht gefunden</div>;
  }

  return (
    <div className="bg-slate-50 min-h-dvh pt-24 pb-16">
      <SeoHead
        title={`${tripleData.service} Agentur in ${tripleData.city} | Coday`}
        description={`Ihr lokaler Experte für ${tripleData.service} in ${tripleData.city}. Wir helfen Unternehmen in ${tripleData.state}, digital zu dominieren.`}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'AI Services', url: 'https://www.codayweb.de/ai' },
          {
            name: `${tripleData.service} in ${tripleData.city}`,
            url: `https://www.codayweb.de/ai/${tripleData.slug}`,
          },
        ]}
      />

      <JsonLd
        pageUrl={`https://www.codayweb.de/ai/${tripleData.slug}`}
        pageType="service"
        data={{
          service: {
            name: `${tripleData.service} Agentur ${tripleData.city}`,
            description: tripleData.introText,
            serviceType: tripleData.service,
            areaServed: {
              '@type': 'City',
              name: tripleData.city,
              containedInPlace: {
                '@type': 'State',
                name: tripleData.state,
              },
            },
          },
          faq: {
            questions: tripleData.faqs.map((faq) => ({
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
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-600 font-semibold text-sm mb-6">
              <OptimizedIcon icon={MapPin} className="w-4 h-4 text-primary" />
              <span>
                {tripleData.city}, {tripleData.state}
              </span>
              {tripleData.isFlagship && (
                <>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-accent flex items-center gap-1">
                    <OptimizedIcon icon={Target} className="w-4 h-4" />
                    Flagship Region
                  </span>
                </>
              )}
            </div>

            <h1 className="font-display font-black text-4xl md:text-6xl text-secondary mb-6 leading-tight">
              {tripleData.service} in <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {tripleData.city}
              </span>
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mb-10 leading-relaxed">
              {tripleData.introText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <OptimizedIcon icon={Users} className="w-8 h-8 text-primary mb-3" />
                <span className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-1">
                  Einwohner
                </span>
                <span className="font-display font-bold text-2xl text-secondary">
                  {tripleData.population.toLocaleString('de-DE')}
                </span>
              </div>
              <div className="flex flex-col p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <OptimizedIcon icon={ChartBar} className="w-8 h-8 text-accent mb-3" />
                <span className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-1">
                  Mitbewerber-Dichte
                </span>
                <span className="font-display font-bold text-2xl text-secondary">
                  ~{tripleData.localCompetitorsCount} Agenturen
                </span>
              </div>
              <div className="flex flex-col p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <OptimizedIcon icon={RocketLaunch} className="w-8 h-8 text-primary mb-3" />
                <span className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-1">
                  Unser Ansatz
                </span>
                <span className="font-bold text-lg text-secondary">Data-Driven SEO</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="font-display font-bold text-3xl text-secondary mb-6 flex items-center gap-3">
                <OptimizedIcon icon={Globe} className="w-8 h-8 text-primary" />
                Warum {tripleData.service} für {tripleData.city}?
              </h2>
              <div className="prose prose-lg prose-slate max-w-none text-slate-600">
                <p>
                  Als wirtschaftliches Zentrum im Bundesland {tripleData.state} bietet{' '}
                  {tripleData.city} ein enormes Potenzial für Unternehmen, die im digitalen Raum
                  wachsen wollen. Die Konkurrenz von rund {tripleData.localCompetitorsCount}
                  lokalen Mitbewerbern zeigt, dass Sichtbarkeit hier nicht dem Zufall überlassen
                  werden darf.
                </p>
                <p>
                  Unsere spezialisierte Strategie für <strong>{tripleData.service}</strong> setzt
                  genau hier an. Wir verbinden tiefgreifendes technisches Know-how mit lokaler
                  Marktkenntnis, um Ihre Plattform an die Spitze zu bringen.
                </p>
                <ul className="not-prose space-y-4 mt-8">
                  <li className="flex gap-4 items-start">
                    <OptimizedIcon
                      icon={CheckCircle}
                      className="w-6 h-6 text-accent flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <strong className="block text-secondary text-lg mb-1">Lokale Dominanz</strong>
                      <span className="text-slate-600">
                        Wir positionieren Ihr Unternehmen präzise für Suchanfragen aus{' '}
                        {tripleData.city} und Umgebung.
                      </span>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <OptimizedIcon
                      icon={CheckCircle}
                      className="w-6 h-6 text-accent flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <strong className="block text-secondary text-lg mb-1">
                        Enterprise-Grade Performance
                      </strong>
                      <span className="text-slate-600">
                        Schnelle Ladezeiten und perfekte Core Web Vitals für maximale
                        Conversion-Raten.
                      </span>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <OptimizedIcon
                      icon={CheckCircle}
                      className="w-6 h-6 text-accent flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <strong className="block text-secondary text-lg mb-1">
                        Skalierbare Architektur
                      </strong>
                      <span className="text-slate-600">
                        Zukunftssichere Technologien, die mit Ihrem Unternehmen in{' '}
                        {tripleData.state} mitwachsen.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-secondary text-white rounded-3xl p-8 shadow-xl sticky top-24">
              <h3 className="font-display font-bold text-2xl mb-6">
                Sind Sie bereit für den Markt in {tripleData.city}?
              </h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Nutzen Sie unsere bewährte Infrastruktur, um Ihre digitale Präsenz im Bereich{' '}
                {tripleData.service} auf das nächste Level zu heben.
              </p>
              <a
                href="/kontakt"
                className="flex items-center justify-center w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-colors"
              >
                Strategiegespräch anfragen
              </a>
              <p className="text-center text-sm text-slate-400 mt-4">
                Kostenlose Potenzialanalyse für {tripleData.city}
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-display font-black text-3xl md:text-4xl text-secondary mb-4">
              Häufige Fragen zu {tripleData.service} in {tripleData.city}
            </h2>
            <p className="text-lg text-slate-600">
              Alles, was Sie über unsere lokalen Dienstleistungen wissen müssen.
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {tripleData.faqs.map((faq, idx) => (
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
