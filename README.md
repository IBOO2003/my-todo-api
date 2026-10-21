# 📝 My Todo API

**A secure, production-ready RESTful API for managing personal todos — built with Express.js, PostgreSQL, and Drizzle ORM.**

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?logo=drizzle&logoColor=black)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

## 📋 Table of Contents

- [🚀 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🗄️ Database Design](#️-database-design)
- [🌐 API Endpoints](#-api-endpoints)
- [🔐 Authentication & Authorization](#-authentication--authorization)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🔑 Environment Variables](#-environment-variables)
- [🧪 API Testing](#-api-testing)
- [🛡️ Validation & Error Handling](#️-validation--error-handling)
- [☁️ Deployment](#️-deployment)
- [📈 Future Improvements](#-future-improvements)
- [👨‍💻 Author](#-author)

---

## 🚀 Project Overview

**My Todo API** is a backend REST API that allows authenticated users to create, read, update, and delete their personal todo items. The API follows a clean, layered architecture separating routes, controllers, and services — making the codebase easy to maintain and scale.

**Core capabilities:**

- User registration and login with hashed passwords and JWT authentication
- Full CRUD operations on todos, scoped strictly to the authenticated user
- Input validation on all incoming requests
- Security hardening with Helmet, CORS, and request body size limits
- Rate limiting via `express-rate-limit`
- Dual database connection strategy (connection string or individual credentials)
- Deployed on Railway with health check endpoint support

---

## ✨ Features

### 🔐 Authentication

- ✅ User registration with strong password enforcement
- ✅ Secure login returning a signed JWT token
- ✅ JWT verification middleware protecting all private routes
- ✅ Passwords hashed with bcrypt (cost factor 12)
- ✅ Duplicate email detection on registration
- ✅ Sensitive data (`passwordHash`) stripped from all responses

### 📝 Todo Management

- ✅ Fetch all todos belonging to the authenticated user
- ✅ Create a new todo with title, optional description, and completion status
- ✅ Partial update (PATCH) — update only the fields you provide
- ✅ Full replacement (PUT) — replace a todo entirely
- ✅ Delete a todo by ID
- ✅ User-scoped queries — users can only access their own todos
- ✅ Foreign key cascade delete — todos removed automatically when user is deleted

### 👥 Users

- ✅ Protected endpoint to list all registered users (name and email)

### 🛡️ Security & Reliability

- ✅ Helmet middleware for HTTP security headers
- ✅ CORS enabled
- ✅ Request body size capped at 15 KB
- ✅ Express Rate Limiting (`express-rate-limit`)
- ✅ Centralized error handling middleware
- ✅ 404 handler for undefined routes
- ✅ Health check endpoint for deployment platforms
- ✅ Railway reverse-proxy support (`trust proxy`)
- ✅ Database connection pool error handling

### ✔️ Validation

- ✅ `express-validator` for auth route input validation
- ✅ Manual field validation in todo controllers (type checks, required fields, allowed fields whitelist)
- ✅ Descriptive, structured error responses

---

## 🛠️ Tech Stack

| Technology             | Purpose                           | Version  |
| ---------------------- | --------------------------------- | -------- |
| **Node.js**            | JavaScript runtime                | 22.x     |
| **Express.js**         | Web framework                     | ^5.2.1   |
| **PostgreSQL**         | Relational database               | 17       |
| **Drizzle ORM**        | Type-safe ORM & migrations        | ^0.45.3  |
| **Drizzle Kit**        | Migration CLI tool                | ^0.31.11 |
| `pg`                   | PostgreSQL driver (node-postgres) | ^8.23.1  |
| **bcrypt**             | Password hashing                  | ^6.0.0   |
| **jsonwebtoken**       | JWT creation & verification       | ^9.0.3   |
| **express-validator**  | Request input validation          | ^7.3.2   |
| **express-rate-limit** | Rate limiting middleware          | ^8.7.1   |
| **Helmet**             | HTTP security headers             | ^8.3.0   |
| **CORS**               | Cross-Origin Resource Sharing     | ^2.8.6   |
| **dotenv**             | Environment variable loading      | ^18.0.7  |
| **body-parser**        | Request body parsing              | ^2.3.0   |
| **zod**                | Schema validation library         | ^4.6.5   |

---

## 📁 Project Structure

```
Express js/
│
├── controllers/                  # Route handlers — receive req, send res
│   ├── auth.controller.js        # Register & login logic
│   ├── todo.controller.js        # Full CRUD for todos
│   └── users.controller.js       # Fetch all users
│
├── services/                     # Business logic — interact with the database
│   ├── auth.service.js           # registerUser, loginUser (DB + bcrypt + JWT)
│   ├── todo.service.js           # getTodos, createTodo, patchTodo, putTodo, deleteTodo
│   └── users.service.js          # getAllUsers
│
├── routes/                       # Express routers — map URLs to controllers
│   ├── auth.js                   # POST /auth/register, POST /auth/login
│   ├── todos.js                  # GET/POST/PATCH/PUT/DELETE /todos
│   └── users.js                  # GET /users
│
├── midllewares/                  # Custom middleware
│   ├── auth.middlewares.js       # requireAuth — JWT verification
│   ├── authValidation.js         # express-validator rules for register & login
│   ├── errorHandler.js           # Centralized error handler
│   └── fallbackHandler.js        # 404 not found handler
│
├── src/
│   └── schema.js                 # Drizzle ORM table definitions (users, todos)
│
├── drizzle/                      # Generated migration files
│   ├── meta/                     # Drizzle migration snapshots
│   ├── 0000_worthless_black_bird.sql
│   ├── 0001_great_adam_warlock.sql
│   ├── schema.ts
│   └── relations.ts
│
├── db.js                         # PostgreSQL pool + Drizzle instance
├── index.js                      # App entry point — middleware setup, routes, server
├── drizzle.config.js             # Drizzle Kit configuration
├── package.json
└── .env                          # Environment variables (not committed)
```

---

## 🗄️ Database Design

The API uses **PostgreSQL** with two tables managed by **Drizzle ORM**.

### Tables

#### `users`

| Column          | Type     | Constraints      | Description                           |
| --------------- | -------- | ---------------- | ------------------------------------- |
| `id`            | `serial` | PRIMARY KEY      | Auto-incrementing user ID             |
| `username`      | `text`   | NOT NULL         | Display name of the user              |
| `email`         | `text`   | NOT NULL, UNIQUE | User's email address (used for login) |
| `password_hash` | `text`   | NOT NULL         | bcrypt-hashed password                |

#### `todos`

| Column         | Type      | Constraints               | Description               |
| -------------- | --------- | ------------------------- | ------------------------- |
| `id`           | `serial`  | PRIMARY KEY               | Auto-incrementing todo ID |
| `todo_title`   | `text`    | NOT NULL                  | Title of the todo item    |
| `description`  | `text`    | NULLABLE                  | Optional description      |
| `is_completed` | `boolean` | DEFAULT `false`           | Completion status         |
| `user_id`      | `integer` | NOT NULL, FK → `users.id` | Owner of the todo         |

### Relationships

```
users (1) ──────< todos (many)
         user_id FK with CASCADE DELETE
```

- A user can have **many** todos.
- When a user is **deleted**, all their todos are **automatically deleted** (CASCADE).
- All todo queries are filtered by both `todo_id` **and** `user_id` to prevent cross-user access.

---

## 🌐 API Endpoints

> [!NOTE]
> Base URL when running locally: `http://localhost:3000`

### 🔑 Auth

| Method | Endpoint         | Description                   | Auth Required |
| ------ | ---------------- | ----------------------------- | ------------- |
| `POST` | `/auth/register` | Register a new user           | ❌ No         |
| `POST` | `/auth/login`    | Login and receive a JWT token | ❌ No         |

---

#### `POST /auth/register`

**Request Body:**

```json
{
  "name": "Ibrahim Ali",
  "email": "ibrahim@example.com",
  "password": "SecurePass1!"
}
```

**Success Response** `201 Created`:

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "Ibrahim Ali",
    "email": "ibrahim@example.com"
  }
}
```

**Error — Email already taken** `409 Conflict`:

```json
{
  "message": "Email is already registered"
}
```

**Error — Validation failure** `400 Bad Request`:

```json
{
  "errors": [
    {
      "field": "password",
      "message": "Password must contain at least one uppercase letter"
    }
  ]
}
```

---

#### `POST /auth/login`

**Request Body:**

```json
{
  "email": "ibrahim@example.com",
  "password": "SecurePass1!"
}
```

**Success Response** `200 OK`:

```json
{
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "ibrahim@example.com"
  }
}
```

**Error — Invalid credentials** `401 Unauthorized`:

```json
{
  "message": "Invalid email or password"
}
```

---

### 📝 Todos

> All todo endpoints require a valid `Authorization: Bearer <token>` header.

| Method   | Endpoint     | Description                              | Auth Required |
| -------- | ------------ | ---------------------------------------- | ------------- |
| `GET`    | `/todos`     | Get all todos for the authenticated user | ✅ Yes        |
| `POST`   | `/todos`     | Create a new todo                        | ✅ Yes        |
| `PATCH`  | `/todos/:id` | Partially update a todo (any fields)     | ✅ Yes        |
| `PUT`    | `/todos/:id` | Fully replace a todo                     | ✅ Yes        |
| `DELETE` | `/todos/:id` | Delete a todo by ID                      | ✅ Yes        |

---

#### `GET /todos`

**Success Response** `200 OK`:

```json
[
  {
    "id": 1,
    "todoTitle": "Learn Drizzle ORM",
    "description": "Study the official docs",
    "isCompleted": false,
    "userId": 1
  },
  {
    "id": 2,
    "todoTitle": "Build REST API",
    "description": null,
    "isCompleted": true,
    "userId": 1
  }
]
```

---

#### `POST /todos`

**Request Body:**

```json
{
  "todoTitle": "Read Clean Code book",
  "description": "Chapters 1 to 5",
  "isCompleted": false
}
```

**Success Response** `201 Created`:

```json
{
  "id": 3,
  "todoTitle": "Read Clean Code book",
  "description": "Chapters 1 to 5",
  "isCompleted": false,
  "userId": 1
}
```

---

#### `PATCH /todos/:id`

Send **only** the fields you want to update.

**Request Body:**

```json
{
  "isCompleted": true
}
```

**Success Response** `200 OK`:

```json
{
  "id": 3,
  "todoTitle": "Read Clean Code book",
  "description": "Chapters 1 to 5",
  "isCompleted": true,
  "userId": 1
}
```

**Error — Invalid field** `400 Bad Request`:

```json
{
  "message": "Invalid fields provided",
  "invalidFields": ["priority"]
}
```

---

#### `PUT /todos/:id`

Fully replaces a todo. `todoTitle` is required.

**Request Body:**

```json
{
  "todoTitle": "Read Clean Code book (updated)",
  "description": "All chapters",
  "isCompleted": true
}
```

**Success Response** `200 OK`:

```json
{
  "id": 3,
  "todoTitle": "Read Clean Code book (updated)",
  "description": "All chapters",
  "isCompleted": true,
  "userId": 1
}
```

---

#### `DELETE /todos/:id`

**Success Response** `200 OK` — returns the deleted todo:

```json
{
  "id": 3,
  "todoTitle": "Read Clean Code book (updated)",
  "description": "All chapters",
  "isCompleted": true,
  "userId": 1
}
```

**Error — Not found** `404 Not Found`:

```json
{
  "message": "Todo not found"
}
```

---

### 👥 Users

| Method | Endpoint | Description                                       | Auth Required |
| ------ | -------- | ------------------------------------------------- | ------------- |
| `GET`  | `/users` | Get a list of all registered users (name + email) | ✅ Yes        |

**Success Response** `200 OK`:

```json
[
  { "name": "Ibrahim Ali", "email": "ibrahim@example.com" },
  { "name": "Jane Doe", "email": "jane@example.com" }
]
```

---

### 🩺 Health Check

| Method | Endpoint  | Description                      | Auth Required |
| ------ | --------- | -------------------------------- | ------------- |
| `GET`  | `/health` | Returns API status and timestamp | ❌ No         |

**Success Response** `200 OK`:

```json
{
  "status": "ok",
  "timestamp": "2026-10-21T10:25:53.000Z"
}
```

---

## 🔐 Authentication & Authorization

This API uses **JSON Web Tokens (JWT)** for stateless authentication.

### Authentication Flow

```
Client                          Server
  │                               │
  │  POST /auth/register          │
  │ ──────────────────────────>   │  Validates input
  │                               │  Checks for duplicate email
  │                               │  Hashes password (bcrypt, 12 rounds)
  │                               │  Saves user to DB
  │  201 Created + user object    │
  │ <──────────────────────────   │
  │                               │
  │  POST /auth/login             │
  │ ──────────────────────────>   │  Validates credentials
  │                               │  Compares password with bcrypt
  │                               │  Signs JWT (payload: id, email)
  │  200 OK + JWT token           │
  │ <──────────────────────────   │
  │                               │
  │  GET /todos                   │
  │  Authorization: Bearer <jwt>  │
  │ ──────────────────────────>   │  requireAuth middleware verifies JWT
  │                               │  Attaches decoded user to req.user
  │                               │  Controller uses req.user.id
  │  200 OK + todos               │
  │ <──────────────────────────   │
```

### JWT Details

| Property  | Value                                   |
| --------- | --------------------------------------- |
| Algorithm | `HS256` (default)                       |
| Payload   | `{ id, email }`                         |
| Expiry    | **5 minutes**                           |
| Secret    | `JWT_SECRET` from environment variables |

### How to Send the Token

Include the token in every protected request as a **Bearer token** in the `Authorization` header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Authorization Rules

- Every todo operation uses **both** `todo ID` and `user ID` in the database query.
- A user **cannot** access, modify, or delete another user's todos — even if they know the ID.
- If a JWT is expired, missing, or invalid, the server responds with `401 Unauthorized`.

### JWT Error Codes

| Scenario                                    | HTTP Status | Code                   |
| ------------------------------------------- | ----------- | ---------------------- |
| Missing or malformed `Authorization` header | `401`       | —                      |
| Token missing after `Bearer`                | `401`       | `NO_TOKEN`             |
| Token has expired                           | `401`       | `TOKEN_IS_EXPIRED`     |
| Token is not yet active                     | `401`       | `TOKEN_NOT_ACTIVE_YET` |
| Token signature is invalid                  | `401`       | `TOKEN_IS_NOT_VALID`   |

---

## ⚙️ Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) v14 or higher (running locally or via a cloud provider)
- `npm` or another package manager

---

### 1. Clone the Repository

```bash
git clone https://github.com/IBOO2003/my-todo-api.git
cd my-todo-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root. See the [Environment Variables](#-environment-variables) section for details:

```bash
cp .env.example .env
```

Then open `.env` and fill in your database credentials and JWT secret.

### 4. Set Up the Database

Run the Drizzle migrations to create the required tables:

```bash
npx drizzle-kit push
```

> [!TIP]
> If you prefer generating SQL migration files first, run `npx drizzle-kit generate` and then apply them with `npx drizzle-kit migrate`.

### 5. Start the Development Server

```bash
npm run dev
```

The server starts on `http://localhost:3000` by default (or the port defined in `PORT`).

### 6. Verify the Server is Running

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{ "status": "ok", "timestamp": "..." }
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root using the template below:

```env
# .env.example

# Option A — Single connection string (preferred for cloud deployments)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Option B — Individual credentials (used when DATABASE_URL is not set)
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Server (optional)
PORT=3000
```

> [!CAUTION]
> Never commit your `.env` file to version control. Add it to `.gitignore` immediately.

### Variable Reference

| Variable       | Required      | Description                                                                 |
| -------------- | ------------- | --------------------------------------------------------------------------- |
| `DATABASE_URL` | Conditional\* | Full PostgreSQL connection string. Used when set; overrides individual vars |
| `DB_USER`      | Conditional\* | PostgreSQL username                                                         |
| `DB_HOST`      | Conditional\* | PostgreSQL host (e.g., `localhost`)                                         |
| `DB_NAME`      | Conditional\* | Name of the database                                                        |
| `DB_PASSWORD`  | Conditional\* | PostgreSQL password                                                         |
| `DB_PORT`      | Conditional\* | PostgreSQL port (defaults to `5432`)                                        |
| `JWT_SECRET`   | ✅ Required   | Secret key for signing and verifying JWTs — use a long random string        |
| `PORT`         | Optional      | Port the server listens on (defaults to `3000`)                             |

> _Either `DATABASE_URL` **or** all five individual `DB_`_ variables must be provided.

---

## 🧪 API Testing

### Using cURL

**Register a user:**

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Ibrahim Ali", "email": "ibrahim@example.com", "password": "SecurePass1!"}'
```

**Login:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "ibrahim@example.com", "password": "SecurePass1!"}'
```

**Create a todo (replace** `<token>` **with the JWT from login):**

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"todoTitle": "Learn Express.js", "description": "Build a REST API"}'
```

**Get all todos:**

```bash
curl http://localhost:3000/todos \
  -H "Authorization: Bearer <token>"
```

**Partially update a todo:**

```bash
curl -X PATCH http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"isCompleted": true}'
```

**Delete a todo:**

```bash
curl -X DELETE http://localhost:3000/todos/1 \
  -H "Authorization: Bearer <token>"
```

---

### Using Postman or Apidog

1. Import the base URL: `http://localhost:3000`
2. Create a **POST /auth/login** request and save the token from the response.
3. In your collection settings, add a variable `{{token}}` and set it to the JWT value.
4. For all protected requests, add the header:
   - **Key:** `Authorization`
   - **Value:** `Bearer {{token}}`

---

## 🛡️ Validation & Error Handling

### Input Validation

**Auth routes** use `express-validator`:

| Field      | Rule                                                                               |
| ---------- | ---------------------------------------------------------------------------------- |
| `name`     | Required, 2–50 characters, must start with a letter                                |
| `email`    | Must be a valid email format, must start with a letter                             |
| `password` | Min 8 characters, must contain uppercase, lowercase, number, and special character |

**Todo routes** use manual validation in controllers:

| Check          | Detail                                                |
| -------------- | ----------------------------------------------------- |
| ID format      | Must be a positive integer                            |
| `todoTitle`    | Required for POST and PUT; must be a non-empty string |
| `description`  | Optional; must be a string or `null`                  |
| `isCompleted`  | Optional; must be a boolean                           |
| Unknown fields | Rejected with a list of `invalidFields` (PATCH only)  |
| Empty body     | Rejected on PATCH with a descriptive message          |

### Error Response Format

Validation errors return a structured array:

```json
{
  "errors": [
    { "field": "email", "message": "Please provide a valid email address" },
    {
      "field": "password",
      "message": "Password must contain at least one number"
    }
  ]
}
```

General errors return a simple message:

```json
{
  "message": "Todo not found"
}
```

### HTTP Status Codes

| Code  | Meaning               | When Used                               |
| ----- | --------------------- | --------------------------------------- |
| `200` | OK                    | Successful GET, PATCH, PUT, DELETE      |
| `201` | Created               | Successful POST (register, create todo) |
| `400` | Bad Request           | Validation errors, invalid input        |
| `401` | Unauthorized          | Missing, invalid, or expired JWT        |
| `404` | Not Found             | Resource not found or undefined route   |
| `409` | Conflict              | Email already registered                |
| `500` | Internal Server Error | Unhandled server-side errors            |

### Security Middleware

| Middleware                              | Purpose                                             |
| --------------------------------------- | --------------------------------------------------- |
| `helmet()`                              | Sets security-related HTTP response headers         |
| `cors()`                                | Enables cross-origin requests                       |
| `express.json({ limit: "15kb" })`       | Prevents oversized JSON payload attacks             |
| `express.urlencoded({ limit: "15kb" })` | Limits URL-encoded body size                        |
| `express-rate-limit`                    | Limits repeated requests from a single IP           |
| `trust proxy: 1`                        | Correct IP detection behind Railway's reverse proxy |

---

## 📈 Future Improvements

The following enhancements are **planned** but not yet implemented:

- [ ] **Token refresh** — implement refresh tokens with longer expiry to avoid re-login every 5 minutes
- [ ] **Pagination** — add `limit` and `offset` query parameters to `GET /todos`
- [ ] **Todo filtering & sorting** — filter by `isCompleted`, sort by creation date
- [ ] **Timestamps** — add `created_at` and `updated_at` columns to the `todos` table
- [ ] **Test suite** — add integration and unit tests with Vitest or Jest + Supertest
- [ ] **API versioning** — prefix routes with `/api/v1/` for better long-term maintainability
- [ ] **Logging** — structured request logging with a library like Pino or Winston
- [ ] **Swagger / OpenAPI docs** — auto-generated interactive API documentation

---

## 👨‍💻 Author

**Ibrahim** — [@IBOO2003](https://github.com/IBOO2003)

🔗 **Repository:** [github.com/IBOO2003/my-todo-api](https://github.com/IBOO2003/my-todo-api)

---

Made with ❤️ and Node.js
