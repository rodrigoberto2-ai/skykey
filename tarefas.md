```markdown
# Plano Granular de Construção do MVP — Skykey (Next.js + Supabase)

**Objetivo do MVP:**  
Autenticação básica, criação/visualização de propriedades e reservas (CRUD mínimo), listagem no dashboard, e placeholders para integrações (AvaiBook/Homeit) e webhooks — tudo com RLS ativa, testes e deploy.

> **Formato de cada tarefa**  
> **ID** · **Título**  
> **Escopo:** o que fazer (1 problema).  
> **Entrada:** arquivos/variáveis pré-existentes.  
> **Saída:** arquivos/artefatos alterados/criados.  
> **DoD:** critérios de aceite verificáveis.  
> **Teste rápido:** como validar (manual ou comando).

---

## 🟦 Fase 0 — Preparação do Repositório

**T01 · Inicializar projeto Next.js**
- **Escopo:** criar app Next.js 14 com App Router e TS.
- **Entrada:** Node 18+, npm.
- **Saída:** `/skykey` com `package.json`, `app/`.
- **DoD:** `npm run dev` serve `/` em `http://localhost:3000`.
- **Teste rápido:** abrir homepage “Next.js” default.

**T02 · Configurar Tailwind**
- **Escopo:** instalar e configurar Tailwind.
- **Entrada:** projeto Next.js.
- **Saída:** `tailwind.config.ts`, `globals.css` com diretivas.
- **DoD:** classes utilitárias funcionando em `app/page.tsx`.
- **Teste rápido:** renderizar `<div className="text-xl">`.

**T03 · Adicionar shadcn/ui**
- **Escopo:** instalar CLI e adicionar 1 componente (ex: Button).
- **Entrada:** Tailwind ok.
- **Saída:** pasta `components/ui`, config shadcn.
- **DoD:** `<Button>` renderiza na home.
- **Teste rápido:** botão visível na `/`.

**T04 · Estrutura inicial de pastas**
- **Escopo:** criar pastas vazias conforme arquitetura.
- **Entrada:** repo.
- **Saída:** `components/`, `services/`, `store/`, `lib/`, `types/`, `app/(auth)`, `app/dashboard`.
- **DoD:** estrutura commitada.
- **Teste rápido:** `tree` mostra pastas.

---

## 🟩 Fase 1 — Supabase (Cliente, Auth, DB)

**T05 · Instalar SDK Supabase**
- **Escopo:** `@supabase/supabase-js`.
- **Entrada:** repo.
- **Saída:** dependência instalada.
- **DoD:** `lib/supabaseClient.ts` exporta `createClient`.
- **Teste rápido:** importar cliente em `app/page.tsx` sem erro de build.

**T06 · Variáveis de ambiente**
- **Escopo:** `.env.local` com `NEXT_PUBLIC_SUPABASE_URL/ANON_KEY`.
- **Entrada:** credenciais Supabase.
- **Saída:** arquivo `.env.local`.
- **DoD:** build sem erro de env.
- **Teste rápido:** `console.log` em server side não quebra.

**T07 · Schema mínimo no Supabase (SQL)**
- **Escopo:** criar tabelas `usuarios` (perfil), `propriedades`, `reservas`.
- **Entrada:** SQL migration.
- **Saída:** migração aplicada.
- **DoD:** tabelas visíveis no dashboard Supabase.
- **Teste rápido:** inserir 1 linha manualmente.

**T08 · Políticas RLS — `propriedades`**
- **Escopo:** ativar RLS + policy por `auth.uid()`.
- **Entrada:** tabela criada.
- **Saída:** 1 policy SELECT/INSERT/UPDATE/DELETE por owner_id.
- **DoD:** usuário só enxerga seus registros.
- **Teste rápido:** 2 usuários → cada um vê apenas seus dados.

