'use client';
import React from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export const LanguageSwitcher: React.FC = () => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center p-0.5 rounded-full bg-slate-100/80 backdrop-blur-md border border-slate-200 shadow-sm transition">
      <Link
        href={pathname}
        locale="de"
        className={`px-3 py-1.5 text-xs font-bold tracking-wider rounded-full transition-all ${
          locale === 'de'
            ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 pointer-events-none'
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
        }`}
        aria-label="Auf Deutsch wechseln"
        title="Deutsch"
      >
        DE
      </Link>
      <Link
        href={pathname}
        locale="en"
        className={`px-3 py-1.5 text-xs font-bold tracking-wider rounded-full transition-all ${
          locale === 'en'
            ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 pointer-events-none'
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
        }`}
        aria-label="Switch to English"
        title="English"
      >
        EN
      </Link>
    </div>
  );
};
