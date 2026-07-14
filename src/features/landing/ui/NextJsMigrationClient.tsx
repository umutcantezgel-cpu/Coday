'use client';

import React from 'react';
import { SeoHead } from '@/shared/ui/SeoHead';
import { Code, RocketLaunch, ShieldCheck, Lightning } from '@phosphor-icons/react/dist/ssr';

const NextJsMigration: React.FC = () => {
  return (
    <div className="bg-background-light min-h-dvh">
      <SeoHead
        title="Next.js Migration & Relaunch | High-Performance von Coday"
        description="Wechseln Sie zu Next.js für unübertroffene Geschwindigkeit, bessere SEO und zukunftssichere Architektur. Ihr Experte für Next.js Migrationen."
        pageType="service"
      />

      <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-black"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-6 block flex items-center justify-center gap-2">
            <Code size={20} weight="fill" aria-hidden="true" /> Next.js Enterprise Migration
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl mb-6 tracking-tight">
            Von Legacy zu Next.js:
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Der Performance-Boost für Ihr Business
            </span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Langsame Ladezeiten und schlechte Core Web Vitals kosten Sie bares Geld. Migrieren Sie
            jetzt auf React und Next.js für maximale Performance und Konversion.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="active:scale-[0.97] bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-colors motion-reduce:duration-[0.01ms] shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transform hover:-translate-y-1">
              Migrations-Audit anfragen
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-secondary">
              Warum eine Next.js Migration?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors motion-reduce:duration-[0.01ms]">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Lightning
                  size={32}
                  className="text-blue-600"
                  weight="duotone"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Extreme Geschwindigkeit</h3>
              <p className="text-slate-600">
                Dank SSR und SSG laden Ihre Seiten in Millisekunden. Perfekte Core Web Vitals
                garantiert.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors motion-reduce:duration-[0.01ms]">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <RocketLaunch
                  size={32}
                  className="text-blue-600"
                  weight="duotone"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">SEO-Dominanz</h3>
              <p className="text-slate-600">
                Suchmaschinen lieben Next.js. Verbessern Sie Ihr Ranking durch serverseitiges
                Rendering.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors motion-reduce:duration-[0.01ms]">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck
                  size={32}
                  className="text-blue-600"
                  weight="duotone"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Zukunftssicherheit</h3>
              <p className="text-slate-600">
                Enterprise-Architektur, die skaliert. Der Standard für moderne und komplexe
                Webanwendungen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-aurora-white relative border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-secondary mb-6">
            Lassen Sie uns Ihre Migration planen
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Ohne Downtime. Ohne Ranking-Verlust. Mit maximalem ROI.
          </p>
          <button className="active:scale-[0.97] bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary/90 transition-colors motion-reduce:duration-[0.01ms] shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Kostenlose Potenzialanalyse sichern
          </button>
        </div>
      </section>
    </div>
  );
};

export default NextJsMigration;
