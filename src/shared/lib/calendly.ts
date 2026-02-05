/**
 * Calendly Integration
 * Embeds Calendly scheduling widget for booking consultations
 */

// Calendly configuration
const CALENDLY_URL = 'https://calendly.com/coday-beratung/30min';

interface CalendlyOptions {
    prefillName?: string;
    prefillEmail?: string;
    utm?: {
        source?: string;
        medium?: string;
        campaign?: string;
    };
}

/**
 * Open Calendly popup widget
 */
export function openCalendlyPopup(options: CalendlyOptions = {}): void {
    const url = new URL(CALENDLY_URL);

    // Add prefill data
    if (options.prefillName) {
        url.searchParams.set('name', options.prefillName);
    }
    if (options.prefillEmail) {
        url.searchParams.set('email', options.prefillEmail);
    }

    // Add UTM tracking
    if (options.utm?.source) {
        url.searchParams.set('utm_source', options.utm.source);
    }
    if (options.utm?.medium) {
        url.searchParams.set('utm_medium', options.utm.medium);
    }
    if (options.utm?.campaign) {
        url.searchParams.set('utm_campaign', options.utm.campaign);
    }

    // Check if Calendly widget is loaded
    if (typeof window !== 'undefined' && (window as any).Calendly) {
        (window as any).Calendly.initPopupWidget({
            url: url.toString(),
        });
    } else {
        // Fallback: open in new tab
        window.open(url.toString(), '_blank', 'noopener,noreferrer');
    }
}

/**
 * Open Calendly in new tab (fallback)
 */
export function openCalendlyTab(options: CalendlyOptions = {}): void {
    const url = new URL(CALENDLY_URL);

    if (options.prefillName) {
        url.searchParams.set('name', options.prefillName);
    }
    if (options.prefillEmail) {
        url.searchParams.set('email', options.prefillEmail);
    }

    window.open(url.toString(), '_blank', 'noopener,noreferrer');
}

/**
 * Get Calendly embed URL for iframe
 */
export function getCalendlyEmbedUrl(options: CalendlyOptions = {}): string {
    const url = new URL(CALENDLY_URL);

    if (options.prefillName) {
        url.searchParams.set('name', options.prefillName);
    }
    if (options.prefillEmail) {
        url.searchParams.set('email', options.prefillEmail);
    }

    // Add hide event type details for cleaner embed
    url.searchParams.set('hide_event_type_details', '1');
    url.searchParams.set('hide_gdpr_banner', '1');

    return url.toString();
}

export default { openCalendlyPopup, openCalendlyTab, getCalendlyEmbedUrl };
