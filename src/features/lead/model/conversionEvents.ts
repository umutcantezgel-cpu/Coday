/**
 * Intent signals that are written to the first-party `conversion_events` table
 * (see `logConversionEvent`). Kept outside the server-action module because a
 * `'use server'` file may only export async functions.
 */
export const CONVERSION_EVENTS = [
  'cta_click',
  'form_start',
  'form_submit',
  'form_success',
  'form_error',
  'phone_click',
  'email_click',
  'whatsapp_click',
  'sticky_bar_click',
  'discovery_call_booked',
  'package_select',
  'package_finder_result',
  'package_inquiry_click',
] as const;

export type ConversionEventName = (typeof CONVERSION_EVENTS)[number];

export interface ConversionEventInput {
  event: ConversionEventName;
  path?: string;
  locale?: string;
  packageId?: string;
  formKind?: string;
  city?: string;
  ctaPosition?: string;
}
