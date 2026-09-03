/**
 * Booking e-mails (appointment calendar), light design, DE/EN.
 */

import {
  EMAIL_BASE_URL,
  EMAIL_BRAND,
  EMAIL_COLORS,
  escapeHtml,
  renderButtonRow,
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
import { berlinToUtc, buildGoogleCalendarUrl, formatBookingDate } from './ics';

export interface BookingEmailData {
  name: string;
  email: string;
  phone?: string;
  /** YYYY-MM-DD in Europe/Berlin */
  date: string;
  /** HH:MM in Europe/Berlin */
  time_slot: string;
  service_type?: string;
  notes?: string;
  locale?: EmailLang;
}

export const BOOKING_DURATION_MINUTES = 30;

const SERVICE_LABELS: Record<string, { de: string; en: string }> = {
  consultation: {
    de: 'Kostenloses Erstgespräch (ca. 15 Minuten)',
    en: 'Free introductory call (about 15 minutes)',
  },
};

export function getServiceLabel(serviceType: string | undefined, lang: EmailLang): string {
  if (!serviceType) return SERVICE_LABELS.consultation[lang];
  return SERVICE_LABELS[serviceType]?.[lang] ?? serviceType;
}

function lang(data: BookingEmailData): EmailLang {
  return data.locale === 'en' ? 'en' : 'de';
}

function digitsOnly(phone: string): string {
  return phone.replace(/[^0-9+]/g, '');
}

export function getBookingCalendarUrl(data: BookingEmailData): string {
  const l = lang(data);
  return buildGoogleCalendarUrl({
    start: berlinToUtc(data.date, data.time_slot),
    durationMinutes: BOOKING_DURATION_MINUTES,
    summary: l === 'en' ? 'Call with Coday' : 'Gespräch mit Coday',
    description: getServiceLabel(data.service_type, l),
    location: l === 'en' ? 'Phone / online' : 'Telefon / online',
  });
}

/* ------------------------------------------------------------------------- */
/* 1. Agency notification (always German)                                     */
/* ------------------------------------------------------------------------- */

export function getAgencyBookingSubject(data: BookingEmailData): string {
  return `Neuer Termin: ${data.name} · ${formatBookingDate(data.date, 'de')} · ${data.time_slot} Uhr`;
}

export function generateAgencyBookingEmailHtml(data: BookingEmailData): string {
  const name = escapeHtml(data.name || 'Unbekannt');
  const email = escapeHtml(data.email || '—');
  const phone = data.phone ? escapeHtml(data.phone) : '';
  const dateLong = escapeHtml(formatBookingDate(data.date, 'de'));
  const time = escapeHtml(data.time_slot);
  const service = escapeHtml(getServiceLabel(data.service_type, 'de'));
  const notes = escapeHtml(data.notes || '');
  const calendarUrl = getBookingCalendarUrl(data);

  const body = [
    renderButtonRow([
      { href: calendarUrl, label: 'In Google Kalender', variant: 'primary' },
      {
        href: `mailto:${email}?subject=${encodeURIComponent('Unser Termin bei Coday')}`,
        label: 'Antworten',
        variant: 'secondary',
      },
      ...(phone
        ? [
            {
              href: `tel:${digitsOnly(data.phone!)}`,
              label: `Anrufen ${phone}`,
              variant: 'secondary' as const,
            },
          ]
        : []),
    ]),
    renderPanel(
      renderKeyValue([
        { label: 'Datum', value: dateLong, highlight: true },
        { label: 'Uhrzeit', value: `${time} Uhr`, highlight: true },
        { label: 'Thema', value: service },
        { label: 'Dauer', value: `bis zu ${BOOKING_DURATION_MINUTES} Minuten reserviert` },
      ]),
      'emerald',
      'Termin'
    ),
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
      ]),
      'neutral',
      'Kontakt'
    ),
    renderHeading('Notiz des Kunden'),
    notes
      ? renderQuote(notes)
      : `<p style="margin: 0 0 20px 0; color: ${EMAIL_COLORS.faint}; font-size: 14px; font-style: italic;">Keine Notiz hinterlassen.</p>`,
    renderNote('Die Kalenderdatei (.ics) hängt an dieser E-Mail an.', 'neutral'),
  ].join('');

  return renderShell({
    lang: 'de',
    title: 'Neuer Beratungstermin',
    preheader: escapeHtml(
      `${data.name} · ${formatBookingDate(data.date, 'de')} · ${data.time_slot} Uhr`
    ),
    badge: 'Neuer Termin',
    badgeTone: 'emerald',
    headline: `${dateLong} · ${time} Uhr`,
    intro: `Gespräch mit <strong style="color: ${EMAIL_COLORS.heading};">${name}</strong>`,
    body,
    footer: `Automatische Benachrichtigung von <a href="${EMAIL_BASE_URL}" style="color: ${EMAIL_COLORS.muted}; text-decoration: none;">codayweb.de</a> · Antworten geht direkt an den Kunden.`,
  });
}

