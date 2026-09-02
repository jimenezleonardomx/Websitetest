-- Every table starts here, never in the dashboard SQL editor.
-- Create a new numbered file per change; migrations are append-only.
--
--   supabase migration new <name>   -- scaffold the next file
--   supabase db reset               -- rebuild local DB from all migrations
--   supabase db push                -- apply to the hosted project

create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 60),
  avatar_url   text,
  created_at   timestamptz not null default now()
);

-- RLS on, always. A table without policies is a table nobody can read,
-- which is the safe failure mode.
alter table public.profiles enable row level security;

create policy "profiles are readable by everyone"
  on public.profiles for select
  using (true);

create policy "users insert their own profile"
  on public.profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

create policy "users update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);
