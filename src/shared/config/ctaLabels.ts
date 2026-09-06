/**
 * The canonical set of call-to-action labels. Every button that asks the
 * visitor to get in touch uses one of these, so the site never presents five
 * names for the same action ("Strategiegespräch", "Erstgespräch",
 * "Potenzialanalyse", "Audit", "Projekt starten").
 */
export const CTA_LABELS = {
  quickRequest: { de: 'Kurz anfragen', en: 'Quick request' },
  callback: { de: 'Rückruf erhalten', en: 'Get a callback' },
  booking: { de: 'Termin buchen', en: 'Book a call' },
  call: { de: 'Anrufen', en: 'Call' },
  whatsapp: { de: 'WhatsApp', en: 'WhatsApp' },
  websiteCheck: { de: 'Kostenloser Website-Check', en: 'Free website check' },
} as const;

export type CtaKey = keyof typeof CTA_LABELS;

export function ctaLabel(key: CtaKey, locale: string): string {
  return CTA_LABELS[key][locale === 'en' ? 'en' : 'de'];
}

export const PHONE_DISPLAY = '+49 176 41195301';
export const PHONE_HREF = 'tel:+4917641195301';