/* ------------------------------------------------------------------------- */
/* 2. Customer confirmation (DE/EN)                                           */
/* ------------------------------------------------------------------------- */

const CUSTOMER_COPY = {
  de: {
    subject: (date: string, time: string) => `Terminbestätigung: ${date}, ${time} Uhr · Coday`,
    title: 'Terminbestätigung Coday',
    badge: 'Termin bestätigt',
    headline: 'Ihr Gespräch steht fest',
    intro: 'Ich habe Ihren Termin fest eingetragen und freue mich auf das Gespräch.',
    greeting: (name: string) => `Hallo ${name},`,
    body: 'vielen Dank für Ihre Buchung. Hier alle Details auf einen Blick.',
    dateLabel: 'Datum',
    timeLabel: 'Uhrzeit',
    timeValue: (t: string) => `${t} Uhr (deutsche Zeit)`,
    topicLabel: 'Thema',
    durationLabel: 'Dauer',
    durationValue: 'ca. 15 Minuten, gern auch länger',
    howTitle: 'So läuft das Gespräch',
    stepsWithPhone: (phone: string) => [
      {
        title: 'Ich rufe Sie an',
        text: `Zum vereinbarten Zeitpunkt unter ${phone}. Sie müssen nichts vorbereiten.`,
      },
      {
        title: 'Wir sprechen über Ihre Ziele',
        text: 'Was soll Ihre Website erreichen, wer sind Ihre Kunden, was gibt es schon?',
      },
      {
        title: 'Sie erhalten eine ehrliche Einschätzung',
        text: 'Und danach, wenn Sie möchten, ein verbindliches Festpreis-Angebot.',
      },
    ],
    stepsWithoutPhone: [
      {
        title: 'Sie erhalten vorab meine Rufnummer',
        text: 'Antworten Sie gern kurz mit Ihrer Telefonnummer, dann rufe ich Sie an. Sonst melde ich mich per E-Mail mit den Einwahldaten.',
      },
      {
        title: 'Wir sprechen über Ihre Ziele',
        text: 'Was soll Ihre Website erreichen, wer sind Ihre Kunden, was gibt es schon?',
      },
      {
        title: 'Sie erhalten eine ehrliche Einschätzung',
        text: 'Und danach, wenn Sie möchten, ein verbindliches Festpreis-Angebot.',
      },
    ],
    calendarText:
      'Termin in Ihren Kalender übernehmen: Die Kalenderdatei hängt an, oder Sie nutzen den Button.',
    calendarCta: 'Zum Google Kalender',
    reschedule:
      'Passt der Termin doch nicht? Antworten Sie einfach auf diese E-Mail oder rufen Sie kurz an, dann finden wir einen neuen.',
    noteLabel: 'Ihre Notiz',
    callCta: 'Anrufen',
  },
  en: {
    subject: (date: string, time: string) => `Appointment confirmed: ${date}, ${time} · Coday`,
    title: 'Appointment confirmation Coday',
    badge: 'Appointment confirmed',
    headline: 'Your call is booked',
    intro: 'Your appointment is in my calendar and I look forward to our conversation.',
    greeting: (name: string) => `Hello ${name},`,
    body: 'thank you for booking. Here are all the details at a glance.',
    dateLabel: 'Date',
    timeLabel: 'Time',
    timeValue: (t: string) => `${t} (German time, CET/CEST)`,
    topicLabel: 'Topic',
    durationLabel: 'Duration',
    durationValue: 'about 15 minutes, longer if needed',
    howTitle: 'How the call works',
    stepsWithPhone: (phone: string) => [
      { title: 'I will call you', text: `At the agreed time on ${phone}. No preparation needed.` },
      {
        title: 'We talk about your goals',
        text: 'What should your website achieve, who are your customers, what exists already?',
      },
      {
        title: 'You get an honest assessment',
        text: 'And afterwards, if you like, a binding fixed-price quote.',
      },
    ],
    stepsWithoutPhone: [
      {
        title: 'You receive my number beforehand',
        text: 'Simply reply with your phone number and I will call you. Otherwise I will e-mail you the dial-in details.',
      },
      {
        title: 'We talk about your goals',
        text: 'What should your website achieve, who are your customers, what exists already?',
      },
      {
        title: 'You get an honest assessment',
        text: 'And afterwards, if you like, a binding fixed-price quote.',
      },
    ],
    calendarText:
      'Add the appointment to your calendar: the calendar file is attached, or use the button.',
    calendarCta: 'Add to Google Calendar',
    reschedule:
      'Does the time no longer work? Just reply to this e-mail or give me a quick call and we will find a new one.',
    noteLabel: 'Your note',
    callCta: 'Call',
  },
} as const;

