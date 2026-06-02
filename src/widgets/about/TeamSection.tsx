import React from 'react';
import { motion } from 'motion/react';
import { EnvelopeSimple, LinkedinLogo, MapPin, Briefcase, Code } from '@phosphor-icons/react';

/* ═══ ANIMATION PRESETS ═══ */
const EASE_OUT: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' as const },
  transition: { duration: 0.6, ease: EASE_OUT },
};

const stagger = (delay: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay },
});

const facts = [
  { icon: MapPin, label: 'Wetzlar, Deutschland' },
  { icon: Briefcase, label: 'Einzelunternehmen' },
  { icon: Code, label: 'Full-Stack Development' },
];

export const TeamSection: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary text-white relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-4xl max-h-4xl bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/noise.svg')]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
            {...fadeUp}
          >
            Der Gründer
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight text-white"
            {...stagger(0.1)}
          >
            Der Kopf hinter{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Coday
            </span>
          </motion.h2>
          <motion.p className="text-lg text-gray-400 max-w-2xl mx-auto" {...stagger(0.2)}>
            Ein Entwickler. Ein Ansprechpartner. Keine Agentur-Bürokratie — nur direkter Draht zu
            dem Menschen, der Ihr Projekt von A bis Z umsetzt.
          </motion.p>
        </div>

        {/* Founder Card */}
        <motion.div
          className="relative group bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-primary/40 transition motion-reduce:duration-[0.01ms] duration-500 max-w-2xl mx-auto"
          {...stagger(0.3)}
        >
          {/* Glow on hover */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] duration-500 pointer-events-none" />

          <div className="p-8 lg:p-10 relative z-10">
            {/* Avatar + Info */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/30 flex items-center justify-center text-3xl font-display font-bold text-primary shrink-0">
                UT
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-display font-bold text-white mb-1">
                  Umutcan Emre Tezgel
                </h3>
                <p className="text-sm text-primary font-semibold tracking-wide uppercase mb-3">
                  Gründer &amp; Entwickler
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                  {facts.map((fact) => (
                    <span
                      key={fact.label}
                      className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-white/[0.05] px-3 py-1.5 rounded-full"
                    >
                      <fact.icon size={14} className="text-primary/70" />
                      {fact.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-400 leading-relaxed mb-8">
              Full-Stack-Entwickler mit Fokus auf performante Web-Applikationen und strategisches
              Design. Ich kombiniere handgeschriebenen Code mit modernem UX-Design, um digitale
              Erlebnisse zu schaffen, die messbare Ergebnisse liefern. Bei Coday gibt es keinen
              Overhead — Sie arbeiten direkt mit mir, vom ersten Gespräch bis zum Launch.
            </p>

            {/* Contact Links */}
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <a
                href="mailto:umut@codayweb.de"
                className="p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary transition-colors motion-reduce:duration-[0.01ms] text-white"
                aria-label="E-Mail senden"
              >
                <EnvelopeSimple size={18} weight="fill" />
              </a>
              <a
                href="https://linkedin.com/in/umutcantezgel"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary transition-colors motion-reduce:duration-[0.01ms] text-white"
                aria-label="LinkedIn Profil"
              >
                <LinkedinLogo size={18} weight="fill" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Structured Data: Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Umutcan Emre Tezgel',
            jobTitle: 'Gründer & Entwickler',
            description:
              'Full-Stack-Entwickler und Gründer von Coday, einer Solo-Webagentur aus Wetzlar.',
            url: 'https://www.codayweb.de/about',
            worksFor: {
              '@type': 'Organization',
              name: 'Coday',
              url: 'https://www.codayweb.de',
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Wetzlar',
              addressRegion: 'Hessen',
              addressCountry: 'DE',
            },
          }),
        }}
      />
    </section>
  );
};
