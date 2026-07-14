'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export const LanguageSwitcher: React.FC = () => {
  const locale = useLocale();
  const pathname = usePathname();

  const cleanPath = pathname.replace(/^\/(en|de)/, '').replace(/\/$/, '') || '/';
  const localPathsRegex = /^\/(landingpages|webdesign-agentur-wetzlar|angebot-handwerker)(\/.*)?$/;
  const isLocalPath = localPathsRegex.test(cleanPath);

  // For German-only landing pages, the English switcher just goes to the English homepage
  // to avoid hitting the 301 redirect back to German
  const deLink = `/de${cleanPath === '/' ? '' : cleanPath}`;
  const enLink = isLocalPath ? '/en' : `/en${cleanPath === '/' ? '' : cleanPath}`;

  return (
    <div className="flex items-center p-1 rounded-full bg-slate-100/80 backdrop-blur-md border border-slate-200 shadow-inner">
      <Link
        href={deLink}
        className={`px-3 py-1.5 text-xs font-bold tracking-wider rounded-full transition-colors flex items-center gap-1 ${
          locale === 'de'
            ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/50 pointer-events-none'
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
        }`}
        aria-label="Auf Deutsch wechseln"
        title="Deutsch"
        aria-current={locale === 'de' ? 'page' : undefined}
      >
        DE{' '}
        {locale === 'de' && (
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 inline-block" />
        )}
      </Link>
      <Link
        href={enLink}
        className={`px-3 py-1.5 text-xs font-bold tracking-wider rounded-full transition-colors flex items-center gap-1 ${
          locale === 'en'
            ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/50 pointer-events-none'
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
        }`}
        aria-label="Switch to English"
        title="English"
        aria-current={locale === 'en' ? 'page' : undefined}
      >
        EN{' '}
        {locale === 'en' && (
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 inline-block" />
        )}
      </Link>
    </div>
  );
};
