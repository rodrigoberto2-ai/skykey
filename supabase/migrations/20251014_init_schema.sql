-- Migration: init_schema (combina schema + policies)
-- Gera tabelas e ativa RLS/policies para propriedades e reservas

-- ============ SCHEMA ============
create extension if not exists "pgcrypto";

create table if not exists public.usuarios (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.propriedades (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  nome text not null,
  endereco text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists propriedades_owner_idx on public.propriedades(owner_id);

create table if not exists public.reservas (
  id uuid primary key default gen_random_uuid(),
  propriedade_id uuid not null references public.propriedades (id) on delete cascade,
  hospede_nome text,
  data_inicio date not null,
  data_fim date not null,
  status text not null default 'pendente' check (status in ('pendente','confirmada','cancelada')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint datas_validas check (data_inicio <= data_fim)
);

create index if not exists reservas_propriedade_idx on public.reservas(propriedade_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists propriedades_set_updated_at on public.propriedades;
create trigger propriedades_set_updated_at
before update on public.propriedades
for each row execute function public.set_updated_at();

drop trigger if exists reservas_set_updated_at on public.reservas;
create trigger reservas_set_updated_at
before update on public.reservas
for each row execute function public.set_updated_at();

-- ============ RLS / POLICIES ============
alter table public.propriedades enable row level security;

drop policy if exists propriedades_select_own on public.propriedades;
create policy propriedades_select_own
on public.propriedades
for select
using (owner_id = auth.uid());

drop policy if exists propriedades_insert_own on public.propriedades;
create policy propriedades_insert_own
on public.propriedades
for insert
with check (owner_id = auth.uid());

drop policy if exists propriedades_update_own on public.propriedades;
create policy propriedades_update_own
on public.propriedades
for update
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

drop policy if exists propriedades_delete_own on public.propriedades;
create policy propriedades_delete_own
on public.propriedades
for delete
using (owner_id = auth.uid());

alter table public.reservas enable row level security;

drop policy if exists reservas_select_own on public.reservas;
create policy reservas_select_own
on public.reservas
for select
using (
  exists (
    select 1 from public.propriedades p
    where p.id = propriedade_id and p.owner_id = auth.uid()
  )
);

drop policy if exists reservas_insert_own on public.reservas;
create policy reservas_insert_own
on public.reservas
for insert
with check (
  exists (
    select 1 from public.propriedades p
    where p.id = propriedade_id and p.owner_id = auth.uid()
  )
);

drop policy if exists reservas_update_own on public.reservas;
create policy reservas_update_own
on public.reservas
for update
using (
  exists (
    select 1 from public.propriedades p
    where p.id = propriedade_id and p.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.propriedades p
    where p.id = propriedade_id and p.owner_id = auth.uid()
  )
);

drop policy if exists reservas_delete_own on public.reservas;
create policy reservas_delete_own
on public.reservas
for delete
using (
  exists (
    select 1 from public.propriedades p
    where p.id = propriedade_id and p.owner_id = auth.uid()
  )
);
