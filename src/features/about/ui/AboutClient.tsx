'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import GradientText from '@/shared/ui/GradientText';
import { TeamSection } from '@/widgets/about/TeamSection';
import { TrustSection } from '@/widgets/about/TrustSection';
import { TrustBadges } from '@/shared/ui/TrustBadges';
import { Link } from '@/i18n/navigation';
import {
  ArrowRight,
  HandFist,
  Lightning,
  Handshake,
  Eye,
  MagnifyingGlass,
  PencilLine,
  PaintBrush,
  Code,
  Rocket,
  Cpu,
  ShieldCheck,
  CheckCircle,
  Database,
  Globe,
  Sparkle,
} from '@phosphor-icons/react/dist/ssr';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { m } from 'motion/react';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import { ScrollReveal } from '@/shared/ui/animations/ScrollReveal';

/* ═══ ANIMATION PRESETS ═══ */
const EASE_OUT: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' as const },
  transition: { duration: 0.6, ease: EASE_OUT },
};

const stagger = (delay: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay },
});

export const AboutClient: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';

  const values = [
    {
      icon: HandFist,
      title: isEn ? 'AI-Augmented Craftsmanship' : 'KI-Augmented Craftsmanship',
      description: isEn
        ? 'Human orchestrates, high-end code architecture executes. We build custom Next.js architectures that render in sub-0.3 seconds.'
        : 'Human dirigiert, modernste Code-Architektur führt aus. Wir bauen maßgeschneiderte Next.js Architekturen mit Ladezeiten unter 0,3 Sekunden.',
    },
    {
      icon: Lightning,
      title: isEn ? 'Performance Obsession' : 'Performance-Obsession (100/100)',
      description: isEn
        ? 'We optimize down to the last millisecond. Green Core Web Vitals are not an optional bonus — they are our baseline standard.'
        : 'Wir optimieren bis zur letzten Millisekunde. Core Web Vitals im grünen P75-Bereich sind kein Bonus, sondern unser Mindeststandard.',
    },
    {
      icon: Eye,
      title: isEn ? 'Radical Transparency' : 'Radikale Transparenz & Festpreise',
      description: isEn
        ? 'Guaranteed fixed pricing, 100% source code ownership, zero vendor lock-in, and direct access to your lead architect.'
        : 'Garantierte Festpreise, 100% Quellcode-Eigentum, kein Vendor-Lock-in und direkter Draht zum leitenden Entwickler.',
    },
    {
      icon: Handshake,
      title: isEn ? 'Direct Founder Partnership' : 'Direkte Inhaber-Partnerschaft',
      description: isEn
        ? 'Zero agency overhead, no inexperienced junior account managers. You work directly with Umutcan Emre Tezgel from day one.'
        : 'Keine Agentur-Bürokratie, keine wechselnden Junior-Kräfte. Sie arbeiten von Tag 1 direkt mit Umutcan Emre Tezgel zusammen.',
    },
  ];

  const techStack = [
    {
      name: 'Next.js 15 App Router',
      category: 'Framework',
      desc: isEn
        ? 'Server Components & Static Site Generation for instant load times.'
        : 'Server Components & statische Vorkompilierung für Ladezeiten unter 0,3s.',
      icon: Globe,
    },
    {
      name: 'React 19 & TypeScript',
      category: 'Core Logic',
      desc: isEn
        ? 'Strict typing, zero runtime errors, and flawless long-term maintainability.'
        : 'Strikte Typisierung, fehlerfreie Runtime & langfristige Wartbarkeit.',
      icon: Code,
    },
    {
      name: 'Tailwind CSS 4',
      category: 'Design System',
      desc: isEn
        ? 'Zero CSS bloat, fluid responsive design tokens, and hardware-accelerated transitions.'
        : 'Zero CSS-Bloat, flüssige Design-Tokens & Hardware-beschleunigte UI.',
      icon: Sparkle,
    },
    {
      name: 'Sanity v3 Headless CMS',
      category: 'Content Engine',
      desc: isEn
        ? 'Structured content workflows with instant live preview and enterprise security.'
        : 'Intuitive Redaktion, strukturierte Daten & Zero Angriffsfläche.',
      icon: Database,
    },
    {
      name: 'Vercel Edge Network',
      category: 'Global Infrastructure',
      desc: isEn
        ? 'Worldwide CDN delivery with sub-40ms TTFB and automated CI/CD deployments.'
        : 'Weltweites Edge-CDN mit unter 40ms TTFB und automatischer Skalierung.',
      icon: Cpu,
    },
    {
      name: 'DSGVO Resend & Supabase',
      category: 'Backend & Data',
      desc: isEn
        ? 'GDPR-compliant transactional workflows without third-party tracking cookies.'
        : '100% DSGVO-konforme Lead-Verarbeitung ohne Tracking-Bloat.',
      icon: ShieldCheck,
    },
  ];

  const processSteps = [
    {
      icon: MagnifyingGlass,
      title: isEn ? 'Analysis & Audit' : 'Audit & Analyse',
      description: isEn
        ? 'In-depth market, competitor, and Core Web Vitals audit.'
        : 'Tiefgreifende Markt-, Wettbewerbs- und Performance-Analyse.',
    },
    {
      icon: PencilLine,
      title: isEn ? 'Concept & UX Wireframing' : 'Konzept & UX-Architektur',
      description: isEn
        ? 'Strategic information architecture with a focus on B2B conversions.'
        : 'Strategische Informationsarchitektur mit messbarem Conversion-Fokus.',
    },
    {
      icon: PaintBrush,
      title: isEn ? 'High-End UI Design' : 'High-End UI/UX Design',
      description: isEn
        ? 'Uncompromising aesthetics, dark-tech luxury feel, and bespoke components.'
        : 'Kompromisslose Ästhetik, Dark-Tech Eleganz & maßgeschneiderte UI-Kits.',
    },
    {
      icon: Code,
      title: isEn ? 'Next.js Engineering' : 'Next.js Engineering',
      description: isEn
        ? 'Hand-crafted TypeScript code with 100/100 Core Web Vitals.'
        : 'Handgeschriebener TypeScript-Code mit 100/100 Core Web Vitals.',
    },
    {
      icon: Rocket,
      title: isEn ? 'Launch & Growth' : 'Launch & Wachstums-Silo',
      description: isEn
        ? 'Zero-downtime go-live, Google Search Console indexing, and ongoing scaling.'
        : 'Zero-Downtime Launch, GSC-Indexierung & nachhaltige SEO-Dominanz.',
    },
  ];

  return (
    <div className="bg-slate-950 min-h-dvh text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* ═══ HERO ═══ */}
      <section className="relative pt-36 pb-28 px-4 overflow-hidden bg-slate-950">
        {/* Ambient Glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-3xl max-h-3xl bg-amber-500/10 blur-[150px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <m.div className="mb-4 flex justify-center" {...stagger(0)}>
            <Breadcrumbs />
          </m.div>

          <m.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-md"
            {...stagger(0.1)}
          >
            <Sparkle className="w-4 h-4 text-amber-400" />
            {isEn ? 'AI-Augmented Craftsmanship' : 'KI-Augmented Craftsmanship'}
          </m.div>

          <m.h1
            className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white mb-8 tracking-tight leading-[1.1] max-w-5xl mx-auto"
            {...stagger(0.15)}
          >
            {isEn ? 'Bespoke Next.js Web Development.' : 'Maßgeschneiderte Next.js Webentwicklung.'}{' '}
            <GradientText
              colors={['#fbbf24', '#fef08a', '#f59e0b']}
              animationSpeed={5}
              showBorder={false}
              className="inline-block"
            >
              {isEn ? 'Direct from the Lead Architect.' : 'Direkt vom Lead-Architekten.'}
            </GradientText>
          </m.h1>

          <m.p
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12"
            {...stagger(0.25)}
          >
            {isEn
              ? 'Coday is an independent web agency based in Wetzlar, Germany. We replace sluggish WordPress templates with ultra-fast, bespoke Next.js architectures — delivering 100/100 Core Web Vitals, enterprise security, and measurable B2B conversions.'
              : 'Coday ist eine inhabergeführte Webagentur mit Sitz in Wetzlar. Wir ersetzen langsame WordPress-Themes durch ultraschnelle, maßgeschneiderte Next.js Architekturen — mit 100/100 Core Web Vitals, Enterprise-Sicherheit und planbaren B2B-Leads.'}
          </m.p>

          <m.div className="flex flex-col sm:flex-row justify-center gap-4" {...stagger(0.35)}>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-slate-950 rounded-full font-bold hover:bg-amber-300 transition duration-300 hover:scale-[1.02] shadow-lg shadow-amber-500/20"
            >
              {isEn ? 'Request Free Audit' : 'Kostenloses Website-Audit anfordern'}
              <ArrowRight
                weight="bold"
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-slate-200 border border-slate-800 rounded-full font-medium hover:bg-slate-850 transition duration-300"
            >
              {isEn ? 'View Real Case Studies' : 'Reale Kunden-Ergebnisse ansehen'}
            </Link>
          </m.div>
        </div>
      </section>

      {/* ═══ MISSION PULLQUOTE ═══ */}
      <section className="relative py-28 overflow-hidden bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <m.blockquote {...stagger(0.1)}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-display font-light text-white leading-snug tracking-tight">
              {isEn ? (
                <>
                  „We believe in{' '}
                  <span className="text-amber-400 font-semibold">uncompromising speed</span> and{' '}
                  <span className="text-amber-400 font-semibold">flawless engineering</span>. Human
                  leads the vision, modern code executes with perfection.“
                </>
              ) : (
                <>
                  „Wir glauben an{' '}
                  <span className="text-amber-400 font-semibold">kompromisslose Ladezeiten</span>{' '}
                  und{' '}
                  <span className="text-amber-400 font-semibold">handwerkliche Code-Präzision</span>
                  . Human dirigiert die Strategie, modernste Architektur führt fehlerfrei aus.“
                </>
              )}
            </p>
          </m.blockquote>

          <m.div className="mt-8 flex items-center justify-center gap-3" {...stagger(0.2)}>
            <div className="w-12 h-px bg-amber-500/50" />
            <span className="text-xs sm:text-sm text-slate-400 tracking-widest uppercase font-semibold">
              Umutcan Emre Tezgel • Gründer & Lead-Architekt Coday
            </span>
            <div className="w-12 h-px bg-amber-500/50" />
          </m.div>
        </div>
      </section>

      {/* ═══ VALUES & PHILOSOPHY ═══ */}
      <section className="py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <m.span
              className="text-amber-400 font-bold tracking-[0.2em] uppercase text-xs mb-3 block"
              {...stagger(0)}
            >
              {isEn ? 'Our Principles' : 'Unsere Werte & Arbeitsweise'}
            </m.span>
            <m.h2
              className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight"
              {...stagger(0.1)}
            >
              {isEn
                ? 'Why Agility Beats Traditional Agency Overhead'
                : 'Warum Solo-Agilität klassischen Agentur-Overhead schlägt'}
            </m.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <m.div
                key={value.title}
                className="group relative p-8 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-amber-500/40 transition duration-300"
                {...stagger(index * 0.1)}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-5 group-hover:bg-amber-500/20 transition-colors">
                    <value.icon size={24} weight="duotone" className="text-amber-400" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                    {value.description}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ENTERPRISE TECH STACK BENTO ═══ */}
      <section className="py-24 lg:py-32 bg-slate-900/40 border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-amber-400 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
              {isEn ? 'Engineered for Performance' : 'Moderne Enterprise-Architektur'}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
              {isEn
                ? 'The Modern Tech Stack Behind Coday'
                : 'Der High-Tech Stack hinter jeder Coday-Plattform'}
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Keine trägen Page-Builder, keine Sicherheitslücken. Wir setzen auf dieselbe
              Technologie, die auch von OpenAI, Netflix und Vercel für weltweite Höchstleistung
              genutzt wird.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-wider px-2.5 py-1 rounded bg-amber-950/40 border border-amber-800/30">
                      {tech.category}
                    </span>
                    <tech.icon className="w-6 h-6 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{tech.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400/90 pt-4 border-t border-slate-900">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  100% optimiert für Core Web Vitals
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS / ARBEITSWEISE ═══ */}
      <section className="py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-amber-400 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
              {isEn ? 'Step-by-Step Delivery' : 'In 4 Stufen zum Erfolg'}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
              {isEn
                ? 'How Your High-Performance Website Is Built'
                : 'So entsteht Ihre maßgeschneiderte Plattform'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {processSteps.map((step, index) => (
              <div key={step.title} className="relative text-center group">
                <div className="relative mx-auto w-16 h-16 rounded-full border-2 border-slate-800 bg-slate-900 flex items-center justify-center mb-6 group-hover:border-amber-400 transition-colors z-10">
                  <step.icon size={26} weight="duotone" className="text-amber-400" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center z-20 shadow-md">
                  {index + 1}
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{step.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM & FOUNDER ═══ */}
      <ScrollReveal index={0}>
        <TeamSection />
      </ScrollReveal>

      {/* ═══ FAQs ═══ */}
      <ScrollReveal index={1}>
        <RelevantFAQs
          serviceId={['web-development', 'web-design', 'seo']}
          className="bg-slate-900/60 border-t border-slate-800/80"
        />
      </ScrollReveal>

      {/* ═══ TRUST SIGNALS ═══ */}
      <ScrollReveal index={0}>
        <section className="bg-slate-950 pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TrustBadges
              align="center"
              className="opacity-80 grayscale hover:grayscale-0 transition duration-300 [&_*]:text-white"
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal index={1}>
        <TrustSection />
      </ScrollReveal>
    </div>
  );
};
