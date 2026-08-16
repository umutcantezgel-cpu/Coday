import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const namespaces = [
  'analyzer',
  'api_integration_page',
  'blog',
  'booking',
  'brand_identity_page',
  'calculator',
  'careers',
  'common',
  'consulting',
  'consulting_page',
  'contact',
  'dashboard',
  'design_systems_page',
  'ecommerce_page',
  'enterprise_web_page',
  'error',
  'faq',
  'filter',
  'footer',
  'form',
  'generic_detail',
  'headless_cms_page',
  'hero',
  'home',
  'images',
  'industries',
  'knowledge',
  'legal',
  'logobar',
  'metadata',
  'migration_page',
  'nav',
  'performance_page',
  'philosophy',
  'portfolio_teaser',
  'pricing',
  'process',
  'project_detail',
  'public-sector',
  'sections',
  'seo_page',
  'services',
  'social',
  'stats',
  'techStack',
  'testimonials',
  'tools',
  'ui_ux_page',
  'ux_audit_page',
  'web_apps_page',
  'web_design_page',
  'web_development_page',
  'work',
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
    messages,
  };
});