**T09 · Políticas RLS — `reservas`**
- **Escopo:** RLS + policy por `owner_id` (via FK `propriedade.owner_id`).
- **Entrada:** tabela criada.
- **Saída:** policies consistentes.
- **DoD:** acesso restrito ao dono.
- **Teste rápido:** tentativa de acesso cruzado bloqueada.

**T10 · Seed de dados (dev)**
- **Escopo:** script SQL ou `.sql` com 1 propriedade e 1 reserva dummy.
- **Entrada:** SQL.
- **Saída:** dados de exemplo.
- **DoD:** SELECT retorna linhas.
- **Teste rápido:** listar no Supabase Studio.

---

## 🟨 Fase 2 — Autenticação (UI + Sessão)

**T11 · Rotas (auth): login e register**
- **Escopo:** `app/(auth)/login/page.tsx` e `register/page.tsx`.
- **Entrada:** shadcn Button/Input.
- **Saída:** formulários simples (email/senha).
- **DoD:** telas renderizam.
- **Teste rápido:** acessar `/login` e `/register`.

**T12 · Ações Supabase: signUp/signIn**
- **Escopo:** conectar formulários ao Supabase Auth.
- **Entrada:** `lib/supabaseClient.ts`.
- **Saída:** handlers client-side com feedback.
- **DoD:** criar usuário e logar.
- **Teste rápido:** registrar, redirecionar para `/dashboard`.

**T13 · Sessão server-side**
- **Escopo:** obter sessão no layout do dashboard (server component).
- **Entrada:** cookies/headers.
- **Saída:** `app/dashboard/layout.tsx` com guard.
- **DoD:** redireciona anônimos para `/login`.
- **Teste rápido:** sessão expirada → redirect.

**T14 · Botão “Logout”**
- **Escopo:** ação de signOut.
- **Entrada:** sessão ativa.
- **Saída:** item no header/sidebar.
- **DoD:** limpar sessão e enviar para `/login`.
- **Teste rápido:** clicar e validar.

---

## 🟧 Fase 3 — Dashboard (Shell + Navegação)

**T15 · Layout do dashboard**
- **Escopo:** sidebar + header minimalistas.
- **Entrada:** Tailwind.
- **Saída:** `app/dashboard/layout.tsx`.
- **DoD:** navegação para `reservas/`, `propriedades/`, `relatorios/`, `config/`.
- **Teste rápido:** links funcionam (páginas vazias).

**T16 · Página `/dashboard` (overview)**
- **Escopo:** cards placeholder (reservas, ocupação).
- **Entrada:** shadcn cards.
- **Saída:** `app/dashboard/page.tsx`.
- **DoD:** página carrega sem erros.
- **Teste rápido:** ver 2+ cards.

---

## 🟥 Fase 4 — Propriedades (CRUD)

**T17 · Tipos TS para Propriedade**
- **Escopo:** `types/propriedade.ts`.
- **Entrada:** schema SQL.
- **Saída:** `Propriedade` interface.
- **DoD:** tipagem usada no front.
- **Teste rápido:** sem `any` no módulo.

**T18 · API route: GET /api/propriedades**
- **Escopo:** `app/api/propriedades/route.ts` (GET).
- **Entrada:** supabase server client.
- **Saída:** lista propriedades do usuário.
- **DoD:** 200 + JSON com array.
- **Teste rápido:** `curl` retorna itens seed.

**T19 · API route: POST /api/propriedades**
- **Escopo:** criar propriedade (nome/endereço).
- **Entrada:** body JSON validado.
- **Saída:** objeto criado.
- **DoD:** 201 + JSON.
- **Teste rápido:** `curl` POST cria e persiste.

**T20 · API route: PATCH /api/propriedades**
- **Escopo:** atualizar (por id).
- **Entrada:** `id`, campos parciais.
- **Saída:** objeto atualizado.
- **DoD:** 200 + JSON atualizado.
- **Teste rápido:** alterar nome e confirmar.

**T21 · API route: DELETE /api/propriedades**
- **Escopo:** deletar por `id`.
- **Entrada:** query/body com `id`.
- **Saída:** 204.
- **DoD:** registro removido.
- **Teste rápido:** apagar e listar novamente.

