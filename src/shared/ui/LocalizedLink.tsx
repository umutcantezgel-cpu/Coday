// force cache bust
"use client";

import React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getLocalizedPath } from '@/shared/lib/navigation';

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
}

export interface NavLinkProps extends Omit<LinkProps, 'className'> {
  className?: string | ((props: { isActive: boolean }) => string);
}

/**
 * Helper to get the current language from the URL or i18n instance.
 */
const useCurrentLanguage = () => {
  return useLocale() || 'de';
};

export const LocalizedLink: React.FC<LinkProps> = ({ to, children, ...props }) => {
  const lng = useCurrentLanguage();
  const localizedTo = typeof to === 'string' ? getLocalizedPath(to, lng) : to;

  return (
    <NextLink href={localizedTo} {...props}>
      {children}
    </NextLink>
  );
};

export const LocalizedNavLink: React.FC<NavLinkProps> = ({ to, children, className, ...props }) => {
  const lng = useCurrentLanguage();
  const localizedTo = typeof to === 'string' ? getLocalizedPath(to, lng) : to;
  const pathname = usePathname();
  const isActive = pathname === localizedTo;

  const combinedClassName = typeof className === 'function' ? className({ isActive }) : className;

  return (
    <NextLink href={localizedTo} className={combinedClassName} {...props}>
      {children}
    </NextLink>
  );
};
