import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Bundle translations directly using Vite's glob import
// This ensures they are available in the serverless function without depending on file system access
const localeFiles = import.meta.glob('../public/locales/*/*.json', { eager: true });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resources: Record<string, Record<string, any>> = {};

for (const [path, module] of Object.entries(localeFiles)) {
  // Path format: ../public/locales/{lang}/{ns}.json
  const match = path.match(/\/locales\/([^/]+)\/(.+)\.json$/);
  if (match) {
    const [, lang, ns] = match;
    if (!resources[lang]) resources[lang] = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resources[lang][ns] = (module as { default: any }).default;
  }
}

export async function createI18n(lng: string) {
  const instance = i18n.createInstance();

  await instance.use(initReactI18next).init({
    lng,
    fallbackLng: 'de',
    supportedLngs: ['de', 'en'],
    debug: false,
    initImmediate: false,
    resources, // Use bundled resources
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

  return instance;
}
