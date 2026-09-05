import { describe, it, expect } from 'vitest';
import {
  generateAgencyLeadEmailHtml,
  generateCustomerConfirmationEmailHtml,
  getCustomerConfirmationSubject,
  getAgencyLeadSubject,
  ON_SITE_RADIUS_KM,
  type LeadEmailData,
} from '@/shared/lib/email/leadTemplates';
import {
  generateNewsletterConfirmationHtml,
  getNewsletterConfirmationSubject,
} from '@/shared/lib/email/newsletterTemplates';

const base: LeadEmailData = { name: 'Anna Berger', email: 'anna@example.de' };

describe('what the customer is never shown', () => {
  /**
   * Five of the six forms used to fold their origin into `message`, and the
   * confirmation quotes `message` back verbatim — so people read our internal
   * page labels, and on the city forms their own phone number, as if it were
   * their own message.
   */
  const internalStrings = [
    'Lead from Homepage',
    'Anfrage von lokaler SEO',
    'Abschlusssektion',
    'Source: Newsletter',
    'Newsletter Subscriber',
    'BEHÖRDEN-ANFRAGE',
  ];

  it('never leaks an internal label into the customer confirmation', () => {
    const html = generateCustomerConfirmationEmailHtml({
      ...base,
      cityName: 'Wetzlar',
      formKind: 'local',
      message: 'Wir brauchen eine neue Website.',
    });
    for (const s of internalStrings) {
      expect(html).not.toContain(s);
    }
  });

  it('renders no quote block at all when the person typed nothing', () => {
    const html = generateCustomerConfirmationEmailHtml({ ...base, formKind: 'quick' });
    // The quote block is the only place with this left border.
    expect(html).not.toContain('border-left: 4px solid');
  });

  it('quotes the person’s own words when they wrote some', () => {
    const html = generateCustomerConfirmationEmailHtml({
      ...base,
      message: 'Unsere Seite ist von 2011.',
    });
    expect(html).toContain('Unsere Seite ist von 2011.');
  });
});

describe('language', () => {
  /** Only /contact used to pass a locale, so this branch never ran in production. */
  it('produces an English subject and body for locale en', () => {
    const data: LeadEmailData = { ...base, locale: 'en' };
    expect(getCustomerConfirmationSubject(data)).toMatch(/Thank you|Your request/);
    const html = generateCustomerConfirmationEmailHtml(data);
    expect(html).toContain('lang="en"');
    expect(html).toContain('What happens next?');
    expect(html).not.toContain('Wie geht es jetzt weiter?');
  });

  it('stays German by default', () => {
    const html = generateCustomerConfirmationEmailHtml(base);
    expect(html).toContain('Wie geht es jetzt weiter?');
  });
});

describe('context shapes the copy', () => {
  it('offers an on-site meeting for a city inside the radius', () => {
    const html = generateCustomerConfirmationEmailHtml({
      ...base,
      cityName: 'Wetzlar',
      distanceKm: 2,
      formKind: 'local',
    });
    expect(html).toContain('Wetzlar');
    expect(html).toContain('in den Betrieb');
  });

  it('offers a call instead when the city is far away', () => {
    const html = generateCustomerConfirmationEmailHtml({
      ...base,
      cityName: 'Kassel',
      distanceKm: 150,
      formKind: 'local',
    });
    expect(html).not.toContain('in den Betrieb');
    expect(html).toContain('Telefon oder Video');
  });

  it('treats the radius boundary as inside', () => {
    const html = generateCustomerConfirmationEmailHtml({
      ...base,
      cityName: 'Marburg',
      distanceKm: ON_SITE_RADIUS_KM,
      formKind: 'local',
    });
    expect(html).toContain('in den Betrieb');
  });

  it('does not call a city enquiry a "Paket" or list extras nobody chose', () => {
    const html = generateCustomerConfirmationEmailHtml({
      ...base,
      project: 'Webdesign Herborn',
      cityName: 'Herborn',
      formKind: 'local',
    });
    expect(html).toContain('Ihr Anliegen');
    expect(html).toContain('Webdesign Herborn');
    expect(html).not.toContain('Ihre Auswahl');
    expect(html).not.toContain('Keine Extras gewählt');
  });

  it('keeps package and extras for a configurator lead', () => {
    const html = generateCustomerConfirmationEmailHtml({
      ...base,
      packageId: 'business',
      packageName: 'Der Kundenmagnet',
      addons: [{ id: 'func-cms', name: 'Texte selbst ändern' }],
      formKind: 'contact',
    });
    expect(html).toContain('Ihre Auswahl');
    expect(html).toContain('Texte selbst ändern');
  });

  it('announces a call when a phone number was given, writing when it was not', () => {
    const withPhone = generateCustomerConfirmationEmailHtml({ ...base, phone: '+49 176 1234567' });
    const without = generateCustomerConfirmationEmailHtml(base);
    expect(withPhone).toContain('rufe Sie');
    expect(without).toContain('schreibe Ihnen');
    expect(without).not.toContain('rufe Sie');
  });
});

describe('agency notification', () => {
  it('puts the city in the subject and the distance in the body', () => {
    const data: LeadEmailData = {
      ...base,
      cityName: 'Herborn',
      district: 'Burg',
      distanceKm: 22,
      formKind: 'local',
    };
    expect(getAgencyLeadSubject(data)).toContain('Herborn');
    const html = generateAgencyLeadEmailHtml(data);
    expect(html).toContain('Herborn');
    expect(html).toContain('Burg');
    expect(html).toContain('22 km');
    expect(html).toContain('Vor-Ort-Termin angeboten');
  });

  it('omits the location rows entirely when there is no city', () => {
    const html = generateAgencyLeadEmailHtml({ ...base, formKind: 'quick' });
    expect(html).not.toContain('Ortsteil');
    expect(html).toContain('Schnellkontakt');
  });
});

describe('newsletter', () => {
  /**
   * A signup used to receive the project-enquiry mail: a promise of a personal
   * call within 24 hours and a binding fixed-price quote for a project nobody
   * asked about.
   */
  it('promises only what the signup page promises', () => {
    const html = generateNewsletterConfirmationHtml('de');
    expect(html).toContain('einmal im Monat');
    expect(html).not.toContain('Festpreis-Angebot');
    expect(html).not.toContain('24 Stunden');
    expect(html).not.toContain('Newsletter Subscriber');
  });

  it('greets without a name, because the form collects none', () => {
    expect(generateNewsletterConfirmationHtml('de')).toContain('Guten Tag,');
    expect(generateNewsletterConfirmationHtml('en')).toContain('Hello,');
  });

  it('has its own subject in both languages', () => {
    expect(getNewsletterConfirmationSubject('de')).toContain('Newsletter');
    expect(getNewsletterConfirmationSubject('en')).toContain('newsletter');
  });

  it('tells subscribers how to get off the list', () => {
    expect(generateNewsletterConfirmationHtml('de')).toContain('Abmeldung');
    expect(generateNewsletterConfirmationHtml('en')).toContain('Unsubscribe');
  });
});
