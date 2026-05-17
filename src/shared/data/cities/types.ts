/**
 * City Data Model for Local-SEO Programmatic Pages.
 * Each city generates a unique landing page at /de/webagentur-{slug}.
 */

export type CityTier = 1 | 2 | 3;

export type ServiceKeyword = 'webagentur' | 'webdesign' | 'webentwicklung' | 'seo-agentur';

export type ProximityCluster =
  | 'Lahn-Dill'
  | 'Mittelhessen'
  | 'Rhein-Main'
  | 'Nordhessen'
  | 'Ruhrgebiet'
  | 'Rheinland'
  | 'Niederrhein'
  | 'Westfalen'
  | 'Niedersachsen'
  | 'Hamburg-Nord'
  | 'Berlin-Brandenburg'
  | 'Sachsen'
  | 'Thueringen'
  | 'Sachsen-Anhalt'
  | 'Schleswig-Holstein'
  | 'Bayern-Nord'
  | 'Bayern-Sued'
  | 'Baden-Wuerttemberg'
  | 'Saarland-Pfalz'
  | 'Mecklenburg';

export interface PainPoint {
  text: string;
  source: string;
}

export interface CityData {
  /** Kebab-case slug used in URL: /de/webagentur-{slug} */
  slug: string;
  /** Display name with proper capitalization and umlauts */
  displayName: string;
  /** German state (Bundesland) */
  stateName: string;
  /** Population (approximate, from Destatis) */
  population: number;
  /** Latitude (WGS84) */
  latitude: number;
  /** Longitude (WGS84) */
  longitude: number;
  /** Pre-computed Haversine distance from Wetzlar HQ in km */
  distanceFromWetzlarKm: number;
  /** City tier for rollout prioritization */
  tier: CityTier;
  /** Top 3-5 B2B sectors in the region */
  dominantB2BSectors: string[];
  /** Top employers in the city */
  majorEmployers: string[];
  /** Slug of the nearest larger city */
  nearestLargerCity: string;
  /** Regional cluster for internal linking */
  proximityCluster: ProximityCluster;
  /** City-specific pain points with citable sources */
  painPoints: PainPoint[];
  /** Whether this city is live (rollout governance) */
  published: boolean;
  /** Primary service keyword for this city's page */
  serviceKeyword: ServiceKeyword;
}
