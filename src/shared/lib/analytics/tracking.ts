import { track } from '@vercel/analytics';
import { logConversionEvent } from '@/features/lead/actions/logConversionEvent';
import {
  CONVERSION_EVENTS,
  type ConversionEventName,
} from '@/features/lead/model/conversionEvents';

/**
 * The single client-side tracking entry point.
 *
 * - GA4 / PostHog receive the event only once their scripts are loaded, which
 *   happens after the visitor accepts analytics cookies.
 * - Vercel Web Analytics receives every event (cookie-free, always on).
 * - Conversion intents (see `CONVERSION_EVENTS`) are additionally written to
 *   the first-party `conversion_events` table via a server action, so the
 *   owner can count clicks and form starts regardless of consent.
 */

export type EventName =
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'form_success'
  | 'form_error'
  | 'form_abandon'
  | 'download'
  | 'video_play'
  | 'video_complete'
  | 'outbound_click'
  | 'phone_click'
  | 'email_click'
  | 'whatsapp_click'
  | 'sticky_bar_click'
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
  form_kind?: string; // for form_* events
  city?: string; // for local landing pages
  [key: string]: unknown;
}

const CONVERSION_EVENT_SET = new Set<string>(CONVERSION_EVENTS);

function isConversionEvent(name: EventName): name is ConversionEventName {
  return CONVERSION_EVENT_SET.has(name);
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

export const trackEvent = (eventName: EventName, properties?: EventProperties) => {
  if (typeof window === 'undefined') return;

  // Google Analytics 4 — type from src/@types/global.d.ts
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }

  // PostHog — type from src/@types/global.d.ts
  if (window.posthog) {
    window.posthog.capture(eventName, properties);
  }

  // Vercel Web Analytics custom events (cookie-free)
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

  // First-party conversion log (cookie-free, server-side)
  if (isConversionEvent(eventName)) {
    const path = window.location?.pathname ?? '';
    const locale = path.startsWith('/en') ? 'en' : 'de';
    try {
      void logConversionEvent({
        event: eventName,
        path,
        locale,
        packageId: asString(properties?.package_id),
        formKind: asString(properties?.form_kind),
        city: asString(properties?.city),
        ctaPosition: asString(properties?.cta_position),
      }).catch(() => {
        // never let analytics break the UI
      });
    } catch {
      // ignore
    }
  }
};
