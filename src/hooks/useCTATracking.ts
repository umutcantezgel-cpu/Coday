'use client';

import { track } from '@vercel/analytics/react';

export type CTAVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'link';
export type CTALocation = 'hero' | 'header' | 'mid-page' | 'footer' | 'sticky-mobile' | 'exit-intent' | 'newsletter';

export function useCTATracking() {
  const trackCTA = (
    text: string,
    variant: CTAVariant = 'primary',
    location: CTALocation = 'hero'
  ) => {
    track('cta_click', {
      text,
      variant,
      location,
    });
  };

  return { trackCTA };
}
