import { describe, it, expect, vi, beforeEach } from 'vitest';

const insertMock = vi.fn();
let headerValues: Record<string, string> = {};

vi.mock('next/headers', () => ({
  headers: async () => ({ get: (key: string) => headerValues[key.toLowerCase()] ?? null }),
}));
vi.mock('@/shared/lib/supabase/server', () => ({
  createAdminClient: () => ({ from: () => ({ insert: insertMock }) }),
}));

import { logConversionEvent } from '@/features/lead/actions/logConversionEvent';
import { CONVERSION_EVENTS } from '@/features/lead/model/conversionEvents';

describe('logConversionEvent', () => {
  beforeEach(() => {
    insertMock.mockReset();
    insertMock.mockResolvedValue({ error: null });
    headerValues = { 'x-forwarded-for': '203.0.113.7, 10.0.0.1', 'user-agent': 'TestBrowser/1.0' };
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role';
    process.env.EVENT_HASH_SECRET = 'secret';
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('stores a hashed daily session id instead of the IP', async () => {
    await logConversionEvent({
      event: 'form_start',
      path: '/de/webdesign-giessen',
      formKind: 'local',
      city: 'Gießen',
    });
    expect(insertMock).toHaveBeenCalledTimes(1);
    const row = insertMock.mock.calls[0][0][0];
    expect(row.event).toBe('form_start');
    expect(row.path).toBe('/de/webdesign-giessen');
    expect(row.city).toBe('Gießen');
    expect(row.session_hash).toMatch(/^[0-9a-f]{32}$/);
    expect(JSON.stringify(row)).not.toContain('203.0.113.7');
  });

  it('gives the same visitor the same hash within a day and a different one on another day', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-06T10:00:00Z'));
    await logConversionEvent({ event: 'cta_click' });
    await logConversionEvent({ event: 'phone_click' });
    vi.setSystemTime(new Date('2026-09-07T10:00:00Z'));
    await logConversionEvent({ event: 'cta_click' });
    vi.useRealTimers();
    const [a, b, c] = insertMock.mock.calls.map((call) => call[0][0].session_hash);
    expect(a).toBe(b);
    expect(a).not.toBe(c);
  });

  it('ignores unknown events and never throws', async () => {
    await expect(
      logConversionEvent({ event: 'scroll_depth' as (typeof CONVERSION_EVENTS)[number] })
    ).resolves.toBeUndefined();
    expect(insertMock).not.toHaveBeenCalled();

    insertMock.mockRejectedValue(new Error('boom'));
    await expect(logConversionEvent({ event: 'form_success' })).resolves.toBeUndefined();
  });

  it('does nothing when Supabase is not configured', async () => {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    await logConversionEvent({ event: 'whatsapp_click' });
    expect(insertMock).not.toHaveBeenCalled();
  });
});
