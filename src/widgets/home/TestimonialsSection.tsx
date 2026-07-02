import React from 'react';
import { useTranslations } from 'next-intl';

import BlurText from '@/shared/ui/BlurText';
import { TestimonialBlock } from '@/shared/ui/TestimonialBlock';
import dynamic from 'next/dynamic';
import { FadeInUp } from '@/shared/ui/MotionWrappers';

export const TestimonialsSection: React.FC = () => {
  const t = useTranslations('home');
  // Note: next-intl supports .raw() to get objects/arrays from the JSON
  const items = t.raw('testimonials.items') as Array<{
    quote: string;
    authorName: string;
    authorPosition: string;
    authorImageUrl?: string;
    authorCompany?: string;
  }>;

  const testimonials = items.map((item) => ({
    quote: item.quote,
    authorName: item.authorName,
    authorPosition: item.authorPosition,
    authorImageUrl: item.authorImageUrl,
    authorCompany: item.authorCompany,
    companyLogoUrl: undefined,
    linkedInUrl: undefined,
    rating: 5,
  }));

  return (
    <section className="py-[var(--space-section)] bg-surface-light relative overflow-hidden">
      <div className="absolute top-0 start-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-4xl lg:text-5xl mb-6 text-secondary leading-tight">
            <BlurText
              text={t('testimonials.title_prefix')}
              delay={100}
              animateBy="words"
              className="inline-block"
            />{' '}
            <span className="text-primary">{t('testimonials.title_suffix')}</span>
          </h2>
          <p className="text-xl text-slate-600 font-light">{t('testimonials.text')}</p>
        </div>

        {Array.isArray(testimonials) && testimonials.length > 0 && (
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 md:overflow-visible">
            {testimonials.map((testimonial, index) => (
              <FadeInUp
                key={index}
                delay={index * 0.15}
                duration={0.6}
                className="snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-auto h-full"
              >
                <TestimonialBlock
                  quote={testimonial.quote}
                  authorName={testimonial.authorName}
                  authorPosition={testimonial.authorPosition}
                  authorCompany={testimonial.authorCompany}
                  authorImageUrl={testimonial.authorImageUrl}
                  companyLogoUrl={testimonial.companyLogoUrl}
                  linkedInUrl={testimonial.linkedInUrl}
                  rating={testimonial.rating}
                  featured={index === 1}
                />
              </FadeInUp>
            ))}
          </div>
        )}

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex -space-x-4">
            {['A', 'M', 'H'].map((initial, i) => (
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
