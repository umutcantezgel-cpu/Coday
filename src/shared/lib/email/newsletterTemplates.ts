/**
 * Newsletter confirmation.
 *
 * Its own template because the signup used to be handled by the project-enquiry
 * one: subscribers were addressed as "Hallo Newsletter Subscriber", had
 * "Source: Newsletter" quoted back at them as their own message, and were
 * promised a personal call within 24 hours and a binding fixed-price quote for
 * a project they never asked about.
 *
 * This one promises only what the signup page promises: one e-mail a month on
 * the four topics listed there. No name — the form does not collect one, so the
 * greeting must work without it rather than inventing a placeholder.
 */

import {
  EMAIL_BASE_URL,
  EMAIL_BRAND,
  escapeHtml,
  renderChecklist,
  renderHeading,
  renderNote,
  renderParagraph,
  renderShell,
  renderSignature,
  type EmailLang,
} from './layout';

const COPY = {
  de: {
    subject: 'Ihre Anmeldung zum Coday-Newsletter ist bestätigt',
    title: 'Newsletter-Anmeldung',
    badge: 'Anmeldung bestätigt',
    headline: 'Sie sind dabei.',
    intro: 'Einmal im Monat, konkret und ohne Marketing-Geschwafel.',
    greeting: 'Guten Tag,',
    body: 'danke für Ihre Anmeldung zum Coday-Newsletter. Sie bekommen ab sofort einmal im Monat eine E-Mail von mir — geschrieben von mir persönlich, nicht von einer Agentur-Redaktion.',
    topicsTitle: 'Worum es gehen wird',
    topics: [
      'Next.js 15 &amp; React 19 aus der Praxis',
      'Core Web Vitals unter 0,3 Sekunden, an echten Projekten gezeigt',
      'Strukturierte Schema.org-Graphen und lokale Sichtbarkeit',
      'Konversionsstarke B2B-Leadfunnel und Kalkulatoren',
    ],
    noSpam:
      '&#10003; Eine E-Mail im Monat. Keine Weitergabe Ihrer Adresse. Abmeldung jederzeit mit einer formlosen Antwort auf diese Mail.',
    projectTitle: 'Sie haben ein konkretes Projekt?',
    projectBody: `Dann warten Sie nicht auf den nächsten Newsletter — schreiben Sie mir direkt an <a href="mailto:${EMAIL_BRAND.email}" style="color: #1d4ed8; text-decoration: none;">${EMAIL_BRAND.email}</a> oder rufen Sie an. Ich antworte selbst.`,
  },
  en: {
    subject: 'Your Coday newsletter subscription is confirmed',
    title: 'Newsletter subscription',
    badge: 'Subscription confirmed',
    headline: 'You are on the list.',
    intro: 'Once a month, concrete and free of marketing filler.',
    greeting: 'Hello,',
    body: 'thank you for subscribing to the Coday newsletter. From now on you will get one e-mail a month from me — written by me personally, not by an agency copy desk.',
    topicsTitle: 'What it will cover',
    topics: [
      'Next.js 15 and React 19 in production',
      'Core Web Vitals under 0.3 seconds, shown on real projects',
      'Structured Schema.org graphs and local visibility',
      'High-converting B2B lead funnels and calculators',
    ],
    noSpam:
      '&#10003; One e-mail a month. Your address is never passed on. Unsubscribe any time by simply replying to this mail.',
    projectTitle: 'Have a concrete project?',
    projectBody: `Then do not wait for the next newsletter — write to me directly at <a href="mailto:${EMAIL_BRAND.email}" style="color: #1d4ed8; text-decoration: none;">${EMAIL_BRAND.email}</a> or call. I answer myself.`,
  },
} as const;

export function getNewsletterConfirmationSubject(lang: EmailLang): string {
  return COPY[lang].subject;
}

export function generateNewsletterConfirmationHtml(lang: EmailLang): string {
  const copy = COPY[lang];

  const body = [
    renderParagraph(copy.greeting),
    renderParagraph(copy.body),
    renderHeading(copy.topicsTitle),
    renderChecklist([...copy.topics], '', 'amber'),
    renderNote(copy.noSpam, 'emerald'),
    renderHeading(copy.projectTitle),
    renderParagraph(copy.projectBody),
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
    footer:
      lang === 'en'
        ? `© ${new Date().getFullYear()} ${EMAIL_BRAND.name} · ${EMAIL_BRAND.location} · Unsubscribe by replying to this e-mail`
        : `© ${new Date().getFullYear()} ${EMAIL_BRAND.name} · ${EMAIL_BRAND.location} · Abmeldung per Antwort auf diese E-Mail`,
  });
}

/** Agency-side notice. Deliberately plain: a signup is not an enquiry. */
export function getAgencyNewsletterSubject(email: string): string {
  return `Newsletter-Anmeldung: ${email}`;
}

export function generateAgencyNewsletterHtml(email: string, dateStr: string): string {
  return renderShell({
    lang: 'de',
    title: 'Newsletter-Anmeldung',
    preheader: escapeHtml(email),
    badge: 'Newsletter',
    badgeTone: 'blue',
    headline: escapeHtml(email),
    intro: 'Neue Anmeldung zum Newsletter — keine Projektanfrage.',
    body:
      renderParagraph(`Eingegangen am ${escapeHtml(dateStr)}.`) +
      renderParagraph(
        `Der Eintrag liegt in Supabase. Es wurde eine Bestätigung an die Adresse verschickt.`
      ),
    footer: `Automatische Benachrichtigung von <a href="${EMAIL_BASE_URL}" style="color: #64748b; text-decoration: none;">codayweb.de</a>`,
  });
}
