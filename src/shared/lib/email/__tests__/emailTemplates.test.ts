import { describe, it, expect } from 'vitest';
import {
  generateAgencyLeadEmailHtml,
  generateCustomerConfirmationEmailHtml,
} from '../leadTemplates';
import {
  generateAgencyBookingEmailHtml,
  generateCustomerBookingEmailHtml,
} from '../bookingTemplates';

describe('Email Templates Module', () => {
  describe('Agency Lead Email (generateAgencyLeadEmailHtml)', () => {
    it('generates dark luxury HTML containing all lead details, package, and add-ons', () => {
      const html = generateAgencyLeadEmailHtml({
        name: 'Max Mustermann',
        email: 'max@example.de',
        phone: '+49 170 1234567',
        company: 'Mustermann GmbH',
        message: 'Wir benötigen einen neuen Webauftritt mit Headless CMS.',
        packageName: 'Business (Mittel)',
        addons: [
          { id: 'func-cms', name: 'Sanity v3 Headless CMS', category: 'feature' },
          { id: 'tech-pwa', name: 'Mobile App & PWA Experience', category: 'tech' },
        ],
        deliveryDays: 21,
        source: 'Package & Add-ons Configurator',
      });

      expect(html).toContain('Max Mustermann');
      expect(html).toContain('max@example.de');
      expect(html).toContain('+49 170 1234567');
      expect(html).toContain('Mustermann GmbH');
      expect(html).toContain('Business (Mittel)');
      expect(html).toContain('Sanity v3 Headless CMS');
      expect(html).toContain('Mobile App &amp; PWA Experience');
      expect(html).toContain('~21 Werktage');
      expect(html).toContain('mailto:max@example.de');
      expect(html).toContain('tel:+49 170 1234567');
    });

    it('escapes dangerous HTML characters to prevent XSS injection', () => {
      const html = generateAgencyLeadEmailHtml({
        name: '<script>alert("hack")</script>',
        email: 'test@example.com',
        message: '<img src=x onerror=alert(1)>',
      });

      expect(html).not.toContain('<script>');
      expect(html).toContain('&lt;script&gt;alert(&quot;hack&quot;)&lt;/script&gt;');
      expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    });
  });

  describe('Customer Confirmation Email (generateCustomerConfirmationEmailHtml)', () => {
    it('generates high-trust customer autoresponder with package summary, 3-step roadmap, and booking link', () => {
      const html = generateCustomerConfirmationEmailHtml({
        name: 'Julia Schmidt',
        email: 'julia@schmidt-haustechnik.de',
        packageName: 'Enterprise Platform (Extrem groß)',
        addons: [
          {
            id: 'commerce-headless',
            name: 'E-Commerce Storefront (Shopify / Medusa)',
            category: 'commerce',
          },
        ],
        message: 'Bitte um zeitnahe Kontaktaufnahme.',
      });

      expect(html).toContain('Julia Schmidt');
      expect(html).toContain('Enterprise Platform (Extrem groß)');
      expect(html).toContain('E-Commerce Storefront (Shopify / Medusa)');
      expect(html).toContain('Wie geht es jetzt weiter? (Ihr 3-Schritte-Fahrplan)');
      expect(html).toContain('https://codayweb.de/de/booking');
      expect(html).toContain('Umutcan Emre Tezgel');
      expect(html).toContain('Inhaber & Lead Web Architect');
    });
  });

  describe('Booking Emails (bookingTemplates)', () => {
    it('generates agency and customer booking notification HTMLs with appointment slot details', () => {
      const bookingData = {
        name: 'Dr. Michael Weber',
        email: 'weber@praxis-wetzlar.de',
        phone: '06441 987654',
        date: '2026-09-15',
        time_slot: '14:30',
        service_type: 'Kostenlose Erstberatung (15 Min)',
        notes: 'Fokus auf neue Praxis-Website und Online-Terminvergabe.',
      };

      const agencyHtml = generateAgencyBookingEmailHtml(bookingData);
      const customerHtml = generateCustomerBookingEmailHtml(bookingData);

      expect(agencyHtml).toContain('Dr. Michael Weber');
      expect(agencyHtml).toContain('2026-09-15');
      expect(agencyHtml).toContain('14:30 Uhr');
      expect(agencyHtml).toContain('weber@praxis-wetzlar.de');
      expect(agencyHtml).toContain('Fokus auf neue Praxis-Website');

      expect(customerHtml).toContain('Dr. Michael Weber');
      expect(customerHtml).toContain('2026-09-15');
      expect(customerHtml).toContain('14:30 Uhr');
      expect(customerHtml).toContain('Umutcan Emre Tezgel');
    });
  });
});
