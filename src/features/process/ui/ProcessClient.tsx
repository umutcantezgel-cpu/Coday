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
    <div className="min-h-dvh bg-[#fafafa] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      {/* Hero Section */}
      <section className="pt-4 pb-12 lg:pt-8 lg:pb-16 px-4 w-full relative overflow-hidden text-center bg-[#fafafa]">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-8 flex justify-center">
            <Breadcrumbs />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-50 text-amber-800 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <Sparkle className="w-4 h-4 text-amber-600" />
            {isEn ? 'TRANSPARENT 4-STAGE PIPELINE' : 'TRANSPARENTER 4-STUFEN WEBDESIGN-PROZESS'}
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-slate-900 leading-[1.1] tracking-tight mb-8">
            {isEn ? 'In 4 Steps to a ' : 'In 4 Stufen zur '}
            <GradientText
              colors={[
                'var(--color-primary-600)',
                'var(--color-secondary-800)',
                'var(--color-primary-600)',
              ]}
              animationSpeed={5}
              showBorder={false}
              className="inline-block"
            >
              {isEn ? 'High-Performance Website' : 'High-Performance Website'}
            </GradientText>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            {isEn
              ? 'Our Web Design Process by Coday Web Agency: From initial audit to 100/100 PageSpeed launch in 14 to 28 business days — discover how our agile web development workflow guarantees predictable project success.'
              : 'Unser Webdesign-Prozess in 5 Schritten der Coday Webagentur: Vom kostenlosen Audit bis zum 100/100 PageSpeed Launch in 14 bis 28 Werktagen — erfahren Sie, wie unser agiler Entwicklungsprozess planbaren Projekterfolg garantiert.'}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 text-white font-bold rounded-full hover:bg-primary-800 transition duration-300 shadow-md hover:scale-[1.02]"
            >
              <span>{isEn ? 'Start Project Now' : 'Projekt jetzt starten'}</span>
              <ArrowRight weight="bold" className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-medium hover:bg-slate-50 transition duration-300 shadow-sm"
            >
              <span>{isEn ? 'View Pricing & Packages' : 'Preise & Pakete ansehen'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4-Stage Roadmap Section */}
      <section className="py-24 bg-white border-y border-slate-200 w-full relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              {isEn ? 'Agile Milestones' : 'Agile Meilensteine'}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mt-2 mb-4">
              {isEn
                ? 'The 4 Phases of Your New Web Presence'
                : 'Die 4 Phasen Ihrer neuen Web-Präsenz'}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {isEn
                ? 'Every phase features clear deliverables, fixed timelines, and full transparency.'
                : 'Jede Phase hat klare Deliverables, feste Zeithorizonte und volle Transparenz.'}
            </p>
          </div>

          <div className="space-y-12">
            {stages.map((stage) => (
              <div
                key={stage.number}
                className="p-8 lg:p-12 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:border-amber-500/40 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-110 transition-transform border border-amber-200/50">
                      <stage.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-amber-800 font-bold uppercase tracking-wider mb-1">
                        {stage.number} • {stage.duration}
                      </div>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                        {stage.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
                  <div className="lg:col-span-6">
                    <p className="text-slate-700 text-base leading-relaxed">{stage.tagline}</p>
                  </div>
                  <div className="lg:col-span-6 space-y-3">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Konkrete Deliverables:
                    </div>
                    {stage.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                        <CheckCircle weight="fill" className="w-4 h-4 text-amber-600 shrink-0" />
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
      <section className="py-24 px-4 w-full relative bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              {isEn ? 'Stress-Free Client Onboarding' : 'Stressfreies Kunden-Onboarding'}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              {isEn
                ? 'Why the Process with Coday Works So Smoothly'
                : 'Warum der Ablauf mit Coday so reibungslos funktioniert'}
            </h2>
            <p className="text-slate-600 text-base">
              {isEn
                ? 'You do not need to be a technical expert. We guide you systematically through the entire project.'
                : 'Sie müssen kein Technik-Experte sein. Wir führen Sie strukturiert durch das Projekt.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {onboardingBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6 border border-amber-200/50">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance & Technical Launch Standards */}
      <section className="py-24 bg-white border-t border-slate-200 w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              {isEn ? 'Quality Assurance & Standards' : 'Qualitätssicherung & Standards'}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              {isEn
                ? 'Engineering Rigor: How We Ensure 100/100 Quality'
                : 'Ingenieurmäßige Präzision: Wie wir 100/100 Qualität sichern'}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {isEn
                ? 'Every line of code undergoes strict automated and manual quality checks before deployment.'
                : 'Jede Codezeile durchläuft vor dem Go-Live strenge automatisierte und manuelle Prüfprozesse.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6 border border-amber-200/50">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 mb-3">
                {isEn ? 'Automated CI/CD Gates' : 'Automatisierte CI/CD Gates'}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isEn
                  ? 'TypeScript strict mode, automated accessibility audits (axe-core), and Lighthouse CI run on every commit to prevent performance regressions.'
                  : 'TypeScript Strict Mode, automatisierte Barrierefreiheits-Tests (axe-core) und Lighthouse CI stellen sicher, dass keine Performance-Regressionen entstehen.'}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6 border border-amber-200/50">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 mb-3">
                {isEn ? 'Zero-Downtime Migration' : 'Zero-Downtime Migration'}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isEn
                  ? 'Seamless DNS cutover with continuous availability. All legacy URLs are mapped 1:1 with 301 redirects to protect existing search engine rankings.'
                  : 'Nahtloser DNS-Switch ohne Ausfallzeiten. Alle bisherigen URLs werden per 1:1 301-Redirect-Map übernommen, um gewonnene Google-Rankings vollständig zu sichern.'}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6 border border-amber-200/50">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 mb-3">
                {isEn ? 'Full Ownership Handoff' : 'Vollständige Code-Übergabe'}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isEn
                  ? 'You receive 100% source code ownership and access to your Git repository. No vendor lock-in, no hidden proprietary licenses.'
                  : 'Sie erhalten 100% Eigentum am Quellcode und Zugriff auf Ihr GitHub-Repository. Keine Lizenzfallen, kein Vendor-Lock-in, volle unternehmerische Unabhängigkeit.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-slate-50/80 border-t border-slate-200 w-full text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 mb-6">
            {isEn ? 'Let’s Start Your Project in 4 Steps' : 'Starten wir Ihr Projekt in 4 Stufen'}
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? 'Request your non-binding strategy consultation or a free website audit today and let’s discuss the exact timeline.'
              : 'Fordern Sie jetzt Ihr unverbindliches Strategiegespräch oder ein kostenloses Website-Audit an und lassen Sie uns den genauen Zeitplan besprechen.'}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-primary-700 text-white font-bold rounded-full hover:bg-primary-800 transition duration-300 shadow-xl shadow-primary-700/20 hover:scale-[1.02] text-lg"
          >
            <span>{isEn ? 'Request Consultation Now' : 'Jetzt Erstgespräch anfordern'}</span>
            <ArrowRight weight="bold" className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProcessClient;
