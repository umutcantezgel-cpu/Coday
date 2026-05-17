import React from 'react';
import { useTranslation } from 'react-i18next';
import CountUp from '@/shared/ui/CountUp';
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver';

export const StatsSection: React.FC = () => {
  const { t } = useTranslation(['home']);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="relative z-20 -mt-20 mb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`bg-white/90 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-flat-lg border border-gray-100/50 reveal ${isVisible ? 'reveal-visible' : ''}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            <div
              className={`px-4 text-center reveal ${isVisible ? 'reveal-visible stagger-1' : ''}`}
            >
              <div
                className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2"
                aria-hidden="true"
              >
                <CountUp from={0} to={0.5} duration={1.5} className="" />
                <span className="text-2xl ms-1">{t('stats.seconds', { ns: 'home' })}</span>
              </div>
              <span className="sr-only">
                0.5 {t('stats.seconds', { ns: 'home' })} {t('stats.load_time', { ns: 'home' })}
              </span>
              <div className="text-xs font-bold uppercase tracking-widest text-primary-800">
                {t('stats.load_time', { ns: 'home' })}
              </div>
            </div>
            <div
              className={`px-4 text-center reveal ${isVisible ? 'reveal-visible stagger-2' : ''}`}
            >
              <div
                className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2"
                aria-hidden="true"
              >
                <CountUp from={0} to={100} duration={1.5} className="" />
                <span className="text-2xl ms-1">{t('stats.percent', { ns: 'home' })}</span>
              </div>
              <span className="sr-only">
                100 {t('stats.percent', { ns: 'home' })} {t('stats.ownership', { ns: 'home' })}
              </span>
              <div className="text-xs font-bold uppercase tracking-widest text-primary-800">
                {t('stats.ownership', { ns: 'home' })}
              </div>
            </div>
            <div
              className={`px-4 text-center reveal ${isVisible ? 'reveal-visible stagger-3' : ''}`}
            >
              <div
                className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2"
                aria-hidden="true"
              >
                <CountUp from={0} to={24} duration={1.5} className="" />
                <span className="text-2xl ms-1">{t('stats.hours', { ns: 'home' })}</span>
              </div>
              <span className="sr-only">
                24 {t('stats.hours', { ns: 'home' })} {t('stats.availability', { ns: 'home' })}
              </span>
              <div className="text-xs font-bold uppercase tracking-widest text-primary-800">
                {t('stats.availability', { ns: 'home' })}
              </div>
            </div>
            <div
              className={`px-4 text-center border-r-0 reveal ${isVisible ? 'reveal-visible stagger-4' : ''}`}
            >
              <div className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-2">
                {t('stats.profit', { ns: 'home' })}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary-800">
                {t('stats.focused', { ns: 'home' })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
