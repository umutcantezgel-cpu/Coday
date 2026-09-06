-- Migration: first-party, cookie-free conversion log.
--
-- Client analytics only run after cookie consent, so CTA clicks and form starts
-- were invisible for most visitors. This table receives intent signals from the
-- `logConversionEvent` server action. `session_hash` is a daily-rotating,
-- salted one-way hash (IP + user agent + day + secret) used only to count
-- distinct visitors per day. It is never joined to `leads`.
--
-- Idempotent: safe to re-run.

CREATE TABLE IF NOT EXISTS public.conversion_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  event text NOT NULL,
  path text,
  locale text,
  package_id text,
  form_kind text,
  city text,
  cta_position text,
  session_hash text
);

CREATE INDEX IF NOT EXISTS conversion_events_created_at_idx
  ON public.conversion_events (created_at DESC);
CREATE INDEX IF NOT EXISTS conversion_events_event_idx
  ON public.conversion_events (event);
CREATE INDEX IF NOT EXISTS conversion_events_path_idx
  ON public.conversion_events (path);

ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'conversion_events'
      AND policyname = 'conversion_events_service_role_only'
  ) THEN
    CREATE POLICY conversion_events_service_role_only
      ON public.conversion_events FOR ALL
      TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Daily roll-up for the owner's dashboard: events per day, event and path,
-- plus distinct visitors (by daily session hash).
CREATE OR REPLACE VIEW public.conversion_daily AS
SELECT
  date_trunc('day', created_at)::date AS day,
  event,
  path,
  count(*)::integer AS events,
  count(DISTINCT session_hash)::integer AS visitors
FROM public.conversion_events
GROUP BY 1, 2, 3;

-- Keep the log lean: rows older than 180 days carry no value for a solo agency.
CREATE OR REPLACE FUNCTION public.prune_conversion_events() RETURNS void
LANGUAGE sql SECURITY DEFINER AS $$
  DELETE FROM public.conversion_events WHERE created_at < now() - interval '180 days';
$$;
