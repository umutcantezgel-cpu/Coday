/**
 * Client references and testimonials.
 *
 * Only verified, real client references may be listed here.
 * Allowed references: Batherm, MS Schlüsseldienst Wetzlar, Lindener Ratsstuben.
 *
 * ⚠️  Adding fictional references is a UWG § 5 violation.
 */
import { GOOGLE_REVIEWS } from '@/shared/data/reviews';

export interface ClientReference {
  id: string;
  name: string;
  company: string;
  industry: string;
  image?: string;
  quote: string;
  rating?: number;
}

export const clientReferences: ClientReference[] = GOOGLE_REVIEWS.map((r) => ({
  id: r.id,
  name: r.authorName,
  company: r.authorCompany || 'Google Rezension',
  industry: 'Kunde / Partner',
  quote: r.quote.de,
  rating: r.rating,
}));
