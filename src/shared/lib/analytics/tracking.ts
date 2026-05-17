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
  | 'engaged_reading';

export interface EventProperties {
  cta_label?: string;
  cta_position?: string;
  destination?: string;
  depth?: number; // for scroll_depth (25, 50, 75, 100)
  duration_seconds?: number; // for engaged_reading
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
  }
};
