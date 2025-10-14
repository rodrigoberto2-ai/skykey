-- Skykey - Seed de dados (Fase 1 - T10)
-- Execute após aplicar schema.sql e policies.sql
-- Este script escolhe automaticamente o primeiro usuário existente em auth.users
-- para ser o dono (owner_id) dos registros de seed.

do $$
declare
  v_owner uuid;
  v_prop_id uuid := gen_random_uuid();
  v_res_id uuid := gen_random_uuid();
begin
  -- tenta obter um usuário existente
  select id into v_owner
  from auth.users
  order by created_at asc
  limit 1;

  if v_owner is null then
    raise exception 'Nenhum usuário encontrado em auth.users. Crie um usuário (sign up) antes de rodar o seed.';
  end if;

  -- upsert de perfil
  insert into public.usuarios as u (id, full_name, avatar_url)
  values (v_owner, 'Usuário Demo', null)
  on conflict (id) do update set full_name = excluded.full_name;

  -- insere propriedade demo, evita duplicar pelo nome do mesmo owner
  if not exists (
    select 1 from public.propriedades p
    where p.owner_id = v_owner and p.nome = 'Apartamento Central'
  ) then
    insert into public.propriedades (id, owner_id, nome, endereco)
    values (v_prop_id, v_owner, 'Apartamento Central', 'Rua Exemplo, 123, Centro');
  else
    -- reaproveita id da existente
    select id into v_prop_id from public.propriedades
    where owner_id = v_owner and nome = 'Apartamento Central'
    limit 1;
  end if;

  -- insere reserva demo se não existir uma sobreposta nas mesmas datas
  if not exists (
    select 1 from public.reservas r
    where r.propriedade_id = v_prop_id
      and r.data_inicio = date_trunc('day', now())::date + 7
      and r.data_fim = date_trunc('day', now())::date + 10
  ) then
    insert into public.reservas (id, propriedade_id, hospede_nome, data_inicio, data_fim, status)
    values (
      v_res_id,
      v_prop_id,
      'Convidado Demo',
      date_trunc('day', now())::date + 7,
      date_trunc('day', now())::date + 10,
      'confirmada'
    );
  end if;

  raise notice 'Seed aplicado com sucesso para owner_id=%', v_owner;
end $$;

