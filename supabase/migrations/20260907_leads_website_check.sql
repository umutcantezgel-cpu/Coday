-- Migration: website-check lead magnet, industry pages and phone-only requests.
--
-- * `website_url`: the address a visitor asked us to review.
-- * `industry`: slug of the industry landing page the request came from.
-- * `form_kind` gains 'website_check', 'industries' and 'sticky'.
-- * `email` may be empty: the quick form accepts "phone OR e-mail".
--
-- Idempotent: safe to re-run.

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS website_url text,
  ADD COLUMN IF NOT EXISTS industry text;

DO $$
BEGIN
  ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_form_kind_check;
  ALTER TABLE public.leads
    ADD CONSTRAINT leads_form_kind_check
    CHECK (form_kind IS NULL OR form_kind IN
      ('contact', 'quick', 'local', 'gov', 'newsletter', 'website_check', 'industries', 'sticky'));
END $$;
