/**
 * Lead e-mails (contact wizard, package configurator, quick forms).
 *
 * Plain-language rule: the customer e-mail never uses tech jargon and never
 * mentions prices. Package and add-on names are resolved server-side from
 * `src/shared/data/packages.ts` / `modules.ts` before they reach these templates.
 */

import {
  EMAIL_BASE_URL,
  EMAIL_BRAND,
  EMAIL_COLORS,
  escapeHtml,
  renderButtonRow,
  renderChecklist,
  renderHeading,
  renderKeyValue,
  renderNote,
  renderPanel,
  renderParagraph,
  renderQuote,
  renderShell,
  renderSignature,
  renderSteps,
  type EmailLang,
} from './layout';

export type EmailLocale = EmailLang;

export interface LeadEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  project?: string;
  /** Canonical package id (starter | business | corporate | enterprise). */
  packageId?: string;
  packageTier?: number;
  /** Plain-language package name in the customer's language. */
  packageName?: string;
  /** Former size label, agency notification only. */
  packageLegacyName?: string;
  addons?: Array<{ id: string; name: string; category?: string }>;
  deliveryDays?: number;
  source?: string;
  locale?: EmailLocale;
  score?: number;
  date?: string;
  /** City page the enquiry came from, when it came from one. */
  cityName?: string;
  /** Ortsteil, only the Löhnberg form collects one today. */
  district?: string;
  /** Which form was used — decides how the confirmation is worded. */
  formKind?:
    | 'contact'
    | 'quick'
    | 'local'
    | 'gov'
    | 'newsletter'
    | 'website_check'
    | 'industries'
    | 'sticky';
  /** Industry slug for industry landing pages. */
  industry?: string;
  /** Website-check: the address the owner should review. */
  websiteUrl?: string;
  /** Straight-line km from Wetzlar, when the city is one we have coordinates for. */
  distanceKm?: number;
}

function customerLocale(data: LeadEmailData): EmailLang {
  return data.locale === 'en' ? 'en' : 'de';
}

function digitsOnly(phone: string): string {
  return phone.replace(/[^0-9+]/g, '');
}

/* ------------------------------------------------------------------------- */
/* 1. Agency notification (always German)                                     */
/* ------------------------------------------------------------------------- */

const FORM_KIND_LABELS: Record<NonNullable<LeadEmailData['formKind']>, string> = {
  contact: 'Kontaktformular',
  quick: 'Schnellkontakt',
  local: 'Stadtseite',
  gov: 'Öffentlicher Sektor',
  newsletter: 'Newsletter',
  website_check: 'Website-Check',
  industries: 'Branchenseite',
  sticky: 'Sticky-Leiste (mobil)',
};

export function getAgencyLeadSubject(data: LeadEmailData): string {
  const focus = data.packageName || data.project || 'Projekt';
  // The city belongs in the subject: it decides whether this is a drive or a call.
  const where = data.cityName ? ` · ${data.cityName}` : '';
  const score = typeof data.score === 'number' ? ` · Score ${data.score}/10` : '';
  return `Neue Anfrage: ${data.name}${where} · ${focus}${score}`;
}

