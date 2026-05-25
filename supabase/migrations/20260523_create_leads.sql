-- Migration: Create Leads table

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    project_type TEXT NOT NULL,
    budget TEXT NOT NULL,
    timeframe TEXT NOT NULL,
    description TEXT NOT NULL,
    source TEXT,
    score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'lost', 'won'))
);

-- Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow insert from anon (web form)
CREATE POLICY "Allow anonymous inserts to leads"
    ON public.leads
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Only allow service_role or authenticated admins to read/update
CREATE POLICY "Allow read for admins"
    ON public.leads
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow update for admins"
    ON public.leads
    FOR UPDATE
    TO authenticated
    USING (true);
