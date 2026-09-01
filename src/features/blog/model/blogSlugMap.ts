/**
 * Client-safe blog slug pairing, derived from data.de.ts / data.en.ts by post id.
 *
 * The site-wide LanguageSwitcher lives in the header of every page. Importing
 * `getMatchingBlogPost` there pulled both blog corpora (336 kB of article bodies)
 * into a client chunk loaded in the <head> of every route. This map carries the
 * same information in ~2 kB.
 *
 * DO NOT hand-edit: __tests__/blogSlugMap.test.ts rebuilds both maps from the
 * data files and fails if they diverge.
 */

/** DE slug -> EN slug, for posts that exist in both locales. */
export const BLOG_SLUG_DE_TO_EN: Readonly<Record<string, string>> = {
  'die-5-groessten-fehler-im-webdesign': 'the-5-deadly-web-design-mistakes',
  'daten-luegen-nicht-business-intelligence': 'data-doesnt-lie-business-intelligence',
  'der-perfekte-omni-channel-mix': 'the-perfect-omni-channel-mix',
  'social-media-secrets-2026': 'social-media-secrets-2026',
  'video-content-excellence': 'video-content-excellence',
  'warum-wordpress-tot-ist': 'why-wordpress-is-dying',
  'neuro-design-psychologie': 'neuro-design-psychology',
  'ki-voice-search-revolution': 'ai-voice-search-revolution',
  'anti-ai-manifest-menschliches-design': 'anti-ai-manifesto-human-design',
  'agentur-killer-modell': 'agency-killer-model',
  'speed-equals-revenue': 'high-performance-web-vitals',
  'digital-sovereignty-public-sector': 'digital-sovereignty-public-sector',
  'psychology-of-dark-mode': 'psychology-of-dark-mode',
  'headless-cms-vs-wordpress': 'headless-cms-vs-wordpress',
  'enterprise-security-standards': 'enterprise-security-standards',
  'ozg-citizen-experience': 'ozg-citizen-experience',
  'death-of-third-party-cookies': 'death-of-third-party-cookies',
  'design-systems-at-scale': 'design-systems-at-scale',
  'future-of-ecommerce-cro': 'future-of-ecommerce-cro',
};

/** EN slug -> DE slug (inverse of the above). */
export const BLOG_SLUG_EN_TO_DE: Readonly<Record<string, string>> = {
  'the-5-deadly-web-design-mistakes': 'die-5-groessten-fehler-im-webdesign',
  'data-doesnt-lie-business-intelligence': 'daten-luegen-nicht-business-intelligence',
  'the-perfect-omni-channel-mix': 'der-perfekte-omni-channel-mix',
  'social-media-secrets-2026': 'social-media-secrets-2026',
  'video-content-excellence': 'video-content-excellence',
  'why-wordpress-is-dying': 'warum-wordpress-tot-ist',
  'neuro-design-psychology': 'neuro-design-psychologie',
  'ai-voice-search-revolution': 'ki-voice-search-revolution',
  'anti-ai-manifesto-human-design': 'anti-ai-manifest-menschliches-design',
  'agency-killer-model': 'agentur-killer-modell',
  'high-performance-web-vitals': 'speed-equals-revenue',
  'digital-sovereignty-public-sector': 'digital-sovereignty-public-sector',
  'psychology-of-dark-mode': 'psychology-of-dark-mode',
  'headless-cms-vs-wordpress': 'headless-cms-vs-wordpress',
  'enterprise-security-standards': 'enterprise-security-standards',
  'ozg-citizen-experience': 'ozg-citizen-experience',
  'death-of-third-party-cookies': 'death-of-third-party-cookies',
  'design-systems-at-scale': 'design-systems-at-scale',
  'future-of-ecommerce-cro': 'future-of-ecommerce-cro',
};
