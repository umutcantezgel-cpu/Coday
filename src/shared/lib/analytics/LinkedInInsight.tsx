import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookieStore } from '@/shared/lib/cookieStore';

// Window type extensions are centralized in src/@types/global.d.ts

const LINKEDIN_PARTNER_ID = import.meta.env.VITE_LINKEDIN_PARTNER_ID || 'DUMMY_LINKEDIN_ID';

export const LinkedInInsight: React.FC = () => {
  const location = useLocation();
  const { preferences: consent } = useCookieStore();

  useEffect(() => {
    // Only load if marketing consent is granted
    if (!consent.marketing || LINKEDIN_PARTNER_ID === 'DUMMY_LINKEDIN_ID') return;

    if (!window._linkedin_data_partner_ids) {
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);

      // Standard LinkedIn Insight Tag initialization script
      (function (l: typeof window.lintrk) {
        if (!l) {
          window.lintrk = function (a: string, b?: Record<string, unknown>) {
            const fn = window.lintrk as { q?: [string, Record<string, unknown> | undefined][] };
            if (fn.q) fn.q.push([a, b]);
          };
          (window.lintrk as { q?: [string, Record<string, unknown> | undefined][] }).q = [];
        }
        const s = document.getElementsByTagName('script')[0];
        const b = document.createElement('script');
        b.type = 'text/javascript';
        b.async = true;
        b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
        if (s && s.parentNode) {
          s.parentNode.insertBefore(b, s);
        } else {
          document.head.appendChild(b);
        }
      })(window.lintrk);
    }
  }, [consent.marketing]);

  // Track page views on route change - LinkedIn automatically handles URL changes
  // via its script, but we can manually push events if we want custom conversions later.
  useEffect(() => {
    if (!consent.marketing || !window.lintrk) return;

    // For LinkedIn, usually the script handles SPA navigation via History API out of the box,
    // but if we need custom event firing, we would do it here.
  }, [location, consent.marketing]);

  return null;
};
