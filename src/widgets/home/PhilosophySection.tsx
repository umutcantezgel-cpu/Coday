import React from 'react';
import { useTranslation } from 'react-i18next';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import BlurText from '../../shared/ui/BlurText';

export const PhilosophySection: React.FC = () => {
  const { t } = useTranslation(['home']);

  return (
    <section className="py-12 md:py-24 bg-surface-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-display font-black text-3xl lg:text-5xl mb-8 leading-tight text-secondary">
              <BlurText
                text={t('philosophy.traditional')}
                delay={100}
                animateBy="words"
                className="block"
              />{' '}
              <span className="text-primary">{t('philosophy.history')}</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>{t('philosophy.text_overhead')}</p>
              <p>
                <strong className="text-secondary font-bold">{t('philosophy.standard')}</strong>{' '}
                {t('philosophy.text_standard')}
              </p>
            </div>
          </div>
          <div className="relative">
            {/* Organic shape backdrop */}
            <div className="absolute inset-0 bg-primary/10 rounded-[2rem] transform rotate-3 scale-95"></div>
            <OptimizedImage
              src="/images/hero/business-handshake-partnerschaft-tuer-offen-zusammenarbeit-vertrauen.webp"
              alt={t('images.trust_collaboration', { ns: 'home' })}
              className="relative rounded-[2rem] shadow-flat-lg bg-white p-2 transform -rotate-2 hover:rotate-0 transition-all duration-500 w-full"
              priority
              width={1920}
              height={1072}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
