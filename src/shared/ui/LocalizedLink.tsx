import React from 'react';
import { Link, LinkProps, NavLink, NavLinkProps, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Helper to get the current language from the URL or i18n instance.
 */
const useCurrentLanguage = () => {
  const { i18n } = useTranslation();
  // Fallback to i18n language, or 'de'
  return i18n.language || 'de';
};

/**
 * Transforms a path to include the current language prefix.
 * @param path The path to transform
 * @param lng The language code
 */
export const getLocalizedPath = (path: string, lng: string) => {
  if (
    path.startsWith('http') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  // Clean path to ensure no double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // If path already starts with language, don't double prefix (basic check)
  // detailed check would need to know all supported languages
  const parts = cleanPath.split('/');
  if (parts[1] === lng) return cleanPath;

  return `/${lng}${cleanPath}`;
};

export const LocalizedLink: React.FC<LinkProps> = ({ to, children, ...props }) => {
  const lng = useCurrentLanguage();
  const localizedTo = typeof to === 'string' ? getLocalizedPath(to, lng) : to;
  console.log(`[LocalizedLink] Input: ${to}, Lang: ${lng}, Output: ${localizedTo}`);

  return (
    <Link to={localizedTo} {...props}>
      {children}
    </Link>
  );
};

export const LocalizedNavLink: React.FC<NavLinkProps> = ({ to, children, ...props }) => {
  const lng = useCurrentLanguage();
  const localizedTo = typeof to === 'string' ? getLocalizedPath(to, lng) : to;

  return (
    <NavLink to={localizedTo} {...props}>
      {children}
    </NavLink>
  );
};
