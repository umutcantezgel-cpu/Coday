import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LocalizedNavLink as NavLink } from '@/shared/ui/LocalizedLink';
import { motion } from 'motion/react';
import { Icon } from '@/shared/ui/Icon';
import { SeoHead } from '@/shared/ui/SeoHead';
import CountUp from '../shared/ui/CountUp';
import GradientText from '../shared/ui/GradientText';

import { useCalculatorStore } from '../features/calculator/model/store';
import StepIndicator from '../shared/ui/StepIndicator';

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
  deliveryDays: number;
  savings?: number;
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
      deliveryDays: 14,
      savings: 25,
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
      deliveryDays: 21,
      savings: 25,
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
      deliveryDays: 30,
      savings: 25,
    },
  ];

  useEffect(() => {
    setStep('packages');
  }, [setStep]);

  const handleSelect = (pkgId: string) => {
    selectPackage(pkgId);
    setStep('calculator');
    navigate(`/${i18n.language}/calculator`);
  };

  return (
    <div className="min-h-screen">
      <SeoHead title={`${t('page.title')} | Coday`} description={t('page.subheadline')} />

      {/* Light Hero Section */}
      <div className="bg-background-light pt-24 pb-4">
        <StepIndicator currentStep="packages" className="mb-8" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block"
          >
            {t('page.title')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6"
          >
            {t('page.headline').split('<0>')[0]}
            <GradientText
              colors={['#1A9A9A', '#D69E2E', '#1A9A9A']}
              animationSpeed={8}
              showBorder={false}
              className="inline-block"
            >
              {t('page.headline').split('<0>')[1]?.split('</0>')[0]}
            </GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {t('page.subheadline')}
          </motion.p>
        </div>
      </div>

      {/* Dark Pricing Section */}
      <div className="relative bg-gray-900 py-20 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                className={`relative group ${pkg.popular ? 'md:-my-4 z-10' : ''}`}
              >
                {/* Card */}
                <div
                  className={`
                    relative rounded-2xl overflow-hidden h-full flex flex-col
                    transition-all duration-500 ease-out
                    ${
                      pkg.popular
                        ? 'bg-white/[0.08] backdrop-blur-xl border-2 border-primary/40 shadow-[0_0_60px_-10px_rgba(26,154,154,0.3)]'
                        : 'bg-white/[0.04] backdrop-blur-lg border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.07]'
                    }
                  `}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-px left-0 right-0">
                      <div className="flex justify-center">
                        <span className="bg-primary text-white text-[11px] font-bold px-5 py-1.5 rounded-b-lg uppercase tracking-widest shadow-lg shadow-primary/30">
                          {t('packages.professional.badge')}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className={`p-8 lg:p-10 flex flex-col h-full ${pkg.popular ? 'pt-12' : ''}`}>
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h3 className="font-display font-bold text-2xl text-white mb-1">
                        {pkg.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{pkg.tagline}</p>
                    </div>

                    {/* Price Block */}
                    <div className="text-center mb-6">
                      <div className="mb-1">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          {t('labels.setup')}
                        </span>
                      </div>

                      {/* Original Price + Savings */}
                      {pkg.originalPrice && (
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <span className="text-gray-500 line-through text-base">
                            {formatPrice(pkg.originalPrice)}
                          </span>
                          {pkg.savings && (
                            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              -{pkg.savings}%
                            </span>
                          )}
                        </div>
                      )}

                      {/* Main Price */}
                      <div className="font-display font-black text-5xl text-white mb-3">
                        <CountUp from={0} to={pkg.setupPrice} duration={2} separator="." />
                        <span className="text-3xl">€</span>
                      </div>

                      {/* Delivery Pill */}
                      <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
                        <Icon name="schedule" className="text-sm" />
                        <span>
                          {t('labels.delivery', {
                            days: pkg.deliveryDays,
                            defaultValue: `~${pkg.deliveryDays} Tage`,
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                    {/* Monthly Badge */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <Icon name="autorenew" className="text-sm text-gray-500" />
                      <span className="text-gray-400 text-xs">
                        + {formatPrice(pkg.monthlyPrice)}
                        {t('labels.monthly', { defaultValue: '/Monat' })}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8 flex-grow">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Icon
                            name="check_circle"
                            className={`text-base mt-0.5 flex-shrink-0 ${pkg.popular ? 'text-primary' : 'text-primary/70'}`}
                          />
                          <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                      {pkg.notIncluded?.map((feature, idx) => (
                        <div key={`ni-${idx}`} className="flex items-start gap-3 opacity-40">
                          <Icon
                            name="remove_circle_outline"
                            className="text-base text-gray-600 mt-0.5 flex-shrink-0"
                          />
                          <span className="text-gray-500 text-sm line-through leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => handleSelect(pkg.id)}
                      className={`
                        w-full py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider
                        transition-all duration-300 flex items-center justify-center gap-2
                        ${
                          pkg.popular
                            ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5'
                            : 'bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5'
                        }
                      `}
                    >
                      {pkg.cta}
                      <Icon name="arrow_forward" className="text-sm" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Bar — compact inline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {[
              {
                icon: 'verified',
                label: t('trust.google_partner', { defaultValue: 'Google Partner' }),
              },
              {
                icon: 'shield',
                label: t('trust.satisfaction', { defaultValue: '100% Zufriedenheit' }),
              },
              { icon: 'speed', label: t('trust.performance', { defaultValue: 'PageSpeed 95+' }) },
              {
                icon: 'support_agent',
                label: t('trust.support', { defaultValue: '24/7 Support' }),
              },
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-400">
                <Icon name={badge.icon} className="text-lg text-primary/60" />
                <span className="text-xs font-medium tracking-wide">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Comparison Section — Light */}
      <div className="bg-background-light py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden"
          >
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
                    <tr
                      key={idx}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
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
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <div className="inline-block bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
                {t('cta_section.title')}
              </h3>
              <p className="text-gray-600 mb-6">{t('cta_section.text')}</p>
              <NavLink
                to="/booking"
                className="inline-flex items-center px-8 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
              >
                {t('cta_section.button')}
                <Icon name="calendar_month" className="ml-2" />
              </NavLink>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
