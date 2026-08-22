'use server';

import { Resend } from 'resend';
import { headers } from 'next/headers';
import { createRateLimiter } from '@/shared/lib/rate-limiter';
import {
  generateAgencyLeadEmailHtml,
  generateCustomerConfirmationEmailHtml,
  LeadEmailData,
} from '@/shared/lib/email/leadTemplates';

// Max 5 lead submissions per 10 minutes per IP
const leadRateLimiter = createRateLimiter({
  max: 5,
  windowMs: 10 * 60 * 1000,
});

export interface LeadSubmissionPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  project?: string;
  source?: string;
  packageId?: string;
  packageName?: string;
  addons?: Array<{ id: string; name: string; category?: string }>;
  deliveryDays?: number;
}

export async function saveLeadInternalAction(data: LeadSubmissionPayload) {
  try {
    // 0. Rate limiting by client IP
    const headerList = await headers();
    const forwardedFor = headerList.get('x-forwarded-for');
    const clientIp = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : headerList.get('x-real-ip') || '127.0.0.1';

    if (leadRateLimiter.isRateLimited(clientIp)) {
      return {
        success: false,
        error:
          'Zu viele Anfragen. Bitte warten Sie einige Minuten, bevor Sie eine weitere Nachricht senden.',
      };
    }

    // Load the API key from Vercel environment variables
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('Server misconfiguration: Missing RESEND_API_KEY');
      return {
        success: false,
        error: 'MISSING_ENV: RESEND_API_KEY is not defined in Vercel',
      };
    }

    const resend = new Resend(resendApiKey);

    // Configurable email sender — set EMAIL_FROM in Vercel env
    const EMAIL_FROM = process.env.EMAIL_FROM || 'Coday Contact <leads@codayweb.de>';
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'umut@codayweb.de';

    let emailStatus = 'skipped';
    let adminEmailResult: any = null;

    const emailPayload: LeadEmailData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
      project: data.project,
      packageName: data.packageName || data.project,
      addons: data.addons,
      deliveryDays: data.deliveryDays,
      source: data.source,
    };

    // 1. Send Agency Lead Notification Email
    try {
      const agencySubject = `⚡ Neue Anfrage: ${data.name || 'Unbekannt'} (${data.packageName || data.project || 'Projekt'})`;
      const agencyHtml = generateAgencyLeadEmailHtml(emailPayload);

      const adminRes = await resend.emails.send({
        from: EMAIL_FROM,
        to: [ADMIN_EMAIL],
        subject: agencySubject,
        html: agencyHtml,
        replyTo: data.email,
      });

      if (adminRes.error) {
        throw adminRes.error;
      }
      adminEmailResult = adminRes.data;
      emailStatus = 'admin_sent';
    } catch (adminErr: any) {
      console.warn(
        'First attempt to send admin email failed. Retrying with onboarding@resend.dev...',
        adminErr
      );
      try {
        // Fallback: If custom domain verification ever drops, fallback to onboarding@resend.dev
        const fallbackResend = new Resend(process.env.RESEND_API_KEY);
        const agencySubject = `⚡ Neue Anfrage (Fallback): ${data.name || 'Unbekannt'} (${data.packageName || data.project || 'Projekt'})`;
        const agencyHtml = generateAgencyLeadEmailHtml(emailPayload);

        const fallbackRes = await fallbackResend.emails.send({
          from: 'Coday Contact <onboarding@resend.dev>',
          to: [ADMIN_EMAIL],
          subject: agencySubject,
          html: agencyHtml,
          replyTo: data.email,
        });

        if (fallbackRes.error) {
          throw fallbackRes.error;
        }
        adminEmailResult = fallbackRes.data;
        emailStatus = 'admin_sent_fallback';
      } catch (fallbackErr: any) {
        console.error('Error sending admin email (even with fallback):', fallbackErr);
        const errorMsg = fallbackErr?.message || JSON.stringify(fallbackErr);
        return { success: false, error: 'ADMIN_EMAIL_ERROR: ' + errorMsg };
      }
    }

    // 2. Send Customer Confirmation Autoresponder Email
    try {
      const customerSubject = 'Vielen Dank für Ihre Anfrage bei Coday! 🚀';
      const customerHtml = generateCustomerConfirmationEmailHtml(emailPayload);

      const customerRes = await resend.emails.send({
        from: EMAIL_FROM,
        to: [data.email],
        subject: customerSubject,
        html: customerHtml,
        replyTo: ADMIN_EMAIL,
      });

      if (customerRes.error) {
        console.warn(
          'Could not send confirmation email to customer (Sandbox limit?):',
          customerRes.error
        );
      } else {
        emailStatus = 'both_sent';
      }
    } catch (customerErr) {
      console.warn('Exception while sending confirmation email:', customerErr);
    }

    return { success: true, status: emailStatus };
  } catch (error) {
    console.error('Internal Save Error:', error);
    return { success: false, error: 'CATCH_ERROR: ' + String(error) };
  }
}
