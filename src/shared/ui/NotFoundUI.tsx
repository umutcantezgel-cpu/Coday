'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { WarningCircle } from '@phosphor-icons/react';

export const NotFoundUI = () => {
  const t = useTranslations('error.notFound');

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center selection:bg-primary-500/30">
      <div className="max-w-md w-full flex flex-col items-center">
        <div className="w-20 h-20 bg-bg-secondary rounded-3xl flex items-center justify-center mb-8 shadow-sm border border-border-default">
          <WarningCircle className="w-10 h-10 text-primary-500" weight="duotone" />
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight drop-shadow-sm">404</h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-6">{t('title')}</h2>

        <p className="text-text-secondary mb-10 leading-relaxed max-w-sm mx-auto">
          {t('description')}
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-primary-700 text-white shadow-md hover:bg-primary-800 hover:shadow-glow min-h-[48px] px-8"
        >
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
};
