import React from 'react';
import { Buildings, Factory, Wrench } from '@phosphor-icons/react/dist/ssr';
import { CityData } from '@/features/local-seo/model/cities';

export const RegionalSectors: React.FC<{ city: CityData }> = ({ city }) => {
  return (
    <section className="py-[var(--space-section)] bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Branchenschwerpunkte in {city.displayName}
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Als Webagentur mit Fokus auf das Handwerk und B2B verstehen wir die spezifischen
            Anforderungen der dominierenden Wirtschaftsstrukturen in der Region{' '}
            {city.proximityCluster}.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {city.dominantB2BSectors.slice(0, 3).map((sector, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {idx === 0 ? (
                  <Factory weight="duotone" className="w-8 h-8" />
                ) : idx === 1 ? (
                  <Wrench weight="duotone" className="w-8 h-8" />
                ) : (
                  <Buildings weight="duotone" className="w-8 h-8" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{sector}</h3>
              <p className="text-muted leading-relaxed">
                Wir entwickeln maßgeschneiderte digitale Lösungen und Automatisierungsprozesse für
                Unternehmen aus dem Bereich {sector} in {city.displayName}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
