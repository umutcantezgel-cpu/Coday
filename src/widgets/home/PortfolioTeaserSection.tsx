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

  // Featured real client projects for the teaser (Batherm, Schlüsseldienst, Memo BauT)
  const projects = [
    workData['batherm'],
    workData['schluesseldienst-wetzlar'],
    workData['memobaut'],
  ].filter(Boolean);

  return (
    <section className="py-[var(--space-section)] bg-background-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <FadeInUp duration={0.6} className="max-w-2xl">
            <p className="text-action-primary font-bold text-xs uppercase tracking-[0.15em] mb-4">
              {t('portfolio_teaser.overline')}
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-secondary-900 mb-6 tracking-tight">
              {t('portfolio_teaser.title')}
            </h2>
            <p className="text-xl text-secondary-600">{t('portfolio_teaser.subtitle')}</p>
          </FadeInUp>
          <FadeInUp delay={0.2} duration={0.6} className="mt-8 md:mt-0">
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-action-primary hover:bg-action-primary-hover transition motion-reduce:duration-[0.01ms] duration-300 rounded-full shadow-lg shadow-action-primary/20 hover:shadow-xl hover:shadow-action-primary/30 hover:-translate-y-0.5"
            >
              {t('portfolio_teaser.cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeInUp>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => {
            const content = project.content[currentLang] || project.content['de'];
            const isEven = index % 2 === 0;
            const image = content.solution?.images?.[0];
            const tags = content.stats?.map((s) => s.value) || [];

            return (
              <div
                key={project.slug}
                className={`group/card relative flex flex-col gap-12 lg:gap-24 lg:items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Image Section */}
                <ScaleIn delay={0.1} duration={0.8} className="w-full lg:w-3/5 group relative">
                  <div className="block relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] bg-slate-900">
                    <div className="absolute inset-0 bg-secondary-900/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    {image ? (
                      <OptimizedImage
                        src={image}
                        alt={content.solution?.imageAlts?.[0] || content.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                        width={1200}
                        height={900}
                        priority={false}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center p-8 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                        <div className="relative z-10">
                          <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2 block">
                            {content.category}
                          </span>
                          <span className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
                            {content.title}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Hover Overlay Badge */}
                    <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 group-hover/card:opacity-100 transform translate-y-4 group-hover:translate-y-0 group-hover/card:translate-y-0 transition-[opacity,transform] duration-500 bg-white/90 backdrop-blur-md text-secondary-900 rounded-full p-4 shadow-xl flex items-center justify-center">
                      <ArrowUpRight weight="bold" className="w-6 h-6" />
                    </div>
                  </div>
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

                  <h3 className="font-display font-black text-4xl sm:text-5xl text-secondary-900 mb-6 group-hover/card:text-action-primary transition-colors duration-300">
                    <Link
                      href={`/work/${project.slug}`}
                      aria-label={
                        currentLang === 'en'
                          ? `Read ${content.title} Case Study`
                          : `Case Study zu ${content.title} lesen`
                      }
                      className="outline-none before:absolute before:-inset-8 before:z-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                    >
                      {content.title}
                    </Link>
                  </h3>

                  <p className="text-xl text-secondary-700 leading-relaxed mb-10 max-w-lg font-medium">
                    {content.subtitle}
                  </p>

                  {/* No w-max: max-content width made this link 598px wide on a 375px
                      screen, so the label ran straight off the viewport. The link is
                      still inline-flex, so the underline keeps hugging the text
                      wherever it fits. */}
                  <div className="relative z-20">
                    <Link
                      href={`/work/${project.slug}`}
                      aria-label={`${content.title} Case Study`}
                      className="inline-flex items-center gap-3 font-bold text-lg text-secondary-900 hover:text-action-primary transition-colors group outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                    >
                      <span className="border-b-2 border-secondary-900 group-hover:border-action-primary pb-1 transition-colors">
                        {currentLang === 'en'
                          ? `${content.title} Web Design Case Study`
                          : `Webdesign Case Study: ${content.title}`}
                      </span>
                      <ArrowRight
                        weight="bold"
                        className="shrink-0 transform group-hover:translate-x-2 transition-transform duration-300 w-5 h-5"
                      />
                    </Link>
                  </div>
                </FadeInUp>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
