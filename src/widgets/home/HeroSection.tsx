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
        <div className="w-full">
          <div className="mb-10 rounded-full px-5 py-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium bg-white/5 dark:bg-black/20 border border-black/5 dark:border-white/10 backdrop-blur-md shadow-sm">
            {t('hero.eyebrow', { defaultValue: 'High-End Digital Agency' })}
          </div>
        </div>

        {/* Huge Typography, Text perfectly centered, max 2-3 lines */}
        {/* Huge Typography, Text perfectly centered, max 2-3 lines */}
        <div className="w-full">
          <h1 className="max-w-5xl font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-text-primary mb-8">
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
          <p className="max-w-2xl text-[var(--text-lead)] font-light text-text-secondary leading-relaxed mb-6 mx-auto">
            {t('hero.description')}
          </p>
        </div>

        <div className="w-full">
          <div className="min-h-[60px] w-full max-w-3xl flex items-center justify-center text-center mb-8 mx-auto px-4">
            <span className="hidden md:inline-flex w-full justify-center">
              <ClientRotatingText
                texts={t.raw('hero.rotating') as string[]}
                rotationInterval={3000}
                staggerFrom="first"
                staggerDuration={0.03}
                mainClassName="text-[var(--text-lead)] font-medium text-primary-600 dark:text-primary-400 leading-relaxed justify-center text-center"
              />
            </span>
            <span className="md:hidden block w-full text-primary-600 dark:text-primary-400 font-medium text-center break-words hyphens-auto">
              <MobileRotatingText texts={t.raw('hero.rotating') as string[]} />
            </span>
          </div>
        </div>

        {/* 2 High-Contrast CTAs */}
        <div className="w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
            <Link href="/contact" className="group w-full sm:w-auto">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto rounded-[2rem] pl-8 pr-2 py-4 sm:py-3 flex items-center justify-between sm:justify-center gap-4 transition-transform duration-[160ms] ease-out active:scale-[0.97]"
              >
                <span className="font-bold text-lg">{tCommon('buttons.start_project')}</span>
                {/* Nested Button-in-Button Trailing Icon */}
                <div className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/20 flex items-center justify-center transition-all duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                  <ArrowRight className="w-5 h-5 text-current" aria-hidden="true" />
                </div>
              </Button>
            </Link>
            
            <Link href="/work" className="group w-full sm:w-auto">
              <Button 
                variant="ghost" 
                size="lg" 
                className="w-full sm:w-auto rounded-[2rem] px-8 py-4 sm:py-3 transition-transform duration-[160ms] ease-out active:scale-[0.97] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
              >
                <span className="font-semibold text-lg">{t('hero.view_projects', { defaultValue: 'Projekte ansehen' })}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
