import React from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link as NavLink } from '@/i18n/navigation';
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
} from '@phosphor-icons/react/dist/ssr';
import { SeoHead } from '@/shared/ui/SeoHead';
import GradientText from '@/shared/ui/GradientText';
import StepIndicator from '@/shared/ui/StepIndicator';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

import { PackageSelectButton } from './PackageSelectButton';
import { FaqAccordion } from './FaqAccordion';
import { StepInitializer } from './StepInitializer';

export default async function Packages() {
  const t = await getTranslations('pricing');
  const locale = await getLocale();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const packages = [
    {
      id: 'onepager',
      name: t('packages.onepager.name'),
      tagline: t('packages.onepager.tagline'),
      setupPrice: 499,
      monthlyPrice: 0,
      features: t.raw('features.onepager') as string[],
      notIncluded: t.raw('not_included.onepager') as string[],
      cta: t('packages.onepager.cta'),
      deliveryDays: 7,
    },
    {
      id: 'starter',
      name: t('packages.starter.name'),
      tagline: t('packages.starter.tagline'),
      setupPrice: 1490,
      monthlyPrice: 0,
      features: t.raw('features.starter') as string[],
      notIncluded: t.raw('not_included.starter') as string[],
      cta: t('packages.starter.cta'),
      deliveryDays: 14,
    },
    {
      id: 'professional',
      name: t('packages.professional.name'),
      tagline: t('packages.professional.tagline'),
      setupPrice: 2990,
      monthlyPrice: 0,
      popular: true,
      features: t.raw('features.professional') as string[],
      notIncluded: t.raw('not_included.professional') as string[],
      cta: t('packages.professional.cta'),
      deliveryDays: 21,
    },
    {
      id: 'enterprise',
      name: t('packages.enterprise.name'),
      tagline: t('packages.enterprise.tagline'),
      setupPrice: 5990,
      monthlyPrice: 0,
      features: t.raw('features.enterprise') as string[],
      cta: t('packages.enterprise.cta'),
      deliveryDays: 30,
    },
  ];

  const trustReferences = t.raw('trust_section.references') as {
    metric: string;
    name: string;
    label: string;
  }[];
  const valuePropPoints = t.raw('value_prop.points') as { title: string; description: string }[];
  const faqItems = t.raw('faq.items') as { question: string; answer: string }[];

  return (
    <div className="min-h-[100dvh] bg-white">
      <SeoHead
        title={`${t('page.title')} | Coday`}
        description={t('page.subheadline')}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: t('page.title'), url: 'https://www.codayweb.de/pricing' },
        ]}
        schemaData={{
          softwareApp: {
            name: 'Coday Web Packages',
            description: 'Professional web development packages with transparent pricing.',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: { price: '2500', priceCurrency: 'EUR' },
          },
        }}
      />

      <StepInitializer />

      {/* Light Hero Section (Soft Structuralism) */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Breadcrumbs />
          </div>
          <StepIndicator currentStep="packages" className="mb-16" />

          <div className="text-center max-w-4xl mx-auto space-y-8">
            <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-black/5 text-gray-900">
              {t('page.title')}
            </span>
            <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-[1.1] tracking-tight text-balance">
              {t.raw('page.headline').split('<0>')[0]}
              <GradientText
                colors={['#1A9A9A', '#D69E2E', '#1A9A9A']}
                animationSpeed={8}
                showBorder={false}
                className="inline-block px-2"
              >
                {t.raw('page.headline').split('<0>')[1]?.split('</0>')[0]}
              </GradientText>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed text-pretty">
              {t('page.subheadline')}
            </p>
            <div className="pt-4">
              <NavLink
                href="/booking"
                className="group inline-flex items-center px-8 py-4 bg-primary text-slate-900 font-bold rounded-full hover:bg-primary/90 transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-colors motion-reduce:transform-none"
              >
                <span className="uppercase tracking-wider text-sm">{t('cta_section.button')}</span>
                <div className="w-8 h-8 ml-4 rounded-full bg-black/10 flex items-center justify-center transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 motion-reduce:transform-none">
                  <OptimizedIcon icon={Calendar} className="text-sm text-slate-900" />
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 lg:py-24 px-4 bg-gray-50/50 border-y border-black/5 w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="sr-only">Value Proposition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {valuePropPoints?.map((point, idx) => (
              <div
                key={idx}
                className="p-1.5 rounded-[2rem] bg-black/5 ring-1 ring-black/5 motion-safe:animate-fade-in-up"
                style={{
                  animationDelay: `${Math.min(idx * 50, 400)}ms`,
                  animationDuration: '250ms',
                  animationFillMode: 'both',
                }}
              >
                <div className="bg-white rounded-[calc(2rem-0.375rem)] p-8 lg:p-10 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <OptimizedIcon icon={CheckCircle} className="text-xl text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-gray-900 mb-4 text-balance">
                    {point.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-lg text-pretty">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Pricing Section (Ethereal Glass) */}
      <section className="relative bg-[#050505] py-24 lg:py-40 px-4 w-full overflow-hidden">
        {/* Deep Ethereal Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="w-[80vw] h-[80vh] bg-primary/20 rounded-full blur-[120px] opacity-30 mix-blend-screen" />
        </div>

        <div className="relative max-w-[90rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {packages.map((pkg, idx) => (
              <div
                key={pkg.id}
                className={`relative group ${pkg.popular ? 'lg:-my-6 z-10' : ''} motion-safe:animate-fade-in-up`}
                style={{
                  animationDelay: `${Math.min(idx * 50, 400)}ms`,
                  animationDuration: '250ms',
                  animationFillMode: 'both',
                }}
              >
                {/* Outer Shell (Doppelrand) */}
                <div
                  className={`p-2 rounded-[2rem] h-full ${
                    pkg.popular
                      ? 'bg-white/10 ring-1 ring-white/20 shadow-[0_0_60px_-10px_rgba(26,154,154,0.3)]'
                      : 'bg-white/5 ring-1 ring-white/10'
                  }`}
                >
                  {/* Inner Core */}
                  <div
                    className={`relative h-full flex flex-col rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${
                      pkg.popular ? 'bg-[#0a0a0a]' : 'bg-[#080808]'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="bg-primary text-slate-900 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-primary/30 border border-primary/50">
                          {t('packages.professional.badge')}
                        </span>
                      </div>
                    )}

                    <div className="p-8 lg:p-10 flex flex-col flex-grow">
                      <div className="text-center mb-8">
                        <h3 className="font-display font-bold text-3xl text-white mb-2 text-balance">
                          {pkg.name}
                        </h3>
                        <p className="text-gray-400 text-sm text-pretty">{pkg.tagline}</p>
                      </div>

                      <div className="text-center mb-8">
                        <div className="font-display font-black text-6xl text-white tracking-tight mb-4">
                          {pkg.setupPrice.toLocaleString('de-DE')}
                          <span className="text-4xl text-gray-500 font-medium">€</span>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-white/5 text-gray-300 text-xs font-medium px-4 py-2 rounded-full border border-white/10">
                          <OptimizedIcon icon={Clock} className="text-sm" />
                          <span>
                            {t('labels.delivery', {
                              days: pkg.deliveryDays,
                              defaultValue: `~${pkg.deliveryDays} Tage`,
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                      <ul className="space-y-4 mb-10 flex-grow">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <OptimizedIcon
                              icon={CheckCircle}
                              aria-hidden="true"
                              className={`text-lg mt-0.5 flex-shrink-0 ${pkg.popular ? 'text-primary' : 'text-gray-400'}`}
                            />
                            <span className="text-gray-300 text-base leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                        {pkg.notIncluded?.map((feature, idx) => (
                          <li key={`ni-${idx}`} className="flex items-start gap-3">
                            <OptimizedIcon
                              icon={MinusCircle}
                              aria-hidden="true"
                              className="text-lg text-gray-500 mt-0.5 flex-shrink-0"
                            />
                            <span className="text-gray-400 text-base line-through leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <PackageSelectButton pkgId={pkg.id} ctaText={pkg.cta} popular={pkg.popular} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & References */}
      <section className="py-24 px-4 bg-[#050505] w-full border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 text-gray-400 border border-white/10 mb-6">
            {t('trust_section.title')}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {trustReferences?.map((ref, idx) => (
              <div
                key={idx}
                className="p-1.5 rounded-[2rem] bg-white/5 ring-1 ring-white/10 motion-safe:animate-fade-in-up"
                style={{
                  animationDelay: `${Math.min(idx * 50, 400)}ms`,
                  animationDuration: '250ms',
                  animationFillMode: 'both',
                }}
              >
                <div className="bg-[#0a0a0a] rounded-[calc(2rem-0.375rem)] p-8 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="font-display font-black text-5xl text-primary">{ref.metric}</div>
                  <div>
                    <p className="text-white font-bold text-xl mb-1 text-balance">{ref.name}</p>
                    <p className="text-gray-400 text-base leading-relaxed text-pretty">
                      {ref.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 bg-white w-full">
        <div className="max-w-6xl mx-auto">
          <div className="p-1.5 rounded-[2rem] bg-black/5 ring-1 ring-black/5">
            <div className="bg-white rounded-[calc(2rem-0.375rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
              <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-display font-bold text-3xl text-gray-900 text-center tracking-tight text-balance">
                  {t('comparison.title')}
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <caption className="sr-only">{t('comparison.title')}</caption>
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th
                        scope="col"
                        className="p-6 text-sm font-semibold text-gray-500 uppercase tracking-wider"
                      >
                        {t('comparison.headers.feature')}
                      </th>
                      <th scope="col" className="p-6 text-center text-sm font-bold text-gray-900">
                        {t('comparison.headers.onepager')}
                      </th>
                      <th scope="col" className="p-6 text-center text-sm font-bold text-gray-900">
                        {t('comparison.headers.starter')}
                      </th>
                      <th
                        scope="col"
                        className="p-6 text-center text-sm font-bold text-gray-900 bg-primary/5"
                      >
                        {t('comparison.headers.professional')}
                      </th>
                      <th scope="col" className="p-6 text-center text-sm font-bold text-gray-900">
                        {t('comparison.headers.enterprise')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      ['pages', t('comparison.rows.pages.label')],
                      ['cms', t('comparison.rows.cms.label')],
                      ['seo', t('comparison.rows.seo.label')],
                      ['support', t('comparison.rows.support.label')],
                      ['ecommerce', t('comparison.rows.ecommerce.label')],
                      ['custom', t('comparison.rows.custom.label')],
                      ['revisions', t('comparison.rows.revisions.label')],
                    ].map(([key, label], idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50/50 transition-colors motion-safe:animate-fade-in"
                        style={{
                          animationDelay: `${Math.min(idx * 50, 400)}ms`,
                          animationDuration: '250ms',
                          animationFillMode: 'both',
                        }}
                      >
                        <th scope="row" className="p-6 text-base font-medium text-gray-700">
                          {label}
                        </th>
                        <td className="p-6 text-center text-base text-gray-600">
                          {t(`comparison.rows.${key}.onepager`)}
                        </td>
                        <td className="p-6 text-center text-base text-gray-600">
                          {t(`comparison.rows.${key}.starter`)}
                        </td>
                        <td className="p-6 text-center text-base font-bold text-gray-900 bg-primary/5">
                          {t(`comparison.rows.${key}.pro`)}
                        </td>
                        <td className="p-6 text-center text-base text-gray-600">
                          {t(`comparison.rows.${key}.ent`)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-gray-50/50 w-full">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl text-gray-900 tracking-tight mb-6 text-balance">
              {t('faq.title', { defaultValue: 'Häufig gestellte Fragen' })}
            </h2>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 bg-white w-full">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-1.5 rounded-[2rem] bg-black/5 ring-1 ring-black/5 inline-block">
            <div className="bg-white rounded-[calc(2rem-0.375rem)] p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
              <h2 className="font-display font-bold text-4xl text-gray-900 mb-4 tracking-tight text-balance">
                {t('cta_section.title')}
              </h2>
              <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed text-pretty">
                {t('cta_section.text')}
              </p>
              <NavLink
                href="/booking"
                className="group inline-flex items-center px-8 py-4 bg-primary text-slate-900 font-bold rounded-full hover:bg-primary/90 transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-colors motion-reduce:transform-none"
              >
                <span className="uppercase tracking-wider text-sm">{t('cta_section.button')}</span>
                <div className="w-8 h-8 ml-4 rounded-full bg-black/10 flex items-center justify-center transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 motion-reduce:transform-none">
                  <OptimizedIcon icon={Calendar} className="text-sm text-slate-900" />
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
