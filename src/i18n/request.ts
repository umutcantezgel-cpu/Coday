import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const namespaces = [
  'analyzer', 'blog', 'booking', 'calculator', 'careers', 'common', 'consulting',
  'contact', 'dashboard', 'error', 'faq', 'form', 'home', 'industries',
  'knowledge', 'legal', 'pricing', 'process', 'public-sector', 'services',
  'tools', 'work'
];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }
  
  const messages: Record<string, import('next-intl').AbstractIntlMessages> = {};
  
  for (const ns of namespaces) {
    try {
      // Dynamic import allows Webpack to bundle the JSON files automatically
      const msgs = (await import(`../../public/locales/${locale}/${ns}.json`)).default;
      messages[ns] = msgs;
    } catch (error) {
      console.warn(`Could not load messages for namespace ${ns} in locale ${locale}`);
    }
  }

  return {
    locale,
    messages
  };
});
