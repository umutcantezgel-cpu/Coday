'use client';
import React, { useState } from 'react';

const HeadlessVsShopifyGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'startup' | 'scaleup' | 'enterprise'>('scaleup');

  const comparisons = {
    startup: [
      {
        feat: 'Time to Market',
        std: 'Sehr Schnell (Templates)',
        headless: 'Mittel (Custom Dev)',
        winner: 'std',
      },
      { feat: 'Kosten (Setup)', std: 'Niedrig (< 10k)', headless: 'Mittel (> 25k)', winner: 'std' },
      { feat: 'Performance', std: 'Gut', headless: 'Exzellent', winner: 'headless' },
      { feat: 'Flexibilität', std: 'Limitiert', headless: 'Unbegrenzt', winner: 'headless' },
    ],
    scaleup: [
      { feat: 'Time to Market', std: 'Schnell', headless: 'Schnell (mit Starter)', winner: 'tie' },
      {
        feat: 'Kosten (TCO)',
        std: 'Hoch (Apps, Fees)',
        headless: 'Mittel (Skaleneffekte)',
        winner: 'headless',
      },
      { feat: 'Performance', std: 'Gut', headless: 'Core Web Vitals Winner', winner: 'headless' },
      { feat: 'Flexibilität', std: 'Theme-Zwang', headless: 'Echte Freiheit', winner: 'headless' },
    ],
    enterprise: [
      { feat: 'Time to Market', std: 'Mittel', headless: 'Mittel', winner: 'tie' },
      {
        feat: 'Kosten (TCO)',
        std: 'Sehr Hoch (Revenue Share)',
        headless: 'Niedrig (Flat Hosting)',
        winner: 'headless',
      },
      { feat: 'Performance', std: 'Limitiert', headless: 'Weltklasse', winner: 'headless' },
      {
        feat: 'Flexibilität',
        std: 'Vendor Lock-in',
        headless: 'Microservices',
        winner: 'headless',
      },
    ],
  };

  return (
    <div className="bg-surface-dark border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="font-display font-bold text-2xl text-white mb-4">Architektur Vergleich</h3>
          <p className="text-gray-400">
            Standard Shop vs. Headless Commerce. Was passt zu Ihrer Phase?
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          {(['startup', 'scaleup', 'enterprise'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`active:scale-[0.97] flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all motion-reduce:duration-[0.01ms] ${activeTab === tab ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 bg-white/5 border-b border-white/10 p-4 text-xs uppercase font-bold tracking-wider text-gray-500 mb-4 rounded-t-xl">
        <div>Merkmal</div>
        <div>Standard (Shopify/Woo)</div>
        <div className="text-primary">Headless (Next.js)</div>
      </div>

      <div className="space-y-4">
        {comparisons[activeTab].map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-3 p-4 items-center border-b border-white/5 last:border-0 hover:bg-white/5 rounded-lg transition-colors motion-reduce:duration-[0.01ms]"
          >
            <div className="font-bold text-white">{item.feat}</div>
            <div
              className={`text-sm ${item.winner === 'std' ? 'text-green-400 font-bold' : 'text-gray-400'}`}
            >
              {item.std}
            </div>
            <div
              className={`text-sm ${item.winner === 'headless' ? 'text-primary font-bold' : 'text-gray-400'}`}
            >
              {item.headless}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-xl text-center">
        <p className="text-primary font-bold text-sm">
          {activeTab === 'startup'
            ? 'Empfehlung: Starten Sie mit Shopify Standard. Wechseln Sie später.'
            : 'Empfehlung: Headless ist der einzig logische Schritt für Ihr Wachstum.'}
        </p>
      </div>
    </div>
  );
};

export default HeadlessVsShopifyGrid;
