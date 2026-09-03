/**
 * Minimal iCalendar (.ics) builder for booking confirmations.
 * All bookings are made in German local time (Europe/Berlin).
 */

export const BOOKING_TIME_ZONE = 'Europe/Berlin';

/** Offset of Europe/Berlin from UTC in minutes at the given instant. */
function berlinOffsetMinutes(utcMs: number): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BOOKING_TIME_ZONE,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(new Date(utcMs));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? '0');
  const asUtc = Date.UTC(
    get('year'),
    get('month') - 1,
    get('day'),
    get('hour') % 24,
    get('minute')
  );
  return Math.round((asUtc - utcMs) / 60000);
}

/** Converts a Berlin wall-clock date ("2026-09-15") and time ("14:30") to a UTC instant. */
export function berlinToUtc(dateIso: string, time: string): Date {
  const [y, m, d] = dateIso.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  const naive = Date.UTC(y, m - 1, d, hh, mm);
  const offset = berlinOffsetMinutes(naive);
  return new Date(naive - offset * 60000);
}

/** "20260915T123000Z" */
export function toIcsUtc(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** RFC 5545 line folding at 75 octets. */
function foldLine(line: string): string {
  const out: string[] = [];
  let rest = line;
  while (Buffer.byteLength(rest, 'utf8') > 75) {
    let cut = 75;
    while (Buffer.byteLength(rest.slice(0, cut), 'utf8') > 75) cut--;
    out.push(rest.slice(0, cut));
    rest = ' ' + rest.slice(cut);
  }
  out.push(rest);
  return out.join('\r\n');
}

export interface IcsEventInput {
  uid: string;
  start: Date;
  durationMinutes: number;
  summary: string;
  description?: string;
  location?: string;
  organizer: { name: string; email: string };
  attendee?: { name: string; email: string };
  url?: string;
}

export function buildIcs(e: IcsEventInput): string {
  const end = new Date(e.start.getTime() + e.durationMinutes * 60000);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Coday//Booking//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${e.uid}`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(e.start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:${escapeIcsText(e.summary)}`,
    e.description ? `DESCRIPTION:${escapeIcsText(e.description)}` : null,
    e.location ? `LOCATION:${escapeIcsText(e.location)}` : null,
    e.url ? `URL:${e.url}` : null,
    `ORGANIZER;CN=${escapeIcsText(e.organizer.name)}:mailto:${e.organizer.email}`,
    e.attendee
      ? `ATTENDEE;CN=${escapeIcsText(e.attendee.name)};ROLE=REQ-PARTICIPANT;RSVP=TRUE:mailto:${e.attendee.email}`
      : null,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcsText(e.summary)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter((l): l is string => typeof l === 'string');

  return lines.map(foldLine).join('\r\n') + '\r\n';
}

/** Google Calendar "add event" link (works without an attachment). */
export function buildGoogleCalendarUrl(e: {
  start: Date;
  durationMinutes: number;
  summary: string;
  description?: string;
  location?: string;
}): string {
  const end = new Date(e.start.getTime() + e.durationMinutes * 60000);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.summary,
    dates: `${toIcsUtc(e.start)}/${toIcsUtc(end)}`,
    ctz: BOOKING_TIME_ZONE,
  });
  if (e.description) params.set('details', e.description);
  if (e.location) params.set('location', e.location);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** "Dienstag, 15. September 2026" / "Tuesday, September 15, 2026" */
export function formatBookingDate(dateIso: string, lang: 'de' | 'en'): string {
  const [y, m, d] = dateIso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12, 0));
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
