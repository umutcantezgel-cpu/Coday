'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Sparkle,
  ArrowRight,
  ShieldCheck,
  Lightning,
  CheckCircle,
  MapPin,
} from '@phosphor-icons/react/dist/ssr';
import { LocalHeroContactForm } from './LocalHeroContactForm';

export interface LocalSplitHeroProps {
  badgeText: string;
  headline: string;
  headlineGradient: string;
  description: string;
  cityName: string;
  sourceTag: string;
  formHeading?: string;
  formSubtitle?: string;
  usps?: { title: string; desc: string }[];
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  trustStats?: { value: string; label: string }[];
}

export const LocalSplitHero: React.FC<LocalSplitHeroProps> = ({
  badgeText,
  headline,
  headlineGradient,
  description,
  cityName,
  sourceTag,
  formHeading,
  formSubtitle,
  usps,
  secondaryCtaText,
  secondaryCtaHref = '/work',
  trustStats,
}) => {
  const locale = useLocale();
  const isEn = locale === 'en';

  const defaultUsps = isEn
    ? [
        {
          title: 'Google Core Web Vitals 100/100',
          desc: 'Maximum loading speed under 0.3 seconds on modern Edge networks.',
        },
        {
          title: 'Direct Founder Implementation',
          desc: 'Direct consultation & execution by Umutcan Emre Tezgel without agency overhead.',
        },
        {
          title: 'Transparent Fixed Pricing',
          desc: 'Binding fixed prices & complete source code ownership without vendor lock-in.',
        },
        {
          title: `Local Expertise for ${cityName}`,
          desc: 'Tailored B2B lead systems, recruitment funnels & targeted local SEO.',
        },
      ]
    : [
        {
          title: 'Google Core Web Vitals 100/100',
          desc: 'Maximale Ladezeiten unter 0,3 Sekunden auf weltweitem Edge-Netzwerk.',
        },
        {
          title: 'Direkte Inhaber-Realisierung',
          desc: 'Persönliche Betreuung durch Umutcan Emre Tezgel ohne Agentur-Wasserkopf.',
        },
        {
          title: 'Verbindlicher Festpreis',
          desc: '100% Quellcode-Eigentum, keine Lizenzfallen und transparente Kalkulation.',
        },
        {
          title: `Lokale Expertise für ${cityName}`,
          desc: 'Maßgeschneiderte B2B Lead-Systeme, Mitarbeiter-Funnels & Local SEO.',
        },
      ];

  const activeUsps = usps || defaultUsps;

  const defaultStats = [
    { value: '100/100', label: isEn ? 'PageSpeed Score' : 'Core Web Vitals' },
    { value: '< 0.3s', label: isEn ? 'Edge Load Time' : 'Ladezeit via Edge' },
    { value: '5.0 ★', label: isEn ? 'Verified Rating' : 'Google & ProvenExpert' },
    { value: '100%', label: isEn ? 'Code Ownership' : 'Quellcode-Eigentum' },
  ];

  const activeStats = trustStats || defaultStats;

  return (
    <section className="relative overflow-hidden pt-4 pb-12 md:pt-6 md:pb-16 bg-[#fafafa] border-b border-slate-200/80">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-white/80 to-transparent pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN: Authority Headline, Pitch, Reviews, USPs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Regional Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-50 text-amber-900 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-xs">
              <Sparkle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{badgeText}</span>
            </div>

            {/* H1 Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.12]">
              {headline}{' '}
              <span className="bg-gradient-to-r from-amber-600 via-amber-700 to-teal-700 bg-clip-text text-transparent block sm:inline">
                {headlineGradient}
              </span>
            </h1>

            {/* Pitch Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl">
              {description}
            </p>

            {/* Dual Verified Review Authority Links */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <a
                href="https://maps.app.goo.gl/9SagecgXw7Vf5csH7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-800 hover:border-amber-400 hover:shadow-xs transition-all group"
                title="Google Maps Rezensionen für Coday ansehen"
              >
                <span className="text-amber-500 font-bold">★★★★★ 5.0</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">
                  4 Google-Rezensionen
                </span>
              </a>
              <a
                href="https://www.provenexpert.com/de-de/coday-webagentur/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-800 hover:border-emerald-500 hover:shadow-xs transition-all group"
                title="ProvenExpert Profil von Coday ansehen"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-slate-900">5.0</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600 group-hover:text-emerald-700 transition-colors">
                  ProvenExpert 100% Empfehlung
                </span>
              </a>
            </div>

            {/* 4 Local Key USPs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-8">
              {activeUsps.map((usp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{usp.title}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-snug mt-0.5">
                      {usp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Secondary CTA Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-primary-700 transition-colors group px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300"
              >
                <span>
                  {secondaryCtaText ||
                    (isEn ? 'View Client Work' : `${cityName} Referenzen ansehen`)}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-700 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <a
                href="tel:+4917641195301"
                className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors px-3 py-2"
              >
                Direkt anrufen: +49 (0) 176 41195301
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Embedded Above-the-Fold Contact Form Card */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end mt-4 lg:mt-0 sticky top-28">
            <LocalHeroContactForm
              cityName={cityName}
              sourceTag={sourceTag}
              headingText={formHeading}
              subtitleText={formSubtitle}
            />
          </div>
        </div>

        {/* Bottom Trust Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-5xl mx-auto mt-14 pt-8 border-t border-slate-200/90">
          {activeStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs text-center hover:border-amber-400/50 transition-colors"
            >
              <div className="text-xl sm:text-2xl font-black text-amber-700 font-display">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-600 font-medium mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
