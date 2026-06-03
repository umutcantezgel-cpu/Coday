import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import GradientText from '@/shared/ui/GradientText';
import { cn } from '@/shared/lib/utils';
import { baseButtonStyles, buttonVariants, buttonSizes } from '@/shared/ui/ButtonStyles';
import Typography from '@/shared/ui/Typography';
import dynamic from 'next/dynamic';

import { MobileRotatingText } from './MobileRotatingText';
import { HeroScrollIndicator } from './HeroScrollIndicator';
import { FadeInUp } from '@/shared/ui/MotionWrappers';
const ClientRotatingText = dynamic(() =>
  import('./ClientRotatingText').then((m) => m.ClientRotatingText)
);
export const HeroSection: React.FC = () => {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  return (
    <section className="py-[var(--space-section)] relative min-h-[100svh] overflow-hidden bg-bg-primary flex items-center justify-center text-center">
      {/* Background Gradient & Noise */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary pointer-events-none"></div>
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      ></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        {/* Left: Typography */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          {/* LCP Element: Hero Headline */}
          <Typography
            variant="display"
            className="mb-[var(--space-gap)] text-text-primary drop-shadow-sm break-words sm:break-normal text-left text-balance"
          >
            {t('hero.headline_prefix')} <br className="hidden sm:block" />
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
          </Typography>

          <FadeInUp delay={0.2} duration={0.6}>
            <Typography
              variant="lead"
              className="mb-[var(--space-gap)] text-text-secondary text-left max-w-lg text-pretty"
            >
              {t('hero.description')}
            </Typography>
          </FadeInUp>

          <FadeInUp delay={0.3} duration={0.6}>
            <div className="min-h-[60px] flex items-start justify-start text-left mb-[calc(var(--space-gap)*1.5)]">
              <span className="hidden md:inline-flex">
                <ClientRotatingText
                  texts={t.raw('hero.rotating') as string[]}
                  rotationInterval={3000}
                  staggerFrom="first"
                  staggerDuration={0.03}
                  mainClassName="text-[var(--text-lead)] font-light text-text-secondary leading-relaxed justify-start text-left"
                />
              </span>
              <span className="md:hidden">
                <MobileRotatingText texts={t.raw('hero.rotating') as string[]} />
              </span>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.4} duration={0.6}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start w-full gap-[var(--space-gap)]">
              <Link
                href="/contact"
                className={cn(
                  baseButtonStyles,
                  buttonVariants.primary,
                  buttonSizes.xl,
                  'group shadow-brand-md hover:shadow-brand-lg w-full sm:w-auto text-center'
                )}
              >
                <span className="relative z-10 flex items-center justify-center w-full">
                  {tCommon('buttons.start_project')}
                  <div className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center ml-3 transition-transform motion-reduce:duration-[0.01ms] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </span>
              </Link>

              <Link
                href="/work"
                className={cn(
                  baseButtonStyles,
                  buttonVariants.ghost,
                  buttonSizes.xl,
                  'group w-full sm:w-auto text-center'
                )}
              >
                <span className="font-semibold text-center w-full">
                  {tCommon('buttons.contact').replace('Kontaktieren', 'Projekte ansehen')}
                </span>
              </Link>
            </div>
          </FadeInUp>
        </div>

        {/* Right: Interactive Staggered Cards (Editorial Split / Asymmetrical Bento feel) */}
        <div className="w-full md:w-1/2 relative h-[400px] sm:h-[500px] flex items-center justify-center" aria-hidden="true">
          {/* Main Card (Double Bezel) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[320px] bg-black/5 p-2 rounded-[2rem] shadow-xl z-20">
            <div className="bg-white p-6 rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xl font-bold">
                {'</>'}
              </div>
              <div>
                <p className="font-display font-bold text-xl text-secondary-900">
                  Instant Load Times
                </p>
                <p className="text-sm text-secondary-600 mt-2">
                  Server components delivering pages in under 50ms.
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Card (Overlapping, Z-Axis Cascade) */}
          <div className="absolute top-[10%] sm:top-[20%] right-[5%] sm:right-[10%] w-[200px] bg-white/5 p-1.5 rounded-[1.5rem] shadow-lg -rotate-[3deg] z-10 hidden sm:block backdrop-blur-md">
            <div className="bg-slate-50 p-4 rounded-[calc(1.5rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
                <span className="text-sm font-bold text-slate-800">100/100 Core Web</span>
              </div>
            </div>
          </div>

          {/* Tertiary Card (Overlapping, Z-Axis Cascade) */}
          <div className="absolute bottom-[5%] sm:bottom-[15%] left-[5%] sm:left-[10%] w-[220px] bg-black/5 p-1.5 rounded-[1.5rem] shadow-lg rotate-[2deg] z-30 hidden sm:block backdrop-blur-md">
            <div className="bg-white p-4 rounded-[calc(1.5rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] border border-slate-100">
              <p className="text-xs font-semibold text-slate-500 tracking-wider mb-1">
                Total JS Shipped
              </p>
              <p className="text-2xl font-bold text-primary-600">&lt; 85 KB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <HeroScrollIndicator />
    </section>
  );
};
