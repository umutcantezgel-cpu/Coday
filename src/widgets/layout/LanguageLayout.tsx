import React, { useEffect } from 'react';
import { Outlet, useParams, redirect, type LoaderFunctionArgs } from 'react-router';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGUAGES = ['de', 'en'];

// SSR-compatible loader for language validation

export async function loader({ params }: LoaderFunctionArgs) {
  const lng = params.lng;

  // If language is invalid, redirect to 'de' on the server
  if (!lng || !SUPPORTED_LANGUAGES.includes(lng)) {
    throw redirect('/de', 302);
  }

  return { lng };
}

export const LanguageLayout: React.FC = () => {
  const { lng } = useParams<{ lng: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lng && SUPPORTED_LANGUAGES.includes(lng) && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  useEffect(() => {
    if (lng && SUPPORTED_LANGUAGES.includes(lng)) {
      document.documentElement.lang = lng;
      document.documentElement.dir = i18n.dir(lng);
    }
  }, [lng, i18n]);

  // The loader already validated the language, so we can safely render
  // (keeping a runtime check for type safety)
  if (!lng || !SUPPORTED_LANGUAGES.includes(lng)) {
    return null; // Should never happen - loader redirects
  }

  return <Outlet />;
};

export default LanguageLayout;
