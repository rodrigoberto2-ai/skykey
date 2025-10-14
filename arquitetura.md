# 🏗️ Arquitetura do Projeto Skykey

## 📘 Visão Geral

O projeto **Skykey** é um sistema de gestão de hospedagens com reservas automáticas, integração com plataformas (AvaiBook, Homeit, Airbnb, Booking), e um painel web responsivo para administração e comunicação com hóspedes.

A aplicação é composta por:
- **Front-end:** Next.js 14 (React, Server Components, App Router)
- **Back-end:** Supabase (PostgreSQL + Auth + Edge Functions)
- **Integrações externas:** AvaiBook API, Homeit API
- **Hospedagem:** Vercel (front) e Supabase Cloud (dados e funções)
- **Design System:** TailwindCSS + shadcn/ui

---

## 🧩 Estrutura de Pastas

/skykey
│
├── app/ # App Router do Next.js (rotas, páginas e layouts)
│ ├── layout.tsx # Layout principal (header, sidebar, etc.)
│ ├── page.tsx # Página inicial / landing page
│ ├── dashboard/ # Área autenticada do painel de controle
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ ├── reservas/ # Módulo de reservas
│ │ │ ├── page.tsx
│ │ │ ├── [id]/page.tsx # Detalhes da reserva
│ │ ├── propriedades/ # Gestão de propriedades
│ │ │ ├── page.tsx
│ │ ├── relatórios/
│ │ │ ├── page.tsx # Indicadores e gráficos
│ │ └── config/
│ │ ├── page.tsx # Configurações (integrações, perfis)
│ │
│ ├── api/ # Rotas de API (Next.js Server Actions / Route Handlers)
│ │ ├── reservas/
│ │ │ ├── route.ts # CRUD de reservas
│ │ ├── propriedades/
│ │ │ ├── route.ts
│ │ ├── webhooks/
│ │ │ ├── avaibook.ts # Integração com AvaiBook
│ │ │ └── homeit.ts # Integração com Homeit
│ │
│ └── (auth)/
│ ├── login/page.tsx
│ ├── register/page.tsx
│ ├── reset-password/page.tsx
│
├── components/ # Componentes reutilizáveis
│ ├── ui/ # Baseados em shadcn/ui
│ ├── charts/ # Gráficos e dashboards
│ ├── forms/ # Formulários reutilizáveis
│ └── layout/ # Cabeçalho, barra lateral, modais
│
├── hooks/ # React hooks customizados
│ ├── useAuth.ts # Hook de autenticação Supabase
│ ├── useReserva.ts # Estado e ações de reserva
│ └── useFetch.ts # Fetch genérico com SWR ou React Query
│
├── lib/ # Serviços e utilitários globais
│ ├── supabaseClient.ts # Cliente inicializado do Supabase
│ ├── apiClient.ts # Conexões externas (AvaiBook, Homeit)
│ ├── constants.ts # Constantes e chaves de integração
│ ├── utils.ts # Funções utilitárias
│ └── schema.ts # Tipos TypeScript para o banco
│
├── services/ # Camada de domínio (regras de negócio)
│ ├── reservaService.ts # Criação, atualização e sincronização de reservas
│ ├── propriedadeService.ts # CRUD de propriedades
│ ├── relatorioService.ts # Geração de relatórios e métricas
│ ├── notificacaoService.ts # Envio de mensagens automáticas
│ └── integracaoService.ts # Lógica de integração com APIs externas
│
├── store/ # Estado global (Zustand ou Redux Toolkit)
│ ├── userStore.ts
│ ├── reservaStore.ts
│ └── uiStore.ts
│
├── styles/
│ ├── globals.css
│ └── tailwind.config.js
│
├── types/
│ ├── reserva.ts
│ ├── propriedade.ts
│ ├── user.ts
│ └── integracao.ts
│
├── .env.local # Variáveis de ambiente (API keys, URLs)
├── package.json
├── tsconfig.json
└── README.md



## ⚙️ Fluxo de Funcionamento

