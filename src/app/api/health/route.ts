import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

/**
 * Keep-alive endpoint that prevents Supabase Free Tier from auto-pausing.
 * Supabase pauses free projects after 7 days of inactivity.
 * This endpoint performs a lightweight SELECT 1 query to keep the DB alive.
 *
 * Set up an external cron service (e.g. cron-job.org, UptimeRobot) to hit:
 * GET https://www.codayweb.de/api/health
 * Every 5 days (432000 seconds) or more frequently.
 *
 * Auth: Requires ?token=<CRON_SECRET> to prevent abuse.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const authHeader = request.headers.get('Authorization');

  // Validate cron secret to prevent abuse
  const cronSecret = process.env.CRON_SECRET;
  const isAuthorizedViaToken = token === cronSecret;
  const isAuthorizedViaHeader = authHeader === `Bearer ${cronSecret}`;

  if (cronSecret && !isAuthorizedViaToken && !isAuthorizedViaHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { status: 'error', message: 'Supabase not configured' },
      { status: 500 }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Lightweight query to keep the database active
    const { error } = await supabase.from('leads').select('id', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json(
        { status: 'error', message: error.message, timestamp: new Date().toISOString() },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'healthy',
      database: 'active',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { status: 'error', message: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
