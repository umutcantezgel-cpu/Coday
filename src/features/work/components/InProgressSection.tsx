import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'motion/react';
import { ArrowRight, CircleNotch } from '@phosphor-icons/react/dist/ssr';
import { Project } from '@/shared/data/work';

interface InProgressSectionProps {
  projects: Project[];
}

export const InProgressSection: React.FC<InProgressSectionProps> = ({ projects }) => {
  const t = useTranslations('work');
  const locale = useLocale();
  const currentLang = locale as 'de' | 'en';

  if (projects.length === 0) return null;

  return (
    <section className="py-[var(--space-section)] bg-slate-900 border-y border-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse motion-reduce:animate-none" aria-hidden="true" />
              {t('sections.in_progress.title')}
            </h2>
            <p className="text-slate-400 mt-2">{t('sections.in_progress.subtitle')}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.slug}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.content[currentLang].title} – ${t('actions.view_live')}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-slate-950 border border-slate-800 rounded-xl p-6 overflow-hidden hover:border-emerald-500/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 focus-visible:border-emerald-500/50 transition-colors motion-reduce:duration-[0.01ms]"
            >
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`w-12 h-12 rounded-lg ${project.heroImage} opacity-80 flex items-center justify-center`}
                >
                  <CircleNotch className="w-6 h-6 text-white animate-spin motion-reduce:animate-none" aria-hidden="true" />
                </div>
                <span className="px-2 py-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 rounded border border-emerald-500/20">
                  {project.completion}%
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors motion-reduce:duration-[0.01ms]">
                {project.content[currentLang].title}
              </h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                {project.content[currentLang].subtitle}
              </p>

              {/* Progress Bar */}
              <div
                className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4"
                role="progressbar"
                aria-valuenow={project.completion}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${project.content[currentLang].title}: ${project.completion}% ${t('sections.in_progress.title')}`}
              >
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${project.completion}%` }}
                />
              </div>

              <div className="flex items-center text-xs font-bold text-emerald-500 uppercase tracking-wider group-hover:translate-x-2 transition-transform motion-reduce:duration-[0.01ms]">
                <span>{t('actions.view_live')}</span>
                <ArrowRight className="ml-2 w-3 h-3" aria-hidden="true" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
