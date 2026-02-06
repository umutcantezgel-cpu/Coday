import React from 'react';
import { Icon } from '@/shared/ui/Icon';
import { MagicBento, BentoCard } from '../../shared/ui/MagicBento';
import GearSetup from '../../features/benefits/GearSetup';
import { useTranslation } from 'react-i18next';

const Benefits: React.FC = () => {
  const { t } = useTranslation('careers');
  const benefits = t('benefits.items', { returnObjects: true }) as any[];

  // Map correct effects to the benefits from JSON order if possible or hardcode based on index
  // Since we can't easily put function refs or constants in JSON, we might map them here.
  // However, the JSON already has icon names. We need to re-attach the effects.
  const effects = ['tilt', 'spotlight', 'glow', 'tilt', 'spotlight', 'glow'];

  const enrichedBenefits = benefits.map((b, i) => ({
    ...b,
    effect: effects[i % effects.length],
  }));

  return (
    <div className="bg-aurora-white min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
            {t('benefits.hero.badge')}
          </span>
          <h1 className="font-display font-black text-5xl md:text-6xl text-gradient-vivid mb-6">
            {t('benefits.hero.title')}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t('benefits.hero.desc')}</p>
        </div>

        {/* Benefits Grid */}
        <MagicBento columns={3} gap={24} className="max-w-7xl mx-auto mb-24">
          {enrichedBenefits.map((benefit, i) => (
            <BentoCard
              key={i}
              effect={benefit.effect}
              spotlightColor="rgba(59, 130, 246, 0.15)"
              glowColor="rgba(147, 51, 234, 0.2)"
              className="h-full bg-white text-left shadow-flat border border-gray-100"
            >
              <div className="p-8 h-full flex flex-col items-start text-left">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name={benefit.icon} className="text-3xl text-aurora-sapphire" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-left">{benefit.title}</h3>
                <p className="text-slate-500 leading-relaxed text-left">{benefit.text}</p>
              </div>
            </BentoCard>
          ))}
        </MagicBento>

        {/* Gear Setup Section - NEW */}
        <div className="mb-24">
          <GearSetup />
        </div>
      </div>
    </div>
  );
};

export default Benefits;
