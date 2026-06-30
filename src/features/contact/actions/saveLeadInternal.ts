'use server';

import { Resend } from 'resend';

export async function saveLeadInternalAction(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  project?: string;
  source?: string;
}) {
  try {
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
    const EMAIL_FROM = process.env.EMAIL_FROM || 'Coday Contact <onboarding@resend.dev>';
    const ADMIN_EMAIL = 'umutcantezgel@gmail.com';

    let emailStatus = 'skipped';
    let adminEmailResult: any = null;

    try {
      const adminRes = await resend.emails.send({
        from: EMAIL_FROM,
        to: [ADMIN_EMAIL],
        subject: `Neue Anfrage: ${data.name || 'Unbekannt'} (${data.project || 'Allgemein'})`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #eff6ff; border-radius: 16px; border: 1px solid #bfdbfe;">
            <h2 style="color: #1e40af; margin-bottom: 16px;">📩 Neue Kontaktanfrage</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Name</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${data.name || '—'}</td></tr>
              <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">E-Mail</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td></tr>
              <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Telefon</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${data.phone || '—'}</td></tr>
              <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Firma</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${data.company || '—'}</td></tr>
              <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Projekt/Quelle</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${data.project || data.source || '—'}</td></tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: white; border-radius: 12px;">
              <h3 style="color: #374151; margin: 0 0 8px;">Nachricht:</h3>
              <p style="white-space: pre-wrap; color: #374151; margin: 0;">${data.message || '—'}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #bfdbfe; margin: 24px 0;" />
            <p style="color: #6b7280; font-size: 13px;">Automatisch generiert von Coday Contact System (No DB)</p>
          </div>
        `,
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
        // Fallback: If Vercel has an unverified EMAIL_FROM, the first attempt fails.
        // We retry using the same API key and force the sender to onboarding@resend.dev.
        const fallbackRes = await resend.emails.send({
          from: 'Coday Contact <onboarding@resend.dev>',
          to: [ADMIN_EMAIL],
          subject: `Neue Anfrage: ${data.name || 'Unbekannt'} (${data.project || 'Allgemein'})`,
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #eff6ff; border-radius: 16px; border: 1px solid #bfdbfe;">
              <h2 style="color: #1e40af; margin-bottom: 16px;">📩 Neue Kontaktanfrage (Fallback Sender)</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Name</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${data.name || '—'}</td></tr>
                <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">E-Mail</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td></tr>
                <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Telefon</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${data.phone || '—'}</td></tr>
                <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Firma</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${data.company || '—'}</td></tr>
                <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Projekt/Quelle</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${data.project || data.source || '—'}</td></tr>
              </table>
              <div style="margin-top: 24px; padding: 16px; background: white; border-radius: 12px;">
                <h3 style="color: #374151; margin: 0 0 8px;">Nachricht:</h3>
                <p style="white-space: pre-wrap; color: #374151; margin: 0;">${data.message || '—'}</p>
              </div>
              <hr style="border: none; border-top: 1px solid #bfdbfe; margin: 24px 0;" />
              <p style="color: #6b7280; font-size: 13px;">Automatisch generiert von Coday Contact System (No DB)</p>
            </div>
          `,
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

    // Customer Confirmation Email
    try {
      const customerRes = await resend.emails.send({
        from: EMAIL_FROM,
        to: [data.email],
        subject: 'Danke für deine Anfrage bei Coday! 🚀',
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 16px;">
            <h2 style="color: #111827; margin-bottom: 8px;">Anfrage erfolgreich gesendet ✅</h2>
            <p style="color: #374151; font-size: 16px; line-height: 1.5;">Hallo ${data.name || 'Zukünftiger Partner'},</p>
            <p style="color: #374151; font-size: 16px; line-height: 1.5;">vielen Dank für deine Nachricht! Wir haben deine Anfrage erhalten und werden uns schnellstmöglich bei dir melden.</p>
            
            <div style="background: white; padding: 20px; border-radius: 12px; margin: 24px 0; border: 1px solid #e5e7eb;">
              <h3 style="margin-top: 0; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Deine Nachricht:</h3>
              <p style="color: #111827; font-style: italic; margin: 0;">"${data.message || '—'}"</p>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.5;">Viele Grüße,<br/>Dein Coday Team</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #9ca3af; font-size: 13px;">Coday Agency · codayweb.de</p>
          </div>
        `,
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
