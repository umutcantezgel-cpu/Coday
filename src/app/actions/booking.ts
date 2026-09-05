'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { createRateLimiter } from '@/shared/lib/rate-limiter';
import { createAdminClient } from '@/shared/lib/supabase/server';
import {
  BOOKING_DURATION_MINUTES,
  generateAgencyBookingEmailHtml,
  generateCustomerBookingEmailHtml,
  getAgencyBookingSubject,
  getCustomerBookingSubject,
  getServiceLabel,
  BookingEmailData,
} from '@/shared/lib/email/bookingTemplates';
import { berlinToUtc, buildIcs } from '@/shared/lib/email/ics';
import { EMAIL_BRAND } from '@/shared/lib/email/layout';
import {
  sendEmail,
  getAdminEmail,
  getPrimaryAdminEmail,
  isEmailConfigured,
} from '@/shared/lib/email/sendEmail';

// Max 5 booking attempts per 10 minutes per IP
const bookingRateLimiter = createRateLimiter({
  max: 5,
  windowMs: 10 * 60 * 1000,
});

const bookingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .transform((v) => (v ? v : undefined)),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  time_slot: z.string().regex(/^\d{2}:\d{2}$/, 'time_slot must be HH:MM'),
  service_type: z.string().trim().max(80).optional(),
  notes: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .transform((v) => (v ? v : undefined)),
  locale: z.enum(['de', 'en']).default('de'),
});

export type BookingPayload = z.input<typeof bookingSchema>;

export interface BookingResult {
  success?: boolean;
  message?: string;
  error?: string;
}

const MESSAGES = {
  de: {
    rateLimited:
      'Zu viele Buchungsanfragen. Bitte warten Sie einige Minuten, bevor Sie es erneut versuchen.',
    invalid: 'Bitte prüfen Sie Ihre Angaben (Name, E-Mail, Datum und Uhrzeit).',
    slotTaken: 'Dieser Termin wurde gerade vergeben. Bitte wählen Sie eine andere Uhrzeit.',
    failed:
      'Die Buchung konnte nicht übermittelt werden. Bitte rufen Sie kurz an oder versuchen Sie es erneut.',
  },
  en: {
    rateLimited: 'Too many booking attempts. Please wait a few minutes and try again.',
    invalid: 'Please check your details (name, e-mail, date and time).',
    slotTaken: 'This slot has just been taken. Please choose another time.',
    failed: 'The booking could not be submitted. Please give us a quick call or try again.',
  },
} as const;

export async function bookAppointment(payload: BookingPayload): Promise<BookingResult> {
  const lang = payload?.locale === 'en' ? 'en' : 'de';
  const msg = MESSAGES[lang];

  try {
    // 0. Rate limiting by client IP
    const headerList = await headers();
    const forwardedFor = headerList.get('x-forwarded-for');
    const clientIp = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : headerList.get('x-real-ip') || '127.0.0.1';

    if (bookingRateLimiter.isRateLimited(clientIp)) {
      return { error: msg.rateLimited };
    }

    // 1. Validate
    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      return { error: msg.invalid };
    }
    const booking = parsed.data;

    const bookingData: BookingEmailData = {
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      date: booking.date,
      time_slot: booking.time_slot,
      service_type: booking.service_type,
      notes: booking.notes,
      locale: booking.locale,
    };
    const summaryLine = `${booking.name} · ${booking.date} ${booking.time_slot} · ${booking.email}${booking.phone ? ` · ${booking.phone}` : ''}`;

    // 2. Store the slot first: the unique (date, time_slot) constraint prevents double bookings.
    let dbStatus: 'stored' | 'skipped' | 'failed' = 'skipped';
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        const { error: dbError } = await supabase.from('bookings').insert([
          {
            name: booking.name,
            email: booking.email,
            phone: booking.phone ?? null,
            date: booking.date,
            time_slot: booking.time_slot,
            service_type: booking.service_type ?? 'consultation',
            notes: booking.notes ?? null,
            status: 'confirmed',
          },
        ]);
        if (dbError) {
          if (dbError.code === '23505') {
            return { error: msg.slotTaken };
          }
          console.error('Supabase booking insert failed (non-blocking):', dbError);
          dbStatus = 'failed';
        } else {
          dbStatus = 'stored';
        }
      } catch (dbErr) {
        console.error('Supabase admin client error (non-blocking):', dbErr);
        dbStatus = 'failed';
      }
    }

    // 3. Calendar attachment for both sides
    const adminEmail = getAdminEmail();
    const primaryAdmin = getPrimaryAdminEmail();
    const start = berlinToUtc(booking.date, booking.time_slot);
    const ics = buildIcs({
      uid: `booking-${booking.date}-${booking.time_slot.replace(':', '')}-${Date.now()}@codayweb.de`,
      start,
      durationMinutes: BOOKING_DURATION_MINUTES,
      summary: lang === 'en' ? 'Call with Coday' : 'Gespräch mit Coday',
      description: getServiceLabel(booking.service_type, lang),
      location: lang === 'en' ? 'Phone / online' : 'Telefon / online',
      organizer: { name: EMAIL_BRAND.owner, email: primaryAdmin },
      attendee: { name: booking.name, email: booking.email },
      url: 'https://codayweb.de',
    });
    const attachments = [
      {
        filename: 'coday-termin.ics',
        content: Buffer.from(ics, 'utf8').toString('base64'),
        contentType: 'text/calendar',
      },
    ];

    // 4. E-mails in parallel with retries and sender fallback
    if (!isEmailConfigured()) {
      console.warn('RESEND_API_KEY is not set.', JSON.stringify({ summaryLine, dbStatus }));
      if (process.env.NODE_ENV === 'production' && dbStatus !== 'stored') {
        return { error: msg.failed };
      }
      return { success: true, message: 'Booking recorded (email not configured)' };
    }

    const [customerRes, adminRes] = await Promise.all([
      sendEmail({
        kind: 'booking_customer',
        to: booking.email,
        subject: getCustomerBookingSubject(bookingData),
        html: generateCustomerBookingEmailHtml(bookingData),
        replyTo: primaryAdmin,
        attachments,
        tags: [{ name: 'kind', value: 'booking_customer' }],
      }),
      sendEmail({
        kind: 'booking_agency',
        to: adminEmail,
        subject: getAgencyBookingSubject(bookingData),
        html: generateAgencyBookingEmailHtml(bookingData),
        replyTo: booking.email,
        attachments,
        tags: [{ name: 'kind', value: 'booking_agency' }],
      }),
    ]);

    if (!adminRes.ok) {
      console.error(
        'BOOKING_EMAIL_FAILED',
        JSON.stringify({ summaryLine, dbStatus, error: adminRes.error, booking: bookingData })
      );
      if (process.env.SLACK_WEBHOOK_URL) {
        try {
          await fetch(process.env.SLACK_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: `🚨 Termin-E-Mail konnte nicht zugestellt werden. Termin: ${summaryLine}${dbStatus === 'stored' ? ' (in Supabase gespeichert)' : ''}`,
            }),
          });
        } catch (slackErr) {
          console.warn('Slack webhook failed (non-blocking):', slackErr);
        }
      }
    }

    const captured = adminRes.ok || customerRes.ok || dbStatus === 'stored';
    if (!captured) {
      return { error: msg.failed };
    }

    return {
      success: true,
      message: `Booking confirmed (${adminRes.ok ? 'agency' : 'no-agency'}/${customerRes.ok ? 'customer' : 'no-customer'}/${dbStatus})`,
    };
  } catch (error) {
    console.error('Booking Action Error:', error);
    return { error: msg.failed };
  }
}
