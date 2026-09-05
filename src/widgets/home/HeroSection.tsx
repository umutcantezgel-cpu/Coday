import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import GradientText from '@/shared/ui/GradientText';
import { cn } from '@/shared/lib/utils';
import { LazyQuickContactForm } from './LazyQuickContactForm';
import { MobileQuickContact } from './MobileQuickContact';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Briefcase } from '@phosphor-icons/react/dist/ssr';
import { baseButtonStyles, buttonVariants, buttonSizes } from '@/shared/ui/ButtonStyles';

import { MobileRotatingText } from './MobileRotatingText';

import { ClientRotatingText } from './ClientRotatingText';

export const HeroSection: React.FC = () => {
  const t = useTranslations('home');
  const locale = useLocale();
  const isEn = locale === 'en';

  return (
    <section className="relative w-full overflow-x-hidden bg-bg-primary px-4 pt-2 pb-8 md:pt-4 md:pb-12">
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start lg:items-center">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Dual Verified Review Authority Links (Above-the-Fold Trust Kicker) */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4 lg:mb-5">
            <a
              href="https://www.google.com/maps?cid=8570940562624494590"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-800 hover:border-amber-400 hover:bg-amber-50/50 hover:shadow-sm transition-all group cursor-pointer"
              title="Google Maps Rezensionen für Coday ansehen"
            >
              <span className="text-amber-500">★★★★★</span>
              <span className="font-bold">5.0</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600 group-hover:text-amber-900 transition-colors">
                4 Google-Rezensionen
              </span>
            </a>
            <a
              href="https://www.provenexpert.com/de-de/coday-webagentur/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-800 hover:border-emerald-500 hover:bg-emerald-50/50 hover:shadow-sm transition-all group cursor-pointer"
              title="ProvenExpert Profil von Coday ansehen"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold">5.0</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600 group-hover:text-emerald-800 transition-colors">
                ProvenExpert
              </span>
            </a>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] tracking-tight text-text-primary mb-4 lg:mb-5 leading-[1.1] lg:leading-[1.05]">
            {t('hero.headline_prefix')} <br />
            <GradientText
              colors={[
                'var(--color-primary-600)',
                'var(--color-secondary-800)',
                'var(--color-primary-600)',
              ]}
              animationSpeed={8}
              showBorder={false}
              className="inline-block mt-1 lg:mt-0"
            >
              {t('hero.headline_gradient')}
            </GradientText>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg md:text-xl font-light text-text-secondary leading-relaxed mb-4 lg:mb-5">
            {t('hero.description')}
          </p>

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

          {/* Mobile Only CTAs.

              The desktop column to the right carries the contact form; below
              1024px it is not rendered at all, so the lowest-commitment action
              leads here instead. Booking a call and browsing work both ask more
              of a first-time visitor than two fields do, so they sit underneath
              as compact outlines rather than competing for the same emphasis. */}
          <div className="mt-8 flex flex-col w-full gap-3 lg:hidden">
            <MobileQuickContact />
            <Link
              href="/booking"
              className={cn(
                baseButtonStyles,
                buttonVariants['outline'],
                buttonSizes['md'],
                'w-full justify-center text-sm'
              )}
            >
              <span>{isEn ? 'Book Strategy Call' : 'Online-Termin buchen'}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/work"
              className={cn(
                baseButtonStyles,
                buttonVariants['outline'],
                buttonSizes['md'],
                'w-full justify-center text-sm'
              )}
            >
              <Briefcase className="w-4 h-4 mr-2" />
              {t('hero.view_projects')}
            </Link>
          </div>
        </div>

        {/* Right Column: Quick Contact Form (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:col-span-5 justify-end mt-8 lg:mt-0 relative">
          {/* `hidden lg:flex` only hid the markup — below 1024px the form was
              still rendered and hydrated. Mobile gets its own CTAs above, so
              skipping it entirely costs nothing. */}
          <LazyQuickContactForm desktopOnly />
        </div>
      </div>
    </section>
  );
};
