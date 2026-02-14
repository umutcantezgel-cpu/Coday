import React from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '@phosphor-icons/react';
import { OptimizedIcon } from '../../shared/ui/OptimizedIcon';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import BlurText from '../../shared/ui/BlurText';

export const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation(['home']);

  return (
    <section className="py-12 md:py-24 bg-surface-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute top-0 start-0 w-24 h-24 bg-accent/20 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2"></div>
            <OptimizedImage
              src="/images/services/drei-kunden-reviews.webp"
              alt={t('images.satisfied_partners', { ns: 'home' })}
              className="relative rounded-3xl shadow-flat-lg w-full bg-white p-2"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-display font-black text-3xl lg:text-5xl mb-8 text-secondary leading-tight">
              <BlurText
                text={t('testimonials.title_prefix')}
                delay={100}
                animateBy="words"
                className="block"
              />{' '}
              <span className="text-primary">{t('testimonials.title_suffix')}</span>
            </h2>
            <p className="text-xl text-slate-600 mb-8 font-light">{t('testimonials.text')}</p>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-surface-dark border-2 border-white flex items-center justify-center text-xs font-bold text-secondary shadow-sm overflow-hidden"
                  >
                    <OptimizedIcon icon={User} className="text-white w-6 h-6" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-bold text-secondary">
                {t('testimonials.rating')}
                <br />
                <span className="text-primary font-normal">{t('testimonials.excellence')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
