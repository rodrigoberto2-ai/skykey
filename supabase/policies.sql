-- Skykey - RLS Policies (Fase 1 - T08/T09)
-- Execute após aplicar o schema.sql

-- T08 — RLS para `public.propriedades`
alter table public.propriedades enable row level security;

-- Seleção: apenas registros do owner
drop policy if exists propriedades_select_own on public.propriedades;
create policy propriedades_select_own
on public.propriedades
for select
using (owner_id = auth.uid());

-- Inserção: só permite inserir com owner_id = auth.uid()
drop policy if exists propriedades_insert_own on public.propriedades;
create policy propriedades_insert_own
on public.propriedades
for insert
with check (owner_id = auth.uid());

-- Update: apenas o dono
drop policy if exists propriedades_update_own on public.propriedades;
create policy propriedades_update_own
on public.propriedades
for update
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

-- Delete: apenas o dono
drop policy if exists propriedades_delete_own on public.propriedades;
create policy propriedades_delete_own
on public.propriedades
for delete
using (owner_id = auth.uid());

-- T09 — RLS para `public.reservas`
alter table public.reservas enable row level security;

-- Helper predicate: verifica se a reserva pertence a uma propriedade do usuário autenticado
-- Usamos EXISTS para vincular via FK propriedade_id → propriedades.id

-- SELECT
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

-- INSERT (somente se a propriedade for do usuário)
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

-- UPDATE (somente em reservas do usuário)
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

-- DELETE (somente em reservas do usuário)
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

-- Observações:
-- - auth.uid() requer chamadas autenticadas (client com sessão).
-- - Policies assumem que owner_id está correto no insert/relacionamento.
