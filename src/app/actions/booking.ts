'use server';

import { Resend } from 'resend';
import {
  generateAgencyBookingEmailHtml,
  generateCustomerBookingEmailHtml,
  BookingEmailData,
} from '@/shared/lib/email/bookingTemplates';

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM_BOOKING = process.env.EMAIL_FROM || 'Coday Booking <leads@codayweb.de>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'umut@codayweb.de';

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

    const bookingData: BookingEmailData = {
      name,
      email,
      phone,
      date,
      time_slot,
      service_type,
      notes,
    };

    // Email 1: Confirmation to the CUSTOMER
    try {
      await resend.emails.send({
        from: EMAIL_FROM_BOOKING,
        to: [email],
        subject: `Terminbestätigung: ${date} um ${time_slot} Uhr · Coday`,
        html: generateCustomerBookingEmailHtml(bookingData),
        replyTo: ADMIN_EMAIL,
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
      subject: `📅 Neuer Beratungstermin: ${name} — ${date} um ${time_slot} Uhr`,
      html: generateAgencyBookingEmailHtml(bookingData),
      replyTo: email,
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
