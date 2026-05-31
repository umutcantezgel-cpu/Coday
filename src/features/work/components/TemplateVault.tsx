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
    <section className="py-[var(--space-section)] bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('sections.templates.title')}
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            {t('sections.templates.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all motion-reduce:duration-[0.01ms] duration-300"
            >
              {/* Preview Window (Mockup style) */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-b border-gray-100">
                <iframe
                  src={project.liveUrl}
                  className="w-[200%] h-[200%] transform scale-50 origin-top-left pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms]"
                  tabIndex={-1}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] flex items-end p-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-white text-slate-900 font-bold text-center rounded-lg shadow-lg hover:bg-slate-50 transition-colors motion-reduce:duration-[0.01ms] flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    Preview
                  </a>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900 line-clamp-1">
                    {project.content[currentLang].title}
                  </h3>
                  <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold uppercase rounded">
                    V{project.slug.split('-').pop()}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                  {project.content[currentLang].solution.description}
                </p>
                <button className="active:scale-[0.97] w-full py-1.5 text-xs font-bold text-slate-400 border border-slate-200 rounded-lg hover:border-slate-900 hover:text-slate-900 transition-colors motion-reduce:duration-[0.01ms] flex items-center justify-center gap-2">
                  <Copy size={14} />
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