export function generateAgencyLeadEmailHtml(data: LeadEmailData): string {
  const name = escapeHtml(data.name || 'Unbekannt');
  const email = escapeHtml(data.email || '—');
  const phone = data.phone ? escapeHtml(data.phone) : '';
  const company = escapeHtml(data.company || '');
  const message = escapeHtml(data.message || '');
  const packageName = escapeHtml(data.packageName || data.project || 'Individuelles Projekt');
  const source = escapeHtml(data.source || 'Website Kontaktformular');
  const locale = (data.locale || 'de').toUpperCase();
  const score = typeof data.score === 'number' ? data.score : null;
  const dateStr = escapeHtml(
    data.date || new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })
  );
  const addons = (data.addons ?? []).map(
    (a) =>
      `${escapeHtml(a.name)} <span style="color: ${EMAIL_COLORS.faint}; font-size: 12px;">(${escapeHtml(a.id)})</span>`
  );
  const packageMeta = [
    data.packageLegacyName ? escapeHtml(data.packageLegacyName) : null,
    data.packageId ? `ID ${escapeHtml(data.packageId)}` : null,
    data.packageTier ? `Paket ${data.packageTier} von 4` : null,
    data.deliveryDays ? `~${data.deliveryDays} Werktage` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const hot = score !== null && score >= 7;

  /**
   * Only the configurator sends package fields. Quick contact, the city pages
   * and the public-sector form send none, and there `packageName` falls back to
   * the project or to "Individuelles Projekt" — so a "Paket:" header and a
   * "Gewählte Konfiguration" panel would claim a selection that never happened.
   * `project` deliberately does not count: a city lead's "Webdesign Herborn" is
   * the subject of the enquiry, not a chosen tier.
   */
  const hasPackage = Boolean(data.packageId || data.packageTier || data.packageName);
  const showConfiguration = hasPackage || addons.length > 0;

  const buttons = [
    {
      href: `mailto:${email}?subject=${encodeURIComponent('Ihre Anfrage bei Coday')}`,
      label: 'Antworten',
      variant: 'primary' as const,
    },
    ...(phone
      ? [
          {
            href: `tel:${digitsOnly(data.phone!)}`,
            label: `Anrufen ${phone}`,
            variant: 'secondary' as const,
          },
          {
            href: `https://api.whatsapp.com/send?phone=${encodeURIComponent(digitsOnly(data.phone!).replace(/^\+/, ''))}`,
            label: 'WhatsApp',
            variant: 'secondary' as const,
          },
        ]
      : []),
  ];

  const body = [
    renderButtonRow(buttons),
    renderPanel(
      renderKeyValue([
        { label: 'Name', value: name, highlight: true },
        {
          label: 'E-Mail',
          value: `<a href="mailto:${email}" style="color: ${EMAIL_COLORS.info}; text-decoration: none;">${email}</a>`,
        },
        {
          label: 'Telefon',
          value: phone || `<span style="color: ${EMAIL_COLORS.faint};">nicht angegeben</span>`,
        },
        {
          label: 'Unternehmen',
          value: company || `<span style="color: ${EMAIL_COLORS.faint};">nicht angegeben</span>`,
        },
      ]),
      'neutral',
      'Kontakt'
    ),
    showConfiguration
      ? renderPanel(
          `${renderKeyValue([
            { label: 'Paket', value: packageName, highlight: true },
            ...(packageMeta
              ? [
                  {
                    label: 'Details',
                    value: `<span style="color: ${EMAIL_COLORS.muted}; font-size: 13px;">${packageMeta}</span>`,
                  },
                ]
              : []),
          ])}
      <p style="margin: 14px 0 6px 0; color: ${EMAIL_COLORS.accentDark}; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;">Extras</p>
      ${renderChecklist(addons, 'Keine Extras gewählt (nur Paket)')}`,
          'amber',
          'Gewählte Konfiguration'
        )
      : '',
    renderHeading('Nachricht'),
    message
      ? renderQuote(message)
      : `<p style="margin: 0 0 20px 0; color: ${EMAIL_COLORS.faint}; font-size: 14px; font-style: italic;">Keine Nachricht eingegeben.</p>`,
    renderPanel(
      renderKeyValue([
        {
          label: 'Score',
          value:
            score !== null
              ? `<strong style="color: ${hot ? EMAIL_COLORS.success : EMAIL_COLORS.heading};">${score}/10${hot ? ' · heiß' : ''}</strong>`
              : '—',
        },
        // City and Ortsteil used to be buried in the message prose; as their own
        // rows they answer "drive there or call?" at a glance.
        ...(data.cityName
          ? [
              {
                label: 'Ort',
                value:
                  escapeHtml(data.cityName) +
                  (typeof data.distanceKm === 'number'
                    ? ` <span style="color: ${EMAIL_COLORS.faint}; font-size: 12px;">(${Math.round(data.distanceKm)} km${data.distanceKm <= ON_SITE_RADIUS_KM ? ', Vor-Ort-Termin angeboten' : ''})</span>`
                    : ''),
                highlight: true,
              },
            ]
          : []),
        ...(data.district ? [{ label: 'Ortsteil', value: escapeHtml(data.district) }] : []),
        ...(data.industry ? [{ label: 'Branche', value: escapeHtml(data.industry) }] : []),
        ...(data.websiteUrl
          ? [
              {
                label: 'Website',
                value: `<a href="${escapeHtml(data.websiteUrl)}" style="color: ${EMAIL_COLORS.info};">${escapeHtml(data.websiteUrl)}</a>`,
                highlight: true,
              },
            ]
          : []),
        {
          label: 'Formular',
          value: data.formKind ? FORM_KIND_LABELS[data.formKind] : source,
        },
        { label: 'Quelle', value: source },
        { label: 'Sprache', value: locale },
        { label: 'Eingang', value: dateStr },
      ]),
      'neutral',
      'Details'
    ),
  ].join('');

  return renderShell({
    lang: 'de',
    title: 'Neue Projektanfrage',
    preheader: escapeHtml(`${data.name} · ${data.packageName || data.project || 'Projekt'}`),
    badge: hot ? 'Neue Anfrage · heißer Lead' : 'Neue Anfrage',
    badgeTone: hot ? 'emerald' : 'amber',
    headline: name,
    intro: `${hasPackage ? 'Paket' : 'Anliegen'}: <strong style="color: ${EMAIL_COLORS.heading};">${packageName}</strong>`,
    body,
    footer: `Automatische Benachrichtigung von <a href="${EMAIL_BASE_URL}" style="color: ${EMAIL_COLORS.muted}; text-decoration: none;">codayweb.de</a> · Antworten geht direkt an den Kunden.`,
  });
}

