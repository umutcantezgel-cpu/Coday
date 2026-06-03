"use client";
import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useCookieStore } from '@/shared/lib/cookieStore';

// Ensure fbq is accessible on the window object
declare global {
  interface Window {
    fbq?: {
      (event: string, ...args: unknown[]): void;
      callMethod?: unknown;
      queue?: unknown[];
      push?: unknown;
      loaded?: boolean;
      version?: string;
    };
    _fbq?: unknown;
  }
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || 'DUMMY_META_PIXEL_ID';

export const MetaPixel: React.FC = () => {
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();
  const { preferences: consent } = useCookieStore();

  // Track page views on route change
  useEffect(() => {
    if (!consent.marketing || typeof window === 'undefined' || !window['fbq']) return;

    // Slight delay to ensure React Router has updated the DOM
    const timer = setTimeout(() => {
      const fbqTrack = window['fbq'] as ((command: string, ...args: unknown[]) => void) | undefined;
      fbqTrack?.('track', 'PageView');
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, consent.marketing]);

  if (!consent.marketing || META_PIXEL_ID === 'DUMMY_META_PIXEL_ID') return null;

  return (
    <>
      <Script
        id="meta-pixel-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            if(typeof window !== 'undefined') {
              if(!window.fbq){
                var n=window.fbq=function(){
                  n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)
                };
                if(!window._fbq)window._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
              }
              fbq('init', '${META_PIXEL_ID}');
            }
          `,
        }}
      />
      <Script 
        id="meta-pixel-script"
        src="https://connect.facebook.net/en_US/fbevents.js" 
        strategy="lazyOnload" 
      />
    </>
  );
};
