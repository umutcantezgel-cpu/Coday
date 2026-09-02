/**
 * Pages that duplicated a stronger page's topic, mapped to the page that owns it.
 *
 * They competed with their own hubs in search: `/services/growth/seo-optimization`
 * (420 words) against `/services/seo` (569), `/services/web-design/ux-ui-design`
 * (507) against `/services/design/ui-ux` (722), and so on. Rather than let a link
 * point at a URL that only 301s, every internal link resolves to the owner here,
 * and `next.config.ts` redirects the same sources for anything already indexed.
 *
 * Keep this in step with the redirect block in `next.config.ts` — this map is the
 * source of truth for which page owns which topic.
 */
export const CANONICAL_HREF: Record<string, string> = {
  '/services/growth/seo-optimization': '/services/seo',
  '/services/growth/performance-optimization': '/services/performance',
  '/services/growth/digital-consulting': '/services/consulting',
  '/services/web-design/ux-ui-design': '/services/design/ui-ux',
  '/services/web-design/design-systems': '/services/design/design-systems',
  '/services/web-design/website-relaunch': '/services/development/migration',
  '/services/web-development/react-nextjs-agentur': '/services/web-development',
  '/services/web-development/full-stack-entwicklung': '/services/web-development',
  '/services/web-development/cloud-infrastructure': '/services/web-development',
  '/services/web-development/e-commerce-shops': '/services/ecommerce-development',

  // `/branchen/gastronomie-hotellerie` (189 words, generated from industriesData)
  // against the hand-built `/branchen/gastronomie` (973). The loser's H1 was
  // literally the prefix of the winner's.
  '/branchen/gastronomie-hotellerie': '/branchen/gastronomie',

  // City-level duplicates: the handwerker/gesundheitswesen pairs cover the same
  // trade in the same city as the handwerk-bau/aerzte-gesundheit pages, at
  // roughly half the depth.
  '/branchen/handwerker/wetzlar': '/branchen/handwerk-bau/wetzlar',
  '/branchen/gesundheitswesen/arzt-wetzlar': '/branchen/aerzte-gesundheit/wetzlar',
  '/branchen/gesundheitswesen/arzt-giessen': '/branchen/aerzte-gesundheit/giessen',
};

/** Returns the owning page for `href`, or `href` itself when it is already the owner. */
export function canonicalHref(href: string): string {
  return CANONICAL_HREF[href] ?? href;
}
