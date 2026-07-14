'use client';

import React from 'react';
import { SeoHead } from '@/shared/ui/SeoHead';
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

const Garantie: React.FC = () => {
  return (
    <div className="min-h-dvh bg-background-light">
      <SeoHead
        title="Unsere Garantien | Coday"
        description="Risikofrei durchstarten: Entdecken Sie unsere Lighthouse-90-Garantie, No-Vendor-Lock-Garantie und Festpreis-Garantie."
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'Garantie', url: 'https://www.codayweb.de/garantie' },
        ]}
      />

      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumbs />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <m.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sapphire font-bold tracking-wider uppercase text-sm mb-4 block"
          >
            Sicherheit für Ihr Business
          </m.span>
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6 break-words hyphens-auto"
          >
            Unsere Garantien
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Wir nehmen Ihnen das Risiko. Mit unseren drei zentralen Coday-Garantien sichern Sie sich
            maximale Leistung, Transparenz und Unabhängigkeit.
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
                Lighthouse-90-Garantie
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Wir garantieren, dass Ihre neue Website zum Go-Live in allen vier Google
                Lighthouse-Kategorien (Performance, Accessibility, Best Practices, SEO) einen Score
                von 90+ erreicht. Sollten wir dies verfehlen, arbeiten wir einen Monat lang
                kostenlos an der Nachbesserung, bis das Ziel erreicht ist.
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
                No-Vendor-Lock-Garantie
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ihre Daten gehören Ihnen. Alle Assets, der Quellcode und sämtliche Zugangsdaten
                werden nach Abschluss der Zahlung vollständig an Sie übergeben. Wir binden Sie nicht
                durch unfaire Knebelverträge an uns – unsere Kunden bleiben, weil sie zufrieden
                sind, nicht weil sie müssen.
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
                Festpreis-Garantie
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Was wir im Statement of Work (SOW) vereinbaren, ist bindend. Es gibt keine
                versteckten Kosten, keine überraschenden Stundenabrechnungen und keine
                Nachforderungen für im SOW definierte Leistungen. Sie haben volle
                Budget-Planungssicherheit.
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
                90-Tage-Sichtbarkeits-Garantie
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Für vereinbarte lokale Suchbegriffe garantieren wir innerhalb von 90 Tagen nach
                Launch eine Platzierung auf Google Seite 1. Sollte dieses Ziel nicht erreicht
                werden, optimieren wir Ihre Seite weitere 90 Tage lang ohne zusätzliche Kosten.
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
              Unser Umgang mit Fehlern
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Sollte es trotz unserer hohen Qualitätsstandards jemals zu einem Garantiefall kommen,
              gehen wir offen damit um. Wir dokumentieren den Fehler transparent in unserem Blog –
              denn durch ehrliche Fehlerkultur und kontinuierliche Verbesserung wächst echtes
              Vertrauen.
            </p>
          </m.div>
        </div>
      </div>
    </div>
  );
};

export default Garantie;
