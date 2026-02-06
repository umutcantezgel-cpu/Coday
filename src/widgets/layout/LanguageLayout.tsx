import React, { useEffect } from 'react';
import { Outlet, useParams, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGUAGES = ['de', 'en'];

export const LanguageLayout: React.FC = () => {
  const { lng } = useParams<{ lng: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    console.log('[LanguageLayout] Effect', { lng, i18nLang: i18n.language });
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

  // Validate language
  if (!lng || !SUPPORTED_LANGUAGES.includes(lng)) {
    // Should generally be caught by router, but as a safeguard
    return <Navigate to="/de" replace />;
  }

  return <Outlet />;
};
