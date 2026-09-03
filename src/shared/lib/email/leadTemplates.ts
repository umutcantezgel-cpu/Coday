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

export function getAgencyLeadSubject(data: LeadEmailData): string {
  const focus = data.packageName || data.project || 'Projekt';
  const score = typeof data.score === 'number' ? ` · Score ${data.score}/10` : '';
  return `Neue Anfrage: ${data.name} · ${focus}${score}`;
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
    renderPanel(
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
    ),
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
    intro: `Paket: <strong style="color: ${EMAIL_COLORS.heading};">${packageName}</strong>`,
    body,
    footer: `Automatische Benachrichtigung von <a href="${EMAIL_BASE_URL}" style="color: ${EMAIL_COLORS.muted}; text-decoration: none;">codayweb.de</a> · Antworten geht direkt an den Kunden.`,
  });
}

/* ------------------------------------------------------------------------- */
/* 2. Customer confirmation (German or English, plain language, no prices)   */
/* ------------------------------------------------------------------------- */

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
    body: 'schön, dass Sie sich für eine Website von Coday interessieren. Hier noch einmal Ihre Auswahl und was als Nächstes passiert.',
    selectionTitle: 'Ihre Auswahl',
    packageLabel: 'Paket',
    deliveryLabel: 'Fertig in',
    deliveryValue: (days: number) => `ca. ${days} Werktagen nach Projektstart`,
    addonsLabel: 'Extras',
    noAddons: 'Keine Extras gewählt. Sie können jederzeit im Gespräch welche ergänzen.',
    messageLabel: 'Ihre Nachricht',
    nextTitle: 'Wie geht es jetzt weiter?',
    steps: [
      {
        title: 'Ich melde mich innerhalb von 24 Stunden',
        text: 'Sie erhalten eine persönliche Rückmeldung von mir, keine automatische Antwort.',
      },
      {
        title: 'Kurzes, kostenloses Gespräch',
        text: 'In etwa 15 Minuten klären wir Ihre Ziele und den Umfang. Ohne Fachchinesisch.',
      },
      {
        title: 'Verbindliches Festpreis-Angebot',
        text: 'Danach erhalten Sie Ihr Angebot. Sie entscheiden in Ruhe und zahlen erst, wenn Sie es annehmen.',
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
    body: 'great that you are interested in a website by Coday. Here is your selection again and what happens next.',
    selectionTitle: 'Your selection',
    packageLabel: 'Package',
    deliveryLabel: 'Ready in',
    deliveryValue: (days: number) => `about ${days} business days after kick-off`,
    addonsLabel: 'Extras',
    noAddons: 'No extras selected. You can add some at any time during our call.',
    messageLabel: 'Your message',
    nextTitle: 'What happens next?',
    steps: [
      {
        title: 'I get back to you within 24 hours',
        text: 'You receive a personal reply from me, not an automated one.',
      },
      {
        title: 'Short, free call',
        text: 'In about 15 minutes we clarify your goals and the scope. No tech jargon.',
      },
      {
        title: 'Binding fixed-price quote',
        text: 'Then you receive your quote. Decide at your own pace and pay only once you accept it.',
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

  const body = [
    renderParagraph(copy.greeting(`<strong>${name}</strong>`)),
    renderParagraph(copy.body),
    renderPanel(
      `${renderKeyValue([
        { label: copy.packageLabel, value: packageName, highlight: true },
        ...(data.deliveryDays
          ? [{ label: copy.deliveryLabel, value: copy.deliveryValue(data.deliveryDays) }]
          : []),
      ])}
      <p style="margin: 14px 0 6px 0; color: ${EMAIL_COLORS.accentDark}; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;">${copy.addonsLabel}</p>
      ${renderChecklist(addons, copy.noAddons)}`,
      'amber',
      copy.selectionTitle
    ),
    message ? `${renderHeading(copy.messageLabel)}${renderQuote(`„${message}“`)}` : '',
    renderHeading(copy.nextTitle),
    renderPanel(renderSteps([...copy.steps]), 'neutral'),
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
