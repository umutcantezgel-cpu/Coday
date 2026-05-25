/**
 * Unified Type Index — Pipeline SEQ-02
 *
 * Re-exports all domain types from their canonical locations.
 * This barrel file follows FSD conventions: types live with their data,
 * but are re-exported here for cross-cutting consumers.
 */

// ─── Services ────────────────────────────────────────────────────────────────
export type { ServiceData } from '@/shared/data/services';

// ─── Work / Case Studies ─────────────────────────────────────────────────────
export type { Project, ProjectContent, ProjectType } from '@/shared/data/work';

// ─── Client References (Testimonials) ────────────────────────────────────────
export type { ClientReference } from '@/shared/data/teamMembers';

// ─── Blog ────────────────────────────────────────────────────────────────────
export type { BlogPost } from '@/features/blog/model/types';

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export type { FAQItem, FAQCategory } from '@/features/faq/model/types';

// ─── Company Info (NEW — SEQ-02) ─────────────────────────────────────────────

/** Core company metadata for legal pages, footers, and structured data. */
export interface CompanyInfo {
  name: string;
  legalName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  foundedYear: number;
  employeeCount: number;
  certifications: string[];
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
  openingHours: Record<string, string>;
}

// ─── Navigation (NEW — SEQ-02) ───────────────────────────────────────────────

/** A single navigation link item. */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  icon?: string;
}

/** The full navigation structure used by Header and Footer. */
export interface NavigationStructure {
  main: NavItem[];
  footer: NavItem[];
  legal: NavItem[];
}
