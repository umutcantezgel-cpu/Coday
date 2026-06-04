import React from 'react';
import { useTranslations } from 'next-intl';
import GradientText from '@/shared/ui/GradientText';
import { cn } from '@/shared/lib/utils';
import dynamic from 'next/dynamic';
import { GamifiedHeroCta } from './GamifiedHeroCta';

import { MobileRotatingText } from './MobileRotatingText';

const ClientRotatingText = dynamic(() =>
  import('./ClientRotatingText').then((m) => m.ClientRotatingText)
);

export const HeroSection: React.FC = () => {
  const t = useTranslations('home');

  return (
    <section className="relative w-full min-h-[85svh] flex flex-col justify-center overflow-x-hidden bg-bg-primary px-4 pt-16 pb-16 md:pt-24 md:pb-24">
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] tracking-tight text-text-primary mb-6 lg:mb-8 leading-[1.1] lg:leading-[1.05]">
            {t('hero.headline_prefix')} <br />
            <GradientText
              colors={[
                'var(--color-primary-600)',
                'var(--color-secondary-800)',
                'var(--color-primary-600)',
              ]}
              animationSpeed={8}
              showBorder={false}
              className="inline-block mt-2 lg:mt-0"
            >
              {t('hero.headline_gradient')}
            </GradientText>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg md:text-xl font-light text-text-secondary leading-relaxed mb-8">
            {t('hero.description')}
          </p>

          <div className="min-h-[60px] w-full flex items-center justify-start mb-4 lg:mb-0">
            <span className="hidden md:inline-flex w-full justify-start">
              <ClientRotatingText
                texts={t.raw('hero.rotating') as string[]}
                rotationInterval={3000}
                staggerFrom="first"
                staggerDuration={0.03}
                mainClassName="text-lg md:text-xl font-medium text-primary-600 dark:text-primary-400 leading-relaxed justify-start text-left"
              />
            </span>
            <span className="md:hidden block w-full text-primary-600 dark:text-primary-400 font-medium text-left text-base break-words hyphens-auto">
              <MobileRotatingText texts={t.raw('hero.rotating') as string[]} />
            </span>
          </div>
        </div>

        {/* Right Column: Gamified C-Slider */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <GamifiedHeroCta />
        </div>
      </div>
    </section>
  );
};
