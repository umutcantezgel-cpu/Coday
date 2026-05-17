import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { FadeInUp, ScaleIn } from '@/shared/ui/MotionWrappers';
import { ArrowRight } from '@phosphor-icons/react';
import { workData } from '@/shared/data/work';
import { CaseStudyCard } from '@/features/case-studies/ui/CaseStudyCard';

export const PortfolioTeaserSection: React.FC = () => {
  const { t } = useTranslation('home');

  // Grab the top 3 projects for the teaser
  const projects = Object.values(workData).slice(0, 3);

  return (
    <section className="py-24 bg-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <FadeInUp duration={0.6} className="max-w-2xl">
            <p className="text-primary font-bold text-xs uppercase tracking-[0.15em] mb-4">
              {t('portfolio_teaser.overline', 'Bewiesene Ergebnisse')}
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-gray-900 mb-6 tracking-tight">
              {t('portfolio_teaser.title', 'Unsere Arbeit spricht für sich.')}
            </h2>
            <p className="text-xl text-gray-600">
              {t(
                'portfolio_teaser.subtitle',
                'Keine Fließband-Templates. Nur handgefertigte High-Performance Plattformen, die Dominanz ausstrahlen.'
              )}
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2} duration={0.6} className="mt-8 md:mt-0">
            <NavLink
              to="/work"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-primary hover:bg-primary/90 transition-all duration-300 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              {t('portfolio_teaser.cta', 'Alle Case Studies')}
              <ArrowRight className="w-5 h-5" />
            </NavLink>
          </FadeInUp>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => {
              // Phi-Proportion: 61.8% und 38.2%
              // Für die Teaser-Section (3 Projekte):
              // 1. Projekt: 61.8%
              // 2. Projekt: 38.2%
              // 3. Projekt: 100% (Full width)
              const isLarge = index % 3 === 0;
              const isMedium = index % 3 === 1;

              // Gap calculation: gap-6 is 1.5rem, lg:gap-8 is 2rem.
              // For simplicity, we use the average or safe calc depending on viewport
              let widthClass = 'w-full';
              if (isLarge) widthClass = 'w-full md:w-[calc(61.8%-1rem)] lg:w-[calc(61.8%-1rem)]';
              else if (isMedium)
                widthClass = 'w-full md:w-[calc(38.2%-1rem)] lg:w-[calc(38.2%-1rem)]';

              return (
                <ScaleIn
                  key={project.slug}
                  layout
                  delay={index * 0.1}
                  duration={0.6}
                  className={`${widthClass}`}
                >
                  <CaseStudyCard project={project} index={index} />
                </ScaleIn>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
