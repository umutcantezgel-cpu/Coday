import { describe, it, expect, vi, beforeEach } from 'vitest';

const eqMock = vi.fn();
vi.mock('@/shared/lib/supabase/server', () => ({
  createAdminClient: () => ({
    from: () => ({ select: () => ({ eq: eqMock }) }),
  }),
}));

import { getBookedSlots } from '@/app/actions/getBookedSlots';

describe('getBookedSlots', () => {
  beforeEach(() => {
    eqMock.mockReset();
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role';
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('returns taken slots and skips cancelled bookings', async () => {
    eqMock.mockResolvedValue({
      data: [
        { time_slot: '10:00', status: 'confirmed' },
        { time_slot: '11:00', status: 'cancelled' },
        { time_slot: '14:00', status: null },
      ],
      error: null,
    });
    await expect(getBookedSlots('2026-09-15')).resolves.toEqual(['10:00', '14:00']);
  });

  it('degrades to an empty list on invalid input, query errors and missing config', async () => {
    await expect(getBookedSlots('15.09.2026')).resolves.toEqual([]);
    eqMock.mockResolvedValue({ data: null, error: { message: 'relation missing' } });
    await expect(getBookedSlots('2026-09-15')).resolves.toEqual([]);
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    await expect(getBookedSlots('2026-09-15')).resolves.toEqual([]);
    expect(eqMock).toHaveBeenCalledTimes(1);
  });
});
