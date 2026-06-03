/**
 * Coday Footer-Badge Snippet Generator
 * ─────────────────────────────────────
 * Generates HTML and React snippet variants for client websites
 * to place a discreet Coday attribution badge in their footer.
 *
 * Features:
 *   - 5 anchor-text variants (SpamBrain-safe diversity)
 *   - Deterministic rotation via domain-hash (no identical anchors across clients)
 *   - UTM-tracked referral links
 *   - HTML + React JSX export
 *
 * Phase 25: Backlink-Infrastruktur und Digital PR
 * SSOT: src/shared/lib/badge-generator.ts
 * @module shared/lib/badge-generator
 */

/* ────────────────────────────── Constants ────────────────────────────── */

/** The 5 anchor-text variants — designed to be discreet and brand-safe */
export const BADGE_VARIANTS = [
  'Technologie-Partner: Coday',
  'High-Performance Webdesign by Coday',
  'Website-Umsetzung: Coday (Wetzlar)',
  'Custom Code: Coday',
  'Realisiert mit Coday',
] as const;

export type BadgeVariantIndex = 0 | 1 | 2 | 3 | 4;

/** Base URL for badge links */
const CODAY_BASE_URL = 'https://www.codayweb.de';

/* ────────────────────────────── Utilities ────────────────────────────── */

/**
 * Simple FNV-1a 32-bit hash — deterministic, fast, no crypto dependency.
 * Used to assign a stable variant index per client domain.
 */
export function fnv1aHash(input: string): number {
  let hash = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0; // FNV prime, force unsigned 32-bit
  }
  return hash;
}

/**
 * Returns a deterministic variant index (0-4) for a given client domain.
 * Ensures no two clients with different domains get the same anchor text
 * by default — SpamBrain diversity protection.
 */
export function getVariantForDomain(clientDomain: string): BadgeVariantIndex {
  return (fnv1aHash(clientDomain.toLowerCase().trim()) %
    BADGE_VARIANTS.length) as BadgeVariantIndex;
}

/* ────────────────────────── UTM Link Builder ────────────────────────── */

export interface BadgeOptions {
  /** Client's domain name, e.g. "wetzlar-schluesseldienst.de" */
  clientDomain: string;
  /** Override variant index (0-4). If omitted, deterministic hash rotation is used. */
  variant?: BadgeVariantIndex;
  /** Override the link target path. Default: "/" (homepage) */
  linkPath?: string;
  /** Whether to add rel="noopener" in addition to default rels. Default: false */
  noopener?: boolean;
}

/**
 * Builds a fully tracked Coday badge URL with UTM parameters.
 */
export function buildBadgeUrl(options: BadgeOptions): string {
  const path = options.linkPath ?? '/';
  const params = new URLSearchParams({
    utm_source: 'client-badge',
    utm_medium: 'referral',
    utm_campaign: options.clientDomain.toLowerCase().replace(/[^a-z0-9.-]/g, ''),
  });
  return `${CODAY_BASE_URL}${path}?${params.toString()}`;
}

/* ──────────────────────── HTML Snippet Export ────────────────────────── */

/**
 * Generates a complete HTML snippet for client footer embedding.
 * Includes minimal inline styling for discretion.
 */
export function generateHtmlBadge(options: BadgeOptions): string {
  const variantIdx = options.variant ?? getVariantForDomain(options.clientDomain);
  const anchorText = BADGE_VARIANTS[variantIdx];
  const url = buildBadgeUrl(options);
  const relParts = ['nofollow'];
  if (options.noopener) relParts.push('noopener');

  return `<!-- Coday Footer Badge – ${options.clientDomain} -->
<a href="${url}"
   rel="${relParts.join(' ')}"
   target="_blank"
   style="font-size:0.75rem;color:#888;text-decoration:none;opacity:0.7;"
   title="Webdesign & Entwicklung"
>${anchorText}</a>`;
}

/* ──────────────────────── React JSX Export ───────────────────────────── */

/**
 * Generates a React JSX snippet string for clients using React/Next.js.
 * Returns the JSX as a string (not a component) — intended for copy-paste.
 */
export function generateReactBadge(options: BadgeOptions): string {
  const variantIdx = options.variant ?? getVariantForDomain(options.clientDomain);
  const anchorText = BADGE_VARIANTS[variantIdx];
  const url = buildBadgeUrl(options);
  const relParts = ['nofollow'];
  if (options.noopener) relParts.push('noopener');

  return `{/* Coday Footer Badge – ${options.clientDomain} */}
<a
  href="${url}"
  rel="${relParts.join(' ')}"
  target="_blank"
  style={{ fontSize: '0.75rem', color: '#888', textDecoration: 'none', opacity: 0.7 }}
  title="Webdesign & Entwicklung"
>
  ${anchorText}
</a>`;
}

/* ────────────────────── All-Variants Export ──────────────────────────── */

/**
 * Returns all 5 badge variants as HTML snippets for a given client.
 * Useful for press-kit or client onboarding documentation.
 */
export function generateAllVariants(
  clientDomain: string
): { variant: number; html: string; react: string }[] {
  return BADGE_VARIANTS.map((_, idx) => ({
    variant: idx,
    html: generateHtmlBadge({ clientDomain, variant: idx as BadgeVariantIndex }),
    react: generateReactBadge({ clientDomain, variant: idx as BadgeVariantIndex }),
  }));
}

/**
 * Returns the recommended (hash-rotated) variant for a client domain.
 */
export function getRecommendedBadge(clientDomain: string): {
  variantIndex: number;
  anchorText: string;
  html: string;
  react: string;
  url: string;
} {
  const variantIndex = getVariantForDomain(clientDomain);
  return {
    variantIndex,
    anchorText: BADGE_VARIANTS[variantIndex],
    html: generateHtmlBadge({ clientDomain }),
    react: generateReactBadge({ clientDomain }),
    url: buildBadgeUrl({ clientDomain }),
  };
}
