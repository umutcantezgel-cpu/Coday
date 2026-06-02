'use client';
import React from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Globe } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

export const LanguageSwitcher: React.FC = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const newLang = locale === 'de' ? 'en' : 'de';
    // router.replace with new locale keeps the same pathname conceptually but navigates to new locale
    router.replace(pathname, { locale: newLang });
  };

  return (
    <button
      className="flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] min-w-[44px] justify-center rounded-full bg-slate-100/50 backdrop-blur-md hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/50 hover:border-slate-300 transition motion-reduce:duration-[0.01ms] hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      onClick={toggleLanguage}
      aria-label={locale === 'de' ? 'DE – Switch to English' : 'EN – Auf Deutsch wechseln'}
      title="Switch Language"
    >
      <OptimizedIcon icon={Globe} className="w-4 h-4 opacity-70" />
      <span className="font-bold text-xs uppercase tracking-wider">
        {locale === 'de' ? 'DE' : 'EN'}
      </span>
    </button>
  );
};
