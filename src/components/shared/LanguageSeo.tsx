import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export const LanguageSeo: React.FC = () => {
    const { i18n } = useTranslation();
    const location = useLocation();
    const currentLang = i18n.language;

    // Base URL needed for absolute links
    const baseUrl = 'https://coday.de'; // Make sure this is configured or passed via env in future

    // Generate alternate links
    // Assuming structure: / (de), /en/...
    const getPathForLang = (lang: string) => {
        const path = location.pathname;
        if (lang === 'de') {
            // Remove /en if present
            return path.replace(/^\/en/, '') || '/';
        } else {
            // Add /en if not present
            return path.startsWith('/en') ? path : `/en${path === '/' ? '' : path}`;
        }
    };

    return (
        <Helmet>
            <html lang={currentLang} dir={i18n.dir(currentLang)} />
            <meta property="og:locale" content={currentLang === 'de' ? 'de_DE' : 'en_US'} />

            {/* Alternate Links */}
            <link rel="alternate" hreflang="de" href={`${baseUrl}${getPathForLang('de')}`} />
            <link rel="alternate" hreflang="en" href={`${baseUrl}${getPathForLang('en')}`} />
            <link rel="alternate" hreflang="x-default" href={`${baseUrl}${getPathForLang('de')}`} />
        </Helmet>
    );
};
