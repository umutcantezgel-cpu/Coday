'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM_BOOKING = process.env.EMAIL_FROM || 'Coday Booking <onboarding@resend.dev>';
const ADMIN_EMAIL = 'umutcantezgel@gmail.com';

export interface BookingPayload {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time_slot: string;
  service_type?: string;
  notes?: string;
}

export async function bookAppointment(payload: BookingPayload) {
  try {
    const { name, email, phone, date, time_slot, service_type, notes } = payload;

    if (!name || !email || !date || !time_slot) {
      return { error: 'Missing required fields' };
    }

    if (!email.includes('@') || !email.includes('.')) {
      return { error: 'Invalid email format' };
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Simulating success for local development.');
      return { success: true, message: 'Booking confirmed (simulated)' };
    }

    // Email 1: Confirmation to the CUSTOMER
    try {
      await resend.emails.send({
        from: EMAIL_FROM_BOOKING,
        to: [email],
        subject: `Terminbestätigung: ${date} um ${time_slot}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 16px;">
            <h2 style="color: #111827; margin-bottom: 8px;">Termin bestätigt ✅</h2>
            <p style="color: #374151;">Hallo ${name},</p>
            <p style="color: #374151;">Ihr Beratungstermin wurde erfolgreich bei uns angefragt. Wir haben den Termin in unserem Kalender vermerkt.</p>
            <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
              <tr><td style="padding: 8px 0; color: #6b7280;">Datum</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${date}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Uhrzeit</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${time_slot} Uhr</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Service</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${service_type || 'Beratung'}</td></tr>
            </table>
            <p style="color: #374151;">Wir freuen uns auf das Gespräch!</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #9ca3af; font-size: 13px;">Coday Agency · codayweb.de</p>
          </div>
        `,
      });
    } catch (customerEmailErr) {
      console.warn(
        'Could not send email to customer (likely Sandbox restriction):',
        customerEmailErr
      );
    }

    // Email 2: Notification to ADMIN
    const adminEmailResult = await resend.emails.send({
      from: EMAIL_FROM_BOOKING,
      to: [ADMIN_EMAIL],
      subject: `📅 Neue Buchung: ${name} — ${date} um ${time_slot}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f0fdf4; border-radius: 16px; border: 1px solid #bbf7d0;">
          <h2 style="color: #166534; margin-bottom: 16px;">📅 Neue Terminbuchung eingegangen</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Name</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${name}</td></tr>
            <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">E-Mail</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
            <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Telefon</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${phone || '—'}</td></tr>
            <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Datum</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${date}</td></tr>
            <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Uhrzeit</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${time_slot} Uhr</td></tr>
            <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Service</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${service_type || 'Beratung'}</td></tr>
            <tr><td style="padding: 10px 12px; color: #6b7280;">Notizen</td><td style="padding: 10px 12px; color: #111827;">${notes || 'Keine Notizen'}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #bbf7d0; margin: 24px 0;" />
          <p style="color: #6b7280; font-size: 13px;">Automatisch generiert von Coday Booking System (Server Action)</p>
        </div>
      `,
    });

    if (adminEmailResult.error) {
      console.error('Resend Error:', adminEmailResult.error);
      return { error: 'Failed to send booking notification.' };
    }

    return { success: true, message: 'Booking confirmed' };
  } catch (error) {
    console.error('Booking Action Error:', error);
    return { error: 'Internal Server Error' };
  }
}
