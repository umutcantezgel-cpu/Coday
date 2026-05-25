-- Migration: Secure RLS Policies
-- This migration drops the insecure anonymous insert policies that allowed spam
-- Server Actions utilizing the Service Role Key will bypass RLS.

-- Secure 'leads' table
DROP POLICY IF EXISTS "Allow anonymous inserts to leads" ON public.leads;

CREATE POLICY "Allow anonymous inserts to leads" 
    ON public.leads
    FOR INSERT
    TO public
    WITH CHECK (false); -- Deny all anon inserts, rely on Service Role

-- Secure 'website_audits' table
DROP POLICY IF EXISTS "Anyone can create audits" ON public.website_audits;
DROP POLICY IF EXISTS "Audits can be updated during analysis" ON public.website_audits;

CREATE POLICY "Anyone can create audits"
    ON public.website_audits
    FOR INSERT
    WITH CHECK (false); -- Deny all anon inserts, rely on Service Role

CREATE POLICY "Audits can be updated during analysis"
    ON public.website_audits
    FOR UPDATE
    USING (false); -- Deny all anon updates, rely on Service Role
