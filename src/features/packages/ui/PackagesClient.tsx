"use client";

import React, { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, Link as NavLink } from '@/i18n/navigation';
import { motion } from 'motion/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  Clock,
  ArrowsClockwise,
  CheckCircle,
  MinusCircle,
  ArrowRight,
  ShieldCheck,
  Gauge,
  Headset,
  Calendar,
  CaretDown,
} from '@phosphor-icons/react';
import CountUp from '@/shared/ui/CountUp';
import GradientText from '@/shared/ui/GradientText';

import { useCalculatorStore } from '@/features/calculator/model/store';
import StepIndicator from '@/shared/ui/StepIndicator';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

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

export const PackagesClient: React.FC = () => {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const selectPackage = useCalculatorStore((state) => state.selectPackage);
  const setStep = useCalculatorStore((state) => state.setStep);
  const router = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getArray = (key: string) => {
    try {
      const val = t.raw(key);
      if (Array.isArray(val)) return val;
      return [];
    } catch {
      return [];
    }
  };

  const packages: Package[] = [
    {
      id: 'starter',
      name: t('packages.starter.name'),
      tagline: t('packages.starter.tagline'),
      setupPrice: 2500,
      monthlyPrice: 0,
      features: getArray('features.starter'),
      notIncluded: getArray('not_included.starter'),
      cta: t('packages.starter.cta'),
      deliveryDays: 14,
    },
    {
      id: 'professional',
      name: t('packages.professional.name'),
      tagline: t('packages.professional.tagline'),
      setupPrice: 5000,
      monthlyPrice: 0,
      popular: true,
      features: getArray('features.professional'),
      notIncluded: getArray('not_included.professional'),
      cta: t('packages.professional.cta'),
      deliveryDays: 21,
    },
    {
      id: 'enterprise',
      name: t('packages.enterprise.name'),
      tagline: t('packages.enterprise.tagline'),
      setupPrice: 10000,
      monthlyPrice: 0,
      features: getArray('features.enterprise'),
      cta: t('packages.enterprise.cta'),
      deliveryDays: 30,
    },
  ];

  useEffect(() => {
    setStep('packages');
  }, [setStep]);

  const handleSelect = (pkgId: string) => {
    selectPackage(pkgId);
    setStep('calculator');
    router.push('/calculator');
  };

  const headlineStr = t('page.headline');
  const headlineParts = headlineStr.split('<0>');
  const headlineStart = headlineParts[0] || '';
  const headlineMiddle = headlineParts[1] ? headlineParts[1].split('</0>')[0] : '';

  return (
    <div className="min-h-dvh">
      {/* Light Hero Section */}
      <div className="bg-background-light pt-24 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <Breadcrumbs />
        </div>
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
            {headlineStart}
            <GradientText
              colors={['#1A9A9A', '#D69E2E', '#1A9A9A']}
              animationSpeed={8}
              showBorder={false}
              className="inline-block"
            >
              {headlineMiddle}
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                        <OptimizedIcon icon={Clock} className="text-sm" />
                        <span>
                          {t('labels.delivery', {
                            days: pkg.deliveryDays,
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                    {/* Monthly Badge */}
                    {pkg.monthlyPrice > 0 && (
                      <div className="flex items-center justify-center gap-2 mb-6">
                        <OptimizedIcon icon={ArrowsClockwise} className="text-sm text-gray-500" />
                        <span className="text-gray-400 text-xs">
                          + {formatPrice(pkg.monthlyPrice)}
                          {t('labels.monthly')}
                        </span>
                      </div>
                    )}

                    {/* Features */}
                    <div className="space-y-3 mb-8 flex-grow">
                      {pkg.features.map((feature, _idx) => (
                        <div key={_idx} className="flex items-start gap-3">
                          <OptimizedIcon
                            icon={CheckCircle}
                            className={`text-base mt-0.5 flex-shrink-0 ${pkg.popular ? 'text-primary' : 'text-primary/70'}`}
                          />
                          <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                      {pkg.notIncluded?.map((feature, _idx) => (
                        <div key={`ni-${_idx}`} className="flex items-start gap-3 opacity-40">
                          <OptimizedIcon
                            icon={MinusCircle}
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
                      <OptimizedIcon icon={ArrowRight} className="text-sm" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Pricing Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 max-w-3xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden bg-white/[0.04] backdrop-blur-lg border border-white/[0.08] hover:border-primary/30 transition-all duration-500">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
              <div className="p-8 lg:p-10 text-center">
                <span className="inline-block bg-accent/20 text-accent text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
                  {t('custom.badge', { fallback: 'Individuell' })}
                </span>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  {t('custom.title', { fallback: 'Größeres Projekt?' })}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto mb-6">
                  {t('custom.description', {
                    fallback:
                      'Für komplexere Anforderungen erstellen wir Ihnen gerne ein maßgeschneidertes Angebot.',
                  })}
                </p>
                <NavLink
                  href="/booking"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-accent/40 text-accent font-bold rounded-xl hover:bg-accent/10 hover:border-accent/60 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {t('custom.cta', { fallback: 'Individuelles Angebot anfragen' })}
                  <OptimizedIcon icon={ArrowRight} className="text-sm" />
                </NavLink>
              </div>
            </div>
          </motion.div>

          {/* Trust Bar — compact inline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {[
              {
                icon: ShieldCheck,
                label: t('trust.google_partner', { fallback: 'Google Partner' }),
              },
              {
                icon: ShieldCheck, 
                label: t('trust.satisfaction', { fallback: '100% Zufriedenheit' }),
              },
              { icon: Gauge, label: t('trust.performance', { fallback: 'PageSpeed 95+' }) },
              {
                icon: Headset,
                label: t('trust.support', { fallback: '24/7 Support' }),
              },
            ].map((badge, _idx) => (
              <div key={_idx} className="flex items-center gap-2 text-gray-400">
                <OptimizedIcon icon={badge.icon} className="text-lg text-primary/60" />
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
                  ].map(([feature, starter, pro, enterprise], _idx) => (
                    <tr
                      key={_idx}
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

          {/* Retainer Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 mb-16 max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">
                {t('retainers.title', { fallback: 'Support & Growth Retainer' })}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('retainers.description', {
                  fallback:
                    'Nachhaltiges Wachstum und kontinuierliche Optimierung nach dem Go-Live.',
                })}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['basic', 'growth', 'partnership'].map((level) => (
                <div
                  key={level}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
                    {t(`retainers.${level}.name`)}
                  </h3>
                  <div className="font-display font-black text-3xl text-primary mb-6">
                    {t(`retainers.${level}.price`)}{' '}
                    <span className="text-lg text-gray-500 font-normal">
                      € {t('labels.monthly')}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {getArray(`retainers.${level}.features`).map((feature: any, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <OptimizedIcon
                          icon={CheckCircle}
                          className="text-primary mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <NavLink
                    href="/booking"
                    className="w-full py-3 px-6 rounded-xl font-bold text-sm text-center border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 inline-block"
                  >
                    {t('cta_section.button', { fallback: 'Termin buchen' })}
                  </NavLink>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <h2 className="font-display font-bold text-2xl text-gray-900 text-center mb-8">
              {t('faq.title', { fallback: 'Häufig gestellte Fragen' })}
            </h2>
            <div className="space-y-4">
              {getArray('faq.items').map((item: any, _idx: number) => (
                <div
                  key={_idx}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === _idx ? null : _idx)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className="font-bold text-gray-900 pr-4">{item.question}</span>
                    <OptimizedIcon
                      icon={CaretDown}
                      className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${openFaqIndex === _idx ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaqIndex === _idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-5 pt-0 text-gray-600 text-sm leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
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
                href="/booking"
                className="inline-flex items-center px-8 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
              >
                {t('cta_section.button')}
                <OptimizedIcon icon={Calendar} className="ml-2" />
              </NavLink>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
