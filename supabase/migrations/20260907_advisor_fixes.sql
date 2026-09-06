-- Migration: hardening after the Supabase advisor run of 2026-09-06.
--
-- Findings on the production project (behnltoogscnbjhvixmw):
--   0010 security_definer_view      public.conversion_daily
--   0008 rls_enabled_no_policy      public.leads
--   0011 function_search_path_mutable / 0028 anon_security_definer_function_executable
--                                   public.prune_conversion_events
--
-- Only objects owned by this app are touched. The legacy knowledge-base
-- functions in the same project (ingest_document_atomic, match_knowledge_sections)
-- are left alone on purpose; they belong to another workload.
--
-- Idempotent: safe to re-run.

-- 1) The daily roll-up must run with the caller's privileges, not the creator's.
CREATE OR REPLACE VIEW public.conversion_daily
WITH (security_invoker = true) AS
SELECT
  date_trunc('day', created_at)::date AS day,
  event,
  path,
  count(*)::integer AS events,
  count(DISTINCT session_hash)::integer AS visitors
FROM public.conversion_events
GROUP BY 1, 2, 3;

-- 2) leads: RLS was enabled without a policy. Make the intent explicit:
--    only the service role (server actions) may read or write.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'leads'
      AND policyname = 'leads_service_role_only'
  ) THEN
    CREATE POLICY leads_service_role_only
      ON public.leads FOR ALL
      TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;

-- 3) prune_conversion_events: pin the search_path and keep it off the public API.
CREATE OR REPLACE FUNCTION public.prune_conversion_events() RETURNS void
LANGUAGE sql SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.conversion_events WHERE created_at < now() - interval '180 days';
$$;

REVOKE EXECUTE ON FUNCTION public.prune_conversion_events() FROM PUBLIC, anon, authenticated;
