import React from 'react';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import { useTranslation } from 'react-i18next';
// Premium UI Components
import AnimatedList from '../../shared/ui/AnimatedList';
import RotatingText from '../../shared/ui/RotatingText';

const Jobs: React.FC = () => {
  const { t, i18n } = useTranslation('careers');
  const jobs = t('jobs.list', { returnObjects: true }) as any[];

  const createMailtoLink = (subject: string) => {
    const body = `Hallo Coday-Team,%0D%0A%0D%0Aich bewerbe mich für die ausgeschriebene Stelle.%0D%0A%0D%0AMeine Unterlagen:%0D%0A- Lebenslauf (im Anhang)%0D%0A- Portfolio: [Link einfügen]%0D%0A%0D%0AMit freundlichen Grüßen`;
    return `mailto:umut@codayweb.de?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <div className="bg-aurora-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30 pointer-events-none -z-10"></div>

          {/* Hero Visual */}
          <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl h-[400px] group">
            <OptimizedImage
              src="/images/hero/team-buero-high-five-erfolg-feiern-banner-konfetti-ziel-erreicht-medaillen-wachstum.webp"
              alt="Unser Team feiert Erfolge"
              className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12 text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                {t('jobs.culture_badge')}
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-gray-900 mb-6">
                {t('jobs.hero_title_prefix')} <br />
                <RotatingText
                  texts={t('jobs.hero_rotating', { returnObjects: true }) as string[]}
                  rotationInterval={3000}
                  staggerFrom="last"
                  staggerDuration={0.025}
                  mainClassName="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500"
                />
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl text-white/90">
                {t('jobs.hero_desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Animated Job List */}
        <div className="space-y-6 max-w-5xl mx-auto">
          <AnimatedList
            className="w-full max-w-full"
            showGradients={false}
            displayScrollbar={false}
          >
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-aurora-mist p-8 flex flex-col md:flex-row md:items-center justify-between hover:shadow-lg transition-all duration-300 group mb-4"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2 py-1 rounded bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-wider">
                      {job.type}
                    </span>
                    <span className="px-2 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                      {job.location}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-slate-500 max-w-xl">{job.desc}</p>
                </div>

                <div className="mt-6 md:mt-0 flex items-center">
                  <a
                    href={createMailtoLink(job.mailtoSubject)}
                    className="px-6 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block"
                  >
                    {t('jobs.button')}
                  </a>
                </div>
              </div>
            ))}
          </AnimatedList>
        </div>

        <div className="mt-16 text-center bg-slate-50 rounded-3xl p-12 border border-slate-100 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('jobs.no_jobs.title')}</h3>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">{t('jobs.no_jobs.desc')}</p>
          <a
            href="mailto:umut@codayweb.de?subject=Initiativbewerbung%20bei%20Coday&body=Hallo%20Coday-Team%2C%0D%0A%0D%0Aich%20bewerbe%20mich%20initiativ%20bei%20Ihnen.%0D%0A%0D%0AMeine%20St%C3%A4rken%3A%0D%0A-%20%0D%0A-%20%0D%0A%0D%0AMit%20freundlichen%20Gr%C3%BC%C3%9Fen"
            className="px-8 py-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:border-blue-500 hover:text-blue-600 transition-colors bg-white inline-block"
          >
            {t('jobs.no_jobs.button')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
