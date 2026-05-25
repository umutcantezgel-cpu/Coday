"use client";

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { WarningCircle } from '@phosphor-icons/react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  React.useEffect(() => {
    console.error('🔥 APP CRASH:', error);
  }, [error]);

  const t = useTranslations('error.500');

  return (
    <div className="flex items-center justify-center min-h-[70vh] p-6 selection:bg-primary-500/30">
      <div className="max-w-md w-full bg-bg-secondary p-8 md:p-12 rounded-3xl border border-border-default shadow-lg text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
          <WarningCircle className="w-8 h-8 text-red-500" weight="duotone" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{t('title')}</h1>
        <p className="text-text-secondary mb-8 leading-relaxed">
          {t('description')}
        </p>
        
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-primary-700 text-white shadow-md hover:bg-primary-800 hover:shadow-glow min-h-[48px] px-6 w-full"
        >
          {t('tryAgain')}
        </button>
      </div>
    </div>
  );
}
