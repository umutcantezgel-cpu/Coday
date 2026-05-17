import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import posthog from 'posthog-js';
import { useCookieStore } from '@/shared/lib/cookieStore';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY || 'dummy_posthog_key_dev';
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com';

export const PostHogAnalytics: React.FC = () => {
  const location = useLocation();
  const { preferences: consent } = useCookieStore();

  useEffect(() => {
    if (!consent.analytics || !POSTHOG_KEY) return;

    if (!posthog.__loaded) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        autocapture: true,
        capture_pageview: false, // We'll trigger this manually via router
        respect_dnt: true,
        session_recording: {
          maskAllInputs: true,
          maskTextSelector: '*', // Masks all text elements
        },
      });
    }
  }, [consent.analytics]);

  useEffect(() => {
    if (!consent.analytics || !posthog.__loaded) return;

    posthog.capture('$pageview', {
      $current_url: window.location.href,
      $pathname: location.pathname,
    });
  }, [location, consent.analytics]);

  return null;
};
