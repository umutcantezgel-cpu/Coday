import type { CityData } from '@/shared/data/cities/types';

// Coday HQ coordinates (Wetzlar)
const HQ_LAT = 50.5547;
const HQ_LNG = 8.5042;

/**
 * Haversine distance between two points on Earth in kilometers.
 */
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Calculate distance from Coday HQ in Wetzlar.
 */
export function distanceFromHQ(lat: number, lng: number): number {
  return haversineDistance(HQ_LAT, HQ_LNG, lat, lng);
}

/**
 * Get the N nearest cities to a given city slug.
 */
export function getNearbyCities(allCities: CityData[], currentSlug: string, count = 5): CityData[] {
  const current = allCities.find((c) => c.slug === currentSlug);
  if (!current) return [];

  return allCities
    .filter((c) => c.slug !== currentSlug && c.published)
    .map((c) => ({
      city: c,
      dist: haversineDistance(current.latitude, current.longitude, c.latitude, c.longitude),
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, count)
    .map((item) => item.city);
}

/**
 * Get all cities in the same proximity cluster.
 */
export function getClusterCities(allCities: CityData[], currentSlug: string): CityData[] {
  const current = allCities.find((c) => c.slug === currentSlug);
  if (!current) return [];

  return allCities.filter(
    (c) => c.slug !== currentSlug && c.proximityCluster === current.proximityCluster && c.published
  );
}

/**
 * Deterministic hash for a city slug — used for template rotation.
 * Returns a stable integer based on slug characters.
 */
export function cityHash(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Get hero template index (0-2) for a city.
 */
export function getHeroTemplateIndex(slug: string): number {
  return cityHash(slug) % 3;
}

/**
 * Get FAQ template index (0-4) for a city and question index.
 */
export function getFaqTemplateIndex(slug: string, questionIndex: number): number {
  return (cityHash(slug) + questionIndex * 7) % 5;
}

/**
 * Format population number with German locale.
 */
export function formatPopulation(pop: number): string {
  return new Intl.NumberFormat('de-DE').format(pop);
}

/**
 * Format distance with "km" suffix.
 */
export function formatDistance(km: number): string {
  if (km < 1) return '< 1 km';
  return `${km} km`;
}
