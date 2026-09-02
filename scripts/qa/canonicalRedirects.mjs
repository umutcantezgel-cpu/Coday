/**
 * The duplicate -> owner map, mirrored from src/shared/data/canonicalLinks.ts.
 *
 * It lives here as plain ESM because the QA scripts run under bare node, without
 * the TypeScript path aliases. `/services/web-design/design-systems` is left out:
 * it was already redirected before this pass and is not part of this table.
 */
export const CANONICAL_REDIRECTS = {
  '/services/growth/seo-optimization': '/services/seo',
  '/services/growth/performance-optimization': '/services/performance',
  '/services/growth/digital-consulting': '/services/consulting',
  '/services/web-design/ux-ui-design': '/services/design/ui-ux',
  '/services/web-design/website-relaunch': '/services/development/migration',
  '/services/web-development/react-nextjs-agentur': '/services/web-development',
  '/services/web-development/full-stack-entwicklung': '/services/web-development',
  '/services/web-development/cloud-infrastructure': '/services/web-development',
  '/services/web-development/e-commerce-shops': '/services/ecommerce-development',
  '/branchen/gastronomie-hotellerie': '/branchen/gastronomie',
  '/branchen/handwerker/wetzlar': '/branchen/handwerk-bau/wetzlar',
  '/branchen/gesundheitswesen/arzt-wetzlar': '/branchen/aerzte-gesundheit/wetzlar',
  '/branchen/gesundheitswesen/arzt-giessen': '/branchen/aerzte-gesundheit/giessen',
};
