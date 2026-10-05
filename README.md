# 🐉 Dragon Ball API (LDW)

API RESTful desenvolvida para a disciplina **LDW — Laboratório de Desenvolvimento Web**, com o tema **Universo Dragon Ball**. A aplicação permite o gerenciamento completo (CRUD) de guerreiros e personagens, com persistência relacional em **PostgreSQL (hospedado na nuvem - Supabase)** utilizando Sequelize ORM e documentação interativa via Swagger UI.

---

## 🛠 Tecnologias Utilizadas

- **Linguagem:** Node.js com TypeScript
- **Framework Web:** Express
- **ORM:** Sequelize
- **Banco de Dados:** PostgreSQL (Hospedado no Supabase)
- **Documentação:** Swagger UI (`swagger-ui-express` e `swagger-jsdoc`)
- **Segurança e Utilitários:** CORS e Dotenv

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)
- [pnpm](https://pnpm.io/) (ou npm)

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/guiksuan1/dragonball-api.git
cd dragonball-api
```

### 2. Instalar dependências da API
Acesse a pasta do backend e instale os pacotes:
```bash
cd backend
pnpm install
```

### 3. Configurar as variáveis de ambiente
Crie o arquivo `.env` dentro da pasta `backend` com base no `.env.example`. Substitua as credenciais pelas fornecidas pelo Supabase:
```env
PORT=3000
DB_HOST=db.SEU_PROJETO_ID.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=DragonBall2026@FATEC
DB_DIALECT=postgres
DB_SSL=true
```
*(Nota: O parâmetro `DB_SSL=true` é obrigatório para conexões seguras com o Supabase).*

### 4. Executar as Migrations
Crie as tabelas necessárias no banco de dados em nuvem:
```bash
pnpm sequelize-cli db:migrate
```

### 5. Iniciar a aplicação
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
