import React from 'react';
import { useTranslations } from 'next-intl';
import BlurText from '@/shared/ui/BlurText';
import { FadeInUp } from '@/shared/ui/MotionWrappers';
import { InteractivePhilosophyVisual } from './InteractivePhilosophyVisual';

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
          <FadeInUp className="relative flex justify-center lg:justify-end perspective-1000">
            {/* Organic shape backdrop replaced with a subtle tech glow inside the component */}
            <InteractivePhilosophyVisual />
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};
