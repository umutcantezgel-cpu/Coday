import React from 'react';
import { Icon } from '@/shared/ui/Icon';

const AgencyComparisonTable: React.FC = () => {
  const features = [
    {
      name: 'Geschwindigkeit',
      old: 'Wochen oder Monate (Aufgebläht)',
      new: 'Tage oder Wochen (Das Coday Protokoll)',
    },
    {
      name: 'Preismodell',
      old: 'Stundensätze & Versteckte Kosten',
      new: 'Flat Rate & Transparent',
    },
    {
      name: 'Technologie',
      old: 'WordPress / Baukästen (Langsam)',
      new: 'Next.js / React (Instant)',
    },
    {
      name: 'Rechte',
      old: 'Vendor Lock-in',
      new: '100% Code-Eigentum',
    },
    {
      name: 'Kontakt',
      old: 'Account Manager (Mittelsmann)',
      new: 'Direkter Entwickler-Zugang',
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-secondary text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight mb-6">
            Traditionell vs. <span className="text-[#22b8b8]">Coday</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Hör auf für Ineffizienz zu bezahlen. Wähle das Protokoll, das gewinnt.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-6 px-4 text-sm font-bold text-gray-300 uppercase tracking-widest w-1/4">
                  Metrik
                </th>
                <th className="py-6 px-4 text-xl font-bold text-gray-300 w-1/3">
                  Traditionelle Agentur
                </th>
                <th className="py-6 px-4 text-xl font-black text-white w-1/3">
                  <span className="inline-block py-1 px-3 rounded bg-[#22b8b8]/20 text-[#22b8b8] text-sm align-middle mr-2">
                    Coday
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 md:py-8 px-4 font-mono text-sm text-gray-300 uppercase">
                    {feature.name}
                  </td>
                  <td className="py-4 md:py-8 px-4 text-gray-300 text-lg flex items-center">
                    <Icon name="close" className="text-gray-600 mr-3" />
                    {feature.old}
                  </td>
                  <td className="py-4 md:py-8 px-4 text-white text-lg font-bold relative">
                    <div className="flex items-center">
                      <Icon name="check_circle" className="text-primary mr-3 shadow-glow" />
                      {feature.new}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AgencyComparisonTable;
