import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'de',
    supportedLngs: ['de', 'en'],
    debug: import.meta.env.DEV, // Enable debug in development
    // resources: (window as any).initialI18nStore, // Hydrate from server (Removed to fix dynamic loading)

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
      escapeValue: false, // not needed for react as it escapes by default
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
    },
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  document.dir = i18n.dir(lng);
});

export default i18n;
