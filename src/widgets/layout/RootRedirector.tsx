import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const RootRedirector: React.FC = () => {
  const { i18n } = useTranslation();

  // Get detected language or fallback
  // i18next-browser-languagedetector should have already run by now
  const textLng = i18n.language?.split('-')[0] || 'de';
  const targetLng = ['de', 'en'].includes(textLng) ? textLng : 'de';

  return <Navigate to={`/${targetLng}`} replace />;
};
