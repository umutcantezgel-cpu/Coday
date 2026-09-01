'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { BLOG_SLUG_DE_TO_EN, BLOG_SLUG_EN_TO_DE } from '@/features/blog/model/blogSlugMap';

export const LanguageSwitcher: React.FC = () => {
  const locale = useLocale();
  const pathname = usePathname();

  const cleanPath = pathname.replace(/^\/(en|de)/, '').replace(/\/$/, '') || '/';
  const localPathsRegex =
    /^\/(landingpages|webdesign-agentur-wetzlar|angebot-handwerker|branchen\/[^/]+\/[^/]+)(\/.*)?$/;
  const isLocalPath = localPathsRegex.test(cleanPath) || cleanPath.startsWith('/branchen');
  const isBlogPath = cleanPath.startsWith('/knowledge/blog/');

  let blogDeLink = `/de${cleanPath === '/' ? '' : cleanPath}`;
  let blogEnLink = `/en${cleanPath === '/' ? '' : cleanPath}`;

  if (isBlogPath) {
    const blogSlug = cleanPath.replace('/knowledge/blog/', '').replace(/\/$/, '');
    if (blogSlug) {
      // The current slug belongs to the current locale; only the other side is
      // looked up. (Resolving both directions from the same slug made every DE
      // page link "DE" to the English article and vice versa.)
      if (locale === 'de') {
        const en = BLOG_SLUG_DE_TO_EN[blogSlug];
        blogDeLink = `/de/knowledge/blog/${blogSlug}`;
        blogEnLink = en ? `/en/knowledge/blog/${en}` : '/en/knowledge/blog';
      } else {
        const de = BLOG_SLUG_EN_TO_DE[blogSlug];
        blogEnLink = `/en/knowledge/blog/${blogSlug}`;
        blogDeLink = de ? `/de/knowledge/blog/${de}` : '/de/knowledge/blog';
      }
    }
  }

  // For German-only landing pages, the English switcher just goes to the English homepage
  // to avoid hitting the 301 redirect back to German
  const deLink = isBlogPath ? blogDeLink : `/de${cleanPath === '/' ? '' : cleanPath}`;
  const enLink = isBlogPath
    ? blogEnLink
    : isLocalPath
      ? '/en'
      : `/en${cleanPath === '/' ? '' : cleanPath}`;

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
