import React, { useEffect } from 'react';
import { useCookieStore } from '@/shared/lib/cookieStore';

const CLARITY_ID = import.meta.env.VITE_CLARITY_ID || 'dummy_clarity_dev';

export const ClarityAnalytics: React.FC = () => {
  const { preferences: consent } = useCookieStore();

  useEffect(() => {
    // Clarity requires consent for heatmaps and recordings
    if (!consent.analytics || !CLARITY_ID || CLARITY_ID.includes('dummy')) return;

    if (!document.querySelector(`script[src*="clarity.ms"]`)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `;
      document.head.appendChild(script);
    }
  }, [consent.analytics]);

  return null;
};
