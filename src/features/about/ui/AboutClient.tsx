'use client';

import React from 'react';
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
} from '@phosphor-icons/react';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { m } from 'motion/react';
import { RelevantFAQs } from '@/features/faq/ui/RelevantFAQs';
import { ScrollReveal } from '@/shared/ui/animations/ScrollReveal';

/* ═══ DATA ═══ */
const values = [
  {
    icon: HandFist,
    title: 'Handwerk statt KI',
    description:
      'Wir nutzen Premium-Manufaktur-Qualität (Custom Code) statt massenproduzierter KI-Standardlösungen. Jede Zeile Code, jedes Pixel Design — von Hand geschrieben für maximale Performance und Individualität.',
  },
  {
    icon: Lightning,
    title: 'Performance-Obsession',
    description:
      'Wir optimieren bis zur letzten Millisekunde. Core Web Vitals im grünen Bereich sind kein Bonus — sie sind unser Mindeststandard.',
  },
  {
    icon: Eye,
    title: 'Radikale Transparenz',
    description:
      'Keine versteckten Kosten, keine leeren Versprechen. Sie sehen jeden Schritt, jede Entscheidung, jedes Ergebnis in Echtzeit.',
  },
  {
    icon: Handshake,
    title: 'Echte Partnerschaft',
    description:
      'Wir sind nicht Ihr Dienstleister — wir sind Ihr digitaler Mitgründer. Ihr Erfolg ist unser Erfolg.',
  },
];

