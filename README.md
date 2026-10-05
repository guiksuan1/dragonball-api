# 🐉 Dragon Ball API

API RESTful desenvolvida para a disciplina **LDW — Laboratório de Desenvolvimento Web**, com o tema **Universo Dragon Ball**. A aplicação permite o gerenciamento completo (CRUD) de guerreiros e personagens, com persistência relacional em PostgreSQL utilizando Sequelize ORM e documentação interativa via Swagger UI.

---

## 🛠 Tecnologias Utilizadas

- **Linguagem:** Node.js com TypeScript
- **Framework Web:** Express
- **ORM:** Sequelize
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker e Docker Compose
- **Documentação:** Swagger UI (`swagger-ui-express` e `swagger-jsdoc`)
- **Segurança e Utilitários:** CORS e Dotenv

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)
- [pnpm](https://pnpm.io/) (ou npm)

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone [https://github.com/guiksuan1/dragonball-api.git](https://github.com/guiksuan1/dragonball-api.git)
cd dragonball-api
```

### 2. Subir o banco de dados via Docker
Inicie o container PostgreSQL:
```bash
docker compose up -d
```

### 3. Instalar dependências da API
Acesse a pasta do backend e instale os pacotes:
```bash
cd backend
pnpm install
```

### 4. Configurar as variáveis de ambiente
Crie o arquivo `.env` dentro da pasta `backend` com base no `.env.example`:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dragonball_api
DB_USER=postgres
DB_PASSWORD=root
DB_DIALECT=postgres
DB_SSL=false
```

### 5. Executar as Migrations
Crie as tabelas necessárias no banco:
```bash
pnpm sequelize-cli db:migrate
```

### 6. Iniciar a aplicação
Inicie o servidor em modo de desenvolvimento:
```bash
pnpm dev
```
A API estará disponível em: `http://localhost:3000`

---

## 📖 Documentação Interativa (Swagger UI)

Com o servidor em execução, acesse a documentação interativa pelo navegador:
👉 **`http://localhost:3000/api-docs`**

---

## 🎯 Endpoints da API

| Método | Rota | Descrição | Status Sucesso |
|---|---|---|---|
| **GET** | `/api/personagens` | Lista todos os guerreiros | `200 OK` |
| **GET** | `/api/personagens/:id` | Busca guerreiro por ID | `200 OK` |
| **POST** | `/api/personagens` | Cadastra um guerreiro | `201 Created` |
| **PUT** | `/api/personagens/:id` | Atualiza dados do guerreiro | `200 OK` |
| **DELETE** | `/api/personagens/:id` | Remove guerreiro pelo ID | `204 No Content` |