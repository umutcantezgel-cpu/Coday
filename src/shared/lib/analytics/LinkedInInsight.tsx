"use client";
import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useCookieStore } from '@/shared/lib/cookieStore';

// Window type extensions are centralized in src/@types/global.d.ts

const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || 'DUMMY_LINKEDIN_ID';

export const LinkedInInsight: React.FC = () => {
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();
  const { preferences: consent } = useCookieStore();

  // Track page views on route change - LinkedIn automatically handles URL changes
  // via its script, but we can manually push events if we want custom conversions later.
  useEffect(() => {
    if (!consent.marketing || typeof window === 'undefined' || !window.lintrk) return;

    // For LinkedIn, usually the script handles SPA navigation via History API out of the box,
    // but if we need custom event firing, we would do it here.
  }, [pathname, searchParams, consent.marketing]);

  if (!consent.marketing || LINKEDIN_PARTNER_ID === 'DUMMY_LINKEDIN_ID') return null;

  return (
    <Script
      id="linkedin-insight"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);
        `,
      }}
    />
  );
};
