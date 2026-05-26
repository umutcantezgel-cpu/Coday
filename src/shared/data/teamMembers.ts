/**
 * Client references and testimonials.
 *
 * Only verified, real client references may be listed here.
 * Allowed references: Batherm, MS Schlüsseldienst Wetzlar, Lindener Ratsstuben.
 *
 * ⚠️  Adding fictional references is a UWG § 5 violation.
 */
export interface ClientReference {
  id: string;
  name: string;
  company: string;
  industry: string;
  image: string;
  quote: string;
}

export const clientReferences: ClientReference[] = [];
