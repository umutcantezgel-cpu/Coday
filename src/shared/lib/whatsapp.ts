import { COMPANY_CONFIG } from '@/shared/config/constants';

/**
 * One place for WhatsApp deep links so every button opens the same chat with a
 * sensible, context-aware first message.
 */

export const WHATSAPP_PHONE = COMPANY_CONFIG.phoneNumber;

export function buildWhatsAppUrl(message?: string): string {
  const text = message ?? COMPANY_CONFIG.whatsappMessage;
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(text)}`;
}

/** First message tailored to where the visitor is on the site. */
export function whatsAppMessageFor(pathname: string, locale: 'de' | 'en' = 'de'): string {
  const p = pathname.replace(/^\/(de|en)/, '');
  const isEn = locale === 'en';

  if (p.startsWith('/webdesign-') || p.startsWith('/regionen') || p.startsWith('/standorte')) {
    return isEn
      ? 'Hi, I am interested in a new website for my business.'
      : 'Hallo, ich interessiere mich für eine neue Website für mein Unternehmen.';
  }
  if (p.startsWith('/branchen')) {
    return isEn
      ? 'Hi, I would like to know whether a website makes sense for my business.'
      : 'Hallo, ich möchte wissen, ob eine Website für meinen Betrieb sinnvoll ist.';
  }
  if (p.startsWith('/pricing') || p.startsWith('/calculator')) {
    return isEn
      ? 'Hi, I have a question about your packages.'
      : 'Hallo, ich habe eine Frage zu Ihren Paketen.';
  }
  if (p.startsWith('/angebot-handwerker')) {
    return isEn
      ? 'Hi, I am interested in the craftsmen package.'
      : 'Hallo, ich interessiere mich für das Handwerker-Paket.';
  }
  return isEn ? 'Hi, I have a question about a website.' : COMPANY_CONFIG.whatsappMessage;
}
