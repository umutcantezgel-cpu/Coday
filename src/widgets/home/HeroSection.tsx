import React from 'react';
import { useTranslations } from 'next-intl';
import GradientText from '@/shared/ui/GradientText';
import { cn } from '@/shared/lib/utils';
import { LazyQuickContactForm } from './LazyQuickContactForm';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Briefcase } from '@phosphor-icons/react/dist/ssr';
import { baseButtonStyles, buttonVariants, buttonSizes } from '@/shared/ui/ButtonStyles';

import { MobileRotatingText } from './MobileRotatingText';

import { ClientRotatingText } from './ClientRotatingText';

export const HeroSection: React.FC = () => {
  const t = useTranslations('home');

  return (
    <section className="relative w-full min-h-[85svh] flex flex-col justify-center overflow-x-hidden bg-bg-primary px-4 pt-12 pb-12 md:pt-24 md:pb-24">
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

          <p className="max-w-2xl text-base sm:text-lg md:text-xl font-light text-text-secondary leading-relaxed mb-6">
            {t('hero.description')}
          </p>

          {/* Dual Verified Review Authority Links */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <a
              href="https://maps.app.goo.gl/9SagecgXw7Vf5csH7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-800 hover:border-amber-400 hover:shadow transition-all group"
              title="Google Maps Rezensionen für Coday ansehen"
            >
              <span className="text-amber-500">★★★★★</span>
              <span className="font-bold">5.0</span>
              <span className="text-slate-400">·</span>
              <span className="group-hover:text-amber-700 transition-colors">Google Maps</span>
            </a>
            <a
              href="https://www.provenexpert.com/de-de/coday-webagentur/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-800 hover:border-emerald-500 hover:shadow transition-all group"
              title="ProvenExpert Profil von Coday ansehen"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-amber-500">★★★★★</span>
              <span className="font-bold">5.0</span>
              <span className="text-slate-400">·</span>
              <span className="group-hover:text-emerald-700 transition-colors">
                ProvenExpert (100%)
              </span>
            </a>
          </div>

          <div className="min-h-[60px] w-full flex items-center justify-start mb-4 lg:mb-0">
            <span className="hidden md:inline-flex w-full justify-start">
              <ClientRotatingText
                texts={t.raw('hero.rotating') as string[]}
                rotationInterval={3000}
                splitBy="words"
                staggerFrom="first"
                staggerDuration={0.05}
                mainClassName="text-lg md:text-xl font-semibold text-primary-700 leading-relaxed justify-start text-left"
              />
            </span>
            <span className="md:hidden block w-full text-primary-700 font-semibold text-left text-base break-words hyphens-auto">
              <MobileRotatingText texts={t.raw('hero.rotating') as string[]} />
            </span>
          </div>

          {/* Mobile Only CTAs */}
          <div className="mt-8 flex flex-col w-full gap-3 lg:hidden">
            <Link
              href="/booking"
              className={cn(
                baseButtonStyles,
                buttonVariants['primary'],
                buttonSizes['lg'],
                'w-full justify-center text-base'
              )}
            >
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/work"
              className={cn(
                baseButtonStyles,
                buttonVariants['outline'],
                buttonSizes['lg'],
                'w-full justify-center text-base'
              )}
            >
              <Briefcase className="w-5 h-5 mr-2" />
              {t('hero.view_projects')}
            </Link>
          </div>
        </div>

        {/* Right Column: Quick Contact Form (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:col-span-5 justify-end mt-8 lg:mt-0 relative">
          <LazyQuickContactForm />
        </div>
      </div>
    </section>
  );
};
