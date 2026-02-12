import React from 'react';
import { Link, LinkProps, NavLink, NavLinkProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Helper to get the current language from the URL or i18n instance.
 */
const useCurrentLanguage = () => {
  const { i18n } = useTranslation();
  // Fallback to i18n language, or 'de'
  return i18n.language || 'de';
};

import { getLocalizedPath } from '@/shared/lib/navigation';

export const LocalizedLink: React.FC<LinkProps> = ({ to, children, ...props }) => {
  const lng = useCurrentLanguage();
  const localizedTo = typeof to === 'string' ? getLocalizedPath(to, lng) : to;
  // console.log removed

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
