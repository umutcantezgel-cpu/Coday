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
        ? 'Direct communication and dedicated focus. You work directly with founder Umutcan Emre Tezgel from day one.'
        : 'Persönliche Betreuung und handwerklicher Fokus: Sie arbeiten von Tag 1 an direkt mit Gründer Umutcan Emre Tezgel zusammen.',
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
    <div className="bg-[#fafafa] min-h-dvh text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      {/* ═══ HERO ═══ */}
      <section className="relative pt-4 pb-16 md:pt-6 md:pb-20 px-4 overflow-hidden bg-[#fafafa]">
        {/* Ambient Glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-3xl max-h-3xl bg-amber-400/10 blur-[150px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <m.div className="mb-4 flex justify-center" {...stagger(0)}>
            <Breadcrumbs />
          </m.div>

          <m.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-50 text-amber-800 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm"
            {...stagger(0.1)}
          >
            <Sparkle className="w-4 h-4 text-amber-600" />
            {isEn ? 'AI-Augmented Craftsmanship' : 'KI-Augmented Craftsmanship'}
          </m.div>

          <m.h1
            className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-slate-900 mb-8 tracking-tight leading-[1.1] max-w-5xl mx-auto"
            {...stagger(0.15)}
          >
            {isEn ? 'Bespoke Next.js Web Development.' : 'Maßgeschneiderte Next.js Webentwicklung.'}{' '}
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
              {isEn ? 'Direct from the Lead Architect.' : 'Direkt vom Lead-Architekten.'}
            </GradientText>
          </m.h1>

          <m.p
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12"
            {...stagger(0.25)}
          >
            {isEn
              ? 'Coday is an independent agency for high-end web design and Next.js development based in Wetzlar, Germany. We replace sluggish WordPress templates with ultra-fast, bespoke Next.js architectures — delivering 100/100 Core Web Vitals, enterprise security, and measurable B2B conversions.'
              : 'Coday ist Ihre inhabergeführte Agentur für High-End Webdesign und Next.js Webentwicklung mit Sitz in Wetzlar. Wir ersetzen langsame WordPress-Themes durch ultraschnelle, maßgeschneiderte Next.js Architekturen — mit 100/100 Core Web Vitals, Enterprise-Sicherheit und planbaren B2B-Leads.'}
          </m.p>

          <m.div className="flex flex-col sm:flex-row justify-center gap-4 mb-8" {...stagger(0.35)}>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 text-white rounded-full font-bold hover:bg-primary-800 transition duration-300 hover:scale-[1.02] shadow-md shadow-primary-700/20"
            >
              {isEn ? 'Request Free Audit' : 'Kostenloses Website-Audit anfordern'}
              <ArrowRight
                weight="bold"
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-medium hover:bg-slate-50 transition duration-300 shadow-sm"
            >
              {isEn ? 'View Real Case Studies' : 'Reale Kunden-Ergebnisse ansehen'}
            </Link>
          </m.div>

          {/* Dual Verified Review Authority Badges */}
          <m.div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            {...stagger(0.4)}
          >
            <a
              href="https://maps.app.goo.gl/9SagecgXw7Vf5csH7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 text-xs sm:text-sm font-medium hover:border-amber-400 hover:shadow-md transition-all group"
              title="Google Maps Rezensionen für Coday ansehen"
            >
              <span className="font-bold text-slate-900">5,0 / 5,0</span>
              <span className="text-amber-500 tracking-wider">★★★★★</span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                Google Maps (4 Rezensionen)
              </span>
            </a>

            <a
              href="https://www.provenexpert.com/de-de/coday-webagentur/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 text-xs sm:text-sm font-medium hover:border-emerald-500 hover:shadow-md transition-all group"
              title="ProvenExpert Profil von Coday ansehen"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-900">5,0 / 5,0</span>
              <span className="text-amber-500 tracking-wider">★★★★★</span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                ProvenExpert (4 Bewertungen)
              </span>
            </a>
          </m.div>
        </div>
      </section>

      {/* ═══ MISSION PULLQUOTE ═══ */}
      <section className="relative py-28 overflow-hidden bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <m.blockquote {...stagger(0.1)}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-display font-light text-slate-900 leading-snug tracking-tight">
              {isEn ? (
                <>
                  „We believe in{' '}
                  <span className="text-amber-700 font-semibold">uncompromising speed</span> and{' '}
                  <span className="text-amber-700 font-semibold">flawless engineering</span>. Human
                  leads the vision, modern code executes with perfection.“
                </>
              ) : (
                <>
                  „Wir glauben an{' '}
                  <span className="text-amber-700 font-semibold">kompromisslose Ladezeiten</span>{' '}
                  und{' '}
                  <span className="text-amber-700 font-semibold">handwerkliche Code-Präzision</span>
                  . Human dirigiert die Strategie, modernste Architektur führt fehlerfrei aus.“
                </>
              )}
            </p>
          </m.blockquote>

          <m.div className="mt-8 flex items-center justify-center gap-3" {...stagger(0.2)}>
            <div className="w-12 h-px bg-amber-500/50" />
            <span className="text-xs sm:text-sm text-slate-500 tracking-widest uppercase font-semibold">
              Umutcan Emre Tezgel • Gründer & Lead-Architekt Coday
            </span>
            <div className="w-12 h-px bg-amber-500/50" />
          </m.div>
        </div>
      </section>

      {/* ═══ VALUES & PHILOSOPHY ═══ */}
      <section className="py-24 lg:py-32 bg-[#fafafa] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <m.span
              className="text-amber-700 font-bold tracking-[0.2em] uppercase text-xs mb-3 block"
              {...stagger(0)}
            >
              {isEn ? 'Our Principles' : 'Unsere Werte & Arbeitsweise'}
            </m.span>
            <m.h2
              className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight"
              {...stagger(0.1)}
            >
              {isEn
                ? 'The Advantages of an Agile, Founder-Led Studio'
                : 'Die Vorteile eines agilen, inhabergeführten Digital-Studios'}
            </m.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <m.div
                key={value.title}
                className="group relative p-8 rounded-2xl border border-slate-200/80 bg-white hover:border-amber-500/40 hover:shadow-md transition duration-300 shadow-sm"
                {...stagger(index * 0.1)}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5 border border-amber-200/50 group-hover:bg-amber-100 transition-colors">
                    <value.icon size={24} weight="duotone" className="text-amber-600" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {value.description}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ENTERPRISE TECH STACK BENTO ═══ */}
      <section className="py-24 lg:py-32 bg-white border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-amber-700 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
              {isEn ? 'Engineered for Performance' : 'Moderne Enterprise-Architektur'}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">
              {isEn
                ? 'The Modern Tech Stack Behind Coday'
                : 'Der High-Tech Stack hinter jeder Coday-Plattform'}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Keine trägen Page-Builder, keine Sicherheitslücken. Wir setzen auf dieselbe
              Technologie, die auch von OpenAI, Netflix und Vercel für weltweite Höchstleistung
              genutzt wird.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-amber-500/30 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-amber-800 uppercase tracking-wider px-2.5 py-1 rounded bg-amber-50 border border-amber-200">
                      {tech.category}
                    </span>
                    <tech.icon className="w-6 h-6 text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{tech.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{tech.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 pt-4 border-t border-slate-200">
                  <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  100% optimiert für Core Web Vitals
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS / ARBEITSWEISE ═══ */}
      <section className="py-24 lg:py-32 bg-[#fafafa] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-amber-700 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
              {isEn ? 'Step-by-Step Delivery' : 'In 4 Stufen zum Erfolg'}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
              {isEn
                ? 'How Your High-Performance Website Is Built'
                : 'So entsteht Ihre maßgeschneiderte Plattform'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {processSteps.map((step, index) => (
              <div key={step.title} className="relative text-center group">
                <div className="relative mx-auto w-16 h-16 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center mb-6 group-hover:border-amber-500 shadow-sm transition-colors z-10">
                  <step.icon size={26} weight="duotone" className="text-amber-600" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary-700 text-white text-xs font-black flex items-center justify-center z-20 shadow-md">
                  {index + 1}
                </div>
                <h3 className="font-display font-bold text-slate-900 text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed max-w-[200px] mx-auto">
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
          className="bg-white border-t border-slate-200"
        />
      </ScrollReveal>

      {/* ═══ TRUST SIGNALS ═══ */}
      <ScrollReveal index={0}>
        <section className="bg-[#fafafa] pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TrustBadges
              align="center"
              className="opacity-80 grayscale hover:grayscale-0 transition duration-300"
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