**T22 · UI: Listagem de Propriedades**
- **Escopo:** tabela com paginação mínima.
- **Entrada:** GET API.
- **Saída:** `app/dashboard/propriedades/page.tsx`.
- **DoD:** renderiza dados reais.
- **Teste rápido:** seed aparece na tabela.

**T23 · UI: Criar Propriedade (Form)**
- **Escopo:** modal/form simples.
- **Entrada:** POST API.
- **Saída:** componente `components/forms/PropriedadeForm.tsx`.
- **DoD:** criar sem refresh da página.
- **Teste rápido:** criar e ver na lista.

**T24 · UI: Editar/Excluir Propriedade**
- **Escopo:** botões “Editar”/“Excluir”.
- **Entrada:** PATCH/DELETE API.
- **Saída:** inline actions na listagem.
- **DoD:** atualizar e remover em tempo real.
- **Teste rápido:** editar nome, apagar item.

---

## 🟪 Fase 5 — Reservas (CRUD + Relacionamento)

**T25 · Tipos TS para Reserva**
- **Escopo:** `types/reserva.ts`.
- **Entrada:** schema SQL.
- **Saída:** interface `Reserva`.
- **DoD:** tipagem sem `any`.
- **Teste rápido:** build ok.

**T26 · API: GET /api/reservas**
- **Escopo:** listar reservas do usuário (join propriedade).
- **Entrada:** supabase query.
- **Saída:** array com campos principais.
- **DoD:** 200 + JSON.
- **Teste rápido:** `curl` retorna seed.

**T27 · API: POST /api/reservas**
- **Escopo:** criar reserva (FK propriedade).
- **Entrada:** validação datas (início < fim).
- **Saída:** 201 + JSON criado.
- **DoD:** rejeita datas inválidas.
- **Teste rápido:** tentar datas invertidas → 400.

**T28 · API: PATCH /api/reservas**
- **Escopo:** atualizar status ou datas.
- **Entrada:** `id`.
- **Saída:** 200 + JSON atualizado.
- **DoD:** persistência ok.
- **Teste rápido:** mudar status para “confirmada”.

**T29 · API: DELETE /api/reservas**
- **Escopo:** deletar por `id`.
- **Entrada:** id.
- **Saída:** 204.
- **DoD:** registro removido.
- **Teste rápido:** remover no `curl` e conferir listagem.

**T30 · UI: Listagem de Reservas**
- **Escopo:** tabela com filtros simples (status, propriedade).
- **Entrada:** GET API.
- **Saída:** `app/dashboard/reservas/page.tsx`.
- **DoD:** render com filtros funcionais.
- **Teste rápido:** filtrar por propriedade.

**T31 · UI: Criar Reserva (Form)**
- **Escopo:** form com seleção de propriedade e datas.
- **Entrada:** POST API.
- **Saída:** `components/forms/ReservaForm.tsx`.
- **DoD:** criação com validação de datas.
- **Teste rápido:** criar reserva válida → aparece na lista.

**T32 · UI: Detalhe de Reserva**
- **Escopo:** `app/dashboard/reservas/[id]/page.tsx`.
- **Entrada:** GET por id.
- **Saída:** visualizar dados e alterar status.
- **DoD:** update inline do status.
- **Teste rápido:** marcar como “check-in enviado”.

---

## 🟫 Fase 6 — Estado, Hooks e UX

**T33 · Store: userStore**
- **Escopo:** Zustand para dados do usuário logado.
- **Entrada:** sessão Supabase.
- **Saída:** `store/userStore.ts`.
- **DoD:** `getUser()` disponível globalmente.
- **Teste rápido:** ler user no header.

**T34 · Hook `useAuth`**
- **Escopo:** consolidar acesso à sessão e eventos auth.
- **Entrada:** supabase client.
- **Saída:** `hooks/useAuth.ts`.
- **DoD:** expõe `user`, `signIn`, `signOut`.
- **Teste rápido:** consumir no login/logout.

