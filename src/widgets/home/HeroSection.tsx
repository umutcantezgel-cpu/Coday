import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, RocketLaunch as Rocket, CaretDown, Mouse } from '@phosphor-icons/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import GradientText from '@/shared/ui/GradientText';
import { cn } from '@/shared/lib/utils';
import { baseButtonStyles, buttonVariants, buttonSizes } from '@/shared/ui/ButtonStyles';
import MetaBalls from '@/shared/ui/MetaBalls';

// Lazy-load RotatingText (heavy: motion/react dependency) — only for desktop
const RotatingText = React.lazy(() => import('@/shared/ui/RotatingText'));

// Lightweight mobile text rotator — pure CSS, no motion/react
const MobileRotatingText: React.FC<{ texts: string[] }> = ({ texts }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % texts.length), 3000);
    return () => clearInterval(id);
  }, [texts.length]);
  return (
    <span
      key={index}
      className="inline-block animate-fade-in-up text-lg sm:text-xl font-light text-text-secondary leading-relaxed"
    >
      {texts[index]}
    </span>
  );
};

export const HeroSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 300], [0.6, 0]);

  return (
    <section className="relative min-h-[100svh] pt-24 pb-20 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40 overflow-hidden bg-bg-primary flex items-center">
      {/* Background Gradient & Noise */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-accent/20 pointer-events-none"></div>
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      ></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* CONTENT COLUMN (61.8% -> md:col-span-7) */}
          <div className="md:col-span-7 text-left flex flex-col justify-center relative z-10 before:absolute before:-inset-8 before:bg-bg-primary/40 before:backdrop-blur-md before:rounded-[3rem] before:-z-10 before:hidden md:before:block">
            <div className="inline-flex mb-6 relative">
              <span className="bg-white/90 dark:bg-black/60 backdrop-blur-xl border border-black/10 dark:border-white/20 text-text-primary text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                <span className="bg-primary-600 text-white rounded-full p-0.5">
                  <OptimizedIcon icon={Rocket} size="sm" className="w-[14px] h-[14px]" />
                </span>
                {t('hero.badge')}
              </span>
            </div>

            {/* LCP Element: Hero Headline */}
            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[clamp(4rem,8vw,6.854rem)] tracking-tighter leading-[1.1] mb-6 text-text-primary uppercase drop-shadow-sm">
              {t('hero.headline_prefix')} <br className="hidden md:block" />
              <GradientText
                colors={[
                  'var(--color-primary-600)',
                  'var(--color-secondary-800)',
                  'var(--color-primary-600)',
                ]}
                animationSpeed={8}
                showBorder={false}
                className="inline-block [filter:drop-shadow(0_4px_12px_rgba(0,0,0,0.15))] [text-shadow:0_2px_15px_rgba(13,148,136,0.25)] dark:[filter:drop-shadow(0_4px_12px_rgba(255,255,255,0.15))] dark:[text-shadow:0_2px_15px_rgba(13,148,136,0.4)]"
              >
                {t('hero.headline_gradient')}
              </GradientText>
            </h1>

            <p
              className="animate-fade-in-up text-lg md:text-xl text-text-secondary mb-6 max-w-2xl leading-relaxed"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              {t('hero.description')}
            </p>

            <div
              className="animate-fade-in-up max-w-2xl mb-10 min-h-[60px] flex items-center justify-start"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              {/* Mobile: lightweight CSS crossfade | Desktop: full RotatingText */}
              <span className="hidden md:inline-flex">
                <React.Suspense
                  fallback={
                    <span className="text-xl lg:text-[1.618rem] font-light text-text-secondary leading-relaxed">
                      {(t('hero.rotating', { returnObjects: true }) as string[])[0]}
                    </span>
                  }
                >
                  <RotatingText
                    texts={t('hero.rotating', { returnObjects: true }) as string[]}
                    rotationInterval={3000}
                    staggerFrom="first"
                    staggerDuration={0.03}
                    mainClassName="text-xl lg:text-[1.618rem] font-light text-text-secondary leading-relaxed justify-start text-left"
                  />
                </React.Suspense>
              </span>
              <span className="md:hidden">
                <MobileRotatingText
                  texts={t('hero.rotating', { returnObjects: true }) as string[]}
                />
              </span>
            </div>

            <div
              className="animate-fade-in-up flex flex-col sm:flex-row items-start sm:items-center gap-5"
              style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            >
              <NavLink
                to="/packages"
                className={cn(
                  baseButtonStyles,
                  buttonVariants.primary,
                  buttonSizes.lg,
                  'group relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-primary-600/25 hover:scale-[1.02] active:scale-95 focus-visible:ring-4 focus-visible:ring-primary-500/50 min-h-[56px] min-w-[220px] justify-center'
                )}
              >
                <span className="relative z-10 flex items-center font-bold text-lg">
                  {t('buttons.start_project', { ns: 'common' })}
                  <ArrowRight className="ms-2 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </span>
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              </NavLink>

              <NavLink
                to="/contact"
                className={cn(
                  baseButtonStyles,
                  buttonVariants.secondary,
                  buttonSizes.lg,
                  'group border border-border-strong bg-white/60 dark:bg-black/60 backdrop-blur-md text-text-primary hover:bg-white/90 dark:hover:bg-black/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 min-h-[56px] px-8 focus-visible:ring-4 focus-visible:ring-border-strong/50 transition-all'
                )}
              >
                <span className="font-semibold text-lg">
                  {t('buttons.contact', {
                    ns: 'common',
                    defaultValue: t('buttons.view_work', { ns: 'common' }),
                  })}
                </span>
              </NavLink>
            </div>
          </div>

          {/* VISUAL COLUMN (38.2% -> md:col-span-5) */}
          <div className="md:col-span-5 h-[400px] md:h-[600px] relative w-full flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity duration-700">
            {/* Organic MetaBalls Animation */}
            <div className="absolute inset-0 z-0 scale-110 md:scale-125">
              <MetaBalls
                color="var(--color-primary-600)"
                cursorBallColor="var(--color-accent-500)"
                ballCount={5}
                speed={1.2}
                enableCursor={true}
                className="opacity-70 dark:opacity-50"
              />
            </div>
            {/* Glassmorphism Overlay Element (Optional anchor for visual weight) */}
            <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/20 dark:border-black/20 bg-white/10 dark:bg-black/10 backdrop-blur-xl shadow-2xl flex items-center justify-center animate-float">
              <OptimizedIcon
                icon={Rocket}
                weight="duotone"
                className="w-20 h-20 md:w-28 md:h-28 text-primary-700 dark:text-primary-400 drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: scrollOpacity }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce hover:opacity-100 transition-opacity z-20"
      >
        <OptimizedIcon icon={Mouse} className="w-6 h-6 text-text-secondary" />
        <OptimizedIcon icon={CaretDown} className="w-4 h-4 text-text-secondary" />
      </motion.div>

      {/* Hero to Content Transition SVG */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10">
        <svg
          aria-hidden="true"
          focusable="false"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[80px]"
        >
          <path d="M1200 120L0 16.48V0h1200v120z" className="fill-bg-secondary" />
        </svg>
      </div>
    </section>
  );
};
