import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FadeInUp } from '@/shared/ui/MotionWrappers';
import {
  Barricade as Construction,
  Buildings as Apartment,
  ShoppingCart,
  Lightbulb,
  Heartbeat as HealthAndSafety,
} from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import BlurText from '@/shared/ui/BlurText';
import { BentoCard } from '@/shared/ui/MagicBento';

export const IndustriesGrid: React.FC = () => {
  const t = useTranslations('home');

  const industries = [
    {
      id: 'craft',
      icon: Construction,
      link: '/branchen/handwerk-bau',
      effect: 'tilt' as const,
      tiltMax: 12,
    },
    {
      id: 'realestate',
      icon: Apartment,
      link: '/branchen/immobilien',
      effect: 'glow' as const,
      glowColor: 'rgba(26, 154, 154, 0.3)',
    },
    {
      id: 'shop',
      icon: ShoppingCart,
      link: '/branchen/retail',
      effect: 'spotlight' as const,
      spotlightColor: 'rgba(26, 154, 154, 0.15)',
    },
    {
      id: 'consulting',
      icon: Lightbulb,
      link: '/branchen/unternehmensberatung',
      effect: 'tilt' as const,
      tiltMax: 12,
    },
    {
      id: 'health',
      icon: HealthAndSafety,
      link: '/branchen/aerzte-gesundheit',
      effect: 'glow' as const,
      glowColor: 'rgba(26, 154, 154, 0.3)',
    },
  ];

  return (
    <section className="py-[var(--space-section)] bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-5xl font-black text-secondary mb-12 uppercase tracking-tight">
          <BlurText
            text={t('industries.title_prefix')}
            delay={80}
            animateBy="words"
            className="inline"
          />{' '}
          <span className="text-primary">{t('industries.title_suffix')}</span>
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {industries.map((ind, index) => (
            <FadeInUp key={ind.id} duration={0.6} delay={index * 0.1} className="h-full">
              <div className="block h-full relative group">
                <BentoCard
                  effect={ind.effect}
                  tiltMax={ind.tiltMax}
                  glowColor={ind.glowColor}
                  spotlightColor={ind.spotlightColor}
                  className="p-6 text-start h-full"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 relative z-40">
                    <OptimizedIcon icon={ind.icon} size="xl" className="text-primary" />
                  </div>
                  <h3
                    className="font-bold text-lg text-secondary mb-2 break-words hyphens-auto"
                    lang="de"
                  >
                    <Link
                      href={ind.link}
                      className="before:absolute before:inset-0 before:z-30 group-hover:text-primary transition-colors hover:underline"
                    >
                      {t(`industries.card_${ind.id}.title`)}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-700 relative z-40">
                    {t(`industries.card_${ind.id}.desc`)}
                  </p>
                </BentoCard>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
};
