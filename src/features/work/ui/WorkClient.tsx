"use client";

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { FunnelSimple } from '@phosphor-icons/react';

import { workData } from '@/shared/data/work';
import { WorkHero } from '@/features/work/components/WorkHero';
import { InProgressSection } from '@/features/work/components/InProgressSection';
import { TemplateVault } from '@/features/work/components/TemplateVault';
import { CaseStudyCard } from '@/features/case-studies/ui/CaseStudyCard';

const Work: React.FC = () => {
  const t = useTranslations('work');
  const [filter, setFilter] = useState('all');

  const handleFilterChange = useCallback((index: number) => {
    const filters = ['all', 'design', 'development', 'marketing'];
    
    setFilter(filters[index]);
  }, []);

  // Categorize projects
  const allProjects = Object.values(workData);
  const inProgressProjects = allProjects.filter((p) => p.type === 'in_progress');
  const templateProjects = allProjects.filter((p) => p.type === 'template');

  // Case Studies (Filtered)
  const caseStudies = allProjects.filter((p) => p.type !== 'in_progress' && p.type !== 'template');

  const filteredCaseStudies =
    filter === 'all' ? caseStudies : caseStudies.filter((p) => p.category === filter);

  const categories = [
    { label: t('filter.all'), id: 'all' },
    { label: t('filter.design'), id: 'design' },
    { label: t('filter.development'), id: 'development' },
    { label: t('filter.marketing'), id: 'marketing' },
  ];

  return (
    <div className="bg-background-light min-h-dvh">
      {/* 1. Hero */}
      <WorkHero />

      {/* 2. In Progress (The Lab) */}
      <InProgressSection projects={inProgressProjects} />

      {/* 3. Featured Case Studies */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            {/* Overline Eyebrow */}
            <p className="text-primary font-bold text-xs uppercase tracking-[0.15em] mb-4 flex items-center justify-center gap-2">
              <FunnelSimple className="w-4 h-4" weight="bold" />
              Portfolio
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-8">
              Ausgewählte Projekte
            </h2>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleFilterChange(index)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    item.id === filter
                      ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div layout className="flex flex-col md:flex-row md:flex-wrap gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCaseStudies.map((project, index) => {
                // Asymmetric Phi-pattern (alternating 61.8% and 38.2% splits)
                const isLarge = index % 4 === 0 || index % 4 === 3;
                const widthClass = isLarge ? 'md:w-[calc(61.8%-1rem)]' : 'md:w-[calc(38.2%-1rem)]';

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: 'easeInOut', delay: index * 0.05 }}
                    key={project.slug}
                    className={`h-full w-full ${widthClass}`}
                  >
                    <CaseStudyCard project={project} index={index} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 4. Templates (The Vault) */}
      <TemplateVault projects={templateProjects} />

      {/* 5. Booking CTA (Deep Trust) */}
      <section className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Lassen Sie uns starten
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            {t('sections.booking.subtitle')}
          </p>
          <a
            href="/beratung"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
          >
            Jetzt anfragen
          </a>
        </div>
      </section>
    </div>
  );
};

export default Work;
