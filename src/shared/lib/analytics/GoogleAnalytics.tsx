"use client";
import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useCookieStore } from '@/shared/lib/cookieStore';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const GoogleAnalytics: React.FC = () => {
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();
  const { preferences: consent } = useCookieStore();

  useEffect(() => {
    if (!consent.analytics || !GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: (pathname || "") + (searchParams?.toString() ? `?${searchParams?.toString()}` : ""),
    });
  }, [pathname, searchParams, consent.analytics]);

  if (!consent.analytics || !GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });
          `,
        }}
      />
    </>
  );
};
