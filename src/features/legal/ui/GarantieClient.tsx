'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { m } from 'motion/react';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  ShieldCheck,
  LockOpen,
  CurrencyEur,
  RocketLaunch,
  TrendUp,
} from '@phosphor-icons/react/dist/ssr';
import { TrustBadges } from '@/shared/ui/TrustBadges';

const Garantie: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';

  return (
    <div className="min-h-dvh bg-background-light">
      <div className="pt-4 pb-12 md:pt-6 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumbs />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <m.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sapphire font-bold tracking-wider uppercase text-sm mb-4 block"
          >
            {isEn
              ? 'Security for Your Business: Our Guarantees'
              : 'Sicherheit für Ihr Business: Unsere Garantien'}
          </m.h1>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6 break-words hyphens-auto"
          >
            {isEn ? 'Agency Guarantees' : 'Agentur Garantien'}
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {isEn
              ? 'We offer real security for your business through our guarantees. We take the risk off your shoulders. With our core Coday guarantees, you secure maximum performance, transparency, and independence.'
              : 'Wir bieten echte Sicherheit für Ihr Business durch unsere Garantien. Wir nehmen Ihnen das Risiko. Mit unseren drei zentralen Coday-Garantien sichern Sie sich maximale Leistung, Transparenz und Unabhängigkeit.'}
          </m.p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity motion-reduce:duration-[0.01ms]">
                <OptimizedIcon
                  icon={RocketLaunch}
                  className="text-9xl text-sapphire"
                  aria-hidden="true"
                />
              </div>
              <OptimizedIcon
                icon={RocketLaunch}
                className="text-4xl text-sapphire mb-6"
                aria-hidden="true"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 break-words hyphens-auto">
                {isEn ? 'Lighthouse 90 Guarantee' : 'Lighthouse-90-Garantie'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isEn
                  ? 'We guarantee that your new website will achieve a score of 90+ in all four Google Lighthouse categories (Performance, Accessibility, Best Practices, SEO) at launch. If we fall short, we will work on improvements free of charge for one month until the goal is reached.'
                  : 'Wir garantieren, dass Ihre neue Website zum Go-Live in allen vier Google Lighthouse-Kategorien (Performance, Accessibility, Best Practices, SEO) einen Score von 90+ erreicht. Sollten wir dies verfehlen, arbeiten wir einen Monat lang kostenlos an der Nachbesserung, bis das Ziel erreicht ist.'}
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity motion-reduce:duration-[0.01ms]">
                <OptimizedIcon
                  icon={LockOpen}
                  className="text-9xl text-sapphire"
                  aria-hidden="true"
                />
              </div>
              <OptimizedIcon
                icon={LockOpen}
                className="text-4xl text-sapphire mb-6"
                aria-hidden="true"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 break-words hyphens-auto">
                {isEn ? 'No Vendor Lock-In Guarantee' : 'No-Vendor-Lock-Garantie'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isEn
                  ? 'Your data belongs to you. All assets, source code, and credentials are fully handed over to you upon completion of payment. We do not bind you with unfair contracts — our clients stay because they are satisfied, not because they have to.'
                  : 'Ihre Daten gehören Ihnen. Alle Assets, der Quellcode und sämtliche Zugangsdaten werden nach Abschluss der Zahlung vollständig an Sie übergeben. Wir setzen auf partnerschaftliche Zusammenarbeit und Unabhängigkeit – unsere Kunden bleiben, weil sie zufrieden sind.'}
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity motion-reduce:duration-[0.01ms]">
                <OptimizedIcon
                  icon={CurrencyEur}
                  className="text-9xl text-sapphire"
                  aria-hidden="true"
                />
              </div>
              <OptimizedIcon
                icon={CurrencyEur}
                className="text-4xl text-sapphire mb-6"
                aria-hidden="true"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 break-words hyphens-auto">
                {isEn ? 'Fixed Price Guarantee' : 'Festpreis-Garantie'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isEn
                  ? 'What we agree upon in the Statement of Work (SOW) is binding. There are no hidden costs, no surprise hourly invoices, and no additional charges for services defined in the SOW. You have full budget planning certainty.'
                  : 'Was wir im Statement of Work (SOW) vereinbaren, ist bindend. Es gibt keine versteckten Kosten, keine überraschenden Stundenabrechnungen und keine Nachforderungen für im SOW definierte Leistungen. Sie haben volle Budget-Planungssicherheit.'}
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity motion-reduce:duration-[0.01ms]">
                <OptimizedIcon
                  icon={TrendUp}
                  className="text-9xl text-sapphire"
                  aria-hidden="true"
                />
              </div>
              <OptimizedIcon
                icon={TrendUp}
                className="text-4xl text-sapphire mb-6"
                aria-hidden="true"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 break-words hyphens-auto">
                {isEn ? '90-Day Visibility Guarantee' : '90-Tage-Sichtbarkeits-Garantie'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isEn
                  ? 'For agreed-upon local search terms, we guarantee a placement on Google page 1 within 90 days of launch. If this goal is not met, we will continue optimizing your site for an additional 90 days at no extra cost.'
                  : 'Für vereinbarte lokale Suchbegriffe garantieren wir innerhalb von 90 Tagen nach Launch eine Platzierung auf Google Seite 1. Sollte dieses Ziel nicht erreicht werden, optimieren wir Ihre Seite weitere 90 Tage lang ohne zusätzliche Kosten.'}
              </p>
            </m.div>
          </div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-sapphire/5 border border-sapphire/20 rounded-2xl p-8 max-w-4xl mx-auto text-center"
          >
            <OptimizedIcon
              icon={ShieldCheck}
              className="text-5xl text-sapphire mx-auto mb-4"
              aria-hidden="true"
            />
            <h3 className="text-2xl font-bold text-gray-900 mb-4 break-words hyphens-auto">
              {isEn ? 'How We Handle Mistakes' : 'Unser Umgang mit Fehlern'}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {isEn
                ? 'Should a guarantee case ever occur despite our high quality standards, we handle it openly. We document the issue transparently on our blog — because genuine trust grows through an honest culture of learning and continuous improvement.'
                : 'Sollte es trotz unserer hohen Qualitätsstandards jemals zu einem Garantiefall kommen, gehen wir offen damit um. Wir dokumentieren den Fehler transparent in unserem Blog – denn durch ehrliche Fehlerkultur und kontinuierliche Verbesserung wächst echtes Vertrauen.'}
            </p>
          </m.div>

          <div className="mt-16 pt-12 border-t border-gray-200">
            <TrustBadges align="center" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Garantie;
