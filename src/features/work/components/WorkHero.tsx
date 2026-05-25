import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Lightning, Code, Cube } from '@phosphor-icons/react/dist/ssr';
import Typography from '@/shared/ui/Typography';

export const WorkHero: React.FC = () => {
  const t = useTranslations('work');

  return (
    <section className="py-[var(--space-section)] relative overflow-hidden bg-bg-inverse text-text-inverse">
      {/* Background Noise/Grid */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('/noise.png')" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-inverse via-bg-inverse/90 to-bg-inverse pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="max-w-[var(--container-narrow)] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-900/50 border border-primary-500/30 text-primary-300 mb-8 backdrop-blur-md"
          >
            <Lightning className="w-4 h-4" weight="fill" />
            <span className="text-xs font-bold tracking-widest uppercase">
              {t('hero.label')}
            </span>
          </motion.div>

          <Typography variant="display" className="mb-8 reveal reveal-visible">
            {t('hero.title')}
          </Typography>

          <Typography variant="lead" className="mb-12 text-text-tertiary stagger-1 reveal reveal-visible">
            {t('hero.description')}
          </Typography>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-8 text-text-tertiary"
          >
            <div className="flex items-center gap-2">
              <Cube className="w-5 h-5 text-primary-400" />
              <span className="text-sm font-mono">12+ Live Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-success" />
              <span className="text-sm font-mono">5 In-Progress</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
