-- Migration: record where a lead came from as columns instead of prose.
--
-- Five of the six forms used to fold their origin into the free-text `message`
-- ("Anfrage von lokaler SEO-Landingpage für Wetzlar. … Telefon: …"), which made
-- `message` a mix of customer text and system text and meant the customer
-- confirmation quoted our internal labels back at them. The forms now send
-- structured fields; these are the columns that hold them.
--
-- Idempotent: safe to re-run.

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS city_name text,
  ADD COLUMN IF NOT EXISTS district text,
  ADD COLUMN IF NOT EXISTS form_kind text;

-- Which form produced the row. Newsletter signups are not project enquiries and
-- should be filterable as such.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leads_form_kind_check') THEN
    ALTER TABLE public.leads
      ADD CONSTRAINT leads_form_kind_check
      CHECK (form_kind IS NULL OR form_kind IN ('contact', 'quick', 'local', 'gov', 'newsletter'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS leads_city_name_idx ON public.leads (city_name) WHERE city_name IS NOT NULL;
