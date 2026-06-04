'use client';

import React from 'react';

interface IndustryToolEmbedProps {
  toolId?: string;
  industryKey?: string;
  locationKey?: string;
}

export function IndustryToolEmbed({ industryKey }: IndustryToolEmbedProps) {
  let url = '';

  if (industryKey?.toLowerCase().includes('handwerk')) {
    url = 'https://www.coday-agency.de/';
  } else if (
    industryKey?.toLowerCase().includes('gesundheit') ||
    industryKey?.toLowerCase().includes('arzt')
  ) {
    url = 'https://praxis-seven-ashy.vercel.app/';
  } else {
    // Automobil coming soon
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 text-center h-64 flex flex-col items-center justify-center">
          <div className="w-12 h-12 mb-4 bg-gray-200 rounded-full animate-pulse" />
          <h3 className="text-xl font-display font-semibold mb-2">Spezial-Tool Integration</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Hier wird in Kürze das branchenspezifische Tool für diesen Bereich eingebunden.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 relative z-20 -mt-10">
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h2 className="text-4xl font-display font-black text-secondary-900 mb-4">
          Interaktive Branchenlösung
        </h2>
        <p className="text-lg text-secondary-600 font-medium">
          Testen Sie direkt unser exklusives Tool für Ihre Branche.
        </p>
      </div>
      <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-2xl h-[800px] w-full">
        <iframe
          src={url}
          className="w-full h-full border-none"
          title={`Interaktives Tool für ${industryKey}`}
          loading="lazy"
        />
      </div>
    </section>
  );
}
