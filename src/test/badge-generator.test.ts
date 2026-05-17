/**
 * Unit tests for the Coday Footer-Badge Snippet Generator.
 * Phase 25: Backlink-Infrastruktur und Digital PR
 *
 * Coverage:
 *   - All 5 badge variants
 *   - Deterministic hash rotation
 *   - UTM parameter structure
 *   - HTML + React snippet correctness
 *   - Edge cases (empty domain, special chars)
 */
import { describe, it, expect } from 'vitest';
import {
  BADGE_VARIANTS,
  fnv1aHash,
  getVariantForDomain,
  buildBadgeUrl,
  generateHtmlBadge,
  generateReactBadge,
  generateAllVariants,
  getRecommendedBadge,
} from '@/shared/lib/badge-generator';

/* ────────────────────── Hash Function ────────────────────── */

describe('fnv1aHash', () => {
  it('produces a non-zero unsigned integer', () => {
    const hash = fnv1aHash('example.com');
    expect(hash).toBeGreaterThan(0);
    expect(Number.isInteger(hash)).toBe(true);
  });

  it('is deterministic (same input → same output)', () => {
    expect(fnv1aHash('wetzlar.de')).toBe(fnv1aHash('wetzlar.de'));
  });

  it('produces different hashes for different inputs', () => {
    expect(fnv1aHash('wetzlar.de')).not.toBe(fnv1aHash('giessen.de'));
  });
});

/* ────────────────────── Variant Selection ────────────────── */

describe('getVariantForDomain', () => {
  it('returns a valid variant index (0-4)', () => {
    const domains = [
      'wetzlar-schluesseldienst.de',
      'lindener-ratsstuben.de',
      'batherm.de',
      'fitflow.de',
      'memo-baut.de',
      'prestige-estates.de',
      'hotel-zur-post.de',
      'akan-dienstleistungen.de',
    ];
    for (const domain of domains) {
      const idx = getVariantForDomain(domain);
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThanOrEqual(4);
    }
  });

  it('is case-insensitive', () => {
    expect(getVariantForDomain('Example.COM')).toBe(getVariantForDomain('example.com'));
  });

  it('trims whitespace', () => {
    expect(getVariantForDomain('  example.com  ')).toBe(getVariantForDomain('example.com'));
  });

  it('distributes across multiple variants for 8 client domains', () => {
    const domains = [
      'wetzlar-schluesseldienst.de',
      'lindener-ratsstuben.de',
      'batherm.de',
      'fitflow.de',
      'memo-baut.de',
      'prestige-estates.de',
      'hotel-zur-post.de',
      'akan-dienstleistungen.de',
    ];
    const indices = new Set(domains.map(getVariantForDomain));
    // With 8 domains and 5 buckets, expect at least 3 distinct variants
    expect(indices.size).toBeGreaterThanOrEqual(3);
  });
});

/* ────────────────────── UTM URL Builder ──────────────────── */

