"use client";

import React from 'react';
import { SeoHead } from '@/shared/ui/SeoHead';
import { BuildingOffice, Lightning, ChartLineUp, MapPin } from '@phosphor-icons/react';

// Using dummy imports to make sure components resolve correctly or replacing them with inline if they don't exist.
// Since we don't have exactly the widgets, I will create a high-converting standalone page using Tailwind CSS
// and standard Codayweb styles.

const LocalWetzlar: React.FC = () => {
  return (
    <div className="bg-background-light min-h-dvh">
      <SeoHead
        title="Webdesign Wetzlar | High-Performance Websites von Coday"
        description="Premium Webdesign und Entwicklung in Wetzlar. Wir bauen Websites, die verkaufen. Sichern Sie sich jetzt Ihr kostenloses Audit."
        pageType="service"
      />

      <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-6 block flex items-center justify-center gap-2">
            <MapPin size={20} weight="fill" /> Local Wetzlar Offer
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
            Webdesign Wetzlar:
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
              Mehr Kunden aus der Region
            </span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Ihre Website ist Ihr bester Verkäufer. Wir verwandeln Ihr lokales Geschäft in Wetzlar in
            einen digitalen Kundenmagneten.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Jetzt Potenzial-Analyse sichern
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-aurora-white relative border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Lightning size={32} className="text-primary" weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Maximale Performance</h3>
              <p className="text-slate-600">
                Ladezeiten unter 1 Sekunde für optimale Nutzererfahrung und bessere Google-Rankings
                in Wetzlar.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <ChartLineUp size={32} className="text-primary" weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Auf Conversion optimiert</h3>
              <p className="text-slate-600">
                Datenbasierte Designs, die aus lokalen Besuchern in Wetzlar zahlende Kunden machen.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <BuildingOffice size={32} className="text-primary" weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Regionale Dominanz</h3>
              <p className="text-slate-600">
                Dominieren Sie die Suchergebnisse in Mittelhessen durch gezielte Local-SEO
                Strategien.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-slate-900 z-0"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-display font-bold mb-6">
            Bereit für den nächsten Schritt?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Lassen Sie uns herausfinden, wie wir Ihr Unternehmen in Wetzlar digital skalieren
            können.
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Kostenloses Erstgespräch buchen
          </button>
        </div>
      </section>
    </div>
  );
};

export default LocalWetzlar;
