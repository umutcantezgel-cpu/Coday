'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link as NavLink } from '@/i18n/navigation';
import { CheckCircle, ShieldCheck, Sparkle } from '@phosphor-icons/react/dist/ssr';
import { LeadQuickForm } from '@/features/lead/ui/LeadQuickForm';

export interface LocalConversionBlockProps {
  /** City or county name as it should appear in copy, e.g. "Gießen". */
  cityName?: string;
  /** Industry slug and label for industry pages, e.g. { slug: 'gastronomie', label: 'Gastronomie' }. */
  industry?: { slug: string; label: string | { de: string; en: string } };
  sourceTag: string;
  districts?: Array<{ name: string; label: string }>;
  /** Real reference from the region, shown next to the form. Never invented. */
  reference?: { name: string; result: string; href?: string };
  id?: string;
}

/**
 * The one conversion section for every local and industry landing page:
 * plain-language promise, "So geht's" in three steps, guarantees and the
 * site-wide quick form. Replaces the hand-written bottom CTA sections.
 */
export default function LocalConversionBlock({
  cityName,
  industry,
  sourceTag,
  districts,
  reference,
  id = 'lead-form',
}: LocalConversionBlockProps) {
  const locale = useLocale();
  const isEn = locale === 'en';

  const where = cityName ? `in ${cityName}` : '';
  const industryLabel = industry
    ? typeof industry.label === 'string'
      ? industry.label
      : industry.label[isEn ? 'en' : 'de']
    : '';
  const who = industry
    ? isEn
      ? `for ${industryLabel}`
      : `für ${industryLabel}`
    : isEn
      ? 'for trades, practices and service providers'
      : 'für Handwerksbetriebe, Praxen und Dienstleister';

  const heading = isEn
    ? `Your new website ${where}: fixed price, built personally by the developer`
    : `Ihre neue Website ${where}: fester Preis, persönlich vom Entwickler`;

  const intro = isEn
    ? `A website ${who} ${where} that loads in under half a second, looks good on every phone and brings in inquiries. Tell me in one sentence what you need; I get back to you within 24 hours.`
    : `Eine Website ${who} ${where}, die in unter einer halben Sekunde lädt, auf jedem Handy gut aussieht und Anfragen bringt. Sagen Sie mir in einem Satz, worum es geht. Ich melde mich innerhalb von 24 Stunden.`;

  const steps = isEn
    ? [
        {
          title: 'Send a quick request',
          text: 'Name, phone or e-mail, one sentence. That is all.',
        },
        {
          title: 'Free call within 24 hours',
          text: 'About 15 minutes: what should the site achieve, who are your customers, what exists already?',
        },
        {
          title: 'Fixed-price quote',
          text: 'Binding, no hidden costs. You only pay once you accept it. Live in 10 to 14 business days.',
        },
      ]
    : [
        {
          title: 'Kurz anfragen',
          text: 'Name, Telefon oder E-Mail, ein Satz. Mehr braucht es nicht.',
        },
        {
          title: 'Kostenloses Gespräch binnen 24 Stunden',
          text: 'Etwa 15 Minuten: Was soll die Seite erreichen, wer sind Ihre Kunden, was gibt es schon?',
        },
        {
          title: 'Festpreis-Angebot',
          text: 'Verbindlich, ohne versteckte Kosten. Sie zahlen erst, wenn Sie es annehmen. In 10 bis 14 Werktagen online.',
        },
      ];

  const guarantees = isEn
    ? [
        'Fixed-price guarantee',
        '50% at kick-off, 50% after approval',
        'The website belongs to you 100%',
      ]
    : [
        'Festpreis-Garantie',
        '50 % bei Start, 50 % nach Freigabe',
        'Die Website gehört zu 100 % Ihnen',
      ];

  return (
    <section
      id={id}
      className="w-full scroll-mt-24 border-y border-slate-200 bg-slate-50 px-4 py-16 sm:py-20"
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <Sparkle className="h-4 w-4 text-amber-600" />
            {isEn ? 'Reply within 24 hours' : 'Antwort innerhalb von 24 Stunden'}
          </span>
          <h2
            id={`${id}-heading`}
            className="font-display mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl"
          >
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{intro}</p>

          <ol className="mt-8 space-y-4">
            {steps.map((step, idx) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-700 font-display font-black text-white shadow-md">
                  {idx + 1}
                </span>
                <div>
                  <p className="font-display font-bold text-slate-900">{step.title}</p>
                  <p className="text-sm leading-relaxed text-slate-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-700">
            {guarantees.map((g) => (
              <li key={g} className="inline-flex items-center gap-2">
                <CheckCircle weight="fill" className="h-4 w-4 text-emerald-600" />
                {g}
              </li>
            ))}
          </ul>
          <NavLink
            href="/garantie"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 underline underline-offset-4 hover:text-amber-900"
          >
            <ShieldCheck className="h-4 w-4" />
            {isEn ? 'See all guarantees' : 'Alle Garantien ansehen'}
          </NavLink>

          {reference && (
            <figure className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
              <blockquote className="text-sm leading-relaxed text-slate-700">
                {reference.result}
              </blockquote>
              <figcaption className="mt-2 text-xs font-semibold text-slate-500">
                {reference.href ? (
                  <a
                    href={reference.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-800"
                  >
                    {reference.name}
                  </a>
                ) : (
                  reference.name
                )}
              </figcaption>
            </figure>
          )}
        </div>

        <div className="lg:col-span-6">
          <LeadQuickForm
            variant="inline"
            formKind={industry ? 'industries' : 'local'}
            source={sourceTag}
            cityName={cityName}
            industry={industry?.slug}
            project={
              cityName
                ? `Webdesign ${cityName}`
                : industry
                  ? `Webdesign ${industryLabel}`
                  : undefined
            }
            districts={districts}
          />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
            <a
              href="https://www.google.com/maps?cid=8570940562624494590"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium hover:border-amber-400"
            >
              <span className="text-amber-500">★★★★★</span> 5,0 · Google
            </a>
            <a
              href="https://www.provenexpert.com/de-de/coday-webagentur/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium hover:border-emerald-400"
            >
              <span className="text-amber-500">★★★★★</span> 5,0 · ProvenExpert
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
