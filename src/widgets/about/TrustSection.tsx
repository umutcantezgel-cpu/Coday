import React from 'react';
import { m } from 'motion/react';
import { AnimatedCounter } from '@/shared/ui/AnimatedCounter';

/* ═══ Real client names from portfolio ═══ */
const clients = ['Batherm', 'MS-Schlüsseldienst', 'Lindener Ratsstuben'];

const metrics = [
  { value: 100, suffix: '+', label: 'Erfolgreiche Projekte' },
  { value: 98, suffix: '%', label: 'Kundenzufriedenheit' },
  { value: 5, suffix: ' Jahre', label: 'Markterfahrung' },
  { value: 24, suffix: '/7', label: 'Support & Wartung' },
];

/* ═══ ANIMATION PRESETS ═══ */
const EASE_OUT: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' as const },
  transition: { duration: 0.6, ease: EASE_OUT },
};

export const TrustSection: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-[url(/noise.svg)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Logos / Client Names Section */}
        <div className="mb-20">
          <m.p
            className="text-center text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-10"
            {...fadeUp}
          >
            Vertrauen von führenden Unternehmen
          </m.p>

          {/* Client Badge Marquee */}
          <div
            className="relative flex overflow-hidden group select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            role="marquee"
            aria-label="Kunden-Referenzen: Batherm, MS-Schlüsseldienst, Lindener Ratsstuben"
          >
            <m.div
              className="flex gap-4 md:gap-6 shrink-0 py-4"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 20,
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              {[...clients, ...clients, ...clients].map((client, index) => (
                <div
                  key={`${client}-${index}`}
                  className="px-6 py-3 rounded-full border border-white/[0.08] bg-white/[0.02] text-gray-400 font-display font-semibold text-sm tracking-wide hover:border-primary/30 hover:text-primary transition motion-reduce:duration-[0.01ms] duration-400 select-none whitespace-nowrap"
                  aria-hidden="true"
                >
                  {client}
                </div>
              ))}
            </m.div>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric, index) => (
            <m.div
              key={metric.label}
              className="relative group text-center p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-primary/20 transition motion-reduce:duration-[0.01ms] duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: EASE_OUT,
              }}
            >
              {/* Glow bg */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] duration-500 blur-xl" />

              <div className="relative z-10">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tighter flex justify-center items-baseline">
                  <AnimatedCounter value={metric.value} />
                  <span className="text-primary">{metric.suffix}</span>
                </div>
                <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {metric.label}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};
