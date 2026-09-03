-- Migration: reconcile the two divergent `leads` table definitions
-- (20260204_initial_leads.sql vs 20260523_create_leads.sql) additively so the
-- package-aware lead pipeline can insert regardless of which shape is live.
-- Idempotent: safe to re-run.

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS project text,
  ADD COLUMN IF NOT EXISTS message text,
  ADD COLUMN IF NOT EXISTS selected_package_id text,
  ADD COLUMN IF NOT EXISTS package_name text,
  ADD COLUMN IF NOT EXISTS selected_module_ids text[],
  ADD COLUMN IF NOT EXISTS delivery_days integer,
  ADD COLUMN IF NOT EXISTS locale text DEFAULT 'de',
  ADD COLUMN IF NOT EXISTS score integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'new';

-- Relax the NOT NULL constraints of the 20260523 variant; package leads do not
-- carry budget / timeframe / project_type.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'project_type'
  ) THEN
    ALTER TABLE public.leads ALTER COLUMN project_type DROP NOT NULL;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'budget'
  ) THEN
    ALTER TABLE public.leads ALTER COLUMN budget DROP NOT NULL;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'timeframe'
  ) THEN
    ALTER TABLE public.leads ALTER COLUMN timeframe DROP NOT NULL;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'description'
  ) THEN
    ALTER TABLE public.leads ALTER COLUMN description DROP NOT NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leads_status_check') THEN
    ALTER TABLE public.leads
      ADD CONSTRAINT leads_status_check
      CHECK (status IN ('new', 'contacted', 'qualified', 'lost', 'won'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
