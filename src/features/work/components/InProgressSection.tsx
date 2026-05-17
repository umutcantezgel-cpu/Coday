import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, CircleNotch } from '@phosphor-icons/react';
import { Project } from '@/shared/data/work';

interface InProgressSectionProps {
  projects: Project[];
}

export const InProgressSection: React.FC<InProgressSectionProps> = ({ projects }) => {
  const { t, i18n } = useTranslation('work');
  const currentLang = i18n.language as 'de' | 'en';

  if (projects.length === 0) return null;

  return (
    <section className="py-24 bg-slate-900 border-y border-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              {t('sections.in_progress.title', 'The Lab / In Progress')}
            </h2>
            <p className="text-slate-400 mt-2">
              {t('sections.in_progress.subtitle', 'Live builds deploying in real-time.')}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.slug}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-slate-950 border border-slate-800 rounded-xl p-6 overflow-hidden hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`w-12 h-12 rounded-lg ${project.heroImage} opacity-80 flex items-center justify-center`}
                >
                  <CircleNotch className="w-6 h-6 text-white animate-spin" />
                </div>
                <span className="px-2 py-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 rounded border border-emerald-500/20">
                  {project.completion}%
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {project.content[currentLang].title}
              </h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                {project.content[currentLang].subtitle}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${project.completion}%` }}
                />
              </div>

              <div className="flex items-center text-xs font-bold text-emerald-500 uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                <span>{t('actions.view_live', 'View Build')}</span>
                <ArrowRight className="ml-2 w-3 h-3" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
