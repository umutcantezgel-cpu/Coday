import { track } from '@vercel/analytics';

export type EventName =
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'form_abandon'
  | 'download'
  | 'video_play'
  | 'video_complete'
  | 'outbound_click'
  | 'phone_click'
  | 'email_click'
  | 'discovery_call_booked'
  | 'scroll_depth'
  | 'engaged_reading'
  | 'preferred_source_click'
  | 'package_select'
  | 'addon_toggle'
  | 'package_finder_result'
  | 'package_inquiry_click';

export interface EventProperties {
  cta_label?: string;
  cta_position?: string;
  destination?: string;
  depth?: number; // for scroll_depth (25, 50, 75, 100)
  duration_seconds?: number; // for engaged_reading
  package_id?: string; // for package_* events and form_submit
  addon_id?: string; // for addon_toggle
  addon_count?: number; // for package_inquiry_click and form_submit
  selected?: boolean; // for addon_toggle
  [key: string]: unknown;
}

export const trackEvent = (eventName: EventName, properties?: EventProperties) => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4 — type from src/@types/global.d.ts
    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }

    // PostHog — type from src/@types/global.d.ts
    if (window.posthog) {
      window.posthog.capture(eventName, properties);
    }

    // Vercel Web Analytics Custom Events
    try {
      const vercelProps: Record<string, string | number | boolean | null> = {};
      if (properties) {
        for (const [key, val] of Object.entries(properties)) {
          if (
            typeof val === 'string' ||
            typeof val === 'number' ||
            typeof val === 'boolean' ||
            val === null
          ) {
            vercelProps[key] = val;
          }
        }
      }
      track(eventName, vercelProps);
    } catch {
      // Ignore if Vercel Analytics is disabled
    }
  }
};
