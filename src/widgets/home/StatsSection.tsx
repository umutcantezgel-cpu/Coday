import React from 'react';
import { useTranslation } from 'react-i18next';
import CountUp from '../../shared/ui/CountUp';

export const StatsSection: React.FC = () => {
  const { t } = useTranslation(['home']);

  return (
    <section className="relative z-20 -mt-20 mb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-flat-lg border border-gray-100/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            <div className="px-4 text-center">
              <div className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2">
                <CountUp from={0} to={0.5} duration={1.5} className="" />
                <span className="text-2xl ms-1">{t('stats.seconds', { ns: 'home' })}</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary">
                {t('stats.load_time', { ns: 'home' })}
              </div>
            </div>
            <div className="px-4 text-center">
              <div className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2">
                <CountUp from={0} to={100} duration={1.5} className="" />
                <span className="text-2xl ms-1">{t('stats.percent', { ns: 'home' })}</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary">
                {t('stats.ownership', { ns: 'home' })}
              </div>
            </div>
            <div className="px-4 text-center">
              <div className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2">
                <CountUp from={0} to={24} duration={1.5} className="" />
                <span className="text-2xl ms-1">{t('stats.hours', { ns: 'home' })}</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary">
                {t('stats.availability', { ns: 'home' })}
              </div>
            </div>
            <div className="px-4 text-center border-r-0">
              <div className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2">
                {t('stats.profit', { ns: 'home' })}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary">
                {t('stats.focused', { ns: 'home' })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
