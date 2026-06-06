/**
 * SEQ-15 Task 9: Local, privacy-first analytics event system.
 * No external services — logs to console in dev, fires custom events for future integration.
 *
 * @example
 * trackEvent('form_submit', { formId: 'contact', fields: 5 });
 * trackEvent('cta_click', { text: 'Kostenlose Beratung', position: 'hero' });
 */

export type ConversionEvent =
  | 'form_start'
  | 'form_progress'
  | 'form_submit'
  | 'form_success'
  | 'form_error'
  | 'cta_click'
  | 'feature_used'
  | 'discovery_call_booked'
  | 'scroll_depth'
  | 'page_view'
  | 'engagement';

interface EventProperties {
  [key: string]: unknown;
}

const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';

/**
 * Track a conversion event locally.
 * - In development: logs to console
 * - In production: dispatches a CustomEvent on `document` for future integration
 */
export function trackEvent(eventName: ConversionEvent, properties?: EventProperties): void {
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    path: typeof window !== 'undefined' ? window.location.pathname : '',
    ...properties,
  };

  if (isDev) {
    console.log(`[Analytics] ${eventName}`, payload);
  }

  // Dispatch CustomEvent for any listener (future GA, Plausible, etc.)
  if (typeof document !== 'undefined') {
    document.dispatchEvent(new CustomEvent('analytics', { detail: payload }));
  }
}

/**
 * Track CTA clicks with position context.
 */
export function trackCTA(text: string, position: string, url?: string): void {
  trackEvent('cta_click', { text, position, url });
}

/**
 * Track form lifecycle events.
 */
export function trackFormStart(formId: string): void {
  trackEvent('form_start', { formId });
}

export function trackFormProgress(formId: string, filledFields: number, totalFields: number): void {
  trackEvent('form_progress', {
    formId,
    filledFields,
    totalFields,
    percentage: Math.round((filledFields / totalFields) * 100),
  });
}

export function trackFormSubmit(formId: string): void {
  trackEvent('form_submit', { formId });
}

export function trackFormSuccess(formId: string): void {
  trackEvent('form_success', { formId });
}
