import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || 'DUMMY_META_PIXEL_ID';

export const MetaPixel: React.FC = () => {
  const location = useLocation();
  const { preferences: consent } = useCookieStore();

  useEffect(() => {
    // Only load if marketing consent is granted
    if (!consent.marketing || META_PIXEL_ID === 'DUMMY_META_PIXEL_ID') return;

    if (!window.fbq) {
      // Standard Meta Pixel initialization script
      /* eslint-disable */
      // @ts-nocheck
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        if (s && s.parentNode) {
          s.parentNode.insertBefore(t, s);
        } else {
          document.head.appendChild(t);
        }
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */

      const fbqInit = window['fbq'] as ((command: string, ...args: unknown[]) => void) | undefined;
      fbqInit?.('init', META_PIXEL_ID);
    }
  }, [consent.marketing]);

  // Track page views on route change
  useEffect(() => {
    if (!consent.marketing || !window['fbq']) return;

    // Slight delay to ensure React Router has updated the DOM
    const timer = setTimeout(() => {
      const fbqTrack = window['fbq'] as ((command: string, ...args: unknown[]) => void) | undefined;
      fbqTrack?.('track', 'PageView');
    }, 50);

    return () => clearTimeout(timer);
  }, [location, consent.marketing]);

  return null;
};
