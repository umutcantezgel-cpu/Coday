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

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ project }) => {
  const locale = useLocale();
  const currentLang = locale as 'de' | 'en';

  // Extract content based on language
  const content = project.content[currentLang] || project.content['de'];

  const title = content.title;
  const client = title;
  const industry = content.category;
  const tags = content.stats?.map((s) => s.value) || [];

  // Try to use solution images if available, otherwise fallback
  const image = content.solution?.images?.[0] || '/images/brand/coday-full.webp';

  const innerContent = (
    <article className="group relative rounded-3xl overflow-hidden shadow-md h-[400px] flex flex-col hover:-translate-y-1 hover:scale-[1.02] hover:shadow-glow transition motion-reduce:duration-[0.01ms] duration-slow ease-out cursor-pointer w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={image}
          alt={content.solution?.imageAlts?.[0] || `Case Study: ${title} - ${industry}`}
          className="w-full h-full object-cover transform group-hover:scale-[1.04] transition-transform motion-reduce:duration-[0.01ms] duration-slower ease-out"
        />
      </div>

      {/* Default Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-100 group-hover:opacity-0 transition-opacity motion-reduce:duration-[0.01ms] duration-300"></div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] duration-300 flex flex-col p-8 justify-between">
        {/* Top section: Tags */}
        <div className="flex gap-2 transform -translate-y-4 group-hover:translate-y-0 transition-transform motion-reduce:duration-[0.01ms] duration-300 delay-75 flex-wrap">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs font-bold uppercase tracking-wider">
            {industry}
          </span>
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom section: Text & CTA */}
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform motion-reduce:duration-[0.01ms] duration-300 delay-100">
          <span className="text-sm font-bold text-primary uppercase tracking-widest">{client}</span>
          <h3 className="font-display font-bold text-3xl text-white mt-2 mb-6">{title}</h3>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-colors motion-reduce:duration-[0.01ms]">
            Case Study ansehen <ArrowUpRight weight="bold" />
          </div>
        </div>
      </div>
    </article>
  );

  if (project.liveUrl) {
    return (
      <Link href={`/work/${project.slug}`} className="group block h-full">
        {innerContent}
      </Link>
    );
  }

  return (
    <Link href={`/work/${project.slug}`} className="group block h-full">
      {innerContent}
    </Link>
  );
};
