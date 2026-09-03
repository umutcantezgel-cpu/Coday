import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  generateAgencyLeadEmailHtml,
  generateCustomerConfirmationEmailHtml,
} from '@/shared/lib/email/leadTemplates';
import {
  generateAgencyBookingEmailHtml,
  generateCustomerBookingEmailHtml,
} from '@/shared/lib/email/bookingTemplates';

/**
 * Writes rendered e-mails to EMAIL_PREVIEW_DIR for visual checks:
 *   EMAIL_PREVIEW_DIR=/tmp/email-preview npx vitest run emailPreview
 */
const dir = process.env.EMAIL_PREVIEW_DIR;

describe.skipIf(!dir)('email preview export', () => {
  it('writes the four templates as HTML files', () => {
    const lead = {
      name: 'Max Mustermann',
      email: 'max@mustermann-bau.de',
      phone: '+49 170 1234567',
      company: 'Mustermann Bau GmbH',
      message:
        'Wir brauchen eine neue Website mit Bewerbungsformular für Azubis.\nGerne auch mit Online-Terminbuchung.',
      packageId: 'business',
      packageTier: 2,
      packageName: 'Der Kundenmagnet',
      packageLegacyName: 'Business (Mittel)',
      addons: [
        { id: 'func-cms', name: 'Texte & Bilder selbst ändern', category: 'function' },
        { id: 'seo-tech', name: 'Besser bei Google gefunden werden', category: 'seo' },
      ],
      deliveryDays: 21,
      source: 'Package & Add-ons Configurator',
      locale: 'de' as const,
      score: 8,
    };
    const booking = {
      name: 'Dr. Michael Weber',
      email: 'weber@praxis-wetzlar.de',
      phone: '06441 987654',
      date: '2026-09-15',
      time_slot: '14:00',
      service_type: 'consultation',
      notes: 'Fokus auf neue Praxis-Website und Online-Terminvergabe.',
      locale: 'de' as const,
    };
    const files: Record<string, string> = {
      'lead-agency.html': generateAgencyLeadEmailHtml(lead),
      'lead-customer-de.html': generateCustomerConfirmationEmailHtml(lead),
      'lead-customer-en.html': generateCustomerConfirmationEmailHtml({
        ...lead,
        locale: 'en',
        packageName: 'The Client Magnet',
        addons: [{ id: 'func-cms', name: 'Edit texts & images yourself' }],
      }),
      'booking-agency.html': generateAgencyBookingEmailHtml(booking),
      'booking-customer-de.html': generateCustomerBookingEmailHtml(booking),
      'booking-customer-en.html': generateCustomerBookingEmailHtml({
        ...booking,
        locale: 'en',
        phone: undefined,
      }),
    };
    fs.mkdirSync(dir!, { recursive: true });
    for (const [name, html] of Object.entries(files)) {
      fs.writeFileSync(path.join(dir!, name), html);
    }
    fs.writeFileSync(
      path.join(dir!, 'index.html'),
      `<!doctype html><meta charset="utf-8"><title>E-Mail-Vorschau</title><body style="font-family:sans-serif;padding:24px"><h1>E-Mail-Vorschau</h1><ul>${Object.keys(
        files
      )
        .map((f) => `<li><a href="${f}">${f}</a></li>`)
        .join('')}</ul>`
    );
    expect(Object.keys(files)).toHaveLength(6);
  });
});
