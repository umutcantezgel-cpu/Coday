import { describe, it, expect } from 'vitest';
import { splitContact, normalizeWebsiteUrl } from '@/features/lead/model/useLeadQuickForm';

describe('splitContact', () => {
  it('recognises e-mail addresses and phone numbers', () => {
    expect(splitContact('max@example.de')).toEqual({ email: 'max@example.de' });
    expect(splitContact(' +49 176 41195301 ')).toEqual({ phone: '+49 176 41195301' });
    expect(splitContact('06441 123456')).toEqual({ phone: '06441 123456' });
  });

  it('rejects values that are neither', () => {
    expect(splitContact('')).toEqual({});
    expect(splitContact('max@')).toEqual({});
    expect(splitContact('123')).toEqual({});
    expect(splitContact('hallo welt')).toEqual({});
  });
});

describe('normalizeWebsiteUrl', () => {
  it('adds https and trims whitespace', () => {
    expect(normalizeWebsiteUrl(' www.firma.de ')).toBe('https://www.firma.de');
    expect(normalizeWebsiteUrl('http://firma.de/start')).toBe('http://firma.de/start');
    expect(normalizeWebsiteUrl('')).toBe('');
  });
});
