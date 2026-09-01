import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localeDetection: false,
  // hreflang comes exclusively from page metadata (generateAlternates / blog languages).
  // The middleware's Link header uses the SAME pathname for every locale, which is wrong
  // for translated slugs (blog) and emits x-default -> bare / on the homepage.
  alternateLinks: false,
});
