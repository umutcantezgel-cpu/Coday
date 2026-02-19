import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as NavLink } from 'react-router-dom';
import { ArrowRight, RocketLaunch as Rocket } from '@phosphor-icons/react';
import { OptimizedIcon } from '../../shared/ui/OptimizedIcon';
import GradientText from '../../shared/ui/GradientText';
import { cn } from '../../shared/lib/utils';
import { baseButtonStyles, buttonVariants, buttonSizes } from '../../shared/ui/ButtonStyles';

// Lazy-load RotatingText (heavy: motion/react dependency) — only for desktop
const RotatingText = React.lazy(() => import('../../shared/ui/RotatingText'));

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
      className="inline-block animate-fade-in-up text-xl sm:text-2xl font-light text-slate-700 leading-relaxed"
    >
      {texts[index]}
    </span>
  );
};

export const HeroSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);

  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-40 lg:pt-48 lg:pb-60 overflow-hidden bg-background-light">
      {/* Organic Background Shapes */}
      <div className="absolute top-0 end-0 -translate-y-1/4 translate-x-1/4 rtl:-translate-x-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 start-0 translate-y-1/4 -translate-x-1/4 rtl:translate-x-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none animate-float"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-6 animate-fade-in-up">
          <span className="bg-white/80 backdrop-blur-md border border-white/50 text-secondary text-sm font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
            <span className="bg-primary text-white rounded-full p-0.5">
              <OptimizedIcon icon={Rocket} size="sm" className="w-[14px] h-[14px]" />
            </span>
            {t('hero.badge')}
          </span>
        </div>
        <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none mb-8 text-secondary uppercase drop-shadow-sm">
          {t('hero.headline_prefix')} <br className="hidden md:block" />
          <GradientText
            colors={['#147a7a', '#2D3748', '#147a7a']}
            animationSpeed={8}
            showBorder={false}
            className="inline-block"
          >
            {t('hero.headline_gradient')}
          </GradientText>
        </h1>
        <div className="max-w-3xl mx-auto mb-12 min-h-[60px] flex items-center justify-center">
          {/* Mobile: lightweight CSS crossfade | Desktop: full RotatingText */}
          <span className="hidden md:inline-flex">
            <React.Suspense
              fallback={
                <span className="text-xl sm:text-2xl font-light text-slate-700">
                  {(t('hero.rotating', { returnObjects: true }) as string[])[0]}
                </span>
              }
            >
              <RotatingText
                texts={t('hero.rotating', { returnObjects: true }) as string[]}
                rotationInterval={3000}
                staggerFrom="first"
                staggerDuration={0.03}
                mainClassName="text-xl sm:text-2xl font-light text-slate-700 leading-relaxed justify-center"
              />
            </React.Suspense>
          </span>
          <span className="md:hidden">
            <MobileRotatingText texts={t('hero.rotating', { returnObjects: true }) as string[]} />
          </span>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <NavLink
            to="/packages"
            className={cn(
              baseButtonStyles,
              buttonVariants.primary,
              buttonSizes.lg,
              'group relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 active:shadow-sm'
            )}
          >
            <span className="relative z-10 flex items-center">
              {t('buttons.start_project', { ns: 'common' })}
              <ArrowRight className="ms-2 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </span>
            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
          </NavLink>

          <NavLink
            to="/contact"
            className={cn(
              baseButtonStyles,
              buttonVariants.secondary,
              buttonSizes.lg,
              'group border border-gray-200 bg-white text-secondary hover:bg-gray-50 hover:border-primary/50 shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95 active:shadow-sm'
            )}
          >
            {t('buttons.contact', {
              ns: 'common',
              defaultValue: t('buttons.view_work', { ns: 'common' }),
            })}
          </NavLink>
        </div>
      </div>
    </section>
  );
};
