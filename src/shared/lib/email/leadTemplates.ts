/**
 * High-End Luxury HTML Email Templates for Coday Lead Generation
 * Compatible with all major email clients (Apple Mail, Gmail, Outlook, iOS Mail)
 */

export interface LeadEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  project?: string;
  packageName?: string;
  addons?: Array<{ id: string; name: string; category?: string }>;
  deliveryDays?: number;
  source?: string;
  date?: string;
}

/**
 * Escapes HTML characters to prevent XSS in email templates
 */
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
 * 1. Agency Notification Email (umut@codayweb.de)
 * Dark Luxury Dashboard Style with High Contrast and Quick Action Links
 */
export function generateAgencyLeadEmailHtml(data: LeadEmailData): string {
  const name = escapeHtml(data.name || 'Unbekannt');
  const email = escapeHtml(data.email || '—');
  const phone = escapeHtml(data.phone || 'Nicht angegeben');
  const company = escapeHtml(data.company || 'Nicht angegeben');
  const message = escapeHtml(data.message || 'Keine Nachricht eingegeben.');
  const packageName = escapeHtml(data.packageName || data.project || 'Individuelles Projekt');
  const source = escapeHtml(data.source || 'Website Kontaktformular');
  const dateStr = data.date || new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });

  const addonsListHtml =
    data.addons && data.addons.length > 0
      ? data.addons
          .map(
            (addon) => `
              <li style="margin-bottom: 6px; color: #e2e8f0; font-size: 13px; list-style-type: none; display: flex; align-items: center;">
                <span style="color: #f59e0b; margin-right: 8px; font-weight: bold;">+</span>
                <span>${escapeHtml(addon.name)}</span>
              </li>`
          )
          .join('')
      : '<li style="color: #94a3b8; font-size: 13px; list-style-type: none; font-style: italic;">Keine Zusatzmodule gewählt (Nur Basispaket)</li>';

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue qualifizierte Projektanfrage</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0f172a; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" max-width="640" cellspacing="0" cellpadding="0" border="0" style="max-width: 640px; background-color: #1e293b; border-radius: 20px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-bottom: 1px solid #334155;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <div style="display: inline-block; padding: 4px 12px; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 9999px; color: #fbbf24; font-size: 11px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 12px;">
                      ⚡ Neuer Lead eingegangen
                    </div>
                    <h1 style="margin: 0 0 4px 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">
                      ${name}
                    </h1>
                    <p style="margin: 0; color: #94a3b8; font-size: 14px;">
                      Projektfokus: <strong style="color: #38bdf8;">${packageName}</strong>
                    </p>
                  </td>
                  <td align="right" valign="top">
                    <span style="font-size: 11px; color: #64748b; font-family: monospace;">${dateStr}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Action Bar -->
          <tr>
            <td style="padding: 16px 32px; background-color: #0f172a; border-bottom: 1px solid #334155;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="mailto:${email}?subject=Ihre%20Anfrage%20bei%20Coday%20Webdesign" style="display: inline-block; padding: 10px 18px; background-color: #f59e0b; color: #0f172a; font-size: 13px; font-weight: 800; text-decoration: none; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.03em;">
                      ✉️ Antworten (${email})
                    </a>
                  </td>
                  ${
                    data.phone
                      ? `<td>
                    <a href="tel:${phone}" style="display: inline-block; padding: 10px 18px; background-color: #334155; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 9999px; border: 1px solid #475569;">
                      📞 Anrufen (${phone})
                    </a>
                  </td>`
                      : ''
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px;">
              
              <!-- Customer Profile Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px; background-color: #0f172a; border-radius: 14px; border: 1px solid #334155; padding: 16px;">
                <tr>
                  <td style="padding: 8px 12px; color: #94a3b8; font-size: 13px; width: 35%; border-bottom: 1px solid #1e293b;">Kunde / Ansprechpartner</td>
                  <td style="padding: 8px 12px; color: #ffffff; font-size: 13px; font-weight: 600; border-bottom: 1px solid #1e293b;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; color: #94a3b8; font-size: 13px; border-bottom: 1px solid #1e293b;">E-Mail-Adresse</td>
                  <td style="padding: 8px 12px; color: #38bdf8; font-size: 13px; font-weight: 600; border-bottom: 1px solid #1e293b;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; color: #94a3b8; font-size: 13px; border-bottom: 1px solid #1e293b;">Telefonnummer</td>
                  <td style="padding: 8px 12px; color: #ffffff; font-size: 13px; font-weight: 600; border-bottom: 1px solid #1e293b;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; color: #94a3b8; font-size: 13px; border-bottom: 1px solid #1e293b;">Unternehmen / Organisation</td>
                  <td style="padding: 8px 12px; color: #ffffff; font-size: 13px; font-weight: 600; border-bottom: 1px solid #1e293b;">${company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; color: #94a3b8; font-size: 13px;">Kanal / Quelle</td>
                  <td style="padding: 8px 12px; color: #cbd5e1; font-size: 13px;">${source}</td>
                </tr>
              </table>

              <!-- Configuration Matrix -->
              <div style="margin-bottom: 24px; padding: 20px; background-color: #0f172a; border-radius: 14px; border: 1px solid #334155;">
                <h3 style="margin: 0 0 12px 0; color: #f59e0b; font-size: 14px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
                  📦 Gewählte Projekt-Konfiguration
                </h3>
                
                <div style="margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid #1e293b;">
                  <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 2px;">Basispaket</span>
                  <span style="font-size: 16px; font-weight: 800; color: #ffffff;">${packageName}</span>
                  ${data.deliveryDays ? `<span style="display: inline-block; margin-left: 8px; font-size: 11px; padding: 2px 8px; border-radius: 6px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">~${data.deliveryDays} Werktage</span>` : ''}
                </div>

                <div>
                  <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 6px;">Gewählte Zusatzmodule / Add-ons:</span>
                  <ul style="margin: 0; padding: 0;">
                    ${addonsListHtml}
                  </ul>
                </div>
              </div>

              <!-- Customer Message -->
              <div style="padding: 20px; background-color: #0f172a; border-radius: 14px; border: 1px solid #334155; margin-bottom: 24px;">
                <h3 style="margin: 0 0 10px 0; color: #cbd5e1; font-size: 14px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
                  💬 Nachricht des Kunden
                </h3>
                <div style="color: #f1f5f9; font-size: 14px; line-height: 1.7; white-space: pre-wrap; font-style: italic; background-color: #1e293b; padding: 14px; border-radius: 10px; border-left: 3px solid #f59e0b;">
                  "${message}"
                </div>
              </div>

              <!-- Footer info -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="color: #64748b; font-size: 12px;">
                    Coday Agency Dispatcher · Wetzlar, Hessen<br>
                    Live Lead System (Zero-Latency Resend Edge)
                  </td>
                  <td align="right" style="color: #64748b; font-size: 12px;">
                    <a href="https://codayweb.de" style="color: #94a3b8; text-decoration: none;">codayweb.de</a>
                  </td>
                </tr>
              </table>

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
 * 2. Customer Autoresponder & Confirmation Email (to lead)
 * Ultra-Professional, High-Trust Coday Luxury HTML Template
 */
export function generateCustomerConfirmationEmailHtml(data: LeadEmailData): string {
  const name = escapeHtml(data.name || 'Guten Tag');
  const packageName = escapeHtml(
    data.packageName || data.project || 'Maßgeschneidertes Webprojekt'
  );
  const message = escapeHtml(data.message || '');

  const addonsListHtml =
    data.addons && data.addons.length > 0
      ? data.addons
          .map(
            (addon) => `
              <li style="margin-bottom: 6px; color: #334155; font-size: 13px; list-style-type: none; display: flex; align-items: center;">
                <span style="color: #d97706; margin-right: 8px; font-weight: bold;">✓</span>
                <span>${escapeHtml(addon.name)}</span>
              </li>`
          )
          .join('')
      : '<li style="color: #64748b; font-size: 13px; list-style-type: none; font-style: italic;">Basispaket (Zusatzmodule können im Erstgespräch flexibel ergänzt werden)</li>';

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ihre Projektanfrage bei Coday</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 36px 32px 28px 32px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; text-align: left;">
              <div style="display: inline-block; padding: 4px 12px; background: rgba(245, 158, 11, 0.2); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 9999px; color: #fef3c7; font-size: 11px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 14px;">
                Coday Webagentur Wetzlar
              </div>
              <h1 style="margin: 0 0 6px 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.02em;">
                Vielen Dank für Ihre Anfrage! 🚀
              </h1>
              <p style="margin: 0; color: #94a3b8; font-size: 14px;">
                Wir haben Ihre Details erhalten und bearbeiten diese mit höchster Priorität.
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px;">
              
              <!-- Greeting -->
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #1e293b;">
                Hallo <strong>${name}</strong>,
              </p>
              <p style="margin: 0 0 24px 0; font-size: 15px; color: #475569; line-height: 1.6;">
                vielen Dank für Ihr Interesse an einer Zusammenarbeit mit Coday. Wir haben Ihre Projektanfrage erfolgreich in unserem System erfasst.
              </p>

              <!-- Configuration Summary Box -->
              <div style="margin-bottom: 28px; padding: 22px; background-color: #fffbeb; border-radius: 16px; border: 1px solid #fde68a;">
                <h3 style="margin: 0 0 12px 0; color: #92400e; font-size: 13px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
                  📋 Ihre angefragte Projektkonfiguration
                </h3>
                
                <div style="margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #fef3c7;">
                  <span style="font-size: 12px; color: #78350f; text-transform: uppercase; display: block; font-weight: 600;">Gewähltes Leistungspaket:</span>
                  <span style="font-size: 16px; font-weight: 800; color: #0f172a;">${packageName}</span>
                </div>

                <div>
                  <span style="font-size: 12px; color: #78350f; text-transform: uppercase; display: block; font-weight: 600; margin-bottom: 4px;">Berücksichtigte Zusatzmodule / Add-ons:</span>
                  <ul style="margin: 0; padding: 0;">
                    ${addonsListHtml}
                  </ul>
                </div>
              </div>

              ${
                message
                  ? `
              <!-- Customer Note Quote -->
              <div style="margin-bottom: 28px; padding: 16px 20px; background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #d97706;">
                <span style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: bold; display: block; margin-bottom: 4px;">Ihre übermittelte Nachricht:</span>
                <p style="margin: 0; color: #334155; font-size: 13px; font-style: italic; line-height: 1.6;">"${message}"</p>
              </div>`
                  : ''
              }

              <!-- Next Steps Timeline -->
              <div style="margin-bottom: 32px;">
                <h3 style="margin: 0 0 16px 0; color: #0f172a; font-size: 15px; font-weight: 800; letter-spacing: -0.01em;">
                  Wie geht es jetzt weiter? (Ihr 3-Schritte-Fahrplan)
                </h3>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td valign="top" style="width: 28px; padding-bottom: 16px;">
                      <div style="width: 24px; height: 24px; background-color: #d97706; color: #ffffff; border-radius: 50%; text-align: center; font-size: 12px; font-weight: bold; line-height: 24px;">1</div>
                    </td>
                    <td style="padding-left: 12px; padding-bottom: 16px;">
                      <strong style="color: #0f172a; font-size: 14px; display: block;">Sichtung & technische Analyse</strong>
                      <span style="color: #64748b; font-size: 13px;">Wir prüfen Ihre Anforderungen innerhalb von 24 Stunden persönlich.</span>
                    </td>
                  </tr>
                  <tr>
                    <td valign="top" style="width: 28px; padding-bottom: 16px;">
                      <div style="width: 24px; height: 24px; background-color: #d97706; color: #ffffff; border-radius: 50%; text-align: center; font-size: 12px; font-weight: bold; line-height: 24px;">2</div>
                    </td>
                    <td style="padding-left: 12px; padding-bottom: 16px;">
                      <strong style="color: #0f172a; font-size: 14px; display: block;">Kostenloses 15-Minuten Erstgespräch</strong>
                      <span style="color: #64748b; font-size: 13px;">Kurze Abstimmung Ihrer Zielgruppe, Conversion-Ziele und Prioritäten.</span>
                    </td>
                  </tr>
                  <tr>
                    <td valign="top" style="width: 28px;">
                      <div style="width: 24px; height: 24px; background-color: #d97706; color: #ffffff; border-radius: 50%; text-align: center; font-size: 12px; font-weight: bold; line-height: 24px;">3</div>
                    </td>
                    <td style="padding-left: 12px;">
                      <strong style="color: #0f172a; font-size: 14px; display: block;">Verbindliches Festpreisangebot</strong>
                      <span style="color: #64748b; font-size: 13px;">Transparente Kalkulation ohne versteckte Abos oder Überraschungen.</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Direct Calendar Booking CTA -->
              <div style="text-align: center; margin-bottom: 32px; padding: 24px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 16px;">
                <p style="margin: 0 0 16px 0; color: #e2e8f0; font-size: 14px;">
                  Möchten Sie Wartezeit sparen? Sichern Sie sich direkt einen freien Beratungsslot in unserem Kalender:
                </p>
                <a href="https://codayweb.de/de/booking" style="display: inline-block; padding: 14px 28px; background-color: #f59e0b; color: #0f172a; font-size: 14px; font-weight: 800; text-decoration: none; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.03em; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);">
                  📅 Jetzt Wunschtermin wählen ➔
                </a>
              </div>

              <!-- Signature & Guarantee -->
              <div style="padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0 0 4px 0; font-size: 14px; color: #64748b;">Mit besten Grüßen aus Wetzlar,</p>
                <p style="margin: 0 0 2px 0; font-size: 16px; font-weight: 800; color: #0f172a;">Umutcan Emre Tezgel</p>
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #d97706; font-weight: 600;">Inhaber & Lead Web Architect · Coday</p>
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                  Wetzlar, Hessen · <a href="https://codayweb.de" style="color: #64748b;">codayweb.de</a> · <a href="mailto:umut@codayweb.de" style="color: #64748b;">umut@codayweb.de</a>
                </p>
              </div>

            </td>
          </tr>

          <!-- Legal Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #f1f5f9; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 11px;">
              © ${new Date().getFullYear()} Coday · 100% Made in Wetzlar, Hessen · DSGVO-konform
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
