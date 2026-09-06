'use client';
import React from 'react';
import { m } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { ArrowRight, RocketLaunch } from '@phosphor-icons/react/dist/ssr';
import GradientText from '@/shared/ui/GradientText';

interface GlobalCTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const GlobalCTA: React.FC<GlobalCTAProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink = '/contact',
}) => {
  const t = useTranslations('ui');

  return (
    <section className="py-[var(--space-section)] relative overflow-hidden bg-secondary text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[50%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-[50%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen" />
        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{ backgroundImage: 'url(/noise.svg)' }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-8 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
            <OptimizedIcon icon={RocketLaunch} className="w-8 h-8 text-blue-400" weight="duotone" />
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mb-6 tracking-tight break-words hyphens-auto">
            {title || (
              <>
                {t('global_cta.title_prefix')}{' '}
                <GradientText colors={['#60A5FA', '#3B82F6', '#2563EB']}>
                  {t('global_cta.title_highlight')}
                </GradientText>
              </>
            )}
          </h2>

          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            {subtitle || t('global_cta.subtitle')}
          </p>

          <Link
            href={buttonLink}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition motion-reduce:duration-[0.01ms] duration-200 bg-primary border border-transparent rounded-full hover:bg-blue-700 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-secondary overflow-hidden"
          >
            {/* Hover Glare Effect */}
            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer motion-reduce:animate-none" />
            </div>

            <span className="relative flex items-center gap-2">
              {buttonText || t('global_cta.button')}
              <OptimizedIcon
                icon={ArrowRight}
                weight="bold"
                className="transition-transform motion-reduce:duration-[0.01ms] duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </m.div>
      </div>
    </section>
  );
};

export default GlobalCTA;
