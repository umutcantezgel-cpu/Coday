import { redirect, type LoaderFunctionArgs } from 'react-router';

const SUPPORTED_LANGUAGES = ['de', 'en'];

export async function loader({ request }: LoaderFunctionArgs) {
  // Get Accept-Language header for language detection
  const acceptLanguage = request.headers.get('Accept-Language') || '';

  // Parse Accept-Language to get preferred language
  const preferredLangs = acceptLanguage
    .split(',')
    .map((lang) => (lang.split(';')[0] || '').trim().split('-')[0] || '')
    .filter((lang) => SUPPORTED_LANGUAGES.includes(lang));

  const targetLng = preferredLangs[0] || 'de';

  // Return a redirect response (SSR-compatible)
  throw redirect(`/${targetLng}`, 302);
}

export default function RootRedirector() {
  // This component should never render - loader always redirects
  return null;
}
