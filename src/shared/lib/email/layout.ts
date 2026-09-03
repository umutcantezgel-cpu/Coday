/**
 * Shared light-design building blocks for every Coday e-mail.
 *
 * Table-based markup with inline styles so it renders the same in Apple Mail,
 * Gmail, Outlook and iOS Mail. One accent colour (amber), white cards on a
 * light grey page, generous spacing, no dark blocks.
 */

export type EmailLang = 'de' | 'en';

export const EMAIL_BASE_URL = 'https://codayweb.de';

export const EMAIL_BRAND = {
  name: 'Coday',
  tagline: { de: 'Webagentur Wetzlar', en: 'Web Agency Wetzlar' },
  owner: 'Umutcan Emre Tezgel',
  role: { de: 'Inhaber &amp; Webentwickler', en: 'Owner &amp; Web Developer' },
  email: 'umut@codayweb.de',
  phoneDisplay: '+49 176 41195301',
  phoneHref: 'tel:+4917641195301',
  whatsappHref: 'https://api.whatsapp.com/send?phone=4917641195301',
  location: 'Wetzlar, Hessen',
} as const;

export const EMAIL_COLORS = {
  page: '#f3f4f6',
  card: '#ffffff',
  border: '#e5e7eb',
  heading: '#0f172a',
  text: '#334155',
  muted: '#64748b',
  faint: '#94a3b8',
  accent: '#d97706',
  accentDark: '#b45309',
  accentSoft: '#fffbeb',
  accentBorder: '#fde68a',
  success: '#047857',
  successSoft: '#ecfdf5',
  successBorder: '#a7f3d0',
  info: '#1d4ed8',
  infoSoft: '#eff6ff',
  infoBorder: '#bfdbfe',
  neutralSoft: '#f8fafc',
} as const;

export type EmailTone = 'amber' | 'emerald' | 'blue' | 'neutral';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function escapeHtml(str: string | number | undefined | null): string {
  if (str === undefined || str === null || str === '') return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function toneColors(tone: EmailTone) {
  switch (tone) {
    case 'amber':
      return {
        bg: EMAIL_COLORS.accentSoft,
        border: EMAIL_COLORS.accentBorder,
        fg: EMAIL_COLORS.accentDark,
      };
    case 'emerald':
      return {
        bg: EMAIL_COLORS.successSoft,
        border: EMAIL_COLORS.successBorder,
        fg: EMAIL_COLORS.success,
      };
    case 'blue':
      return { bg: EMAIL_COLORS.infoSoft, border: EMAIL_COLORS.infoBorder, fg: EMAIL_COLORS.info };
    default:
      return { bg: EMAIL_COLORS.neutralSoft, border: EMAIL_COLORS.border, fg: EMAIL_COLORS.muted };
  }
}

/** Small uppercase pill, e.g. "Neue Anfrage". */
export function renderBadge(label: string, tone: EmailTone = 'amber'): string {
  const c = toneColors(tone);
  return `<span style="display: inline-block; padding: 5px 12px; background-color: ${c.bg}; border: 1px solid ${c.border}; border-radius: 9999px; color: ${c.fg}; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;">${label}</span>`;
}

/** Rounded panel with an optional small title. */
export function renderPanel(inner: string, tone: EmailTone = 'neutral', title?: string): string {
  const c = toneColors(tone);
  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 20px 0;">
  <tr>
    <td style="padding: 18px 20px; background-color: ${c.bg}; border: 1px solid ${c.border}; border-radius: 14px;">
      ${title ? `<p style="margin: 0 0 10px 0; color: ${c.fg}; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;">${title}</p>` : ''}
      ${inner}
    </td>
  </tr>
</table>`;
}

export interface KeyValueRow {
  label: string;
  value: string;
  highlight?: boolean;
}

/** Two-column label/value table. Values are expected to be escaped already. */
export function renderKeyValue(rows: KeyValueRow[]): string {
  const body = rows
    .map(
      (row, idx) => `
  <tr>
    <td style="padding: 7px 12px 7px 0; color: ${EMAIL_COLORS.muted}; font-size: 13px; vertical-align: top; width: 34%; ${idx < rows.length - 1 ? `border-bottom: 1px solid ${EMAIL_COLORS.border};` : ''}">${row.label}</td>
    <td style="padding: 7px 0; color: ${EMAIL_COLORS.heading}; font-size: 14px; font-weight: ${row.highlight ? '700' : '500'}; vertical-align: top; ${idx < rows.length - 1 ? `border-bottom: 1px solid ${EMAIL_COLORS.border};` : ''}">${row.value}</td>
  </tr>`
    )
    .join('');
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${body}</table>`;
}

/** Check-marked list; `emptyText` is shown when there are no items. */
export function renderChecklist(
  items: string[],
  emptyText: string,
  tone: EmailTone = 'amber'
): string {
  if (items.length === 0) {
    return `<p style="margin: 0; color: ${EMAIL_COLORS.muted}; font-size: 13px; font-style: italic;">${emptyText}</p>`;
  }
  const c = toneColors(tone);
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0">${items
    .map(
      (item) => `
  <tr>
    <td style="padding: 3px 8px 3px 0; color: ${c.fg}; font-size: 14px; font-weight: 700; vertical-align: top;">&#10003;</td>
    <td style="padding: 3px 0; color: ${EMAIL_COLORS.text}; font-size: 14px;">${item}</td>
  </tr>`
    )
    .join('')}</table>`;
}

export interface StepItem {
  title: string;
  text: string;
}

/** Numbered steps with amber circles. */
export function renderSteps(steps: StepItem[]): string {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${steps
    .map(
      (step, idx) => `
  <tr>
    <td style="width: 32px; padding: 0 0 ${idx < steps.length - 1 ? '14px' : '0'} 0; vertical-align: top;">
      <div style="width: 26px; height: 26px; background-color: ${EMAIL_COLORS.accent}; color: #ffffff; border-radius: 50%; text-align: center; font-size: 13px; font-weight: 700; line-height: 26px;">${idx + 1}</div>
    </td>
    <td style="padding: 0 0 ${idx < steps.length - 1 ? '14px' : '0'} 12px; vertical-align: top;">
      <p style="margin: 0 0 2px 0; color: ${EMAIL_COLORS.heading}; font-size: 14px; font-weight: 700;">${step.title}</p>
      <p style="margin: 0; color: ${EMAIL_COLORS.muted}; font-size: 13px; line-height: 1.55;">${step.text}</p>
    </td>
  </tr>`
    )
    .join('')}</table>`;
}

