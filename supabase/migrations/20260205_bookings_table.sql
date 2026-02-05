-- Create bookings table
create table public.bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone text,
  date text not null, -- YYYY-MM-DD
  time_slot text not null, -- HH:MM
  service_type text,
  notes text,
  status text default 'pending', -- pending, confirmed, cancelled
  
  -- Constraint to prevent double booking unique(date, time_slot)
  constraint unique_booking_slot unique (date, time_slot)
);

-- Enable RLS
alter table public.bookings enable row level security;

-- Allow inserts from public (anon) - typically via Edge Function, but potentially direct
create policy "Enable insert for Service Role only" 
on public.bookings for insert 
to service_role 
with check (true);

-- Allow select for Service Role only (Admin)
create policy "Enable access for Service Role only" 
on public.bookings for all
to service_role 
using (true);

-- Allow reading own bookings? (Requires user_id, but here we just use email/public flow)
-- For now, lock it down to Service Role (Edge Function users)