export function getCustomerBookingSubject(data: BookingEmailData): string {
  const l = lang(data);
  return CUSTOMER_COPY[l].subject(formatBookingDate(data.date, l), data.time_slot);
}

export function generateCustomerBookingEmailHtml(data: BookingEmailData): string {
  const l = lang(data);
  const copy = CUSTOMER_COPY[l];
  const name = escapeHtml(data.name || '');
  const dateLong = escapeHtml(formatBookingDate(data.date, l));
  const time = escapeHtml(data.time_slot);
  const service = escapeHtml(getServiceLabel(data.service_type, l));
  const notes = escapeHtml(data.notes || '');
  const phone = data.phone ? escapeHtml(data.phone) : '';
  const steps = phone ? copy.stepsWithPhone(phone) : copy.stepsWithoutPhone;

  const body = [
    renderParagraph(copy.greeting(`<strong>${name}</strong>`)),
    renderParagraph(copy.body),
    renderPanel(
      renderKeyValue([
        { label: copy.dateLabel, value: dateLong, highlight: true },
        { label: copy.timeLabel, value: copy.timeValue(time), highlight: true },
        { label: copy.topicLabel, value: service },
        { label: copy.durationLabel, value: copy.durationValue },
      ]),
      'emerald'
    ),
    notes ? `${renderHeading(copy.noteLabel)}${renderQuote(`„${notes}“`)}` : '',
    renderHeading(copy.howTitle),
    renderPanel(renderSteps([...steps]), 'neutral'),
    renderParagraph(copy.calendarText),
    renderButtonRow([
      { href: getBookingCalendarUrl(data), label: copy.calendarCta, variant: 'primary' },
      {
        href: EMAIL_BRAND.phoneHref,
        label: `${copy.callCta} ${EMAIL_BRAND.phoneDisplay}`,
        variant: 'secondary',
      },
    ]),
    renderNote(copy.reschedule, 'amber'),
    renderSignature(l),
  ].join('');

  return renderShell({
    lang: l,
    title: copy.title,
    preheader: escapeHtml(`${formatBookingDate(data.date, l)} · ${data.time_slot}`),
    badge: copy.badge,
    badgeTone: 'emerald',
    headline: copy.headline,
    intro: copy.intro,
    body,
  });
}
