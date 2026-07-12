import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FadeInUp, ScaleIn } from '@/shared/ui/MotionWrappers';
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { workData } from '@/shared/data/work';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';

export const PortfolioTeaserSection: React.FC = () => {
  const t = useTranslations('home');
  const locale = useLocale();
  const currentLang = locale as 'de' | 'en';

  // Grab the top 3 projects for the teaser
  const projects = Object.values(workData).slice(0, 3);

  return (
    <section className="py-[var(--space-section)] bg-background-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <FadeInUp duration={0.6} className="max-w-2xl">
            <p className="text-action-primary font-bold text-xs uppercase tracking-[0.15em] mb-4">
              {t('portfolio_teaser.overline', { defaultValue: 'Bewiesene Ergebnisse' })}
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-secondary-900 mb-6 tracking-tight">
              {t('portfolio_teaser.title', { defaultValue: 'Unsere Arbeit spricht für sich.' })}
            </h2>
            <p className="text-xl text-secondary-600">
              {t('portfolio_teaser.subtitle', {
                defaultValue:
                  'Keine Fließband-Templates. Nur handgefertigte High-Performance Plattformen, die Dominanz ausstrahlen.',
              })}
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2} duration={0.6} className="mt-8 md:mt-0">
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-action-primary hover:bg-action-primary-hover transition motion-reduce:duration-[0.01ms] duration-300 rounded-full shadow-lg shadow-action-primary/20 hover:shadow-xl hover:shadow-action-primary/30 hover:-translate-y-0.5"
            >
              {t('portfolio_teaser.cta', { defaultValue: 'Alle Case Studies' })}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeInUp>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => {
            const content = project.content[currentLang] || project.content['de'];
            const isEven = index % 2 === 0;
            const image = content.solution?.images?.[0] || '/images/brand/coday-full.webp';
            const tags = content.stats?.map((s) => s.value) || [];

            return (
              <div
                key={project.slug}
                className={`flex flex-col gap-12 lg:gap-24 lg:items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Image Section */}
                <ScaleIn delay={0.1} duration={0.8} className="w-full lg:w-3/5 group relative">
                  <Link
                    href={`/work/${project.slug}`}
                    className="block relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)]"
                  >
                    <div className="absolute inset-0 bg-secondary-900/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <OptimizedImage
                      src={image}
                      alt={content.solution?.imageAlts?.[0] || content.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                      width={1200}
                      height={900}
                      priority={index === 0}
                    />

                    {/* Hover Overlay Badge */}
                    <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-[opacity,transform] duration-500 bg-white/90 backdrop-blur-md text-secondary-900 rounded-full p-4 shadow-xl flex items-center justify-center">
                      <ArrowUpRight weight="bold" className="w-6 h-6" />
                    </div>
                  </Link>
                </ScaleIn>

                {/* Text Content Section */}
                <FadeInUp
                  delay={0.2}
                  duration={0.8}
                  className="w-full lg:w-2/5 flex flex-col justify-center"
                >
                  <div className="flex gap-3 flex-wrap mb-6">
                    <span className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-100">
                      {content.category}
                    </span>
                    {tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-white text-secondary-700 rounded-full text-xs font-medium border border-gray-200 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/work/${project.slug}`} className="group inline-block">
                    <h3 className="font-display font-black text-4xl sm:text-5xl text-secondary-900 mb-6 group-hover:text-action-primary transition-colors duration-300">
                      {content.title}
                    </h3>
                  </Link>

                  <p className="text-xl text-secondary-700 leading-relaxed mb-10 max-w-lg font-medium">
                    {content.subtitle}
                  </p>

                  <Link
                    href={`/work/${project.slug}`}
                    aria-label={`Case Study ansehen: ${content.title}`}
                    className="inline-flex items-center gap-3 font-bold text-lg text-secondary-900 hover:text-action-primary transition-colors w-max group"
                  >
                    <span className="border-b-2 border-secondary-900 group-hover:border-action-primary pb-1 transition-colors">
                      Case Study ansehen
                    </span>
                    <ArrowRight
                      weight="bold"
                      className="transform group-hover:translate-x-2 transition-transform duration-300 w-5 h-5"
                    />
                  </Link>
                </FadeInUp>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
