/**
 * Service data getter utilities — SEQ-02
 *
 * Type-safe accessor functions for the services data layer.
 * These getters provide a stable API for consumers without
 * coupling them to the underlying data structure.
 *
 * @module shared/data/serviceGetters
 */
import { servicesData, type ServiceData } from '@/shared/data/services';

/** Flattened list of all service entries across all categories. */
export function getAllServices(): ServiceData[] {
  return Object.values(servicesData).flatMap((category) => Object.values(category));
}

/** Find a single service by its slug. Returns undefined if not found. */
export function getServiceBySlug(slug: string): ServiceData | undefined {
  for (const category of Object.values(servicesData)) {
    const found = Object.values(category).find((s) => s.slug === slug);
    if (found) return found;
  }
  return undefined;
}

/** Get all services within a given category key (e.g. 'web-development'). */
export function getServicesByCategory(categoryKey: string): ServiceData[] {
  const category = servicesData[categoryKey];
  return category ? Object.values(category) : [];
}

/** Get all unique category keys. */
export function getServiceCategories(): string[] {
  return Object.keys(servicesData);
}