export interface EmailButton {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
}

export function renderButton({ href, label, variant = 'primary' }: EmailButton): string {
  const primary = variant === 'primary';
  return `<a href="${href}" style="display: inline-block; padding: 12px 20px; background-color: ${primary ? EMAIL_COLORS.accent : '#ffffff'}; color: ${primary ? '#ffffff' : EMAIL_COLORS.heading}; border: 1px solid ${primary ? EMAIL_COLORS.accent : EMAIL_COLORS.border}; border-radius: 9999px; font-size: 14px; font-weight: 700; text-decoration: none; white-space: nowrap;">${label}</a>`;
}

/** Buttons side by side, wrapping on narrow screens. */
export function renderButtonRow(buttons: EmailButton[]): string {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 4px 0 20px 0;"><tr>${buttons
    .map((b) => `<td style="padding: 0 10px 10px 0;">${renderButton(b)}</td>`)
    .join('')}</tr></table>`;
}

/** Quiet single-line note, e.g. "Unverbindlich und kostenlos". */
export function renderNote(text: string, tone: EmailTone = 'emerald'): string {
  const c = toneColors(tone);
  return `<p style="margin: 0 0 20px 0; padding: 12px 16px; background-color: ${c.bg}; border: 1px solid ${c.border}; border-radius: 12px; color: ${c.fg}; font-size: 13px; line-height: 1.5;">${text}</p>`;
}

/** Section heading inside the body. */
export function renderHeading(text: string): string {
  return `<h2 style="margin: 0 0 12px 0; color: ${EMAIL_COLORS.heading}; font-size: 16px; font-weight: 700; letter-spacing: -0.01em;">${text}</h2>`;
}

export function renderParagraph(text: string): string {
  return `<p style="margin: 0 0 16px 0; color: ${EMAIL_COLORS.text}; font-size: 15px; line-height: 1.6;">${text}</p>`;
}

/** Quoted customer message. */
export function renderQuote(text: string): string {
  return `<div style="margin: 0 0 20px 0; padding: 14px 18px; background-color: ${EMAIL_COLORS.neutralSoft}; border-left: 4px solid ${EMAIL_COLORS.accent}; border-radius: 0 12px 12px 0; color: ${EMAIL_COLORS.text}; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${text}</div>`;
}

