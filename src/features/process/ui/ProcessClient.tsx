'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import GradientText from '@/shared/ui/GradientText';
import { Link } from '@/i18n/navigation';
import {
  MagnifyingGlass,
  PencilLine,
  Code,
  Rocket,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkle,
  Kanban,
  ChatCircleText,
  UserCheck,
} from '@phosphor-icons/react/dist/ssr';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

export const ProcessClient: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';

  const stages = [
    {
      number: '01',
      title: isEn ? 'Deep Audit & Strategy Workshop' : 'Phase 1: Deep Audit & Strategie-Workshop',
      duration: isEn ? 'Days 1 – 4' : 'Tage 1 – 4',
      icon: MagnifyingGlass,
      tagline: isEn
        ? 'Target audience analysis, competitor benchmarking & information architecture.'
        : 'Fundierte Analyse Ihrer Wettbewerber, Zielgruppen und Definition der Sitemap & Conversion-Pfade.',
      deliverables: [
        isEn
          ? 'Core Web Vitals & Technical SEO Audit'
          : 'Lighthouse & Core Web Vitals Status-Quo-Audit',
        isEn
          ? 'Target Persona & B2B Conversion Roadmapping'
          : 'Zielgruppen- & Conversion-Architektur',
        isEn ? 'Keyword & Semantic Topic Cluster Plan' : 'Keyword- & Topic-Cluster Silo-Planung',
      ],
    },
    {
      number: '02',
      title: isEn ? 'High-End UI/UX Prototyping' : 'Phase 2: High-End UI/UX Prototyping',
      duration: isEn ? 'Days 5 – 10' : 'Tage 5 – 10',
      icon: PencilLine,
      tagline: isEn
        ? 'Custom Figma design system with zero templates and full design sign-off before code.'
        : 'Individuelle Design-Konzepte in Figma — kompromisslose Ästhetik und 100% Freigabe vor Entwicklungsstart.',
      deliverables: [
        isEn
          ? 'Interactive Desktop & Mobile Figma Prototype'
          : 'Interaktiver Desktop- & Mobile-Prototyp in Figma',
        isEn
          ? 'Bespoke Design System & Typography Tokens'
          : 'Eigenes Design-System & Typografie-Tokens',
        isEn
          ? 'Conversion-Optimized UX Component Hierarchy'
          : 'Conversion-optimierte UI-Komponenten',
      ],
    },
    {
      number: '03',
      title: isEn ? 'Next.js Enterprise Engineering' : 'Phase 3: Next.js Enterprise Engineering',
      duration: isEn ? 'Days 11 – 20' : 'Tage 11 – 20',
      icon: Code,
      tagline: isEn
        ? 'Hand-written TypeScript, Sanity Headless CMS integration, and sub-0.3s load times.'
        : 'Handgeschriebener TypeScript-Code mit Next.js 15 Server Components und Sanity CMS Integration.',
      deliverables: [
        isEn
          ? '100/100 Google PageSpeed & Core Web Vitals'
          : '100/100 Google PageSpeed & Core Web Vitals',
        isEn ? 'Sanity v3 Headless CMS Integration' : 'Sanity v3 Headless CMS Redaktionsumgebung',
        isEn ? '60-Second Express Recruiting Funnels' : '60-Sekunden Express-Recruiting Formulare',
      ],
    },
    {
      number: '04',
      title: isEn ? 'Launch, QA Gates & Growth Silo' : 'Phase 4: Launch, QA Gates & Wachstums-Silo',
      duration: isEn ? 'Days 21 – 24' : 'Tage 21 – 24',
      icon: Rocket,
      tagline: isEn
        ? 'Zero-downtime DNS cutover, Google Search Console indexing, and continuous monitoring.'
        : 'Zero-Downtime Migration, Google Search Console Indexierung und nachhaltiges Conversion-Tracking.',
      deliverables: [
        isEn
          ? 'Automated Accessibility & Performance Gates'
          : 'Automatisierte CI/CD & Lighthouse QA-Gates',
        isEn
          ? 'Google Search Console & Schema Indexation'
          : 'GSC-Indexierung & strukturierte Daten',
        isEn
          ? '100% Source Code Handoff & Video Training'
          : '100% Quellcode-Übergabe & Video-Schulung',
      ],
    },
  ];

  const onboardingBenefits = [
    {
      icon: UserCheck,
      title: isEn ? 'Minimal Time Investment for You' : 'Minimaler Zeitaufwand für Sie',
      desc: isEn
        ? 'You invest approx. 2-3 hours total for feedback. We handle structure, copywriting guidance, and all engineering.'
        : 'Sie investieren insgesamt nur ca. 2–3 Stunden für Feedback. Wir übernehmen Konzeption, Textführung und die gesamte Technik.',
    },
    {
      icon: Kanban,
      title: isEn ? 'Live Transparency via Kanban' : 'Echtzeit-Transparenz via Board',
      desc: isEn
        ? 'You see every sprint milestone, wireframe, and code deployment live in our client dashboard.'
        : 'Sie verfolgen jeden Meilenstein, Designentwurf und Deployment transparent im Kundenportal.',
    },
    {
      icon: ChatCircleText,
      title: isEn ? 'Direct Line to Lead Architect' : 'Direkter Draht ohne Umwege',
      desc: isEn
        ? 'No junior ticket queues. You talk directly with founder & lead architect Umutcan Emre Tezgel.'
        : 'Keine Support-Warteschlangen. Sie kommunizieren direkt mit Inhaber Umutcan Emre Tezgel.',
    },
  ];

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 w-full relative overflow-hidden text-center">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-8 flex justify-center">
            <Breadcrumbs />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
            <Sparkle className="w-4 h-4 text-amber-400" />
            {isEn ? 'TRANSPARENT 4-STAGE PIPELINE' : 'TRANSPARENTER 4-STUFEN WEBDESIGN-PROZESS'}
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-8">
            In 4 Stufen zur{' '}
            <GradientText
              colors={['#fbbf24', '#fef08a', '#f59e0b']}
              animationSpeed={5}
              showBorder={false}
              className="inline-block"
            >
              High-Performance Website
            </GradientText>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Vom kostenlosen Audit bis zum 100/100 PageSpeed Launch in 14 bis 28 Werktagen: Erfahren
            Sie, wie unser agiler Entwicklungsprozess planbaren Projekterfolg garantiert.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-slate-950 font-bold rounded-full hover:bg-amber-300 transition duration-300 shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
            >
              <span>Projekt jetzt starten</span>
              <ArrowRight weight="bold" className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-slate-200 border border-slate-800 rounded-full font-medium hover:bg-slate-850 transition duration-300"
            >
              <span>Preise & Pakete ansehen</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4-Stage Roadmap Section */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-800/80 w-full relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Agile Meilensteine
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-2 mb-4">
              Die 4 Phasen Ihrer neuen Web-Präsenz
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Jede Phase hat klare Deliverables, feste Zeithorizonte und volle Transparenz.
            </p>
          </div>

          <div className="space-y-12">
            {stages.map((stage) => (
              <div
                key={stage.number}
                className="p-8 lg:p-12 rounded-3xl bg-slate-950 border border-slate-800 hover:border-amber-500/30 transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-900">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                      <stage.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
                        {stage.number} • {stage.duration}
                      </div>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                        {stage.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
                  <div className="lg:col-span-6">
                    <p className="text-slate-300 text-base leading-relaxed">{stage.tagline}</p>
                  </div>
                  <div className="lg:col-span-6 space-y-3">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Konkrete Deliverables:
                    </div>
                    {stage.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                        <CheckCircle weight="fill" className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding & Transparency Section */}
      <section className="py-24 px-4 w-full relative bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Stressfreies Kunden-Onboarding
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-2 mb-4">
              Warum der Ablauf mit Coday so reibungslos funktioniert
            </h2>
            <p className="text-slate-400 text-base">
              Sie müssen kein Technik-Experte sein. Wir führen Sie strukturiert durch das Projekt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {onboardingBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-slate-900/60 border-t border-slate-800/80 w-full text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-6">
            Starten wir Ihr Projekt in 4 Stufen
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Fordern Sie jetzt Ihr unverbindliches Strategiegespräch oder ein kostenloses
            Website-Audit an und lassen Sie uns den genauen Zeitplan besprechen.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-amber-400 text-slate-950 font-bold rounded-full hover:bg-amber-300 transition duration-300 shadow-xl shadow-amber-500/20 hover:scale-[1.02] text-lg"
          >
            <span>Jetzt Erstgespräch anfordern</span>
            <ArrowRight weight="bold" className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProcessClient;