/* ------------------------------------------------------------------------- */
/* 2. Customer confirmation (German or English, plain language, no prices)   */
/* ------------------------------------------------------------------------- */

/**
 * Wetzlar and back in a morning. Beyond this the on-site offer stops being
 * honest, so the copy offers a video call instead of implying a drive.
 */
export const ON_SITE_RADIUS_KM = 45;

interface CustomerContext {
  /** They left a number, so the first contact is a call rather than an e-mail. */
  hasPhone: boolean;
  /** They picked a package, so the quote is for a known combination. */
  hasPackage: boolean;
  /** Close enough to Wetzlar that an on-site meeting is a real offer. */
  nearby: boolean;
  /** Already escaped; only rendered when `nearby` is true. */
  cityName: string;
}

const CUSTOMER_COPY = {
  de: {
    subjectWithPackage: (pkg: string) => `Ihre Anfrage bei Coday: ${pkg}`,
    subject: 'Vielen Dank für Ihre Anfrage bei Coday',
    title: 'Ihre Anfrage bei Coday',
    badge: 'Anfrage eingegangen',
    headline: 'Vielen Dank für Ihre Anfrage!',
    intro:
      'Ihre Nachricht ist angekommen. Ich melde mich innerhalb von 24 Stunden persönlich bei Ihnen.',
    greeting: (name: string) => `Hallo ${name},`,
    body: (ctx: CustomerContext) =>
      ctx.hasPackage
        ? 'schön, dass Sie sich für eine Website von Coday interessieren. Hier noch einmal Ihre Auswahl und was als Nächstes passiert.'
        : 'schön, dass Sie sich für eine Website von Coday interessieren. Hier steht, was ich von Ihnen weiß und was als Nächstes passiert.',
    selectionTitle: 'Ihre Auswahl',
    packageLabel: 'Paket',
    /** Without a configurator selection there is no "Paket" and no "Auswahl". */
    enquiryTitle: 'Ihre Anfrage',
    enquiryLabel: 'Ihr Anliegen',
    deliveryLabel: 'Fertig in',
    deliveryValue: (days: number) => `ca. ${days} Werktagen nach Projektstart`,
    addonsLabel: 'Extras',
    noAddons: 'Keine Extras gewählt. Sie können jederzeit im Gespräch welche ergänzen.',
    messageLabel: 'Ihre Nachricht',
    nextTitle: 'Wie geht es jetzt weiter?',
    steps: (ctx: CustomerContext) => [
      {
        title: ctx.hasPhone
          ? 'Ich rufe Sie innerhalb von 24 Stunden an'
          : 'Ich schreibe Ihnen innerhalb von 24 Stunden',
        text: ctx.hasPhone
          ? 'Sie haben mir Ihre Nummer hinterlassen, also melde ich mich direkt telefonisch. Passt es gerade nicht, schreiben Sie mir einfach zurück.'
          : 'Sie erhalten eine persönliche Rückmeldung von mir, keine automatische Antwort.',
      },
      {
        title: ctx.nearby
          ? 'Gespräch bei Ihnen vor Ort oder per Video'
          : 'Kurzes, kostenloses Gespräch',
        text: ctx.nearby
          ? `${ctx.cityName} liegt in meiner Nähe — ich komme gern zu Ihnen in den Betrieb. Per Video geht es genauso, wenn Ihnen das lieber ist. Rund 20 Minuten.`
          : 'In etwa 15 Minuten per Telefon oder Video. Wir klären Ihre Ziele und den Umfang, ohne Fachchinesisch.',
      },
      {
        title: 'Verbindliches Festpreis-Angebot',
        text: ctx.hasPackage
          ? 'Danach erhalten Sie den Festpreis für genau die Zusammenstellung, die Sie gewählt haben. Sie entscheiden in Ruhe und zahlen erst, wenn Sie annehmen.'
          : 'Danach erhalten Sie Ihr Angebot zum Festpreis. Sie entscheiden in Ruhe und zahlen erst, wenn Sie es annehmen.',
      },
    ],
    noRisk:
      'Unverbindlich und kostenlos. Es entstehen Ihnen keine Kosten, bis Sie das Angebot annehmen.',
    bookingText:
      'Sie möchten nicht warten? Wählen Sie direkt einen freien Termin für unser Gespräch.',
    bookingCta: 'Termin auswählen',
    bookingUrl: `${EMAIL_BASE_URL}/de/booking`,
    callCta: 'Anrufen',
    whatsappCta: 'WhatsApp',
  },
  en: {
    subjectWithPackage: (pkg: string) => `Your request at Coday: ${pkg}`,
    subject: 'Thank you for your request at Coday',
    title: 'Your request at Coday',
    badge: 'Request received',
    headline: 'Thank you for your request!',
    intro: 'Your message has arrived. I will get back to you personally within 24 hours.',
    greeting: (name: string) => `Hello ${name},`,
    body: (ctx: CustomerContext) =>
      ctx.hasPackage
        ? 'great that you are interested in a website by Coday. Here is your selection again and what happens next.'
        : 'great that you are interested in a website by Coday. Here is what I have from you and what happens next.',
    selectionTitle: 'Your selection',
    packageLabel: 'Package',
    /** Without a configurator selection there is no "package" and no "selection". */
    enquiryTitle: 'Your enquiry',
    enquiryLabel: 'What you asked about',
    deliveryLabel: 'Ready in',
    deliveryValue: (days: number) => `about ${days} business days after kick-off`,
    addonsLabel: 'Extras',
    noAddons: 'No extras selected. You can add some at any time during our call.',
    messageLabel: 'Your message',
    nextTitle: 'What happens next?',
    steps: (ctx: CustomerContext) => [
      {
        title: ctx.hasPhone ? 'I call you within 24 hours' : 'I write back within 24 hours',
        text: ctx.hasPhone
          ? 'You left me your number, so I will call you directly. If it is a bad moment, just reply to this e-mail instead.'
          : 'You receive a personal reply from me, not an automated one.',
      },
      {
        title: ctx.nearby ? 'On site with you, or by video' : 'Short, free call',
        text: ctx.nearby
          ? `${ctx.cityName} is close to me — I am happy to come to your premises. Video works just as well if you prefer. Around 20 minutes.`
          : 'About 15 minutes by phone or video. We clarify your goals and the scope, without tech jargon.',
      },
      {
        title: 'Binding fixed-price quote',
        text: ctx.hasPackage
          ? 'Then you receive the fixed price for exactly the combination you selected. Decide at your own pace and pay only once you accept.'
          : 'Then you receive your fixed-price quote. Decide at your own pace and pay only once you accept it.',
      },
    ],
    noRisk: 'Non-binding and free. There is no cost to you until you accept the quote.',
    bookingText: 'Do not want to wait? Pick a free slot for our call right away.',
    bookingCta: 'Choose a time',
    bookingUrl: `${EMAIL_BASE_URL}/en/booking`,
    callCta: 'Call',
    whatsappCta: 'WhatsApp',
  },
} as const;

