import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon';
import { SeoHead } from '@/shared/ui/SeoHead';
import CountUp from '../shared/ui/CountUp';
import GradientText from '../shared/ui/GradientText';

import { useCalculatorStore } from '../features/calculator/model/store';
import StepIndicator from '../shared/ui/StepIndicator';
import { BentoCard } from '../shared/ui/MagicBento';
import GlareHover from '../shared/ui/GlareHover';

interface Package {
  id: string;
  name: string;
  tagline: string;
  setupPrice: number;
  originalPrice?: number;
  monthlyPrice: number;
  popular?: boolean;
  features: string[];
  notIncluded?: string[];
  cta: string;
}

const Packages: React.FC = () => {
  const { t, i18n } = useTranslation('pricing');
  const selectPackage = useCalculatorStore((state) => state.selectPackage);
  const setStep = useCalculatorStore((state) => state.setStep);
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const packages: Package[] = [
    {
      id: 'starter',
      name: t('packages.starter.name'),
      tagline: t('packages.starter.tagline'),
      setupPrice: 939,
      originalPrice: 1250,
      monthlyPrice: 49,
      features: t('features.starter', { returnObjects: true }) as string[],
      notIncluded: t('not_included.starter', { returnObjects: true }) as string[],
      cta: t('packages.starter.cta'),
    },
    {
      id: 'professional',
      name: t('packages.professional.name'),
      tagline: t('packages.professional.tagline'),
      setupPrice: 1619,
      originalPrice: 2150,
      monthlyPrice: 99,
      popular: true,
      features: t('features.professional', { returnObjects: true }) as string[],
      notIncluded: t('not_included.professional', { returnObjects: true }) as string[],
      cta: t('packages.professional.cta'),
    },
    {
      id: 'enterprise',
      name: t('packages.enterprise.name'),
      tagline: t('packages.enterprise.tagline'),
      setupPrice: 2219,
      originalPrice: 2950,
      monthlyPrice: 199,
      features: t('features.enterprise', { returnObjects: true }) as string[],
      cta: t('packages.enterprise.cta'),
    },
  ];

  // Set step on mount
  useEffect(() => {
    setStep('packages');
  }, [setStep]);

  const handleSelect = (pkgId: string) => {
    selectPackage(pkgId);
    setStep('calculator');
    navigate('/calculator');
  };

  return (
    <div className="bg-background-light min-h-screen pt-24 pb-20">
      <SeoHead title={`${t('page.title')} | Coday`} description={t('page.subheadline')} />
      {/* Step Indicator */}
      <StepIndicator currentStep="packages" className="mb-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
            {t('page.title')}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6">
            {t('page.headline').split('<0>')[0]}
            <GradientText
              colors={['#1A9A9A', '#D69E2E', '#1A9A9A']}
              animationSpeed={8}
              showBorder={false}
              className="inline-block"
            >
              {t('page.headline').split('<0>')[1].split('</0>')[0]}
            </GradientText>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('page.subheadline')}</p>
        </div>

        {/* Package Cards with specific Grid instead of MagicBento for mobile responsiveness */}
        <div className="max-w-7xl mx-auto mb-20 pt-8 items-start grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <BentoCard
              key={pkg.id}
              effect={pkg.popular ? 'glow' : 'spotlight'}
              spotlightColor="rgba(26, 154, 154, 0.2)"
              glowColor="rgba(59, 130, 246, 0.3)"
              className={`h-full bg-white relative ${pkg.popular ? 'border-primary ring-2 ring-primary/20 z-10' : 'border-gray-200'}`}
              allowOverflow={pkg.popular}
            >
              <div className={`p-8 h-full flex flex-col ${pkg.popular ? 'pt-16' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-lg whitespace-nowrap">
                      {t('packages.professional.badge')}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="font-display font-bold text-2xl text-gray-900 mb-1">{pkg.name}</h3>
                  <p className="text-gray-500 text-sm">{pkg.tagline}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">{t('labels.setup')}</span>
                  </div>
                  {pkg.originalPrice && (
                    <div className="text-gray-400 line-through font-bold text-lg">
                      {formatPrice(pkg.originalPrice)}
                    </div>
                  )}
                  <div className="font-display font-black text-4xl text-gray-900 mb-4">
                    <CountUp from={0} to={pkg.setupPrice} duration={2} separator="." />€
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Icon name="check_circle" className="text-emerald-500 text-lg mr-3 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  {pkg.notIncluded?.map((feature, idx) => (
                    <div key={idx} className="flex items-start opacity-50">
                      <Icon name="cancel" className="text-gray-300 text-lg mr-3 mt-0.5" />
                      <span className="text-gray-400 text-sm line-through">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <GlareHover className="rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleSelect(pkg.id)}
                    className={`w-full py-4 px-6 font-bold text-sm uppercase tracking-wide transition-all duration-300 flex items-center justify-center ${pkg.popular
                      ? 'bg-primary text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-900 hover:bg-primary hover:text-white'
                      }`}
                  >
                    {pkg.cta}
                    <Icon name="arrow_forward" className="text-sm ml-2" />
                  </button>
                </GlareHover>
              </div>
            </BentoCard>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden mt-12">
          <div className="p-8 border-b border-gray-100 bg-gray-50">
            <h2 className="font-display font-bold text-2xl text-gray-900 text-center">
              {t('comparison.title')}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="p-4 text-left text-sm font-semibold text-gray-500">
                    {t('comparison.headers.feature')}
                  </th>
                  <th className="p-4 text-center text-sm font-bold text-gray-900">
                    {t('comparison.headers.starter')}
                  </th>
                  <th className="p-4 text-center text-sm font-bold text-primary bg-primary/5">
                    {t('comparison.headers.professional')}
                  </th>
                  <th className="p-4 text-center text-sm font-bold text-gray-900">
                    {t('comparison.headers.enterprise')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    t('comparison.rows.pages.label'),
                    t('comparison.rows.pages.starter'),
                    t('comparison.rows.pages.pro'),
                    t('comparison.rows.pages.ent'),
                  ],
                  [
                    t('comparison.rows.cms.label'),
                    t('comparison.rows.cms.starter'),
                    t('comparison.rows.cms.pro'),
                    t('comparison.rows.cms.ent'),
                  ],
                  [
                    t('comparison.rows.seo.label'),
                    t('comparison.rows.seo.starter'),
                    t('comparison.rows.seo.pro'),
                    t('comparison.rows.seo.ent'),
                  ],
                  [
                    t('comparison.rows.support.label'),
                    t('comparison.rows.support.starter'),
                    t('comparison.rows.support.pro'),
                    t('comparison.rows.support.ent'),
                  ],
                  [
                    t('comparison.rows.ecommerce.label'),
                    t('comparison.rows.ecommerce.starter'),
                    t('comparison.rows.ecommerce.pro'),
                    t('comparison.rows.ecommerce.ent'),
                  ],
                  [
                    t('comparison.rows.custom.label'),
                    t('comparison.rows.custom.starter'),
                    t('comparison.rows.custom.pro'),
                    t('comparison.rows.custom.ent'),
                  ],
                  [
                    t('comparison.rows.revisions.label'),
                    t('comparison.rows.revisions.starter'),
                    t('comparison.rows.revisions.pro'),
                    t('comparison.rows.revisions.ent'),
                  ],
                ].map(([feature, starter, pro, enterprise], idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-4 text-sm font-medium text-gray-700">{feature}</td>
                    <td className="p-4 text-center text-sm text-gray-600">{starter}</td>
                    <td className="p-4 text-center text-sm text-gray-900 bg-primary/5 font-medium">
                      {pro}
                    </td>
                    <td className="p-4 text-center text-sm text-gray-600">{enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
              {t('cta_section.title')}
            </h3>
            <p className="text-gray-600 mb-6">{t('cta_section.text')}</p>
            <GlareHover className="rounded-lg inline-block">
              <NavLink
                to="/booking"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                {t('cta_section.button')}
                <Icon name="calendar_month" className="ml-2" />
              </NavLink>
            </GlareHover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
