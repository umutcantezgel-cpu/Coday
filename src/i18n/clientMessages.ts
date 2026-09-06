import type { AbstractIntlMessages } from 'next-intl';

/**
 * The message catalogue is 456 kB across 53 namespaces. `NextIntlClientProvider`
 * serialises whatever it is given into the RSC flight payload of every page, so
 * passing the whole catalogue made it the single largest item in the HTML document.
 *
 * Server components read messages directly on the server and are unaffected by this
 * — only `'use client'` components consume the provider. So each route family ships
 * exactly the namespaces its client components ask for.
 *
 * Adding a namespace here is cheap; forgetting one is visible: `getMessageFallback`
 * in request.ts renders the literal `namespace.key` into the page. The build-time
 * crawl in scripts/qa/check-i18n-fallbacks.mjs fails the build on that pattern.
 */
export function pickMessages(
  messages: AbstractIntlMessages,
  namespaces: readonly string[]
): AbstractIntlMessages {
  const picked: Record<string, unknown> = {};
  for (const namespace of namespaces) {
    if (namespace in messages) picked[namespace] = messages[namespace];
  }
  return picked as AbstractIntlMessages;
}

/**
 * Needed by the client components in the root layout's own subtree:
 * MobileReadyNav, MobileNavOverlay, LanguageSwitcher, Footer, PreferredSourceCta,
 * PageTransition, ConditionalWrapper and its deferred widgets — plus `faq`, whose
 * accordion is rendered on about, contact and most industry pages.
 *
 * `ui` (public/locales/<locale>/ui.json) is the client-side slice of `common`:
 * only the keys that `'use client'` components read, copied verbatim and with
 * the same nesting, so `common.json` (18.8 kB) itself stays server-only.
 * Server components keep using `common`. Any client component that needs a
 * `common` key must read it from `ui` and the key must exist in both ui.json
 * files (src/i18n/__tests__/uiNamespace.test.ts pins the list).
 */
export const ROOT_CLIENT_NAMESPACES = ['ui', 'error', 'faq', 'lead'] as const;

/** Route-family additions, each merged on top of the root set by a nested provider. */
export const ROUTE_CLIENT_NAMESPACES = {
  home: ['home', 'form'],
  // `booking`: /services/consulting embeds the booking calendar.
  services: ['services', 'consulting', 'booking'],
  industries: ['industries', 'public-sector'],
  knowledge: ['knowledge', 'blog'],
  career: ['careers', 'form'],
  legal: ['legal'],
  contact: ['contact', 'form', 'booking'],
  booking: ['booking', 'form'],
  calculator: ['calculator', 'analyzer'],
  pricing: ['pricing'],
  work: ['work'],
  process: ['process'],
} as const;
