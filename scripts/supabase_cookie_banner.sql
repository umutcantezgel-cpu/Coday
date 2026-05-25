-- Create the consent_logs table for GDPR compliance auditing
CREATE TABLE IF NOT EXISTS public.consent_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    consent_marketing BOOLEAN NOT NULL DEFAULT false,
    consent_statistics BOOLEAN NOT NULL DEFAULT false,
    consent_functional BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_agent TEXT,
    ip_anonymized TEXT
);

-- Enable Row Level Security
ALTER TABLE public.consent_logs ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (users don't need to be logged in to save consent)
CREATE POLICY "Allow anonymous inserts for consent logs" ON public.consent_logs
    FOR INSERT
    TO public, anon
    WITH CHECK (true);

-- Only admins/service roles can read the logs
CREATE POLICY "Deny anonymous reads" ON public.consent_logs
    FOR SELECT
    TO anon, public
    USING (false);

-- Index for querying by session_id
CREATE INDEX IF NOT EXISTS consent_logs_session_id_idx ON public.consent_logs (session_id);
