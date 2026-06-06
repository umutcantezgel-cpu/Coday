import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { m } from 'motion/react';
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
    <section className="py-[var(--space-section)] bg-background-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-3 mb-4">
            <span
              className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse motion-reduce:animate-none"
              aria-hidden="true"
            />
            {t('sections.in_progress.title')}
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl">
            {t('sections.in_progress.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-subtle rounded-xl overflow-hidden border border-border-subtle">
          {projects.map((project, index) => (
            <m.a
              key={project.slug}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.content[currentLang].title} – ${t('actions.view_live')}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-full bg-surface-elevated p-8 flex flex-col justify-between overflow-hidden hover:bg-neutral-50 dark:hover:bg-neutral-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary transition-colors motion-reduce:duration-[0.01ms]"
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div
                    className={`w-12 h-12 rounded-lg ${project.heroImage} opacity-80 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800`}
                  >
                    <CircleNotch
                      className="w-6 h-6 text-neutral-500 animate-spin motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="px-2 py-1 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 rounded border border-emerald-200 dark:border-emerald-500/20">
                    {project.completion}%
                  </span>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms]">
                  {project.content[currentLang].title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8 line-clamp-2">
                  {project.content[currentLang].subtitle}
                </p>
              </div>

              <div>
                {/* Progress Bar */}
                <div
                  className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden mb-6"
                  role="progressbar"
                  aria-valuenow={project.completion}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${project.content[currentLang].title}: ${project.completion}% ${t('sections.in_progress.title')}`}
                >
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${project.completion}%` }}
                  />
                </div>

                <div className="flex items-center text-xs font-bold text-primary uppercase tracking-wider group-hover:translate-x-2 transition-transform motion-reduce:duration-[0.01ms]">
                  <span>{t('actions.view_live')}</span>
                  <ArrowRight className="ml-2 w-3 h-3" aria-hidden="true" />
                </div>
              </div>
            </m.a>
          ))}
        </div>
      </div>
    </section>
  );
};
