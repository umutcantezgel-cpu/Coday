import { z } from 'zod';

export const CityDataSchema = z.object({
  slug: z.string(),
  displayName: z.string(),
  stateName: z.string(),
  population: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  dominantB2BSectors: z.array(z.string()),
  majorEmployers: z.array(z.string()).optional(),
  nearestLargerCity: z.string(),
  proximityCluster: z.string(),
  distanceFromWetzlarKm: z.number().optional(),
});

export type CityData = z.infer<typeof CityDataSchema>;

// Haversine formula to calculate distance from Wetzlar HQ
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

const WETZLAR_LAT = 50.5667;
const WETZLAR_LON = 8.5;

// The first 15 Tier-1 cities for initial rollout
const rawCities: Omit<CityData, 'slug'>[] = [
  {
    displayName: 'Wetzlar',
    stateName: 'Hessen',
    population: 53000,
    latitude: 50.5667,
    longitude: 8.5,
    dominantB2BSectors: ['Optik & Feinmechanik', 'Handwerk', 'Industrie', 'Dienstleistungen'],
    majorEmployers: ['Leica', 'Buderus', 'Zeiss'],
    nearestLargerCity: 'Gießen',
    proximityCluster: 'Lahn-Dill',
  },
  {
    displayName: 'Gießen',
    stateName: 'Hessen',
    population: 90000,
    latitude: 50.5833,
    longitude: 8.6667,
    dominantB2BSectors: ['Medizintechnik', 'Forschung', 'Logistik', 'Gesundheitswesen'],
    nearestLargerCity: 'Frankfurt am Main',
    proximityCluster: 'Mittelhessen',
  },
  {
    displayName: 'Marburg',
    stateName: 'Hessen',
    population: 76000,
    latitude: 50.8167,
    longitude: 8.7667,
    dominantB2BSectors: ['Pharma', 'Gesundheit', 'Forschung', 'Bildung'],
    nearestLargerCity: 'Gießen',
    proximityCluster: 'Mittelhessen',
  },
  {
    displayName: 'Frankfurt am Main',
    stateName: 'Hessen',
    population: 750000,
    latitude: 50.1109,
    longitude: 8.6821,
    dominantB2BSectors: ['Finanzen', 'IT & Software', 'Beratung', 'Logistik'],
    nearestLargerCity: 'Frankfurt am Main',
    proximityCluster: 'Rhein-Main',
  },
  {
    displayName: 'Offenbach',
    stateName: 'Hessen',
    population: 130000,
    latitude: 50.1,
    longitude: 8.7833,
    dominantB2BSectors: ['Design', 'Kreativwirtschaft', 'Automotive', 'Dienstleistung'],
    nearestLargerCity: 'Frankfurt am Main',
    proximityCluster: 'Rhein-Main',
  },
  {
    displayName: 'Limburg',
    stateName: 'Hessen',
    population: 35000,
    latitude: 50.3833,
    longitude: 8.0667,
    dominantB2BSectors: ['Handel', 'Logistik', 'Handwerk', 'Medizin'],
    nearestLargerCity: 'Wiesbaden',
    proximityCluster: 'Mittelhessen',
  },
  {
    displayName: 'Bad Homburg',
    stateName: 'Hessen',
    population: 54000,
    latitude: 50.226,
    longitude: 8.618,
    dominantB2BSectors: ['Finanzdienstleistungen', 'Gesundheit', 'Software', 'Consulting'],
    nearestLargerCity: 'Frankfurt am Main',
    proximityCluster: 'Rhein-Main',
  },
  {
    displayName: 'Friedberg',
    stateName: 'Hessen',
    population: 29000,
    latitude: 50.333,
    longitude: 8.75,
    dominantB2BSectors: ['Einzelhandel', 'Handwerk', 'Technologie'],
    nearestLargerCity: 'Frankfurt am Main',
    proximityCluster: 'Wetterau',
  },
  {
    displayName: 'Weilburg',
    stateName: 'Hessen',
    population: 13000,
    latitude: 50.483,
    longitude: 8.266,
    dominantB2BSectors: ['Tourismus', 'Handwerk', 'Dienstleistungen'],
    nearestLargerCity: 'Wetzlar',
    proximityCluster: 'Lahn-Dill',
  },
  {
    displayName: 'Dillenburg',
    stateName: 'Hessen',
    population: 23000,
    latitude: 50.733,
    longitude: 8.283,
    dominantB2BSectors: ['Metallverarbeitung', 'Maschinenbau', 'Handwerk'],
    nearestLargerCity: 'Wetzlar',
    proximityCluster: 'Lahn-Dill',
  },
  {
    displayName: 'Herborn',
    stateName: 'Hessen',
    population: 20000,
    latitude: 50.683,
    longitude: 8.3,
    dominantB2BSectors: ['Pumpenbau', 'Handel', 'Industrie', 'Gastronomie'],
    nearestLargerCity: 'Wetzlar',
    proximityCluster: 'Lahn-Dill',
  },
  {
    displayName: 'Haiger',
    stateName: 'Hessen',
    population: 19000,
    latitude: 50.741,
    longitude: 8.204,
    dominantB2BSectors: ['Stahlbau', 'Maschinenbau', 'Logistik'],
    nearestLargerCity: 'Siegen',
    proximityCluster: 'Lahn-Dill',
  },
  {
    displayName: 'Braunfels',
    stateName: 'Hessen',
    population: 11000,
    latitude: 50.516,
    longitude: 8.383,
    dominantB2BSectors: ['Tourismus', 'Gesundheit', 'Pflege', 'Handwerk'],
    nearestLargerCity: 'Wetzlar',
    proximityCluster: 'Lahn-Dill',
  },
  {
    displayName: 'Aßlar',
    stateName: 'Hessen',
    population: 13000,
    latitude: 50.583,
    longitude: 8.466,
    dominantB2BSectors: ['Vakuumtechnik', 'Feinmechanik', 'Industrie'],
    nearestLargerCity: 'Wetzlar',
    proximityCluster: 'Lahn-Dill',
  },
  {
    displayName: 'Solms',
    stateName: 'Hessen',
    population: 13000,
    latitude: 50.533,
    longitude: 8.4,
    dominantB2BSectors: ['Metallverarbeitung', 'Handwerk', 'Dienstleistungen'],
    nearestLargerCity: 'Wetzlar',
    proximityCluster: 'Lahn-Dill',
  },
];

// Enrich with slug and distance
export const cities: (CityData & { distanceFromWetzlarKm: number })[] = rawCities.map((city) => ({
  ...city,
  slug: city.displayName
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss'),
  distanceFromWetzlarKm: calculateDistance(WETZLAR_LAT, WETZLAR_LON, city.latitude, city.longitude),
}));

export function getCityBySlug(slug: string) {
  return cities.find((c) => c.slug === slug);
}

export function getNearbyCities(currentSlug: string, count: number = 5) {
  const currentCity = getCityBySlug(currentSlug);
  if (!currentCity) return [];

  return cities
    .filter((c) => c.slug !== currentSlug)
    .map((c) => ({
      ...c,
      distanceFromCurrent: calculateDistance(
        currentCity.latitude,
        currentCity.longitude,
        c.latitude,
        c.longitude
      ),
    }))
    .sort((a, b) => a.distanceFromCurrent - b.distanceFromCurrent)
    .slice(0, count);
}
