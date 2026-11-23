# 🐉 Dragon Ball Full-Stack (LDW & IEC)

Projeto Full-Stack desenvolvido para as disciplinas **LDW (Laboratório de Desenvolvimento Web)** e **IEC (Integração e Entrega Contínua)** da FATEC, com o tema **Universo Dragon Ball**.

O repositório é organizado em formato de **monorepo** contendo:
- **`backend/`** — API RESTful em Node.js, Express 5, TypeScript, Sequelize ORM, PostgreSQL (Supabase), Swagger UI, Dockerfile de produção e pipeline de CI/CD no GitHub Actions com Deploy Contínuo no Render.
- **`frontend/`** — Aplicação SPA em React 19, TypeScript estrito, Vite, Tailwind CSS v4, **shadcn/ui**, React Router DOM e Sonner (toasts), com operações completas de CRUD conectadas à API.

---

## 🌐 API em Produção (Render)

> ⚠️ **Atualize o link abaixo após criar o Web Service no Render:**

- **URL Base:** `https://SEU-SERVICO.onrender.com`
- **Health Check:** `https://SEU-SERVICO.onrender.com/api/health`
- **Personagens:** `https://SEU-SERVICO.onrender.com/api/personagens`
- **Documentação Swagger:** `https://SEU-SERVICO.onrender.com/api-docs`

---

## 🗂 Estrutura do Repositório

```text
dragonball-api/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline CI/CD (CI + Docker Build + Deploy Hook Render)
├── backend/
│   ├── src/
│   │   ├── config/             # Conexão PostgreSQL/SSL e Swagger
│   │   ├── controllers/        # Regras de negócio CRUD
│   │   ├── migrations/         # Migrations Sequelize
│   │   ├── models/             # Modelo Personagem
│   │   ├── routes/             # Rotas /api/personagens
│   │   └── server.ts           # Servidor Express + /api/health
│   ├── Dockerfile              # Build multi-stage (node:24-alpine)
│   ├── .dockerignore
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # Componentes shadcn/ui (Card, Button, Input, Dialog, Table, Badge, Sonner...)
│   │   │   ├── AppLayout.tsx   # Layout compartilhado com barra de navegação
│   │   │   ├── PersonagemDialog.tsx
│   │   │   └── DeletePersonagemDialog.tsx
│   │   ├── lib/utils.ts
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx   # Listagem CRUD, métricas, busca, Loading e Empty States
│   │   │   └── Sobre.tsx       # Status /api/health e documentação de endpoints
│   │   ├── services/api.ts     # Cliente HTTP (Fetch API)
│   │   ├── types/personagem.ts # Interfaces TypeScript
│   │   └── App.tsx             # React Router DOM + <Toaster />
│   └── .env.example
└── docker-compose.yml
```

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (v20+ / v24 recomendado)
- [pnpm](https://pnpm.io/) (ou npm)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) *(opcional, para build/execução em contêiner)*

---

## 🚀 Como Executar Localmente (Backend + Frontend)

### 1. Clonar o repositório
```bash
git clone https://github.com/guiksuan1/dragonball-api.git
cd dragonball-api
```

### 2. Configurar e executar o Backend (Terminal 1)
```bash
cd backend
pnpm install
```

Crie o arquivo `backend/.env` com base em `backend/.env.example`:
```env
PORT=3000
DB_HOST=seu-host.supabase.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=SUA_SENHA_AQUI
DB_DIALECT=postgres
DB_SSL=true
```
*(Use `DB_SSL=true` para bancos em nuvem como Supabase/Render ou `DB_SSL=false` para PostgreSQL local via `docker-compose.yml`.)*

Execute as migrations e inicie o servidor:
```bash
pnpm sequelize-cli db:migrate
pnpm dev
```
A API estará disponível em `http://localhost:3000` (Swagger em `http://localhost:3000/api-docs`).

### 3. Configurar e executar o Frontend SPA (Terminal 2)
Em outro terminal, a partir da raiz do projeto:
```bash
cd frontend
pnpm install
```

Crie o arquivo `frontend/.env` com base em `frontend/.env.example`:
```env
VITE_API_URL=http://localhost:3000
```

Inicie o servidor de desenvolvimento Vite:
```bash
pnpm dev
```
A interface React estará disponível em `http://localhost:5173`.

---

## 🐳 Execução do Backend com Docker

A partir da raiz do projeto:
```bash
docker build -t dragonball-api ./backend
docker run --env-file ./backend/.env -p 3000:3000 dragonball-api
```

---

## ⚙️ Esteira de CI/CD (GitHub Actions)

O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) é executado em todo `push` na branch `main`:
1. **CI:** instala dependências, valida tipagem (`tsc --noEmit`) e compila o TypeScript (`pnpm run build`).
2. **CD (Docker):** valida a construção da imagem Docker de produção (`docker build`).
3. **Deploy no Render:** dispara o Deploy Hook via `curl -X POST` usando o segredo `RENDER_DEPLOY_HOOK_URL` (com **Auto-Deploy** desativado no Render) e valida retorno HTTP `200`/`201`.

---

## 🎯 Endpoints da API

| Método | Rota | Descrição | Status Sucesso |
|---|---|---|---|
| **GET** | `/api/health` | Verificação de integridade (Health Check) | `200 OK` |
| **GET** | `/api-docs` | Documentação interativa Swagger UI | `200 OK` |
| **GET** | `/api/personagens` | Lista todos os guerreiros | `200 OK` |
| **GET** | `/api/personagens/:id` | Busca guerreiro por ID | `200 OK` |
| **POST** | `/api/personagens` | Cadastra um guerreiro | `201 Created` |
| **PUT** | `/api/personagens/:id` | Atualiza dados do guerreiro | `200 OK` |
| **DELETE** | `/api/personagens/:id` | Remove guerreiro pelo ID | `204 No Content` |
