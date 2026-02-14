import React from 'react';
import { useTranslation } from 'react-i18next';

const logos = [
  'Uniklinik RWTH Aachen',
  'E.ON',
  'RWTH Aachen',
  'Forschungszentrum Jülich',
  'AWO',
  'DLR',
  'Universität Bonn',
  'WZL',
  'BSH',
  'Trobolo',
  'Q-SURE',
  'LDK',
];

export const TrustBar: React.FC = () => {
  const { t } = useTranslation('services');

  return (
    <section className="py-12 border-y border-gray-100 bg-white/50 relative overflow-hidden">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">
          {t('generic_detail.trust.title')}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, index) => (
            <span
              key={index}
              className="text-lg font-bold font-display text-gray-400 hover:text-primary transition-colors cursor-default"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
