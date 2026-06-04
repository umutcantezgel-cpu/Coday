import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/shared/ui/Button';
import GradientText from '@/shared/ui/GradientText';
import { cn } from '@/shared/lib/utils';
import dynamic from 'next/dynamic';

// Removed FadeInUp to optimize LCP
import { MobileRotatingText } from './MobileRotatingText';

const ClientRotatingText = dynamic(() =>
  import('./ClientRotatingText').then((m) => m.ClientRotatingText)
);

export const HeroSection: React.FC = () => {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  return (
    <section className="relative w-full min-h-[85svh] flex flex-col items-center justify-center overflow-x-hidden bg-bg-primary text-center px-4 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Eyebrow Tag */}
        <div className="w-full flex justify-center">
          <div className="mb-10 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 backdrop-blur-md text-text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            {t('hero.eyebrow', { defaultValue: 'High-End Digital Agency' })}
          </div>
        </div>

        {/* Huge Typography, Text perfectly centered, max 2-3 lines */}
        <div className="w-full">
          <h1 className="max-w-5xl mx-auto text-center font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-text-primary mb-8">
            {t('hero.headline_prefix')} <br />
            <GradientText
              colors={[
                'var(--color-primary-600)',
                'var(--color-secondary-800)',
                'var(--color-primary-600)',
              ]}
              animationSpeed={8}
              showBorder={false}
              className="inline-block"
            >
              {t('hero.headline_gradient')}
            </GradientText>
          </h1>
        </div>

        <div className="w-full">
          <p className="max-w-2xl mx-auto text-center text-base sm:text-lg md:text-xl font-light text-text-secondary leading-relaxed mb-8">
            {t('hero.description')}
          </p>
        </div>

        <div className="w-full">
          <div className="min-h-[60px] w-full max-w-3xl flex items-center justify-center text-center mb-10 mx-auto px-4">
            <span className="hidden md:inline-flex w-full justify-center">
              <ClientRotatingText
                texts={t.raw('hero.rotating') as string[]}
                rotationInterval={3000}
                staggerFrom="first"
                staggerDuration={0.03}
                mainClassName="text-lg md:text-xl font-medium text-primary-600 dark:text-primary-400 leading-relaxed justify-center text-center"
              />
            </span>
            <span className="md:hidden block w-full text-primary-600 dark:text-primary-400 font-medium text-center text-base break-words hyphens-auto">
              <MobileRotatingText texts={t.raw('hero.rotating') as string[]} />
            </span>
          </div>
        </div>

        {/* 2 High-Contrast CTAs */}
        <div className="w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full px-6 sm:px-0">
            <Link href="/contact" className="group w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 py-4 sm:py-3.5 flex items-center justify-center gap-3 transition-transform duration-[160ms] ease-out active:scale-[0.97] shadow-lg shadow-primary-500/20"
              >
                <span className="font-semibold text-[15px] sm:text-base tracking-wide">
                  {tCommon('buttons.start_project')}
                </span>
                <ArrowRight
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            </Link>

            <Link href="/work" className="group w-full sm:w-auto">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 py-4 sm:py-3.5 flex items-center justify-center transition-transform duration-[160ms] ease-out active:scale-[0.97] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
              >
                <span className="font-medium text-[15px] sm:text-base tracking-wide text-text-primary">
                  {t('hero.view_projects', { defaultValue: 'Projekte ansehen' })}
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
