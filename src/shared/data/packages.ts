/**
 * Single source of truth for the four service packages ("Pakete").
 *
 * Structural facts and short display names live here so that code without an
 * i18n context (server actions, e-mail templates, JSON-LD, analytics, the
 * zustand store) can use them. Long marketing copy (for-who, features, FAQ)
 * lives in `public/locales/{de,en}/pricing.json`.
 *
 * Rule: aliases are never removed, only added. Visitors still carry old ids
 * such as `professional` in their persisted calculator store.
 */

export type Locale = 'de' | 'en';

export const PACKAGE_IDS = ['starter', 'business', 'corporate', 'enterprise'] as const;
export type PackageId = (typeof PACKAGE_IDS)[number];

/** Every id that has ever been pushed into a URL or localStorage, mapped to its canonical id. */
export const PACKAGE_ALIASES: Record<string, PackageId> = {
  starter: 'starter',
  onepager: 'starter',
  business: 'business',
  professional: 'business',
  corporate: 'corporate',
  'pro-corporate': 'corporate',
  scale: 'corporate',
  enterprise: 'enterprise',
  ultimate: 'enterprise',
  'custom-app': 'enterprise',
};

export function isPackageId(raw: unknown): raw is PackageId {
  return typeof raw === 'string' && (PACKAGE_IDS as readonly string[]).includes(raw);
}

/** Canonical id for an id or alias, `null` when unknown. */
export function normalizePackageId(raw?: string | null): PackageId | null {
  if (!raw) return null;
  return PACKAGE_ALIASES[raw.trim().toLowerCase()] ?? null;
}

export interface PackageMeta {
  id: PackageId;
  /** 1–4, shown as "Paket 2 von 4". */
  tier: 1 | 2 | 3 | 4;
  basisModuleId: `basis-${PackageId}`;
  deliveryDays: number;
  /** `max: null` means no fixed upper bound. */
  pages: { min: number; max: number | null };
  popular: boolean;
  /** Add-on module ids the configurator highlights as "Empfohlen" for this package. */
  recommendedAddonIds: string[];
  /** Add-on module ids already covered by the package (rendered as included, not selectable). */
  includedAddonIds: string[];
  /** Plain-language display name. */
  name: Record<Locale, string>;
  /** Former size label, kept for the agency notification and logs only. */
  legacyName: Record<Locale, string>;
}

export const PACKAGES: Record<PackageId, PackageMeta> = {
  starter: {
    id: 'starter',
    tier: 1,
    basisModuleId: 'basis-starter',
    deliveryDays: 14,
    pages: { min: 1, max: 5 },
    popular: false,
    recommendedAddonIds: ['seo-tech'],
    includedAddonIds: [],
    name: { de: 'Die Visitenkarte', en: 'The Business Card' },
    legacyName: { de: 'Starter (Klein)', en: 'Starter (Compact)' },
  },
  business: {
    id: 'business',
    tier: 2,
    basisModuleId: 'basis-business',
    deliveryDays: 21,
    pages: { min: 6, max: 12 },
    popular: true,
    recommendedAddonIds: ['func-cms', 'seo-tech'],
    includedAddonIds: [],
    name: { de: 'Der Kundenmagnet', en: 'The Client Magnet' },
    legacyName: { de: 'Business (Mittel)', en: 'Business (Standard)' },
  },
  corporate: {
    id: 'corporate',
    tier: 3,
    basisModuleId: 'basis-corporate',
    deliveryDays: 30,
    pages: { min: 13, max: 30 },
    popular: false,
    recommendedAddonIds: ['func-cms', 'design-ui'],
    includedAddonIds: ['tech-i18n'],
    name: { de: 'Die Unternehmensplattform', en: 'The Company Platform' },
    legacyName: { de: 'Pro Corporate (Groß)', en: 'Pro Corporate (Large)' },
  },
  enterprise: {
    id: 'enterprise',
    tier: 4,
    basisModuleId: 'basis-enterprise',
    deliveryDays: 45,
    pages: { min: 31, max: null },
    popular: false,
    recommendedAddonIds: ['func-auth', 'support-pro'],
    includedAddonIds: ['tech-i18n', 'support-pro'],
    name: { de: 'Die Großplattform', en: 'The Enterprise Platform' },
    legacyName: {
      de: 'Enterprise Platform (Extrem groß)',
      en: 'Enterprise Platform (Extremely Large)',
    },
  },
};

export const PACKAGE_LIST: PackageMeta[] = PACKAGE_IDS.map((id) => PACKAGES[id]);

export const PACKAGE_COUNT = PACKAGE_IDS.length;

/** Plain-language name for an id or alias; `null` when unknown. */
export function getPackageName(
  raw: string | null | undefined,
  locale: Locale = 'de'
): string | null {
  const id = normalizePackageId(raw);
  return id ? PACKAGES[id].name[locale] : null;
}

/** Package meta for an id or alias; `null` when unknown. */
export function getPackage(raw: string | null | undefined): PackageMeta | null {
  const id = normalizePackageId(raw);
  return id ? PACKAGES[id] : null;
}

/** Reverse lookup from a basis module id ("basis-business") to the package. */
export function getPackageByBasisModule(moduleId: string): PackageMeta | null {
  return PACKAGE_LIST.find((p) => p.basisModuleId === moduleId) ?? null;
}
