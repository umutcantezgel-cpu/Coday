"use client";
import React, { useEffect } from 'react';
import { GrowthBookProvider as GBProvider } from '@growthbook/growthbook-react';
import { usePathname } from 'next/navigation';
import { useCookieStore } from '@/shared/lib/cookieStore';
import { growthbook } from '@/shared/lib/experimentation/growthbook';

const GROWTHBOOK_CLIENT_KEY = process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY || 'dummy_gb_key_dev';

export const GrowthBookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname() || "";
  
  const { preferences: consent } = useCookieStore();

  useEffect(() => {
    // Only load feature flags if we have analytics consent (for tracking callbacks)
    if (!consent.analytics || GROWTHBOOK_CLIENT_KEY.includes('dummy')) {
      return;
    }

    // Set attributes for targeting
    growthbook.setAttributes({
      url: window.location.href,
      path: pathname,
      deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop',
    });

    growthbook.loadFeatures();
  }, [consent.analytics, pathname]);

  // Optionally wait for features to load before rendering children to prevent flicker
  // For SSR / performance, we might want to just render children immediately.
  // We'll render immediately to avoid blocking paint.

  return <GBProvider growthbook={growthbook}>{children}</GBProvider>;
};
