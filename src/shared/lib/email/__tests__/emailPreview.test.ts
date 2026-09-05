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
import {
  generateAgencyNewsletterHtml,
  generateNewsletterConfirmationHtml,
} from '@/shared/lib/email/newsletterTemplates';

/**
 * Writes rendered e-mails to EMAIL_PREVIEW_DIR for visual checks:
 *   EMAIL_PREVIEW_DIR=/tmp/email-preview npx vitest run emailPreview
 */
const dir = process.env.EMAIL_PREVIEW_DIR;

describe.skipIf(!dir)('email preview export', () => {
  it('writes every template as an HTML file', () => {
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
      // A city lead close enough for an on-site meeting, no package, no phone —
      // the combination that reads most differently from the one above.
      'lead-customer-local-nearby.html': generateCustomerConfirmationEmailHtml({
        name: 'Sabine Klein',
        email: 'kontakt@klein-elektro.de',
        project: 'Webdesign Herborn',
        cityName: 'Herborn',
        distanceKm: 22,
        formKind: 'local',
        locale: 'de',
      }),
      'lead-agency-local.html': generateAgencyLeadEmailHtml({
        name: 'Sabine Klein',
        email: 'kontakt@klein-elektro.de',
        phone: '+49 2772 555123',
        project: 'Webdesign Herborn',
        cityName: 'Herborn',
        district: 'Burg',
        distanceKm: 22,
        formKind: 'local',
        source: 'local_seo_herborn',
        locale: 'de',
        score: 6,
      }),
      // Exactly what the mobile hero sheet sends: a name, an e-mail, an optional
      // phone number and the visitor's own words. No package, no city, no
      // project — the sparsest payload any form produces.
      'lead-customer-quick-mobile.html': generateCustomerConfirmationEmailHtml({
        name: 'Jonas Behrens',
        email: 'jonas@behrens-dach.de',
        phone: '+49 176 4433221',
        message: 'Unsere Seite ist von 2014 und auf dem Handy unbrauchbar. Was würde das kosten?',
        formKind: 'quick',
        locale: 'de',
      }),
      'lead-agency-quick-mobile.html': generateAgencyLeadEmailHtml({
        name: 'Jonas Behrens',
        email: 'jonas@behrens-dach.de',
        phone: '+49 176 4433221',
        message: 'Unsere Seite ist von 2014 und auf dem Handy unbrauchbar. Was würde das kosten?',
        formKind: 'quick',
        source: 'quick_contact_mobile',
        locale: 'de',
        score: 5,
      }),
      'newsletter-customer-de.html': generateNewsletterConfirmationHtml('de'),
      'newsletter-customer-en.html': generateNewsletterConfirmationHtml('en'),
      'newsletter-agency.html': generateAgencyNewsletterHtml(
        'sabine@klein-elektro.de',
        '05.09.2026, 10:12'
      ),
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
    expect(Object.keys(files)).toHaveLength(13);
  });
});