### 1. Autenticação
- Gerenciada pelo **Supabase Auth (JWT)**.
- Usuários podem registrar, logar ou redefinir senha.
- Sessão persistida no navegador via cookies HttpOnly.

### 2. Banco de Dados
- PostgreSQL hospedado no Supabase.
- Tabelas principais:
  - `usuarios`
  - `propriedades`
  - `reservas`
  - `relatorios`
  - `config_integracoes` (tokens, API keys, etc.)
- Segurança via Row-Level Security (RLS) no Supabase.

### 3. API Layer
- Roteamento via `/app/api/...` (Next.js Route Handlers).
- Ações críticas (como sincronizar reservas) usam **Edge Functions** no Supabase (em TypeScript) para reduzir latência.

### 4. Integrações
- **AvaiBook API**: sincronização de reservas, disponibilidade e preços.
- **Homeit API**: geração automática de chaves digitais no check-in.
- **Webhook endpoints** recebem notificações externas e atualizam o banco.

### 5. Estado e Dados
- **Zustand** para estado global (usuário, UI, filtros, cache local).
- **SWR / React Query** para requisições e cache de dados assíncronos.
- **Server Components (Next.js)** para SSR e otimização de SEO.

### 6. UI / UX
- **TailwindCSS + shadcn/ui** como base visual.
- Componentes desacoplados e tipados com TypeScript.
- Gráficos com **Recharts**.
- Modo escuro/claro com persistência local.

### 7. Segurança
- `.env.local` protegido e não versionado.
- Tokens das integrações armazenados com **Supabase Vault**.
- RLS + Policies para cada tabela.
- HTTPS obrigatório (Vercel + Supabase).

---

## 🧠 Lógica de Domínio

### Reservas
- Criadas manualmente ou via sincronização com AvaiBook.
- Ao confirmar uma reserva → dispara webhook → Homeit gera chave → envia mensagem automática de boas-vindas.

### Relatórios
- Gerados sob demanda via `relatorioService.ts`.
- Cálculos de custo, ocupação, rentabilidade e alertas automáticos.

### Mensagens Automáticas
- Configuradas no `notificacaoService.ts`.
- Templates armazenados no banco (por idioma e evento: confirmação, check-in, checkout).
- Envio por e-mail (SMTP Supabase) ou WhatsApp API.

---

## 🚀 Deploy e Infraestrutura

- **Frontend:** Vercel (build automático do GitHub).
- **Backend / Banco:** Supabase Cloud.
- **Variáveis de ambiente:**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `AVAIBOOK_API_KEY`
  - `HOMEIT_API_KEY`

---

## 🧪 Testes e Qualidade

- **Unit Tests:** Jest + Testing Library.
- **E2E Tests:** Playwright (simulação de login, criação de reserva etc.)
- **Lint & Formatting:** ESLint + Prettier.
- **Type-check:** TypeScript estrito.

---

## 🗺️ Resumo Visual (Camadas)

[UI Layer] → Next.js + Tailwind + shadcn/ui
[State Layer] → Zustand + SWR
[Service Layer] → Services (reservas, relatórios, integrações)
[API Layer] → Next.js route handlers + Supabase Edge Functions
[Database Layer] → PostgreSQL (Supabase)
[Auth Layer] → Supabase Auth
[Integrations] → AvaiBook API / Homeit API / Email / WhatsApp

yaml
Copiar código

---

## 🧭 Próximos Passos
1. Criar repositório GitHub com estrutura inicial (`npx create-next-app@latest`).
2. Instalar dependências principais:  
npm i @supabase/supabase-js zustand swr recharts tailwindcss @shadcn/ui

yaml
Copiar código
3. Configurar `.env.local` com credenciais Supabase.
4. Criar schemas no banco e políticas RLS.
5. Desenvolver autenticação e módulo de reservas.
6. Integrar APIs externas (AvaiBook / Homeit).
7. Implementar automações e relatórios.

---

**Autor:** Rodrigo Berto  
**Versão:** 1.0  
**Data:** Outubro 2025
