import { cache } from 'react';

export interface IndustryData {
  id: string;
  title: string;
  titlePlural: string;
  wikiUrl: string;
  painPoint: string;
}

export interface LocationData {
  id: string;
  name: string;
  wikiUrl: string;
  benchmarkLcp: number;
}

// React cache() dedupliziert parallele DB-Calls pro Server-Request-Zyklus und schützt vor Cache-Stampedes.
export const getIndustryData = cache(async (industryId: string): Promise<IndustryData | null> => {
  const industries: Record<string, IndustryData> = {
    'arzt': {
      id: 'arzt',
      title: 'Arzt',
      titlePlural: 'Ärzte',
      wikiUrl: 'https://www.wikidata.org/wiki/Q65042823',
      painPoint: 'Hohe Absprungraten bei mobiler Terminvereinbarung durch langsame Ladezeiten.'
    },
    'handwerker': {
      id: 'handwerker',
      title: 'Handwerker',
      titlePlural: 'Handwerker',
      wikiUrl: 'https://www.wikidata.org/wiki/Q1140026',
      painPoint: 'Mangelndes Vertrauen durch veraltete Webpräsenzen und fehlende Siegel.'
    }
  };
  return industries[industryId.toLowerCase()] || null;
});

export const getLocationData = cache(async (locationId: string): Promise<LocationData | null> => {
  const locations: Record<string, LocationData> = {
    'wetzlar': { id: 'wetzlar', name: 'Wetzlar', wikiUrl: 'https://www.wikidata.org/wiki/Q3874', benchmarkLcp: 3.4 },
    'giessen': { id: 'giessen', name: 'Gießen', wikiUrl: 'https://www.wikidata.org/wiki/Q3874', benchmarkLcp: 3.1 },
    'linden': { id: 'linden', name: 'Linden', wikiUrl: 'https://www.wikidata.org/wiki/Q562771', benchmarkLcp: 3.6 }
  };
  return locations[locationId.toLowerCase()] || null;
});

export const getPredefinedParams = cache(async (): Promise<{ industry: string; location: string }[]> => {
  // Simuliert die Top 100 Prioritäts-Seiten für generateStaticParams
  return [
    { industry: 'arzt', location: 'wetzlar' },
    { industry: 'arzt', location: 'giessen' },
    { industry: 'handwerker', location: 'wetzlar' }
  ];
});
