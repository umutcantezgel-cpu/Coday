'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

import BlurText from '@/shared/ui/BlurText';
import { TestimonialBlock } from '@/shared/ui/TestimonialBlock';
import { FadeInUp } from '@/shared/ui/MotionWrappers';
import { GOOGLE_REVIEWS, REVIEWS_SUMMARY } from '@/shared/data/reviews';

export const TestimonialsSection: React.FC = () => {
  const t = useTranslations('home');
  const items = t.raw('testimonials.items') as Array<{
    quote: string;
    authorName: string;
    authorPosition: string;
    authorImageUrl?: string;
    authorCompany?: string;
  }>;

  const testimonials = items.map((item, idx) => ({
    quote: item.quote,
    authorName: item.authorName,
    authorPosition: item.authorPosition,
    authorImageUrl: item.authorImageUrl,
    authorCompany: item.authorCompany,
    companyLogoUrl: undefined,
    linkedInUrl: undefined,
    rating: 5,
    relativeTime: GOOGLE_REVIEWS[idx]?.relativeTime,
    badge: GOOGLE_REVIEWS[idx]?.badge,
  }));

  const reviewsSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.codayweb.de/#organization',
    name: 'Coday',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: REVIEWS_SUMMARY.ratingValue.toString(),
      reviewCount: REVIEWS_SUMMARY.reviewCount.toString(),
      bestRating: REVIEWS_SUMMARY.bestRating.toString(),
      worstRating: REVIEWS_SUMMARY.worstRating.toString(),
    },
    review: GOOGLE_REVIEWS.map((review) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      author: {
        '@type': 'Person',
        name: review.authorName,
      },
      datePublished: review.datePublished,
      reviewBody: review.quote.de,
    })),
  };

  return (
    <section className="py-[var(--space-section)] bg-surface-light relative overflow-hidden">
      <script
        id="testimonials-aggregated-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      <div className="absolute top-0 start-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Google Verified Reviews Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm text-slate-700 text-xs sm:text-sm font-medium mb-6">
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
            <span className="font-semibold text-slate-800">4 Google-Rezensionen</span>
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
          <p className="text-xl text-slate-700 font-light">{t('testimonials.text')}</p>
        </div>

        {Array.isArray(testimonials) && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeInUp key={index} delay={index * 0.1} duration={0.5} className="h-full">
                <TestimonialBlock
                  quote={testimonial.quote}
                  authorName={testimonial.authorName}
                  authorPosition={testimonial.authorPosition}
                  authorCompany={testimonial.authorCompany}
                  authorImageUrl={testimonial.authorImageUrl}
                  companyLogoUrl={testimonial.companyLogoUrl}
                  linkedInUrl={testimonial.linkedInUrl}
                  rating={testimonial.rating}
                  featured={index === 0 || index === 3}
                />
              </FadeInUp>
            ))}
          </div>
        )}

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex -space-x-4">
            {['B', 'Z', 'B', 'I'].map((initial, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full bg-white border-2 border-surface-light flex items-center justify-center text-sm font-bold text-primary shadow-sm"
              >
                {initial}
              </div>
            ))}
          </div>
          <div className="text-sm font-bold text-secondary text-center sm:text-left">
            {t('testimonials.rating')}
            <br />
            <span className="text-sapphire font-normal">{t('testimonials.excellence')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
