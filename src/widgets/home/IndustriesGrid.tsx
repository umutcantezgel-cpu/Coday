import React from 'react';
import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from '../../shared/ui/LocalizedLink';
import {
  Barricade as Construction,
  Buildings as Apartment,
  ShoppingCart,
  Lightbulb,
  Heartbeat as HealthAndSafety,
} from '@phosphor-icons/react';
import { OptimizedIcon } from '../../shared/ui/OptimizedIcon';
import BlurText from '../../shared/ui/BlurText';
import { BentoCard } from '../../shared/ui/MagicBento';

export const IndustriesGrid: React.FC = () => {
  const { t } = useTranslation(['home']);

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
          <Link to="/services/industries/handwerk" className="block h-full">
            <BentoCard effect="tilt" tiltMax={12} className="p-6 text-start h-full">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <OptimizedIcon icon={Construction} size="xl" className="text-primary" />
              </div>
              <h3 className="font-bold text-lg text-secondary mb-2">
                {t('industries.card_craft.title')}
              </h3>
              <p className="text-sm text-slate-600">{t('industries.card_craft.desc')}</p>
            </BentoCard>
          </Link>
          <Link to="/services/industries/immobilien" className="block h-full">
            <BentoCard
              effect="glow"
              glowColor="rgba(26, 154, 154, 0.3)"
              className="p-6 text-start h-full"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <OptimizedIcon icon={Apartment} size="xl" className="text-primary" />
              </div>
              <h3 className="font-bold text-lg text-secondary mb-2">
                {t('industries.card_realestate.title')}
              </h3>
              <p className="text-sm text-slate-600">{t('industries.card_realestate.desc')}</p>
            </BentoCard>
          </Link>
          <Link to="/services/industries/e-commerce" className="block h-full">
            <BentoCard
              effect="spotlight"
              spotlightColor="rgba(26, 154, 154, 0.15)"
              className="p-6 text-start h-full"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <OptimizedIcon icon={ShoppingCart} size="xl" className="text-primary" />
              </div>
              <h3 className="font-bold text-lg text-secondary mb-2">
                {t('industries.card_shop.title')}
              </h3>
              <p className="text-sm text-slate-600">{t('industries.card_shop.desc')}</p>
            </BentoCard>
          </Link>
          <Link to="/services/industries/dienstleistung" className="block h-full">
            <BentoCard effect="tilt" tiltMax={12} className="p-6 text-start h-full">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <OptimizedIcon icon={Lightbulb} size="xl" className="text-primary" />
              </div>
              <h3 className="font-bold text-lg text-secondary mb-2">
                {t('industries.card_consulting.title')}
              </h3>
              <p className="text-sm text-slate-600">{t('industries.card_consulting.desc')}</p>
            </BentoCard>
          </Link>
          <Link to="/services/industries/gesundheit" className="block h-full">
            <BentoCard
              effect="glow"
              glowColor="rgba(26, 154, 154, 0.3)"
              className="p-6 text-start h-full"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <OptimizedIcon icon={HealthAndSafety} size="xl" className="text-primary" />
              </div>
              <h3 className="font-bold text-lg text-secondary mb-2">
                {t('industries.card_health.title')}
              </h3>
              <p className="text-sm text-slate-600">{t('industries.card_health.desc')}</p>
            </BentoCard>
          </Link>
        </div>
      </div>
    </section>
  );
};
