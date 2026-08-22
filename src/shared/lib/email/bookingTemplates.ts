/**
 * High-End Luxury HTML Email Templates for Coday Appointment Booking
 */

export interface BookingEmailData {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time_slot: string;
  service_type?: string;
  notes?: string;
}

function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * 1. Agency Notification for Booking
 */
export function generateAgencyBookingEmailHtml(data: BookingEmailData): string {
  const name = escapeHtml(data.name || 'Unbekannt');
  const email = escapeHtml(data.email || '—');
  const phone = escapeHtml(data.phone || 'Nicht angegeben');
  const date = escapeHtml(data.date);
  const time_slot = escapeHtml(data.time_slot);
  const service = escapeHtml(data.service_type || 'Kostenlose Erstberatung (15 Min)');
  const notes = escapeHtml(data.notes || 'Keine Notizen');

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>Neue Terminbuchung</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f8fafc; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0f172a; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #1e293b; border-radius: 20px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);">
          
          <tr>
            <td style="padding: 32px; background: linear-gradient(135deg, #064e3b 0%, #1e293b 100%); border-bottom: 1px solid #334155;">
              <div style="display: inline-block; padding: 4px 12px; background: rgba(52, 211, 153, 0.2); border: 1px solid rgba(52, 211, 153, 0.4); border-radius: 9999px; color: #6ee7b7; font-size: 11px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px;">
                📅 Neuer Beratungstermin gebucht
              </div>
              <h1 style="margin: 0 0 6px 0; color: #ffffff; font-size: 24px; font-weight: 800;">${date} um ${time_slot} Uhr</h1>
              <p style="margin: 0; color: #a7f3d0; font-size: 14px;">Ansprechpartner: <strong>${name}</strong></p>
            </td>
          </tr>

          <tr>
            <td style="padding: 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0f172a; border-radius: 14px; border: 1px solid #334155; padding: 16px; margin-bottom: 24px;">
                <tr><td style="padding: 8px 12px; color: #94a3b8; font-size: 13px; width: 35%; border-bottom: 1px solid #1e293b;">Name</td><td style="padding: 8px 12px; color: #ffffff; font-size: 13px; font-weight: 600; border-bottom: 1px solid #1e293b;">${name}</td></tr>
                <tr><td style="padding: 8px 12px; color: #94a3b8; font-size: 13px; border-bottom: 1px solid #1e293b;">E-Mail</td><td style="padding: 8px 12px; color: #38bdf8; font-size: 13px; font-weight: 600; border-bottom: 1px solid #1e293b;"><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></td></tr>
                <tr><td style="padding: 8px 12px; color: #94a3b8; font-size: 13px; border-bottom: 1px solid #1e293b;">Telefon</td><td style="padding: 8px 12px; color: #ffffff; font-size: 13px; font-weight: 600; border-bottom: 1px solid #1e293b;">${phone}</td></tr>
                <tr><td style="padding: 8px 12px; color: #94a3b8; font-size: 13px; border-bottom: 1px solid #1e293b;">Fokus</td><td style="padding: 8px 12px; color: #ffffff; font-size: 13px; font-weight: 600; border-bottom: 1px solid #1e293b;">${service}</td></tr>
                <tr><td style="padding: 8px 12px; color: #94a3b8; font-size: 13px;">Notizen</td><td style="padding: 8px 12px; color: #cbd5e1; font-size: 13px;">${notes}</td></tr>
              </table>

              <div style="text-align: center;">
                <a href="mailto:${email}?subject=Best%C3%A4tigung%20unseres%20Gespr%C3%A4chs%20am%20${encodeURIComponent(date)}" style="display: inline-block; padding: 12px 24px; background-color: #10b981; color: #064e3b; font-size: 13px; font-weight: 800; text-decoration: none; border-radius: 9999px; text-transform: uppercase;">
                  ✉️ Kunden kontaktieren
                </a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 2. Customer Confirmation for Booking
 */
export function generateCustomerBookingEmailHtml(data: BookingEmailData): string {
  const name = escapeHtml(data.name || 'Guten Tag');
  const date = escapeHtml(data.date);
  const time_slot = escapeHtml(data.time_slot);
  const service = escapeHtml(data.service_type || 'Kostenloses 15-Minuten Strategiegespräch');

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>Terminbestätigung Coday</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08);">
          
          <tr>
            <td style="padding: 36px 32px 28px 32px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff;">
              <div style="display: inline-block; padding: 4px 12px; background: rgba(52, 211, 153, 0.2); border: 1px solid rgba(52, 211, 153, 0.4); border-radius: 9999px; color: #a7f3d0; font-size: 11px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px;">
                Termin bestätigt ✅
              </div>
              <h1 style="margin: 0 0 6px 0; color: #ffffff; font-size: 26px; font-weight: 800;">Ihr Beratungstermin steht fest</h1>
              <p style="margin: 0; color: #94a3b8; font-size: 14px;">Wir haben Ihren Termin fest in unseren Kalender eingetragen.</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #1e293b;">Hallo <strong>${name}</strong>,</p>
              <p style="margin: 0 0 24px 0; font-size: 15px; color: #475569;">wir freuen uns auf das persönliche Gespräch mit Ihnen!</p>

              <div style="margin-bottom: 28px; padding: 22px; background-color: #f0fdf4; border-radius: 16px; border: 1px solid #bbf7d0;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr><td style="padding: 6px 0; color: #166534; font-size: 13px; font-weight: bold; width: 30%;">Datum:</td><td style="padding: 6px 0; color: #064e3b; font-size: 15px; font-weight: 800;">${date}</td></tr>
                  <tr><td style="padding: 6px 0; color: #166534; font-size: 13px; font-weight: bold;">Uhrzeit:</td><td style="padding: 6px 0; color: #064e3b; font-size: 15px; font-weight: 800;">${time_slot} Uhr</td></tr>
                  <tr><td style="padding: 6px 0; color: #166534; font-size: 13px; font-weight: bold;">Fokus:</td><td style="padding: 6px 0; color: #064e3b; font-size: 14px; font-weight: 600;">${service}</td></tr>
                </table>
              </div>

              <div style="padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0 0 2px 0; font-size: 16px; font-weight: 800; color: #0f172a;">Umutcan Emre Tezgel</p>
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #d97706; font-weight: 600;">Inhaber & Lead Web Architect · Coday</p>
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">Wetzlar, Hessen · <a href="https://codayweb.de" style="color: #64748b;">codayweb.de</a></p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
