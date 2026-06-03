"use client";
import React from 'react';
import Script from 'next/script';
import { useCookieStore } from '@/shared/lib/cookieStore';

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || process.env.NEXT_PUBLIC_CLARITY_ID || 'dummy_clarity_dev';

export const ClarityAnalytics: React.FC = () => {
  const { preferences: consent } = useCookieStore();

  if (!consent.analytics || !CLARITY_ID || CLARITY_ID.includes('dummy')) return null;

  return (
    <>
      <Script
        id="clarity-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};
          `,
        }}
      />
      <Script 
        id="clarity-script"
        src={`https://www.clarity.ms/tag/${CLARITY_ID}`} 
        strategy="lazyOnload" 
      />
    </>
  );
};
