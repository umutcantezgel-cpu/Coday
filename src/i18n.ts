import i18n, { type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * Lightweight i18n client — hydrates from SSR-provided translations.
 *
 * SSR injects `window.initialI18nStore` with all translations for the current
 * language/page. The client hydrates from this data immediately, without
 * importing the heavy http-backend (~15KB) or language-detector (~8KB).
 *
 * Language detection uses the `<html lang>` attribute set by SSR.
 * Additional namespaces are loaded on-demand via deferred http-backend.
 */

// Detect language from SSR-rendered <html lang="...">
const ssrLang = typeof document !== 'undefined' ? document.documentElement.lang || 'de' : 'de';

// Hydrate from SSR-injected translations (set in root.tsx <body>)
const ssrResources: Resource =
  typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).initialI18nStore
    ? ((window as unknown as Record<string, unknown>).initialI18nStore as Resource)
    : {};

i18n.use(initReactI18next).init({
  lng: ssrLang,
  fallbackLng: 'de',
  supportedLngs: ['de', 'en'],
  debug: import.meta.env.DEV,

  // Hydrate from SSR-provided resources — no network request needed
  resources: ssrResources,

  ns: [
    'common',
    'home',
    'blog',
    'form',
    'pricing',
    'process',
    'services',
    'tools',
    'work',
    'industries',
    'knowledge',
    'legal',
    'careers',
    'contact',
    'dashboard',
  ],
  defaultNS: 'common',

  interpolation: {
    escapeValue: false,
  },
});

// Defer heavy plugins — load http-backend only when navigating to a new
// language or namespace that isn't already in the SSR store
if (typeof requestIdleCallback !== 'undefined') {
  requestIdleCallback(() => {
    import('i18next-http-backend').then((Backend) => {
      i18n.use(Backend.default);
      i18n.options.backend = { loadPath: '/locales/{{lng}}/{{ns}}.json' };
    });
  });
} else {
  setTimeout(() => {
    import('i18next-http-backend').then((Backend) => {
      i18n.use(Backend.default);
      i18n.options.backend = { loadPath: '/locales/{{lng}}/{{ns}}.json' };
    });
  }, 3000);
}

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  document.dir = i18n.dir(lng);
});

export default i18n;