export function getCustomerConfirmationSubject(data: LeadEmailData): string {
  const copy = CUSTOMER_COPY[customerLocale(data)];
  return data.packageName ? copy.subjectWithPackage(data.packageName) : copy.subject;
}

export function generateCustomerConfirmationEmailHtml(data: LeadEmailData): string {
  const lang = customerLocale(data);
  const copy = CUSTOMER_COPY[lang];
  const name = escapeHtml(data.name || '');
  const packageName = escapeHtml(
    data.packageName ||
      data.project ||
      (lang === 'en' ? 'Custom web project' : 'Individuelles Webprojekt')
  );
  const message = escapeHtml(data.message || '');
  const addons = (data.addons ?? []).map((a) => escapeHtml(a.name));

  const ctx: CustomerContext = {
    hasPhone: Boolean(data.phone && data.phone.trim()),
    hasPackage: Boolean(data.packageId),
    nearby:
      Boolean(data.cityName) &&
      typeof data.distanceKm === 'number' &&
      data.distanceKm <= ON_SITE_RADIUS_KM,
    cityName: escapeHtml(data.cityName || ''),
  };

  const body = [
    renderParagraph(copy.greeting(`<strong>${name}</strong>`)),
    renderParagraph(copy.body(ctx)),
    // Only a configurator lead has a package and extras. Everyone else was
    // shown "Paket: Webdesign Herborn" and an empty extras list for a selection
    // they never made.
    renderPanel(
      `${renderKeyValue([
        {
          label: ctx.hasPackage ? copy.packageLabel : copy.enquiryLabel,
          value: packageName,
          highlight: true,
        },
        ...(data.deliveryDays
          ? [{ label: copy.deliveryLabel, value: copy.deliveryValue(data.deliveryDays) }]
          : []),
      ])}${
        // Extras belong here whenever the configurator was involved — a package,
        // add-ons, or both. A city or quick-contact lead chose neither and used
        // to be shown an empty "Extras" list for a selection they never made.
        ctx.hasPackage || addons.length > 0
          ? `
      <p style="margin: 14px 0 6px 0; color: ${EMAIL_COLORS.accentDark}; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;">${copy.addonsLabel}</p>
      ${renderChecklist(addons, copy.noAddons)}`
          : ''
      }`,
      'amber',
      ctx.hasPackage ? copy.selectionTitle : copy.enquiryTitle
    ),
    message ? `${renderHeading(copy.messageLabel)}${renderQuote(`„${message}“`)}` : '',
    renderHeading(copy.nextTitle),
    renderPanel(renderSteps(copy.steps(ctx)), 'neutral'),
    renderNote(`&#10003; ${copy.noRisk}`, 'emerald'),
    renderParagraph(copy.bookingText),
    renderButtonRow([
      { href: copy.bookingUrl, label: copy.bookingCta, variant: 'primary' },
      {
        href: EMAIL_BRAND.phoneHref,
        label: `${copy.callCta} ${EMAIL_BRAND.phoneDisplay}`,
        variant: 'secondary',
      },
      { href: EMAIL_BRAND.whatsappHref, label: copy.whatsappCta, variant: 'secondary' },
    ]),
    renderSignature(lang),
  ].join('');

  return renderShell({
    lang,
    title: copy.title,
    preheader: copy.intro,
    badge: copy.badge,
    badgeTone: 'emerald',
    headline: copy.headline,
    intro: copy.intro,
    body,
  });
}
