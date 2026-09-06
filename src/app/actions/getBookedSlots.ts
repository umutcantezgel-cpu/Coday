'use server';

import { createAdminClient } from '@/shared/lib/supabase/server';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Time slots already taken on a given day (YYYY-MM-DD, Europe/Berlin).
 * Returns an empty list when Supabase is not configured or the query fails,
 * so the calendar degrades to "everything available" rather than breaking.
 */
export async function getBookedSlots(date: string): Promise<string[]> {
  if (!DATE_RE.test(date)) return [];
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('bookings')
      .select('time_slot,status')
      .eq('date', date);
    if (error) {
      console.error('[getBookedSlots] query failed:', error.message);
      return [];
    }
    return (data ?? [])
      .filter((row) => row.status !== 'cancelled')
      .map((row) => String(row.time_slot));
  } catch (err) {
    console.error('[getBookedSlots] unexpected failure:', err);
    return [];
  }
}
