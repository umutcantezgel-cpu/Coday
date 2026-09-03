import { describe, it, expect } from 'vitest';
import {
  berlinToUtc,
  buildIcs,
  buildGoogleCalendarUrl,
  formatBookingDate,
  toIcsUtc,
} from '@/shared/lib/email/ics';

describe('ics helpers', () => {
  it('converts Berlin wall-clock time to UTC across summer and winter time', () => {
    expect(berlinToUtc('2026-09-15', '14:30').toISOString()).toBe('2026-09-15T12:30:00.000Z');
    expect(berlinToUtc('2026-01-15', '14:30').toISOString()).toBe('2026-01-15T13:30:00.000Z');
  });

  it('formats booking dates for both languages', () => {
    expect(formatBookingDate('2026-09-15', 'de')).toBe('Dienstag, 15. September 2026');
    expect(formatBookingDate('2026-09-15', 'en')).toBe('Tuesday, 15 September 2026');
  });

  it('builds a valid VCALENDAR with escaped text and CRLF line endings', () => {
    const ics = buildIcs({
      uid: 'test-1@codayweb.de',
      start: berlinToUtc('2026-09-15', '14:30'),
      durationMinutes: 30,
      summary: 'Gespräch mit Coday; Website, Relaunch',
      description: 'Zeile 1\nZeile 2',
      organizer: { name: 'Umutcan Emre Tezgel', email: 'umut@codayweb.de' },
      attendee: { name: 'Max Mustermann', email: 'max@example.de' },
    });
    const unfolded = ics.replace(/\r\n /g, '');
    expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(ics).toContain('DTSTART:20260915T123000Z');
    expect(ics).toContain('DTEND:20260915T130000Z');
    expect(unfolded).toContain('SUMMARY:Gespräch mit Coday\\; Website\\, Relaunch');
    expect(unfolded).toContain('DESCRIPTION:Zeile 1\\nZeile 2');
    expect(unfolded).toContain(
      'ATTENDEE;CN=Max Mustermann;ROLE=REQ-PARTICIPANT;RSVP=TRUE:mailto:max@example.de'
    );
    expect(ics.split('\r\n').every((line) => Buffer.byteLength(line, 'utf8') <= 76)).toBe(true);
  });

  it('builds a Google Calendar link in UTC', () => {
    const url = buildGoogleCalendarUrl({
      start: berlinToUtc('2026-09-15', '14:30'),
      durationMinutes: 30,
      summary: 'Gespräch mit Coday',
    });
    expect(url).toContain('dates=20260915T123000Z%2F20260915T130000Z');
    expect(url).toContain('ctz=Europe%2FBerlin');
    expect(toIcsUtc(new Date('2026-09-15T12:30:00.000Z'))).toBe('20260915T123000Z');
  });
});