describe('buildBadgeUrl', () => {
  it('contains correct UTM parameters', () => {
    const url = buildBadgeUrl({ clientDomain: 'test-client.de' });
    expect(url).toContain('utm_source=client-badge');
    expect(url).toContain('utm_medium=referral');
    expect(url).toContain('utm_campaign=test-client.de');
  });

  it('uses codayweb.de as base', () => {
    const url = buildBadgeUrl({ clientDomain: 'any.de' });
    expect(url).toMatch(/^https:\/\/codayweb\.de\//);
  });

  it('respects custom linkPath', () => {
    const url = buildBadgeUrl({ clientDomain: 'x.de', linkPath: '/de/ueber-uns' });
    expect(url).toContain('/de/ueber-uns?');
  });

  it('sanitizes special characters in domain for campaign param', () => {
    const url = buildBadgeUrl({ clientDomain: 'über-ärzte.de' });
    // Should strip non-ascii chars
    expect(url).toContain('utm_campaign=ber-rzte.de');
  });
});

/* ────────────────────── HTML Badge ───────────────────────── */

describe('generateHtmlBadge', () => {
  it('contains one of the 5 anchor variants', () => {
    const html = generateHtmlBadge({ clientDomain: 'test.de' });
    const hasVariant = BADGE_VARIANTS.some((v) => html.includes(v));
    expect(hasVariant).toBe(true);
  });

  it('includes the tracked URL', () => {
    const html = generateHtmlBadge({ clientDomain: 'abc.de' });
    expect(html).toContain('https://codayweb.de');
    expect(html).toContain('utm_source=client-badge');
  });

  it('includes rel="nofollow" by default', () => {
    const html = generateHtmlBadge({ clientDomain: 'abc.de' });
    expect(html).toContain('rel="nofollow"');
  });

  it('adds noopener when requested', () => {
    const html = generateHtmlBadge({ clientDomain: 'abc.de', noopener: true });
    expect(html).toContain('nofollow noopener');
  });

  it('respects explicit variant override', () => {
    for (let i = 0; i < 5; i++) {
      const html = generateHtmlBadge({ clientDomain: 'x.de', variant: i as 0 | 1 | 2 | 3 | 4 });
      expect(html).toContain(BADGE_VARIANTS[i]);
    }
  });

  it('contains the HTML comment with client domain', () => {
    const html = generateHtmlBadge({ clientDomain: 'my-client.de' });
    expect(html).toContain('<!-- Coday Footer Badge – my-client.de -->');
  });
});

/* ────────────────────── React Badge ─────────────────────── */

describe('generateReactBadge', () => {
  it('contains JSX comment syntax', () => {
    const jsx = generateReactBadge({ clientDomain: 'test.de' });
    expect(jsx).toContain('{/* Coday Footer Badge');
  });

  it('uses JSX style object syntax', () => {
    const jsx = generateReactBadge({ clientDomain: 'test.de' });
    expect(jsx).toContain("fontSize: '0.75rem'");
    expect(jsx).toContain("color: '#888'");
  });

  it('contains one of the 5 anchor variants', () => {
    const jsx = generateReactBadge({ clientDomain: 'test.de' });
    const hasVariant = BADGE_VARIANTS.some((v) => jsx.includes(v));
    expect(hasVariant).toBe(true);
  });
});

/* ────────────────────── All Variants Export ──────────────── */

describe('generateAllVariants', () => {
  it('returns exactly 5 variants', () => {
    const variants = generateAllVariants('test.de');
    expect(variants).toHaveLength(5);
  });

  it('each variant has html, react, and variant index', () => {
    const variants = generateAllVariants('test.de');
    for (const v of variants) {
      expect(v).toHaveProperty('variant');
      expect(v).toHaveProperty('html');
      expect(v).toHaveProperty('react');
      expect(typeof v.html).toBe('string');
      expect(typeof v.react).toBe('string');
    }
  });

  it('variant indices are 0-4 in order', () => {
    const variants = generateAllVariants('test.de');
    expect(variants.map((v) => v.variant)).toEqual([0, 1, 2, 3, 4]);
  });
});

/* ────────────────────── Recommended Badge ────────────────── */

describe('getRecommendedBadge', () => {
  it('returns a complete badge object', () => {
    const badge = getRecommendedBadge('wetzlar-schluesseldienst.de');
    expect(badge).toHaveProperty('variantIndex');
    expect(badge).toHaveProperty('anchorText');
    expect(badge).toHaveProperty('html');
    expect(badge).toHaveProperty('react');
    expect(badge).toHaveProperty('url');
  });

  it('anchorText matches the variant index', () => {
    const badge = getRecommendedBadge('test.de');
    expect(badge.anchorText).toBe(BADGE_VARIANTS[badge.variantIndex]);
  });

  it('is deterministic for same domain', () => {
    const a = getRecommendedBadge('fitflow.de');
    const b = getRecommendedBadge('fitflow.de');
    expect(a.variantIndex).toBe(b.variantIndex);
    expect(a.html).toBe(b.html);
  });
});
