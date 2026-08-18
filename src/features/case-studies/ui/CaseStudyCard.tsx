import React from 'react';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { Project } from '@/shared/data/work';

export interface CaseStudyCardProps {
  project: Project;
  index?: number;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ project, index = 1 }) => {
  const locale = useLocale();
  const currentLang = locale as 'de' | 'en';

  // Extract content based on language
  const content = project.content[currentLang] || project.content['de'];

  const title = content.title;
  const client = title;
  const industry = content.category;
  const tags = content.stats?.map((s) => s.value) || [];

  // Try to use solution images if available
  const image = content.solution?.images?.[0];
  const isLcp = index === 0;

  const innerContent = (
    <article className="group relative h-full flex flex-col bg-surface-elevated overflow-hidden transition-colors motion-safe:duration-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 cursor-pointer w-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border-subtle bg-slate-900">
        {image ? (
          <OptimizedImage
            src={image}
            alt={content.solution?.imageAlts?.[0] || `Case Study: ${title} - ${industry}`}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform motion-reduce:duration-[0.01ms] duration-[800ms] ease-spring"
            width={800}
            height={600}
            priority={isLcp}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center p-6 text-center">
            <span className="text-xl font-bold font-display text-white">{title}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-6 md:p-8 justify-between">
        <div>
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="px-2 py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-md text-[10px] font-bold uppercase tracking-wider">
              {industry}
            </span>
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded-md text-[10px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest">{client}</span>
          <h3 className="font-display font-bold text-2xl text-neutral-900 dark:text-neutral-50 mt-2 mb-6 group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms]">
            <Link
              href={`/work/${project.slug}`}
              className="outline-none before:absolute before:inset-0 before:z-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
            >
              {title}
            </Link>
          </h3>
        </div>
        <div className="inline-flex items-center gap-2 font-bold text-sm text-neutral-900 dark:text-neutral-50 group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms] relative z-20">
          <Link
            href={`/work/${project.slug}`}
            className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-bg-primary rounded-sm"
          >
            {locale === 'en' ? `${title} Web Design Case Study` : `Webdesign Case Study: ${title}`}{' '}
            <ArrowUpRight
              className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform motion-reduce:duration-[0.01ms]"
              weight="bold"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );

  return innerContent;
};