const processSteps = [
  {
    icon: MagnifyingGlass,
    title: 'Analyse',
    description: 'Tiefgreifende Markt-, Wettbewerbs- und Zielgruppenanalyse als Fundament.',
  },
  {
    icon: PencilLine,
    title: 'Konzept',
    description: 'Strategische Informationsarchitektur und Wireframing mit Conversion-Fokus.',
  },
  {
    icon: PaintBrush,
    title: 'Design',
    description: 'Pixel-perfektes UI/UX Design nach Anti-AI Qualitätsstandards.',
  },
  {
    icon: Code,
    title: 'Entwicklung',
    description: 'Handgeschriebener, performanter Code mit modernsten Technologien.',
  },
  {
    icon: Rocket,
    title: 'Launch & Wachstum',
    description: 'Go-Live, laufende Optimierung und messbares Wachstum.',
  },
];

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
  return (
    <div className="bg-secondary min-h-dvh">
      {/* ═══ HERO ═══ */}
      <section className="relative pt-36 pb-28 px-4 overflow-hidden bg-secondary">
        {/* Background Effects */}
        <div
          className="absolute inset-0 opacity-[0.03] bg-[url('/noise.svg')]"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-3xl max-h-3xl bg-primary/8 blur-[150px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <m.div className="mb-4 flex justify-center" {...stagger(0)}>
            <Breadcrumbs />
          </m.div>

          <m.span
            className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6 block"
            {...stagger(0.1)}
          >
            Unsere Identität
          </m.span>

          <m.h1
            className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white mb-8 tracking-tighter leading-[1.1] max-w-5xl mx-auto"
            {...stagger(0.15)}
          >
            Ihr Webdesigner in Wetzlar.{' '}
            <GradientText
              colors={['#14b8a6', '#22d3ee', '#14b8a6']}
              animationSpeed={5}
              showBorder={false}
              className="inline-block"
            >
              Persönlich & Nah.
            </GradientText>
          </m.h1>

          <m.p
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12"
            {...stagger(0.25)}
          >
            Coday ist eine Solo-Webagentur aus Wetzlar, die digitale Erlebnisse von Hand erschafft.
            Jedes Projekt ist ein Unikat, entwickelt für Marken, die sich von der Masse abheben
            wollen.
          </m.p>

          <m.div className="flex justify-center gap-4" {...stagger(0.35)}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition motion-reduce:duration-[0.01ms] hover:-translate-y-0.5 shadow-lg hover:shadow-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Projekt anfragen
              <ArrowRight
                weight="bold"
                className="transition-transform motion-reduce:duration-[0.01ms] group-hover:translate-x-1"
              />
            </Link>
          </m.div>
        </div>
      </section>

      {/* ═══ MISSION PULLQUOTE ═══ */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.02] bg-[url('/noise.svg')]"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Decorative Quotation Mark */}
          <m.div
            className="text-[8rem] md:text-[12rem] leading-none font-display font-black text-primary/10 select-none -mb-16 md:-mb-24"
            aria-hidden="true"
            {...stagger(0)}
          >
            „
          </m.div>

          <m.blockquote {...stagger(0.1)}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-display font-light text-white/90 leading-snug tracking-tight">
              Wir glauben daran, dass das Internet ein Ort der{' '}
              <span className="text-primary font-semibold">Schönheit</span> und{' '}
              <span className="text-primary font-semibold">Funktionalität</span> sein sollte. Unsere
              Mission ist es, den Status Quo herauszufordern.
            </p>
          </m.blockquote>

          <m.div className="mt-8 flex items-center justify-center gap-3" {...stagger(0.2)}>
            <div className="w-12 h-px bg-primary/50" />
            <span className="text-sm text-gray-500 tracking-widest uppercase font-medium">
              Anti-AI Philosophie
            </span>
            <div className="w-12 h-px bg-primary/50" />
          </m.div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="py-24 lg:py-32 bg-secondary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02] bg-[url('/noise.svg')]"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <m.span
              className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
              {...stagger(0)}
            >
              Unsere Werte
            </m.span>
            <m.h2
              className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight"
              {...stagger(0.1)}
            >
              Warum Coday die richtige Wahl für Ihr lokales Unternehmen ist
            </m.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <m.div
                key={value.title}
                className="group relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-primary/30 hover:bg-white/[0.04] transition motion-reduce:duration-[0.01ms] duration-500"
                {...stagger(index * 0.1)}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] duration-500 blur-xl" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors motion-reduce:duration-[0.01ms]">
                    <value.icon size={24} weight="duotone" className="text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-[0.95rem]">
                    {value.description}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS / ARBEITSWEISE ═══ */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #111827 0%, #0f172a 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.02] bg-[url('/noise.svg')]"
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <m.span
              className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
              {...stagger(0)}
            >
              Unser Prozess
            </m.span>
            <m.h2
              className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight"
              {...stagger(0.1)}
            >
              So entsteht Ihre neue Firmenwebseite
            </m.h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[3.5rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
              {processSteps.map((step, index) => (
                <m.div
                  key={step.title}
                  className="relative text-center group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                    ease: EASE_OUT,
                  }}
                >
                  {/* Step Number Circle */}
                  <div className="relative mx-auto w-[4.5rem] h-[4.5rem] rounded-full border-2 border-white/10 bg-secondary flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors motion-reduce:duration-[0.01ms] duration-500 z-10">
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] duration-500" />
                    <step.icon size={28} weight="duotone" className="text-primary relative z-10" />
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center z-20 shadow-lg shadow-primary/30">
                    {index + 1}
                  </div>

                  <h3 className="font-display font-bold text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-[220px] mx-auto">
                    {step.description}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <ScrollReveal index={0}>
        <TeamSection />
      </ScrollReveal>

      {/* ═══ GEO FAKTEN ═══ */}
      <ScrollReveal index={1}>
        <section className="py-24 bg-secondary border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-display font-bold text-white mb-8">Unternehmensdaten</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-400">
              <div>
                <span className="block text-sm uppercase tracking-wider text-primary mb-2">
                  Firmensitz
                </span>
                <strong className="text-white text-lg font-medium">Wetzlar</strong>
              </div>
              <div>
                <span className="block text-sm uppercase tracking-wider text-primary mb-2">
                  Einsatzgebiet
                </span>
                <strong className="text-white text-lg font-medium">Mittelhessen</strong>
              </div>
              <div>
                <span className="block text-sm uppercase tracking-wider text-primary mb-2">
                  Gründungsjahr
                </span>
                <strong className="text-white text-lg font-medium">2024</strong>
              </div>
              <div>
                <span className="block text-sm uppercase tracking-wider text-primary mb-2">
                  Inhaber
                </span>
                <strong className="text-white text-lg font-medium">Umur Eyigün</strong>
              </div>
            </div>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'ProfessionalService',
                name: 'Coday',
                founder: {
                  '@type': 'Person',
                  name: 'Umur Eyigün',
                },
                foundingDate: '2024',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Wetzlar',
                  addressRegion: 'Hessen',
                  addressCountry: 'DE',
                },
                areaServed: 'Mittelhessen',
              }),
            }}
          />
        </section>
      </ScrollReveal>

      {/* FAQs for Rich Snippets */}
      <ScrollReveal index={1}>
        <RelevantFAQs
          serviceId={['web-development', 'web-design', 'seo']}
          className="bg-secondary border-t border-white/5"
        />
      </ScrollReveal>

      {/* ═══ TRUST SIGNALS ═══ */}
      <ScrollReveal index={0}>
        <section className="bg-secondary pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TrustBadges
              align="center"
              className="opacity-80 grayscale hover:grayscale-0 transition motion-reduce:duration-[0.01ms] duration-300 [&_*]:text-white"
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
