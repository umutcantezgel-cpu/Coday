import React from 'react';
import { useTranslations } from 'next-intl';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import BlurText from '@/shared/ui/BlurText';
import dynamic from 'next/dynamic';
import { FadeInUp } from '@/shared/ui/MotionWrappers';

export const PhilosophySection: React.FC = () => {
  const t = useTranslations('home');

  return (
    <section className="py-[var(--space-section)] bg-surface-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <FadeInUp className="text-left">
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
          </FadeInUp>
          <FadeInUp className="relative">
            {/* Organic shape backdrop */}
            <div className="absolute inset-0 bg-primary/10 rounded-[2rem] transform rotate-3 scale-95"></div>
            <OptimizedImage
              src="/images/hero/business-handshake-partnerschaft-tuer-offen-zusammenarbeit-vertrauen-small.webp"
              alt={t('images.trust_collaboration', { ns: 'home' })}
              className="relative rounded-[2rem] shadow-flat-lg bg-white p-2 transform -rotate-2 hover:rotate-0 transition motion-reduce:duration-[0.01ms] duration-500 w-full max-w-[150px] mx-auto lg:mx-0"
              width={96}
              height={96}
            />
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};
