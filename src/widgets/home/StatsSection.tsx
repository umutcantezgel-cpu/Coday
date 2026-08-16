import React from 'react';
import { useTranslations } from 'next-intl';
import CountUp from '@/shared/ui/CountUp';
import { FadeInUp } from '@/shared/ui/MotionWrappers';

export const StatsSection: React.FC = () => {
  const t = useTranslations('home');

  return (
    <section className="py-[var(--space-section)] relative z-20 -mt-20 mb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <FadeInUp className="bg-white/90 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-flat-lg border border-gray-100/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            <div className="px-4 text-center">
              <div
                className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2"
                aria-hidden="true"
              >
                <CountUp from={0} to={0.5} duration={1.5} className="" />
                <span className="text-2xl ms-1">{t('stats.seconds')}</span>
              </div>
              <span className="sr-only">
                0.5 {t('stats.seconds')} {t('stats.load_time')}
              </span>
              <div className="text-xs font-bold uppercase tracking-widest text-primary-800">
                {t('stats.load_time')}
              </div>
            </div>
            <div className="px-4 text-center">
              <div
                className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2"
                aria-hidden="true"
              >
                <CountUp from={0} to={100} duration={1.5} className="" />
                <span className="text-2xl ms-1">{t('stats.percent')}</span>
              </div>
              <span className="sr-only">
                100 {t('stats.percent')} {t('stats.ownership')}
              </span>
              <div className="text-xs font-bold uppercase tracking-widest text-primary-800">
                {t('stats.ownership')}
              </div>
            </div>
            <div className="px-4 text-center">
              <div
                className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2"
                aria-hidden="true"
              >
                <CountUp from={0} to={24} duration={1.5} className="" />
                <span className="text-2xl ms-1">{t('stats.hours')}</span>
              </div>
              <span className="sr-only">
                24 {t('stats.hours')} {t('stats.availability')}
              </span>
              <div className="text-xs font-bold uppercase tracking-widest text-primary-800">
                {t('stats.availability')}
              </div>
            </div>
            <div className="px-4 text-center border-r-0">
              <div className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2">
                {t('stats.profit')}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary-800">
                {t('stats.focused')}
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};
