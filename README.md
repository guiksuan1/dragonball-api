# 🐉 Dragon Ball Full-Stack — LDW (FATEC)

Projeto Full-Stack desenvolvido para a disciplina **LDW (Laboratório de Desenvolvimento Web)** da FATEC, com o tema **Universo Dragon Ball**:

- **`backend/` (AT1)** — API RESTful em Node.js, Express 5, TypeScript, Sequelize ORM, PostgreSQL e Swagger UI.
- **`frontend/` (AT2)** — Aplicação SPA em React 19, TypeScript estrito, Vite, Tailwind CSS v4, **shadcn/ui**, React Router DOM e Sonner (toasts), com operações completas de CRUD conectadas à API.

---

## 🗂 Estrutura do Repositório

```text
dragonball-api/
├── backend/
│   ├── src/
│   │   ├── config/             # Conexão PostgreSQL e Swagger
│   │   ├── controllers/        # Regras de negócio CRUD
│   │   ├── migrations/         # Migrations Sequelize
│   │   ├── models/             # Modelo Personagem
│   │   ├── routes/             # Rotas /api/personagens
│   │   └── server.ts           # Servidor Express + /api/health
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
└── docker-compose.yml          # PostgreSQL local (opcional)
```

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (v20+ / v24 recomendado)
- [pnpm](https://pnpm.io/) (ou npm)
- [Git](https://git-scm.com/)
- PostgreSQL (local ou em nuvem, como Supabase)

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
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dragonball_api
DB_USER=postgres
DB_PASSWORD=SUA_SENHA_AQUI
DB_DIALECT=postgres
DB_SSL=false
```
*(Use `DB_SSL=true` caso esteja utilizando um banco PostgreSQL em nuvem, como o Supabase.)*

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
