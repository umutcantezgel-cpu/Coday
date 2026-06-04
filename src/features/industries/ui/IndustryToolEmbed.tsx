'use client';

import React from 'react';

interface IndustryToolEmbedProps {
  toolId?: string;
  industryKey?: string;
  locationKey?: string;
}

export function IndustryToolEmbed({ toolId, industryKey, locationKey }: IndustryToolEmbedProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center h-64 flex flex-col items-center justify-center">
        <div className="w-12 h-12 mb-4 bg-gray-200 rounded-full animate-pulse" />
        <h3 className="text-xl font-display font-semibold mb-2">Partner Tool Integration</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Hier wird in Kürze das branchenspezifische Tool für {industryKey || 'diesen Bereich'} (
          {locationKey || 'Lokal'}) eingebunden. Wir warten noch auf die exakten Links.
        </p>
      </div>
    </section>
  );
}
