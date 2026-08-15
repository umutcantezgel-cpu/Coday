import React from 'react';
import { X, CheckCircle, Sparkle } from '@phosphor-icons/react/dist/ssr';

interface ComparisonRow {
  metric: string;
  traditional: string;
  coday: string;
  highlight?: boolean;
}

const comparisonData: ComparisonRow[] = [
  {
    metric: 'Ladezeit & TTFB',
    traditional: '2.8s – 5.4s (Monolithisches PHP & DB-Queries)',
    coday: '< 0.3s (Vorkompiliert auf weltweitem Vercel Edge-CDN)',
    highlight: true,
  },
  {
    metric: 'Google Core Web Vitals',
    traditional: '35–65 / 100 (Häufige CLS-Sprünge & Render-Blocking)',
    coday: '100 / 100 Punkte (Grüner P75-Bereich auf Mobile & Desktop)',
    highlight: true,
  },
  {
    metric: 'Sicherheits-Architektur',
    traditional: 'Hohe Angriffsfläche durch WordPress-Plugins & offene SQL-Datenbanken',
    coday: '0% CMS-Angriffsfläche (Reine statische Auslieferung & Server Actions)',
  },
  {
    metric: 'Wartungsaufwand & Stabilität',
    traditional: '4–8 Std. / Monat für manuelle Plugin-Updates, Backups & Crash-Fixes',
    coday: '0 Std. Wartungsstress (Keine Plugin-Konflikte, automatisierte CI/CD-Pipelines)',
  },
  {
    metric: 'Quellcode & Eigentum',
    traditional: 'Gefangen in Theme-Templates & Page-Builder Lizenzen (Vendor-Lock-in)',
    coday: '100% uneingeschränktes Eigentum an sauberem TypeScript/React Quellcode',
  },
  {
    metric: 'Lead-Architekt & Support',
    traditional: 'Wechselnde Junior-Entwickler & Callcenter-Zwischenhändler',
    coday: 'Direkter Draht zu Inhaber & Lead-Architekt Umutcan Emre Tezgel',
    highlight: true,
  },
];

export const AgencyComparisonTable: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-y border-slate-900">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 backdrop-blur-md">
            <Sparkle className="w-4 h-4 text-amber-400" />
            DER TECHNOLOGISCHE VORSPRUNG
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            Next.js Edge vs. Klassischer Agentur-Standard
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Warum mittelständische Marktführer von veralteten WordPress- & Template-Systemen auf
            unsere maßgeschneiderte Next.js-Architektur wechseln.
          </p>
        </div>

        {/* Desktop & Tablet Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th
                  scope="col"
                  className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/4"
                >
                  Leistungsmerkmal
                </th>
                <th scope="col" className="py-5 px-6 text-base font-bold text-slate-400 w-[37.5%]">
                  Klassische WordPress-Agentur
                </th>
                <th
                  scope="col"
                  className="py-5 px-6 text-base font-extrabold text-amber-400 w-[37.5%] bg-amber-950/20 border-l border-amber-500/20"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Coday Webagentur (Next.js Edge)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {comparisonData.map((row, index) => (
                <tr
                  key={index}
                  className={`hover:bg-slate-800/30 transition-colors ${
                    row.highlight ? 'bg-amber-500/[0.02]' : ''
                  }`}
                >
                  <th
                    scope="row"
                    className="py-5 px-6 font-semibold text-sm text-slate-200 text-left align-middle"
                  >
                    {row.metric}
                  </th>
                  <td className="py-5 px-6 text-slate-400 text-sm align-middle">
                    <div className="flex items-start gap-3">
                      <X size={20} className="text-red-400 shrink-0 mt-0.5" />
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-white text-sm font-medium align-middle bg-amber-950/10 border-l border-amber-500/20">
                    <div className="flex items-start gap-3">
                      <CheckCircle
                        size={20}
                        weight="fill"
                        className="text-amber-400 shrink-0 mt-0.5"
                      />
                      <span className="text-slate-100">{row.coday}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Value Highlights under table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-amber-400 font-bold text-base mb-1">Kein Vendor-Lock-in</div>
            <p className="text-slate-400 text-xs sm:text-sm">
              Sie erhalten 100% Quellcode-Eigentum ohne monatliche Knebelverträge oder teure
              Lizenzabos.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-amber-400 font-bold text-base mb-1">Messbare B2B-Conversions</div>
            <p className="text-slate-400 text-xs sm:text-sm">
              60-Sekunden Express-Recruiting und optimierte Anfragestrecken verdoppeln die
              Lead-Quote.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-amber-400 font-bold text-base mb-1">100% Inhaber-Garantie</div>
            <p className="text-slate-400 text-xs sm:text-sm">
              Persönliche Projektleitung durch Umutcan Emre Tezgel — schnell, verbindlich und
              präzise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyComparisonTable;
