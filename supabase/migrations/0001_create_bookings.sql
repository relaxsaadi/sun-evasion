-- Sun Evasion — Bookings table
create table if not exists public.bookings (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  -- Client info
  name        text not null,
  phone       text not null,
  email       text,

  -- Voyage
  package_id   text,
  package_name text,
  departure_date date,
  passengers  integer default 1,
  message     text,

  -- CRM
  status      text not null default 'pending' check (status in ('pending', 'contacted', 'confirmed', 'cancelled')),
  notes       text
);

-- Enable Row Level Security
alter table public.bookings enable row level security;

-- Allow insert from anon (public form submissions)
create policy "Allow insert bookings"
  on public.bookings for insert
  with check (true);

-- Only service role can read
create policy "Service role can read bookings"
  on public.bookings for select
  using (auth.role() = 'service_role');
