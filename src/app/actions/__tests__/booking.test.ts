import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendMock = vi.fn();
const insertMock = vi.fn();
let ipCounter = 0;

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));
vi.mock('next/headers', () => ({
  headers: async () => ({
    get: (key: string) => (key === 'x-forwarded-for' ? `10.1.0.${++ipCounter}` : null),
  }),
}));
vi.mock('@/shared/lib/supabase/server', () => ({
  createAdminClient: () => ({ from: () => ({ insert: insertMock }) }),
}));

import { bookAppointment } from '@/app/actions/booking';

describe('bookAppointment', () => {
  beforeEach(() => {
    sendMock.mockReset();
    insertMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: 'em' }, error: null });
    insertMock.mockResolvedValue({ error: null });
    process.env.RESEND_API_KEY = 're_test';
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role';
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('stores the slot, then sends customer and agency e-mails with a calendar attachment', async () => {
    const result = await bookAppointment({
      name: 'Dr. Michael Weber',
      email: 'weber@praxis-wetzlar.de',
      phone: '06441 987654',
      date: '2026-09-15',
      time_slot: '14:00',
      service_type: 'consultation',
      notes: 'Neue Praxis-Website',
      locale: 'de',
    });
    expect(result.success).toBe(true);
    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledTimes(2);

    const customer = sendMock.mock.calls
      .map((c) => c[0])
      .find((c) => c.to[0] === 'weber@praxis-wetzlar.de');
    const agency = sendMock.mock.calls
      .map((c) => c[0])
      .find((c) => c.to[0] !== 'weber@praxis-wetzlar.de');
    expect(customer?.subject).toBe(
      'Terminbestätigung: Dienstag, 15. September 2026, 14:00 Uhr · Coday'
    );
    expect(customer?.attachments?.[0]?.filename).toBe('coday-termin.ics');
    const ics = Buffer.from(customer!.attachments[0].content, 'base64').toString('utf8');
    expect(ics).toContain('DTSTART:20260915T120000Z');
    expect(customer?.html).toContain('06441 987654');
    expect(agency?.subject).toContain('Dr. Michael Weber');
    expect(agency?.html).toContain('Neue Praxis-Website');
  });

  it('rejects double bookings with a friendly message', async () => {
    insertMock.mockResolvedValue({ error: { code: '23505', message: 'duplicate key' } });
    const result = await bookAppointment({
      name: 'Anna',
      email: 'anna@example.de',
      date: '2026-09-15',
      time_slot: '14:00',
      locale: 'en',
    });
    expect(result.error).toBe('This slot has just been taken. Please choose another time.');
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('still confirms when the customer mail fails but the agency mail arrives', async () => {
    sendMock.mockImplementation(async (args: { to: string[] }) =>
      args.to[0] === 'anna@example.de'
        ? {
            data: null,
            error: { name: 'validation_error', message: 'Invalid `to` field', statusCode: 422 },
          }
        : { data: { id: 'em' }, error: null }
    );
    const result = await bookAppointment({
      name: 'Anna',
      email: 'anna@example.de',
      date: '2026-09-15',
      time_slot: '15:00',
    });
    expect(result.success).toBe(true);
    expect(result.message).toContain('agency/no-customer');
  });

  it('rejects invalid payloads', async () => {
    const result = await bookAppointment({
      name: 'A',
      email: 'nope',
      date: '15.09.2026',
      time_slot: '14',
    });
    expect(result.error).toBeDefined();
    expect(sendMock).not.toHaveBeenCalled();
  });
});
