-- Skykey - Schema mínimo (Fase 1 - T07)
-- Execute no SQL Editor do Supabase (projeto selecionado)

-- Extensões úteis (Supabase já costuma ter pgcrypto disponível)
create extension if not exists "pgcrypto";

-- Tabela de perfis de usuário (vinculada ao auth.users)
create table if not exists public.usuarios (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Propriedades
create table if not exists public.propriedades (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  nome text not null,
  endereco text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists propriedades_owner_idx on public.propriedades(owner_id);

-- Reservas
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

-- gatilhos simples de updated_at (opcional)
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

-- Observação: RLS e policies serão adicionadas nas tarefas T08 e T09.

