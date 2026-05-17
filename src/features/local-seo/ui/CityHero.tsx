import React from 'react';
import { motion } from 'motion/react';
import GradientText from '@/shared/ui/GradientText';
import { CityData } from '@/features/local-seo/model/cities';

export const CityHero: React.FC<{ city: CityData }> = ({ city }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-secondary">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium tracking-wider text-primary uppercase">
              Webagentur für {city.displayName} & {city.proximityCluster}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white leading-tight">
            Digitale Dominanz für <br className="hidden md:block" />
            <GradientText>{city.displayName}</GradientText>
          </h1>

          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            Wir transformieren Unternehmen aus {city.displayName} in digitale Marktführer. Mit
            High-Performance Webdesign, zielgerichtetem Handwerks-Fokus und messbaren ROI-Strategien
            für B2B- & Branchenriesen.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
