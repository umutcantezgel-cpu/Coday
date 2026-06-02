import React from 'react';
import Image from 'next/image';

export const ProvenExpertSeal: React.FC = () => {
  return (
    <a
      href="https://www.provenexpert.com/coday-web-agentur/"
      target="_blank"
      rel="noopener noreferrer"
      title="Bewertungen zu Coday Web-Agentur auf ProvenExpert"
      aria-label="Kundenbewertungen & Erfahrungen zu Coday Web-Agentur"
      className="inline-block transition-transform hover:scale-105 hover:-translate-y-1 duration-300"
    >
      {/* 
        HINWEIS: ProvenExpert generiert für jeden Account einen spezifischen Image-Hash.
        Falls dieses generische Format nicht lädt, ersetze die src durch deinen echten 
        Bild-Link aus dem ProvenExpert Dashboard (Reiter: Reputation Boost > Rating Seals).
      */}
      <Image
        src="https://images.provenexpert.com/de/coday-web-agentur/widget_portrait_250_de_0.png"
        alt="Kundenbewertungen & Erfahrungen zu Coday Web-Agentur"
        width={180}
        height={216}
        loading="lazy"
        className="object-contain"
        unoptimized // Verhindert zusätzliche Vercel-Kosten, da es bereits optimiert von PE kommt
      />
    </a>
  );
};
