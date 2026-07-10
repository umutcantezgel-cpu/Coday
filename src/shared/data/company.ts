/**
 * Company metadata — Single Source of Truth for legal pages, footer, and structured data.
 * @module shared/data/company
 */
import type { CompanyInfo } from '@/shared/types';

/** Coday company information. Used by Impressum, Footer, JSON-LD, etc. */
export const companyInfo: CompanyInfo = {
  name: 'Coday',
  legalName: 'Umutcan Emre Tezgel (Coday)',
  address: 'Lessingstraße 4',
  city: 'Wetzlar',
  zip: '35578',
  country: 'Deutschland',
  phone: '+49 176 41195301',
  email: 'kontakt@codayweb.de',
  foundedYear: 2026,
  employeeCount: 1,
  certifications: ['DSGVO Compliant'],
  socialMedia: {
    linkedin: 'https://www.linkedin.com/in/umutcan-tezgel',
    twitter: 'https://twitter.com/coday',
    instagram: 'https://www.instagram.com/codayweb/',
    facebook: 'https://www.facebook.com/profile.php?id=61588758264018',
    github: 'https://github.com/coday',
  },
  openingHours: {
    'Mo-Fr': '09:00–18:00',
    'Sa-So': 'Geschlossen',
  },
};

/** Returns the company info object. */
export function getCompanyInfo(): CompanyInfo {
  return companyInfo;
}
