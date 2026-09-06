'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { LeadQuickForm } from '@/features/lead/ui/LeadQuickForm';
import { CheckCircle, Sparkle } from '@phosphor-icons/react/dist/ssr';

export interface LocalBottomContactSectionProps {
  cityName: string;
  sourceTag: string;
  badgeText?: string;
  heading?: string;
  subheading?: string;
  districts?: Array<{ name: string; label: string }>;
}

/**
 * Bottom-of-page request section for local landing pages: plain-language
 * promise on the left, the site-wide quick form (with an optional district
 * picker) on the right.
 */
export const LocalBottomContactSection: React.FC<LocalBottomContactSectionProps> = ({
  cityName,
  sourceTag,
  badgeText,
  heading,
  subheading,
  districts,
}) => {
  const isEn = useLocale() === 'en';

  const bullets = isEn
    ? [
        'Fixed price after a free call, no hidden costs',
        `Live in 10 to 14 business days, made for ${cityName}`,
        'You talk directly to the developer, no call centre',
      ]
    : [
        'Fester Preis nach kostenlosem Gespräch, keine versteckten Kosten',
        `In 10 bis 14 Werktagen online, gemacht für ${cityName}`,
        'Sie sprechen direkt mit dem Entwickler, kein Callcenter',
      ];

  return (
    <section className="w-full bg-slate-50 border-y border-slate-200 px-4 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <Sparkle className="h-4 w-4 text-amber-600" />
            {badgeText ?? (isEn ? `Website for ${cityName}` : `Website für ${cityName}`)}
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            {heading ??
              (isEn ? `Your new website for ${cityName}` : `Ihre neue Website für ${cityName}`)}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {subheading ??
              (isEn
                ? 'Tell me in one sentence what you need. I get back to you within 24 hours with an honest assessment and a fixed-price quote after a short call.'
                : 'Sagen Sie mir in einem Satz, worum es geht. Ich melde mich innerhalb von 24 Stunden mit einer ehrlichen Einschätzung und nach einem kurzen Gespräch mit einem Festpreis-Angebot.')}
          </p>
          <ul className="mt-6 space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-slate-700">
                <CheckCircle weight="fill" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <LeadQuickForm
            variant="inline"
            formKind="local"
            source={sourceTag}
            cityName={cityName}
            project={`Webdesign ${cityName}`}
            districts={districts}
          />
        </div>
      </div>
    </section>
  );
};

export default LocalBottomContactSection;
