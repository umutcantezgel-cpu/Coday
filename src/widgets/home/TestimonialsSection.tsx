import React from 'react';
import { useTranslations, useLocale } from 'next-intl';

import BlurText from '@/shared/ui/BlurText';
import { TestimonialBlock } from '@/shared/ui/TestimonialBlock';
import { FadeInUp } from '@/shared/ui/MotionWrappers';
import { GOOGLE_REVIEWS, PROVENEXPERT_REVIEWS, REVIEW_PROFILES } from '@/shared/data/reviews';
import { ReviewFilter } from '@/widgets/home/ReviewFilter';

/**
 * Server component: all eight review cards are rendered on the server.
 * The only client-side piece is the small ReviewFilter island, which toggles a
 * data-review-filter attribute on the grid wrapper; each card hides itself via
 * CSS when the active filter targets the other platform.
 */
export const TestimonialsSection: React.FC = () => {
  const t = useTranslations('home');
  const locale = useLocale();
  const isEn = locale === 'en';

  const allReviews = [...GOOGLE_REVIEWS, ...PROVENEXPERT_REVIEWS];

  return (
    <section className="py-[var(--space-section)] bg-surface-light relative overflow-hidden">
      <div className="absolute top-0 start-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Dual Verified Trust Badges: Google Maps & ProvenExpert */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
            <a
              href={REVIEW_PROFILES.googleMaps.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm text-slate-700 text-xs sm:text-sm font-medium hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
              title="Google Maps Rezensionen für Coday ansehen"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="font-bold text-slate-900">5,0 / 5,0</span>
              <span className="text-amber-500 tracking-wider">★★★★★</span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-800 group-hover:text-primary transition-colors">
                Google Maps (4 Rezensionen)
              </span>
            </a>

            <a
              href={REVIEW_PROFILES.provenExpert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm text-slate-700 text-xs sm:text-sm font-medium hover:border-emerald-500/50 hover:shadow-md transition-all duration-300 group"
              title="ProvenExpert Profil von Coday ansehen"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-900">5,0 / 5,0</span>
              <span className="text-amber-500 tracking-wider">★★★★★</span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                ProvenExpert (4 Bewertungen)
              </span>
            </a>
          </div>

          <h2 className="font-display font-black text-4xl lg:text-5xl mb-6 text-secondary leading-tight">
            <BlurText
              text={t('testimonials.title_prefix')}
              delay={100}
              animateBy="words"
              className="inline-block"
            />{' '}
            <span className="text-primary">{t('testimonials.title_suffix')}</span>
          </h2>
          <p className="text-xl text-slate-700 font-light max-w-2xl mx-auto">
            {isEn
              ? '100% authentic client reviews — dual-verified on Google Maps and ProvenExpert with 5.0 out of 5 stars.'
              : '100% echte Kundenstimmen — zweifach verifiziert auf Google Maps & ProvenExpert mit 5,0 von 5 Sternen.'}
          </p>

        </div>

        {/* Platform Filter Buttons (client island) + Reviews Grid (server-rendered, filtered via CSS) */}
        <ReviewFilter
          labels={{
            all: isEn ? 'All Reviews (8)' : 'Alle Bewertungen (8)',
            google: 'Google Maps (4)',
            provenexpert: 'ProvenExpert (4)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {allReviews.map((review, index) => (
              <div
                key={review.id}
                data-source={review.source === 'Google' ? 'google' : 'provenexpert'}
                className={
                  review.source === 'Google'
                    ? 'h-full [[data-review-filter=provenexpert]_&]:hidden'
                    : 'h-full [[data-review-filter=google]_&]:hidden'
                }
              >
                <FadeInUp delay={index * 0.08} duration={0.4} className="h-full">
                  <TestimonialBlock
                    quote={isEn ? review.quote.en : review.quote.de}
                    authorName={review.authorName}
                    authorPosition={review.authorPosition}
                    authorCompany={review.authorCompany}
                    rating={review.rating}
                    source={review.source}
                    sourceUrl={
                      review.source === 'Google'
                        ? REVIEW_PROFILES.googleMaps.url
                        : REVIEW_PROFILES.provenExpert.url
                    }
                    badge={review.badge}
                    relativeTime={review.relativeTime}
                    verified={review.verified}
                    featured={review.id === 'google-review-1' || review.id === 'google-review-4'}
                  />
                </FadeInUp>
              </div>
            ))}
          </div>
        </ReviewFilter>

        {/* Footer Authority Bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex -space-x-3">
            {allReviews.map((rev, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-white border-2 border-surface-light flex items-center justify-center text-xs font-bold text-primary shadow-sm"
                title={rev.authorName}
              >
                {rev.authorName.charAt(0)}
              </div>
            ))}
          </div>
          <div className="text-sm font-bold text-secondary text-center sm:text-left">
            <span>5,0 / 5,0 Sterne · 100% Weiterempfehlung</span>
            <br />
            <span className="text-sapphire font-normal flex items-center gap-3 mt-1 justify-center sm:justify-start">
              <a
                href={REVIEW_PROFILES.googleMaps.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary text-xs"
              >
                Google Maps Profil (4 Rezensionen) ↗
              </a>
              <span>•</span>
              <a
                href={REVIEW_PROFILES.provenExpert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary text-xs"
              >
                ProvenExpert Profil (4 Bewertungen) ↗
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
