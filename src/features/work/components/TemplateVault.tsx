import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'motion/react';
import { Copy, Eye } from '@phosphor-icons/react/dist/ssr';
import { Project } from '@/shared/data/work';

interface TemplateVaultProps {
  projects: Project[];
}

export const TemplateVault: React.FC<TemplateVaultProps> = ({ projects }) => {
  const t = useTranslations('work');
  const locale = useLocale();
  const currentLang = locale as 'de' | 'en';

  if (projects.length === 0) return null;

  return (
    <section className="py-[var(--space-section)] bg-background-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            {t('sections.templates.title')}
          </h2>
          <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            {t('sections.templates.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border-subtle rounded-xl overflow-hidden border border-border-subtle">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-surface-elevated overflow-hidden hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition-colors motion-reduce:duration-[0.01ms] duration-300 flex flex-col"
            >
              {/* Preview Window (Mockup style) */}
              <div className="relative aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 overflow-hidden border-b border-border-subtle">
                <iframe
                  src={project.liveUrl}
                  title={`${project.content[currentLang].title} – Preview`}
                  className="w-[200%] h-[200%] transform scale-50 origin-top-left pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms]"
                  tabIndex={-1}
                  aria-hidden="true"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] flex items-end p-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Preview ${project.content[currentLang].title}`}
                    className="w-full py-2 bg-white text-neutral-900 font-bold text-center rounded-md shadow-lg hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors motion-reduce:duration-[0.01ms] flex items-center justify-center gap-2"
                  >
                    <Eye size={16} aria-hidden="true" />
                    Preview
                  </a>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-neutral-900 dark:text-white line-clamp-1">
                      {project.content[currentLang].title}
                    </h3>
                    <span className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-[10px] font-bold uppercase rounded">
                      V{project.slug.split('-').pop()}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 line-clamp-2">
                    {project.content[currentLang].solution.description}
                  </p>
                </div>
                <button
                  aria-label={`Clone template: ${project.content[currentLang].title}`}
                  className="active:scale-[0.97] w-full py-2 text-xs font-bold text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:border-neutral-900 hover:text-neutral-900 dark:hover:border-white dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors motion-reduce:duration-[0.01ms] flex items-center justify-center gap-2"
                >
                  <Copy size={14} aria-hidden="true" />
                  Clone Template
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