**T35 · Hook `useFetch` (SWR)**
- **Escopo:** util genérico GET/POST/PATCH/DELETE.
- **Entrada:** fetch API.
- **Saída:** `hooks/useFetch.ts`.
- **DoD:** revalidação automática.
- **Teste rápido:** lista de propriedades revalida após criação.

**T36 · Toasts/Feedback de erro**
- **Escopo:** mostrar erros de API.
- **Entrada:** shadcn Toast (ou Sonner).
- **Saída:** provider + hook.
- **DoD:** erro 400/500 apresenta toast.
- **Teste rápido:** forçar erro de validação.

---

## 🟦 Fase 7 — Webhooks & Integrações (Placeholders)

**T37 · Endpoint webhook AvaiBook**
- **Escopo:** `app/api/webhooks/avaibook/route.ts` (POST).
- **Entrada:** assinatura simples (placeholder).
- **Saída:** loga evento e retorna 200.
- **DoD:** recebe JSON e persiste em tabela `webhook_logs`.
- **Teste rápido:** `curl` com payload de teste.

**T38 · Endpoint webhook Homeit**
- **Escopo:** `app/api/webhooks/homeit/route.ts` (POST).
- **Entrada:** idem.
- **Saída:** idem.
- **DoD:** armazenamento no `webhook_logs`.
- **Teste rápido:** `curl` de teste.

**T39 · Serviço `integracaoService.ts` (stubs)**
- **Escopo:** criar funções stub `syncReservasFromAvaiBook`, `criarChaveHomeit`.
- **Entrada:** services folder.
- **Saída:** funções exportadas (sem chamadas reais).
- **DoD:** chamadas retornam `Promise.resolve` com objeto simulado.
- **Teste rápido:** importar e usar no detalhe da reserva (botão “Simular chave”).

**T40 · Ação: “Simular Geração de Chave”**
- **Escopo:** botão no detalhe da reserva que chama `criarChaveHomeit()`.
- **Entrada:** reserva id.
- **Saída:** snackbar com “Chave gerada (simulada)”.
- **DoD:** estado da reserva muda para `key_generated=true`.
- **Teste rápido:** clicar e ver atualização.

---

## 🟩 Fase 8 — Relatórios (MVP Placeholder)

**T41 · Serviço `relatorioService.ts` (ocupação simples)**
- **Escopo:** calcular ocupação = reservas_confirmadas / quartos_dias.
- **Entrada:** `reservas`, `propriedades`.
- **Saída:** função `getKPIsBasicos(userId)`.
- **DoD:** retorna objeto `{ ocupacaoMensal }`.
- **Teste rápido:** mockar dados e validar cálculo.

**T42 · UI `/dashboard/relatorios` (cards)**
- **Escopo:** exibir KPIs básicos do serviço.
- **Entrada:** `relatorioService`.
- **Saída:** página com 2–3 métricas.
- **DoD:** render dinâmico (SSR).
- **Teste rápido:** alterar seed e ver números mudarem.

---

## 🟨 Fase 9 — Configurações

**T43 · Página `/dashboard/config`**
- **Escopo:** inputs para chaves `AVAIBOOK_API_KEY`, `HOMEIT_API_KEY` (somente exibição/salvar no banco).
- **Entrada:** tabela `config_integracoes`.
- **Saída:** form simples com salvar.
- **DoD:** persiste valores por user.
- **Teste rápido:** salvar e recarregar.

**T44 · RLS `config_integracoes`**
- **Escopo:** policies por `user_id`.
- **Entrada:** tabela criada.
- **Saída:** SELECT/UPSERT restritos.
- **DoD:** usuário só acessa sua config.
- **Teste rápido:** validação com 2 usuários.

---

## 🟧 Fase 10 — Qualidade (Testes, Lint, Tipos)

