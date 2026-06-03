import React from 'react';
import { Star } from '@phosphor-icons/react/dist/ssr';

export const ProvenExpertSeal: React.FC = () => {
  return (
    <a
      href="https://www.provenexpert.com/coday-web-agentur/"
      target="_blank"
      rel="noopener noreferrer"
      title="Bewertungen zu Coday Web-Agentur auf ProvenExpert"
      aria-label="Kundenbewertungen & Erfahrungen zu Coday Web-Agentur"
      className="group inline-flex flex-col items-center bg-white border border-secondary-200 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-primary-200 hover:-translate-y-1 transition-all duration-300 w-full max-w-56"
    >
      <span className="text-xs font-bold tracking-widest text-secondary-500 uppercase mb-2">
        Sehr Gut
      </span>
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} weight="fill" className="w-5 h-5 text-yellow-400 drop-shadow-sm" />
        ))}
      </div>
      <div className="flex items-baseline gap-1.5 mb-4">
        <span className="font-display font-black text-3xl text-secondary-900 leading-none">5.00</span>
        <span className="text-sm font-medium text-secondary-500">/ 5.00</span>
      </div>
      <div className="flex items-center gap-2 pt-3 border-t border-secondary-100 w-full justify-center text-secondary-900 font-bold text-sm group-hover:text-blue-700 transition-colors">
        <span className="w-2 h-2 rounded-full bg-blue-700"></span>
        ProvenExpert
      </div>
    </a>
  );
};
