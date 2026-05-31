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

      <div className="relative z-10 w-full max-w-[var(--container-narrow)] mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* LCP Element: Hero Headline */}
        <Typography
          variant="display"
          className="mb-6 text-text-primary uppercase drop-shadow-sm break-words sm:break-normal"
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
          <Typography variant="lead" className="mb-6 text-text-secondary max-w-2xl mx-auto">
            {t('hero.description')}
          </Typography>
        </FadeInUp>

        <FadeInUp delay={0.3} duration={0.6}>
          <div className="mb-10 min-h-[60px] flex items-center justify-center">
            {/* Mobile: lightweight CSS crossfade | Desktop: full RotatingText */}
            <span className="hidden md:inline-flex">
              <ClientRotatingText
                texts={t.raw('hero.rotating') as string[]}
                rotationInterval={3000}
                staggerFrom="first"
                staggerDuration={0.03}
                mainClassName="text-[var(--text-lead)] font-light text-text-secondary leading-relaxed justify-center text-center"
              />
            </span>
            <span className="md:hidden">
              <MobileRotatingText texts={t.raw('hero.rotating') as string[]} />
            </span>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.4} duration={0.6}>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Link
              href="/contact"
              className={cn(
                baseButtonStyles,
                buttonVariants.primary,
                buttonSizes.xl,
                'group shadow-brand-md hover:shadow-brand-lg min-w-[240px]'
              )}
            >
              <span className="relative z-10 flex items-center">
                {tCommon('buttons.start_project')}
                <ArrowRight className="ms-3 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform motion-reduce:duration-[0.01ms]" />
              </span>
            </Link>

            <Link
              href="/work"
              className={cn(baseButtonStyles, buttonVariants.ghost, buttonSizes.xl, 'group')}
            >
              <span className="font-semibold">
                {tCommon('buttons.contact').replace('Kontaktieren', 'Projekte ansehen')}
              </span>
            </Link>
          </div>
        </FadeInUp>
      </div>

      {/* Scroll Indicator */}
      <HeroScrollIndicator />
    </section>
  );
};
