'use server';

import { createHash } from 'node:crypto';
import { headers } from 'next/headers';
import { createAdminClient } from '@/shared/lib/supabase/server';
import {
  CONVERSION_EVENTS,
  type ConversionEventInput,
} from '@/features/lead/model/conversionEvents';

/**
 * First-party, cookie-free conversion log.
 *
 * GA4, PostHog and Clarity only run after the visitor accepts analytics
 * cookies, which most visitors never do. This action writes intent signals
 * (form starts, CTA clicks, phone/WhatsApp taps) to Supabase so the owner can
 * count them regardless of consent.
 *
 * `session_hash` is a one-way hash of IP, user agent, the calendar day and a
 * server secret. It only serves to de-duplicate "same visitor, same day"; it is
 * never joined to `leads`, rotates daily and cannot be reversed to an IP.
 */

const EVENT_SET = new Set<string>(CONVERSION_EVENTS);

function clip(value: string | undefined, max: number): string | null {
  if (!value) return null;
  return value.slice(0, max);
}

export async function logConversionEvent(input: ConversionEventInput): Promise<void> {
  try {
    if (!input || !EVENT_SET.has(input.event)) return;
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return;

    const headerList = await headers();
    const forwardedFor = headerList.get('x-forwarded-for');
    const ip = (forwardedFor ? forwardedFor.split(',')[0] : headerList.get('x-real-ip') || '')
      .trim()
      .toLowerCase();
    const userAgent = headerList.get('user-agent') || '';
    const day = new Date().toISOString().slice(0, 10);
    const secret = process.env.EVENT_HASH_SECRET || '';

    const sessionHash = createHash('sha256')
      .update(`${ip}|${userAgent}|${day}|${secret}`)
      .digest('hex')
      .slice(0, 32);

    const supabase = createAdminClient();
    const { error } = await supabase.from('conversion_events').insert([
      {
        event: input.event,
        path: clip(input.path, 300),
        locale: clip(input.locale, 5),
        package_id: clip(input.packageId, 40),
        form_kind: clip(input.formKind, 40),
        city: clip(input.city, 80),
        cta_position: clip(input.ctaPosition, 80),
        session_hash: sessionHash,
      },
    ]);
    if (error) {
      console.warn('[logConversionEvent] insert failed (non-blocking):', error.message);
    }
  } catch (err) {
    console.warn('[logConversionEvent] non-blocking failure:', err);
  }
}
