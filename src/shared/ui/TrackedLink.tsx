'use client';

import React from 'react';
import { trackEvent, type EventName } from '@/shared/lib/analytics/tracking';

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  event: EventName;
  ctaPosition: string;
  ctaLabel?: string;
  children: React.ReactNode;
}

/**
 * Plain anchor that records a conversion event on click. Use it from server
 * components (footer, hero) for `tel:`, `mailto:` and WhatsApp links, which
 * otherwise leave no trace in any analytics.
 */
export const TrackedLink: React.FC<TrackedLinkProps> = ({
  event,
  ctaPosition,
  ctaLabel,
  onClick,
  children,
  ...rest
}) => (
  <a
    {...rest}
    onClick={(e) => {
      trackEvent(event, { cta_position: ctaPosition, cta_label: ctaLabel, destination: rest.href });
      onClick?.(e);
    }}
  >
    {children}
  </a>
);