**T45 · ESLint + Prettier**
- **Escopo:** config mínima e script `lint`.
- **Entrada:** `package.json`.
- **Saída:** `.eslintrc`, `.prettierrc`.
- **DoD:** `npm run lint` sem erros críticos.
- **Teste rápido:** executar script.

**T46 · Teste unitário do `relatorioService`**
- **Escopo:** Jest + 2 cenários (0/100% ocupação).
- **Entrada:** serviço implementado.
- **Saída:** `__tests__/relatorioService.test.ts`.
- **DoD:** testes passam.
- **Teste rápido:** `npm test`.

**T47 · Teste E2E: fluxo auth + criar propriedade**
- **Escopo:** Playwright: register → login → criar propriedade.
- **Entrada:** rotas prontas.
- **Saída:** `e2e/auth-propriedade.spec.ts`.
- **DoD:** passa localmente.
- **Teste rápido:** `npx playwright test`.

**T48 · Teste E2E: criar reserva**
- **Escopo:** fluxo criar reserva válida.
- **Entrada:** página de reservas.
- **Saída:** `e2e/criar-reserva.spec.ts`.
- **DoD:** passa localmente.
- **Teste rápido:** executar spec.

---

## 🟥 Fase 11 — Deploy

**T49 · Deploy Vercel (Frontend)**
- **Escopo:** conectar repo e setar envs públicas.
- **Entrada:** `NEXT_PUBLIC_SUPABASE_*`.
- **Saída:** preview URL.
- **DoD:** home e login abrem no preview.
- **Teste rápido:** abrir preview no navegador.

**T50 · Configurar Supabase Prod**
- **Escopo:** criar projeto prod, aplicar schema e RLS.
- **Entrada:** SQL migrations.
- **Saída:** DB prod com mesmas tabelas/policies.
- **DoD:** `SELECT` funciona e RLS ativo.
- **Teste rápido:** inserir linha de teste.

**T51 · Env Vercel (prod)**
- **Escopo:** `NEXT_PUBLIC_SUPABASE_URL/ANON_KEY` (prod).
- **Entrada:** credenciais.
- **Saída:** envs salvas.
- **DoD:** app conecta no prod.
- **Teste rápido:** registrar usuário novo em prod.

---

## 🟪 Fase 12 — End Polimento do MVP

**T52 · Loading/Skeletons**
- **Escopo:** adicionar `loading.tsx` nas rotas críticas.
- **Entrada:** páginas dashboard.
- **Saída:** UX responsiva.
- **DoD:** skeleton aparece em fetches.
- **Teste rápido:** throttling no DevTools.

**T53 · Empty States**
- **Escopo:** mensagens quando listas vazias.
- **Entrada:** listagens de propriedades/reservas.
- **Saída:** componentes de empty state.
- **DoD:** UI clara sem dados.
- **Teste rápido:** criar user com 0 itens.

**T54 · Erros padrão (route handlers)**
- **Escopo:** respostas JSON consistentes `{error, code}`.
- **Entrada:** handlers de API.
- **Saída:** util `jsonError()`.
- **DoD:** todos handlers padronizados.
- **Teste rápido:** forçar 400 e ver payload.

**T55 · Segurança de headers**
- **Escopo:** `next.config.js` com headers básicos (CSP simples, nosniff).
- **Entrada:** config Next.
- **Saída:** headers em produção.
- **DoD:** resposta inclui headers.
- **Teste rápido:** `curl -I` mostra cabeçalhos.

---

## ✅ Critérios de Conclusão do MVP
- Login/registro/logout funcionam (RLS ativo).  
- CRUD de **Propriedades** completo via UI + API.  
- CRUD de **Reservas** básico (datas validadas, status editável).  
- Dashboard com KPIs simples (ocupação).  
- Páginas de **Config** salvam chaves por usuário (RLS).  
- Webhooks de **AvaiBook** e **Homeit** recebem e logam eventos.  
- Testes mínimos: 1 unitário + 2 E2E passando.  
- Deploy ativo na Vercel conectado a Supabase Prod.

---
```
