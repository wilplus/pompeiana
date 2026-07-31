-- Shared Bible texts for the Pompeian Novena app.
-- Everyone can READ; only the admin email may WRITE (enforced by RLS here,
-- so it holds even though the app runs client-side with the public anon key).
-- Run once in Supabase → SQL Editor. Safe to re-run.

create table if not exists public.pompeiana_scripture (
  mystery_id text        not null,
  lang       text        not null,
  text       text        not null default '',
  updated_by text,
  updated_at timestamptz not null default now(),
  primary key (mystery_id, lang)
);

alter table public.pompeiana_scripture enable row level security;

-- Anyone (even signed-out) may read the shared texts.
drop policy if exists pompeiana_scripture_read on public.pompeiana_scripture;
create policy pompeiana_scripture_read
  on public.pompeiana_scripture
  for select
  using (true);

-- Only the admin account may insert.
drop policy if exists pompeiana_scripture_admin_insert on public.pompeiana_scripture;
create policy pompeiana_scripture_admin_insert
  on public.pompeiana_scripture
  for insert
  with check ((auth.jwt() ->> 'email') = 'artur@willonski.com');

-- Only the admin account may update.
drop policy if exists pompeiana_scripture_admin_update on public.pompeiana_scripture;
create policy pompeiana_scripture_admin_update
  on public.pompeiana_scripture
  for update
  using ((auth.jwt() ->> 'email') = 'artur@willonski.com')
  with check ((auth.jwt() ->> 'email') = 'artur@willonski.com');

-- Only the admin account may delete.
drop policy if exists pompeiana_scripture_admin_delete on public.pompeiana_scripture;
create policy pompeiana_scripture_admin_delete
  on public.pompeiana_scripture
  for delete
  using ((auth.jwt() ->> 'email') = 'artur@willonski.com');

grant select on public.pompeiana_scripture to anon, authenticated;
grant insert, update, delete on public.pompeiana_scripture to authenticated;
