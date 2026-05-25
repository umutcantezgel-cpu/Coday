"use client";
import React from 'react';
import Script from 'next/script';
import { useCookieStore } from '@/shared/lib/cookieStore';

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || process.env.NEXT_PUBLIC_CLARITY_ID || 'dummy_clarity_dev';

export const ClarityAnalytics: React.FC = () => {
  const { preferences: consent } = useCookieStore();

  if (!consent.analytics || !CLARITY_ID || CLARITY_ID.includes('dummy')) return null;

  return (
    <Script
      id="clarity-js"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `,
      }}
    />
  );
};
