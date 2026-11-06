-- Smart Vote DEMO schema for Supabase (PostgreSQL)
-- Run in Supabase SQL Editor. This is a learning/demo schema, not certified election infrastructure.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'Voter' check (role in ('Voter','Admin','Super Admin','Election Manager','Auditor','Support Manager')),
  created_at timestamptz not null default now()
);

create table if not exists public.elections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  start_date date not null,
  end_date date not null,
  status text not null default 'Upcoming' check (status in ('Draft','Upcoming','Active','Completed','Cancelled')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  check (end_date >= start_date)
);

create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  election_id uuid not null references public.elections(id) on delete cascade,
  name text not null,
  group_name text,
  created_at timestamptz not null default now()
);

-- Identity receipt and anonymous ballot are separate. No voter id is stored in ballots.
create table if not exists public.demo_vote_receipts (
  id uuid primary key default gen_random_uuid(),
  voter_id uuid not null references auth.users(id) on delete cascade,
  election_id uuid not null references public.elections(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(voter_id,election_id)
);
create table if not exists public.demo_ballots (
  id uuid primary key default gen_random_uuid(),
  election_id uuid not null references public.elections(id) on delete cascade,
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.profiles where id=auth.uid() and role in ('Admin','Super Admin')) $$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public
as $$
begin
  insert into public.profiles(id,full_name) values(new.id, coalesce(new.raw_user_meta_data->>'full_name',''));
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.elections enable row level security;
alter table public.candidates enable row level security;
alter table public.demo_vote_receipts enable row level security;
alter table public.demo_ballots enable row level security;

create policy "profile self read" on public.profiles for select to authenticated using (id=auth.uid() or public.is_admin());
create policy "profile self update" on public.profiles for update to authenticated using (id=auth.uid()) with check (id=auth.uid());
create policy "elections visible to signed in" on public.elections for select to authenticated using (true);
create policy "admins manage elections" on public.elections for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "candidates visible to signed in" on public.candidates for select to authenticated using (true);
create policy "admins manage candidates" on public.candidates for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "voter reads own receipt" on public.demo_vote_receipts for select to authenticated using (voter_id=auth.uid() or public.is_admin());
create policy "ballots aggregate only" on public.demo_ballots for select to authenticated using (public.is_admin());

create or replace function public.submit_demo_ballot(p_election_id uuid,p_candidate_id uuid)
returns void language plpgsql security definer set search_path=public
as $$
begin
  if auth.uid() is null then raise exception 'Please sign in first'; end if;
  if not exists(select 1 from public.elections where id=p_election_id and status='Active' and current_date between start_date and end_date) then
    raise exception 'Election is not currently active';
  end if;
  if not exists(select 1 from public.candidates where id=p_candidate_id and election_id=p_election_id) then
    raise exception 'Candidate does not belong to this election';
  end if;
  insert into public.demo_vote_receipts(voter_id,election_id) values(auth.uid(),p_election_id);
  insert into public.demo_ballots(election_id,candidate_id) values(p_election_id,p_candidate_id);
end $$;
revoke all on function public.submit_demo_ballot(uuid,uuid) from public;
grant execute on function public.submit_demo_ballot(uuid,uuid) to authenticated;

create or replace view public.demo_result_totals as
select election_id,candidate_id,count(*)::bigint as total_votes
from public.demo_ballots group by election_id,candidate_id;
grant select on public.demo_result_totals to authenticated;

-- After creating your account, promote your own profile to Admin manually:
-- update public.profiles set role='Super Admin' where id='YOUR_AUTH_USER_UUID';
-- Add a demo election and candidates through Supabase Table Editor.
-- Important: configure the frontend's selected election ID to an active election for RPC voting.
