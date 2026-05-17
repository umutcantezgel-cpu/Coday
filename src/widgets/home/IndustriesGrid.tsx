import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { LocalizedLink as Link } from '@/shared/ui/LocalizedLink';
import {
  Barricade as Construction,
  Buildings as Apartment,
  ShoppingCart,
  Lightbulb,
  Heartbeat as HealthAndSafety,
} from '@phosphor-icons/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import BlurText from '@/shared/ui/BlurText';
import { BentoCard } from '@/shared/ui/MagicBento';

export const IndustriesGrid: React.FC = () => {
  const { t } = useTranslation(['home']);

  const industries = [
    {
      id: 'craft',
      icon: Construction,
      link: '/services/industries/handwerk-bau',
      effect: 'tilt' as const,
      tiltMax: 12,
    },
    {
      id: 'realestate',
      icon: Apartment,
      link: '/services/industries/immobilien-makler',
      effect: 'glow' as const,
      glowColor: 'rgba(26, 154, 154, 0.3)',
    },
    {
      id: 'shop',
      icon: ShoppingCart,
      link: '/services/industries/ecommerce-retail',
      effect: 'spotlight' as const,
      spotlightColor: 'rgba(26, 154, 154, 0.15)',
    },
    {
      id: 'consulting',
      icon: Lightbulb,
      link: '/services/industries/unternehmensberatung',
      effect: 'tilt' as const,
      tiltMax: 12,
    },
    {
      id: 'health',
      icon: HealthAndSafety,
      link: '/services/industries/aerzte-gesundheit',
      effect: 'glow' as const,
      glowColor: 'rgba(26, 154, 154, 0.3)',
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
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
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <Link to={ind.link} className="block h-full">
                <BentoCard
                  effect={ind.effect}
                  tiltMax={ind.tiltMax}
                  glowColor={ind.glowColor}
                  spotlightColor={ind.spotlightColor}
                  className="p-6 text-start h-full"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                    <OptimizedIcon icon={ind.icon} size="xl" className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-secondary mb-2">
                    {t(`industries.card_${ind.id}.title`)}
                  </h3>
                  <p className="text-sm text-slate-600">{t(`industries.card_${ind.id}.desc`)}</p>
                </BentoCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
