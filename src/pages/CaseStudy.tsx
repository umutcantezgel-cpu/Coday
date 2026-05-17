import React from 'react';
import CountUp from '@/shared/ui/CountUp';
import { useTranslation } from 'react-i18next';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { GlobalCTA, JsonLd } from '@/shared/ui';
import { CaretDown, ArrowRight, Quotes } from '@phosphor-icons/react';
const CaseStudy: React.FC = () => {
  const { t } = useTranslation('work');
  return (
    <div className="font-sans antialiased text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark transition-colors duration-300 overflow-x-hidden">
      <JsonLd
        pageType="article"
        data={{
          article: {
            headline: t('hero.title_start') + ' ' + t('hero.title_gradient'),
            description: t('hero.desc'),
            image: '/images/og-image.jpg',
            author: 'Coday',
            datePublished: '2024-01-01',
          },
        }}
      />
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-float pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <div className="flex flex-col items-center justify-center space-y-8">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider mb-4 animate-fade-in-up">
              {t('hero.badge')}
            </span>
            <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white leading-none drop-shadow-2xl">
              {t('hero.title_start')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-white">
                {t('hero.title_gradient')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl font-light leading-relaxed">
              {t('hero.desc')}
            </p>
            <div className="pt-8 animate-bounce">
              <OptimizedIcon icon={CaretDown} className="text-white text-5xl opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 lg:py-32 bg-background-light dark:bg-background-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-gray-100 dark:bg-gray-800/50 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 sticky top-32">
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6">
                {t('results.title').split('<0>')[0]}
                <span className="text-primary">
                  // @ts-expect-error
                  {t('results.title').split('<0>')[1]?.split('</0>')[0]}
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {t('results.desc')}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center text-primary font-bold hover:underline"
              >
                {t('results.link')} <OptimizedIcon icon={ArrowRight} className="ml-2" />
              </a>
            </div>

            <div className="lg:col-span-8 space-y-16 lg:space-y-24">
              <div className="group relative">
                <div className="absolute -left-8 -top-8 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors"></div>
                <div className="relative z-10">
                  <span className="font-display font-black text-8xl md:text-9xl text-gray-900 dark:text-white tracking-tighter block mb-2 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-2 origin-left">
                    +<CountUp from={0} to={291} duration={2} />%
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {t('results.stats.leads.label')}
                  </h3>
                  <p className="text-gray-500 max-w-md">{t('results.stats.leads.desc')}</p>
                </div>
              </div>

              <div className="group relative lg:pl-24">
                <div className="absolute left-16 top-0 w-32 h-32 bg-blue-400/10 rounded-full blur-xl group-hover:bg-blue-400/20 transition-colors"></div>
                <div className="relative z-10">
                  <span className="font-display font-black text-8xl md:text-9xl text-gray-900 dark:text-white tracking-tighter block mb-2 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-2 origin-left">
                    -<CountUp from={0} to={45} duration={2} />%
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {t('results.stats.cpa.label')}
                  </h3>
                  <p className="text-gray-500 max-w-md">{t('results.stats.cpa.desc')}</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -right-8 top-1/2 w-40 h-40 bg-purple-400/10 rounded-full blur-xl group-hover:bg-purple-400/20 transition-colors"></div>
                <div className="relative z-10">
                  <span className="font-display font-black text-8xl md:text-9xl text-gray-900 dark:text-white tracking-tighter block mb-2 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-2 origin-left">
                    <CountUp from={0} to={0.8} duration={2} />s
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {t('results.stats.lcp.label')}
                  </h3>
                  <p className="text-gray-500 max-w-md">{t('results.stats.lcp.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-surface-dark relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-[10%] w-20 h-20 bg-yellow-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-[5%] w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-gray-900 dark:text-white">
              {t('testimonials.title')}
            </h2>
            <p className="text-gray-500">{t('testimonials.desc')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl relative shadow-aurora-lg transform hover:-translate-y-1 transition-transform duration-300 border border-transparent hover:border-primary/20">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-blue-50/5 pointer-events-none"></div>
              <div className="relative z-10">
                <OptimizedIcon icon={Quotes} className="text-primary text-4xl mb-4 opacity-50" />
                <p className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-800 mb-6 italic leading-relaxed">
                  {t('testimonials.items.0.quote')}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-primary"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-900 text-sm">
                      {t('testimonials.items.0.author')}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-600 uppercase tracking-wide">
                      {t('testimonials.items.0.role')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl relative shadow-aurora-lg transform hover:-translate-y-1 transition-transform duration-300 md:translate-y-12 border border-transparent hover:border-primary/20">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-blue-50/5 pointer-events-none"></div>
              <div className="relative z-10">
                <OptimizedIcon icon={Quotes} className="text-primary text-4xl mb-4 opacity-50" />
                <p className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-800 mb-6 italic leading-relaxed">
                  {t('testimonials.items.1.quote')}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-primary"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-900 text-sm">
                      {t('testimonials.items.1.author')}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-600 uppercase tracking-wide">
                      {t('testimonials.items.1.role')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Identity */}
      <section className="py-32 bg-background-light dark:bg-background-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-8 lg:p-16 shadow-2xl relative z-10 border border-gray-100 dark:border-gray-700">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-200/50 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200/50 rounded-full blur-3xl"></div>
                  <div className="relative z-10 rounded-xl shadow-xl transform rotate-2 hover:rotate-0 transition-all duration-500 border border-gray-200 dark:border-gray-600 bg-gray-200 h-64 w-full flex items-center justify-center text-gray-400">
                    Project Dashboard Image
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
                  {t('visual_identity.badge')}
                </span>
                <h2 className="font-display font-bold text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6">
                  {t('visual_identity.title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                  {t('visual_identity.desc')}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 rounded-lg bg-primary-700 shadow-md flex items-center justify-center text-white/50 text-xs">
                    {t('visual_identity.colors.primary')}
                  </div>
                  <div className="h-24 rounded-lg bg-bg-inverse shadow-md flex items-center justify-center text-white/50 text-xs">
                    {t('visual_identity.colors.dark')}
                  </div>
                  <div className="h-24 rounded-lg bg-bg-secondary border border-gray-200 shadow-md flex items-center justify-center text-gray-400 text-xs">
                    {t('visual_identity.colors.light')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GlobalCTA />
    </div>
  );
};

export default CaseStudy;
