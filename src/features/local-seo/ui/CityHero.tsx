import React from 'react';
import { motion } from 'motion/react';
import GradientText from '@/shared/ui/GradientText';
import Typography from '@/shared/ui/Typography';
import { CityData } from '@/features/local-seo/model/cities';

export const CityHero: React.FC<{ city: CityData }> = ({ city }) => {
  return (
    <section className="py-[var(--space-section)] relative overflow-hidden bg-bg-inverse text-text-inverse">
      <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('/noise.png')" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary-900/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[var(--container-narrow)]"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary-900/30 border border-primary-500/20">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            <span className="text-sm font-medium tracking-wider text-primary-300 uppercase">
              Webagentur für {city.displayName} & {city.proximityCluster}
            </span>
          </div>

          <Typography variant="display" className="mb-6 reveal reveal-visible">
            Digitale Dominanz für <br className="hidden sm:block" />
            <GradientText>{city.displayName}</GradientText>
          </Typography>

          <Typography variant="lead" className="text-text-tertiary mb-10 stagger-1 reveal reveal-visible">
            Wir transformieren Unternehmen aus {city.displayName} in digitale Marktführer. Mit
            High-Performance Webdesign, zielgerichtetem Handwerks-Fokus und messbaren ROI-Strategien
            für B2B- & Branchenriesen.
          </Typography>
        </motion.div>
      </div>
    </section>
  );
};
