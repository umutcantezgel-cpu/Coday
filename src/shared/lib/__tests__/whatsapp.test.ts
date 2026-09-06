import { describe, it, expect } from 'vitest';
import { buildWhatsAppUrl, whatsAppMessageFor, WHATSAPP_PHONE } from '@/shared/lib/whatsapp';

describe('whatsapp helper', () => {
  it('builds a deep link with the encoded message', () => {
    const url = buildWhatsAppUrl('Hallo, Frage zur Website.');
    expect(url).toContain(`phone=${WHATSAPP_PHONE}`);
    expect(url).toContain('text=Hallo%2C%20Frage%20zur%20Website.');
  });

  it('picks a context message per page family', () => {
    expect(whatsAppMessageFor('/de/webdesign-giessen')).toContain('neue Website');
    expect(whatsAppMessageFor('/de/branchen/gastronomie')).toContain('Betrieb');
    expect(whatsAppMessageFor('/en/pricing', 'en')).toContain('packages');
    expect(whatsAppMessageFor('/de/angebot-handwerker')).toContain('Handwerker');
    expect(whatsAppMessageFor('/de/blog/foo')).toContain('Webdesign');
  });
});
