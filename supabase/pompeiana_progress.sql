-- Cross-device continuity for the Pompeian Novena app.
--
-- ONE ROW PER USER, and it holds exactly where that user is in the novena:
-- which day, and where inside that day they stopped. Nothing else about the
-- prayer is stored server-side.
--
-- Deliberately NOT here (spec §3.4 of the life-panel doc):
--   * `scripture` — the user's own Bible text never leaves the device. Not
--     synced, not backed up, not logged. That rule is why the app was built
--     the way it was and it does not bend for sync.
--   * `lang` / `showTranslit` — device preferences. Praying in Polish on the
--     phone and Latin on the laptop is a feature, not a conflict.
--
-- Signing in is what turns sync on. Signed out, the app still works fully
-- offline from localStorage — a login wall in front of a 54-day novena breaks
-- it on day 12 in a basement with no signal.
--
-- Run once in Supabase -> SQL Editor. Safe to re-run.

create table if not exists public.pompeiana_progress (
  user_id      uuid        primary key references auth.users (id) on delete cascade,
  start_date   date,                                  -- ISO day the novena began
  current_day  smallint    not null default 1,        -- 1..54
  finished     boolean     not null default false,    -- whole novena complete
  step_index   integer     not null default 0,        -- resume position within the day
  rep          integer     not null default 0,        -- bead inside a 3x / 10x counter
  intention    text        not null default '',
  intention_at timestamptz,                           -- last-write-wins clock for `intention`
  rev          integer     not null default 0,        -- explicit position overrides (see js/sync.js)
  updated_at   timestamptz not null default now()
);

-- Day stays in range even if a client sends nonsense.
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'pompeiana_progress_day_check') then
    alter table public.pompeiana_progress
      add constraint pompeiana_progress_day_check
      check (current_day between 1 and 54);
  end if;
end $$;

alter table public.pompeiana_progress enable row level security;

-- Your row, and only ever your row. The anon key is public and ships in the
-- browser, so these four policies are the whole access control story.
drop policy if exists pompeiana_progress_own_select on public.pompeiana_progress;
create policy pompeiana_progress_own_select
  on public.pompeiana_progress
  for select
  using (auth.uid() = user_id);

drop policy if exists pompeiana_progress_own_insert on public.pompeiana_progress;
create policy pompeiana_progress_own_insert
  on public.pompeiana_progress
  for insert
  with check (auth.uid() = user_id);

drop policy if exists pompeiana_progress_own_update on public.pompeiana_progress;
create policy pompeiana_progress_own_update
  on public.pompeiana_progress
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists pompeiana_progress_own_delete on public.pompeiana_progress;
create policy pompeiana_progress_own_delete
  on public.pompeiana_progress
  for delete
  using (auth.uid() = user_id);

-- No grant to `anon`: signed-out clients have no row and no business here.
grant select, insert, update, delete on public.pompeiana_progress to authenticated;