export function renderSignature(lang: EmailLang): string {
  const b = EMAIL_BRAND;
  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 8px; border-top: 1px solid ${EMAIL_COLORS.border};">
  <tr>
    <td style="padding-top: 20px;">
      <p style="margin: 0 0 2px 0; color: ${EMAIL_COLORS.muted}; font-size: 14px;">${lang === 'en' ? 'Best regards from Wetzlar,' : 'Mit besten Grüßen aus Wetzlar,'}</p>
      <p style="margin: 0 0 2px 0; color: ${EMAIL_COLORS.heading}; font-size: 16px; font-weight: 700;">${b.owner}</p>
      <p style="margin: 0 0 10px 0; color: ${EMAIL_COLORS.accent}; font-size: 13px; font-weight: 600;">${b.role[lang]} · ${b.name}</p>
      <p style="margin: 0; color: ${EMAIL_COLORS.faint}; font-size: 12px;">
        <a href="${b.phoneHref}" style="color: ${EMAIL_COLORS.muted}; text-decoration: none;">${b.phoneDisplay}</a> ·
        <a href="mailto:${b.email}" style="color: ${EMAIL_COLORS.muted}; text-decoration: none;">${b.email}</a> ·
        <a href="${EMAIL_BASE_URL}" style="color: ${EMAIL_COLORS.muted}; text-decoration: none;">codayweb.de</a>
      </p>
    </td>
  </tr>
</table>`;
}

export interface ShellOptions {
  lang: EmailLang;
  title: string;
  /** Hidden preview text shown next to the subject in inboxes. */
  preheader?: string;
  badge: string;
  badgeTone?: EmailTone;
  headline: string;
  intro?: string;
  body: string;
  footer?: string;
}

/** Full HTML document: light page, white card, amber top bar, brand header. */
export function renderShell(o: ShellOptions): string {
  const b = EMAIL_BRAND;
  const year = new Date().getFullYear();
  const footer =
    o.footer ??
    (o.lang === 'en'
      ? `© ${year} ${b.name} · ${b.location} · GDPR compliant`
      : `© ${year} ${b.name} · ${b.location} · DSGVO-konform`);

  return `<!DOCTYPE html>
<html lang="${o.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${o.title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${EMAIL_COLORS.page}; font-family: ${FONT}; color: ${EMAIL_COLORS.text}; line-height: 1.6; -webkit-font-smoothing: antialiased;">
  ${o.preheader ? `<div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: ${EMAIL_COLORS.page};">${o.preheader}</div>` : ''}
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${EMAIL_COLORS.page}; padding: 28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: ${EMAIL_COLORS.card}; border-radius: 18px; border: 1px solid ${EMAIL_COLORS.border}; overflow: hidden;">
          <tr>
            <td style="height: 6px; background-color: ${EMAIL_COLORS.accent}; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding: 22px 32px 0 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="color: ${EMAIL_COLORS.heading}; font-size: 18px; font-weight: 800; letter-spacing: -0.02em;">${b.name}</td>
                  <td align="right" style="color: ${EMAIL_COLORS.faint}; font-size: 12px;">${b.tagline[o.lang]}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 22px 32px 8px 32px;">
              ${renderBadge(o.badge, o.badgeTone ?? 'amber')}
              <h1 style="margin: 14px 0 6px 0; color: ${EMAIL_COLORS.heading}; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.25;">${o.headline}</h1>
              ${o.intro ? `<p style="margin: 0; color: ${EMAIL_COLORS.muted}; font-size: 14px; line-height: 1.6;">${o.intro}</p>` : ''}
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 32px 28px 32px;">
              ${o.body}
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 32px; background-color: ${EMAIL_COLORS.neutralSoft}; border-top: 1px solid ${EMAIL_COLORS.border}; text-align: center; color: ${EMAIL_COLORS.faint}; font-size: 11px;">
              ${footer}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Plain-text alternative for clients that do not render HTML and for spam scoring. */
export function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<head[\s\S]*?<\/head>/gi, '')
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href, label) => {
      const text = String(label)
        .replace(/<[^>]+>/g, '')
        .trim();
      return text && text !== href ? `${text} (${href})` : href;
    })
    .replace(/<\/(p|div|tr|h1|h2|h3|li|table)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/td>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#10003;/g, '✓')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}
