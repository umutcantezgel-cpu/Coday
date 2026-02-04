-- Create leads table
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone text,
  company text,
  project text,
  message text,
  budget text,
  timeline text,
  source text default 'contact',
  status text default 'new',
  
  -- Calculator Data
  selected_module_ids text[],
  selected_package_id text,
  total_one_time_cents integer,
  total_monthly_cents integer
);

-- Enable RLS
alter table public.leads enable row level security;

-- Allow inserts from public (anon)
create policy "Enable insert for everyone" 
on public.leads for insert 
with check (true);

-- Allow select only for authenticated users (admin)
create policy "Enable read access for authenticated users only" 
on public.leads for select 
to authenticated 
using (true);
