/**
 * Centralized Window interface extensions.
 * All third-party global declarations should live here
 * instead of scattered across individual modules.
 */
export {};

declare global {
  interface Window {
    /** LinkedIn Insight Tag partner IDs */
    _linkedin_data_partner_ids?: string[];
    /** LinkedIn tracking function */
    lintrk?: (action: string, data?: Record<string, unknown>) => void;
    /** PostHog analytics instance */
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
    /** Google Analytics gtag function */
    gtag?: (...args: unknown[]) => void;
    /** Server-hydrated i18n resource store */
    initialI18nStore?: Record<string, unknown>;
  }
}
