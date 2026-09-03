import React from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link as NavLink } from '@/i18n/navigation';
import Image from 'next/image';
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  LockKey,
  MinusCircle,
  Percent,
  PlusCircle,
  SealCheck,
  ShieldCheck,
  Sparkle,
} from '@phosphor-icons/react/dist/ssr';
import GradientText from '@/shared/ui/GradientText';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { PACKAGE_LIST } from '@/shared/data/packages';

import { PackagesConfigurator } from './PackagesConfigurator';
import { FaqAccordion } from './FaqAccordion';
import { StepInitializer } from './StepInitializer';
import {
  isComparisonToken,
  type ComparisonRowCopy,
  type ComparisonToken,
  type FaqItemCopy,
  type PillarCopy,
  type StepCopy,
} from '../model/types';

const PILLAR_ICONS = [Percent, SealCheck, LockKey];

const TOKEN_STYLE: Record<ComparisonToken, { icon: React.ElementType; className: string }> = {
  included: { icon: CheckCircle, className: 'text-emerald-700' },
  addon: { icon: PlusCircle, className: 'text-slate-500' },
  voluntary: { icon: PlusCircle, className: 'text-slate-500' },
  no: { icon: MinusCircle, className: 'text-slate-400' },
};

export default async function Packages() {
  const t = await getTranslations('pricing');
  const locale = await getLocale();

  const steps = t.raw('how.steps') as StepCopy[];
  const pillars = t.raw('proof.pillars') as PillarCopy[];
  const rows = t.raw('comparison.rows') as ComparisonRowCopy[];
  const faqItems = t.raw('faq.items') as FaqItemCopy[];
  const trustItems = t.raw('final_cta.trust') as string[];

  const metricKeys = ['performance', 'accessibility', 'best_practices', 'seo'] as const;

  const renderValue = (value: string, highlight: boolean) => {
    if (isComparisonToken(value)) {
      const { icon: Icon, className } = TOKEN_STYLE[value];
      return (
        <span
          className={`inline-flex items-center gap-1.5 text-xs sm:text-sm ${className} ${highlight ? 'font-semibold' : 'font-medium'}`}
        >
          <Icon weight={value === 'included' ? 'fill' : 'regular'} className="w-4 h-4 shrink-0" />
          {t(`comparison.values.${value}`)}
        </span>
      );
    }
    return (
      <span
        className={`text-xs sm:text-sm ${highlight ? 'font-bold text-slate-900' : 'text-slate-700'}`}
      >
        {value}
      </span>
    );
  };

  return (
    <div className="min-h-[100dvh] bg-[#fafafa] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <StepInitializer />

      {/* Hero */}
      <section className="pt-4 pb-12 lg:pt-8 lg:pb-16 px-4 w-full relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <Breadcrumbs />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-50 text-amber-800 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <Sparkle className="w-4 h-4 text-amber-600" />
            {t('hero.badge')}
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-slate-900 leading-[1.1] tracking-tight mb-8 max-w-5xl mx-auto">
            {t('hero.title')}{' '}
            <GradientText
              colors={[
                'var(--color-primary-600)',
                'var(--color-secondary-800)',
                'var(--color-primary-600)',
              ]}
              animationSpeed={5}
              showBorder={false}
              className="inline-block"
            >
              {t('hero.title_highlight')}
            </GradientText>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#packages-selection"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 text-white font-bold rounded-full hover:bg-primary-800 transition duration-300 shadow-md hover:scale-[1.02]"
            >
              <span>{t('hero.cta_primary')}</span>
              <ArrowRight weight="bold" className="w-5 h-5" />
            </a>
            <NavLink
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-medium hover:bg-slate-50 transition duration-300 shadow-sm"
            >
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>{t('hero.cta_secondary')}</span>
            </NavLink>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://www.google.com/maps?cid=8570940562624494590"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 text-xs sm:text-sm font-medium hover:border-amber-400 hover:shadow-md transition-all group"
              title={t('hero.reviews_google_title')}
            >
              <span className="font-bold text-slate-900">5,0 / 5,0</span>
              <span className="text-amber-500 tracking-wider">★★★★★</span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                {t('hero.reviews_google')}
              </span>
            </a>
            <a
              href="https://www.provenexpert.com/de-de/coday-webagentur/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 text-xs sm:text-sm font-medium hover:border-emerald-500 hover:shadow-md transition-all group"
              title={t('hero.reviews_provenexpert_title')}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" />
              <span className="font-bold text-slate-900">5,0 / 5,0</span>
              <span className="text-amber-500 tracking-wider">★★★★★</span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                {t('hero.reviews_provenexpert')}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white border-y border-slate-200 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              {t('how.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2">
              {t('how.title')}
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <li
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex gap-4"
              >
                <span className="w-10 h-10 rounded-full bg-amber-500 text-white font-display font-black flex items-center justify-center shrink-0 shadow-md">
                  {idx + 1}
                </span>
                <div>
                  <p className="font-display font-bold text-lg text-slate-900 mb-1">{step.title}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why Coday */}
      <section className="py-20 bg-[#fafafa] w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              {t('proof.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              {t('proof.title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{t('proof.text')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {pillars.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx] ?? SealCheck;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-500/40 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-6 text-amber-600 border border-amber-200/50">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block mb-1">
                    {pillar.subtitle}
                  </span>
                  <p className="font-display font-bold text-xl text-slate-900 mb-3">
                    {pillar.title}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">{pillar.text}</p>
                </div>
              );
            })}
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-lg relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {t('proof.badge')}
                </span>
                <p className="text-2xl sm:text-3xl font-display font-bold text-slate-900 leading-tight">
                  {t('proof.headline')}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">{t('proof.body')}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  {metricKeys.map((key) => (
                    <div
                      key={key}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center shadow-sm"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-display">
                        100
                      </div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-1">
                        {t(`proof.metrics.${key}`)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <span className="text-xs font-bold text-slate-700">
                      {t('proof.screenshot_label')}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 whitespace-nowrap">
                      {t('proof.screenshot_score')}
                    </span>
                  </div>
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 bg-white">
                    <Image
                      src="/images/audits/pagespeed-desktop-100.png"
                      alt={t('proof.screenshot_alt')}
                      fill
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages, finder, extras, summary */}
      <PackagesConfigurator />

      {/* Comparison */}
      <section className="py-24 px-4 bg-white border-y border-slate-200 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              {t('comparison.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              {t('comparison.title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">{t('comparison.subtitle')}</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-md">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <caption className="sr-only">{t('comparison.title')}</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 bg-slate-50 p-4 sm:p-5 text-xs font-bold text-slate-500 uppercase min-w-[180px]"
                  >
                    {t('comparison.col_feature')}
                  </th>
                  {PACKAGE_LIST.map((pkg) => (
                    <th
                      key={pkg.id}
                      scope="col"
                      className={`p-4 sm:p-5 text-center text-sm font-bold ${
                        pkg.popular
                          ? 'text-amber-900 bg-amber-50/80 border-x border-amber-200/60'
                          : 'text-slate-700'
                      }`}
                    >
                      <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                        {t('tier_label', { tier: pkg.tier, total: PACKAGE_LIST.length })}
                      </span>
                      {t(`packages.${pkg.id}.name`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <tr key={row.key}>
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-white p-4 sm:p-5 text-sm font-semibold text-slate-900 text-left"
                    >
                      {row.label}
                    </th>
                    {PACKAGE_LIST.map((pkg) => (
                      <td
                        key={pkg.id}
                        className={`p-4 sm:p-5 text-center ${
                          pkg.popular ? 'bg-amber-50/40 border-x border-amber-200/60' : ''
                        }`}
                      >
                        {renderValue(row[pkg.id], pkg.popular)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-[#fafafa] w-full">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              {t('faq.label')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-2 mb-4">
              {t('faq.title')}
            </h2>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-slate-50/80 border-t border-slate-200 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 mb-6">
            {t('final_cta.title')}
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('final_cta.text')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <NavLink
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary-700 text-white font-bold rounded-full hover:bg-primary-800 transition duration-300 shadow-xl shadow-primary-700/20 hover:scale-[1.02] text-lg"
            >
              <span>{t('final_cta.cta')}</span>
              <ArrowRight weight="bold" className="w-5 h-5" />
            </NavLink>
            <NavLink
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white text-slate-700 font-semibold rounded-full border border-slate-200 hover:bg-slate-50 transition duration-300 shadow-sm"
            >
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>{t('final_cta.cta_secondary')}</span>
            </NavLink>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-600">
            {trustItems.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <CheckCircle weight="fill" className="w-4 h-4 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
          <NavLink
            href="/garantie"
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-amber-800 hover:text-amber-900 underline underline-offset-4"
          >
            {t('final_cta.guarantees_link')}
            <ArrowRight className="w-4 h-4" />
          </NavLink>
          <span className="sr-only">{locale}</span>
        </div>
      </section>
    </div>
  );
}
