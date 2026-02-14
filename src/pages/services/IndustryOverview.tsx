import React from 'react';
import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from '../../shared/ui/LocalizedLink';
import { industriesData } from '@/shared/data/industries';
import {
  Buildings as Building2,
  Hammer,
  Stethoscope,
  Scales as Scale,
  ForkKnife as Utensils,
  ShoppingCart,
  Briefcase,
  RocketLaunch as Rocket,
  ArrowRight,
} from '@phosphor-icons/react';

const iconMap: Record<string, React.ElementType> = {
  hammer: Hammer,
  apartment: Building2,
  local_hospital: Stethoscope,
  gavel: Scale,
  restaurant: Utensils,
  shopping_cart: ShoppingCart,
  business_center: Briefcase,
  rocket_launch: Rocket,
};

import { industryHeroImages, industryFallbackImage } from '@/shared/data/industryImages';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import { OptimizedIcon } from '../../shared/ui/OptimizedIcon';
import { SeoHead } from '../../shared/ui/SeoHead';

const IndustryOverview: React.FC = () => {
  const { t } = useTranslation('industries');

  return (
    <div className="bg-background-light min-h-screen pt-24 pb-20">
      <SeoHead title={t('overview.meta.title')} description={t('overview.meta.description')} />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
            {t('overview.label')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-secondary mb-4">
            {t('overview.title')}
          </h1>
          <p className="text-lg text-text-light">{t('overview.description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(industriesData).map((industry) => {
            const Icon = iconMap[industry.icon] || Building2;
            const image = industryHeroImages[industry.slug] || industryFallbackImage;

            return (
              <Link
                to={`/services/industries/${industry.slug}`}
                key={industry.slug}
                className="group block p-8 bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                  <OptimizedImage
                    src={image.src}
                    alt=""
                    className="w-full h-full object-cover grayscale mix-blend-multiply transform scale-100 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 p-4 bg-primary/10 w-fit rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary shadow-sm">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-secondary mb-3 group-hover:text-primary transition-colors">
                    {t(industry.title)}
                  </h3>
                  <p className="text-text-light mb-8 flex-grow leading-relaxed">
                    {t(industry.hero.subheadline)}
                  </p>
                  <span className="text-primary font-bold flex items-center gap-2 mt-auto text-sm uppercase tracking-wide">
                    {t('overview.cta')}
                    <OptimizedIcon
                      icon={ArrowRight}
                      className="group-hover:translate-x-1 transition-transform text-sm"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IndustryOverview;
