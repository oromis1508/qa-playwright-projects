# Backend API

[Main readme](../README.md)

## Overview

The backend is a REST API built with Node.js and Express.
It provides authentication, authorization and CRUD operations
for projects and todos.

The API is used by:

- the frontend application
- automated UI, API and unit tests

---

## Tech stack

- Node.js
- Express
- Prisma ORM
- SQLite
- JWT authentication

---

## Requirements

- Node.js >= 18
- npm >= 9

---

## Setup

Navigate to backend directory:

```bash
cd apps/api
```

Install dependencies:

```bash
npm install
```

---

## Environment variables

Create a `.env` file in `apps/api` directory (can be creted from `.env.example`).

Example:

```env
PORT=3000
JWT_SECRET=super-secret-key
DATABASE_URL=url
```

PORT  
Port where the API server will run.

JWT_SECRET  
Secret key used to sign JWT tokens.

DATABASE_URL  
Url for used SQLite database.

---

## Database setup (Prisma + SQLite)

Run migrations:

```bash
npx prisma migrate dev --name init
```

This command will:

- create SQLite database file at prisma/dev.db
- apply all migrations
- generate Prisma Client

---

## Seed data (optional)

Seed script is intended for:

- frontend development
- manual API testing
- demo purposes

It is NOT used in automated tests.

Run seed:

```bash
npx prisma db seed
```

---

## Run server

Start development server:

```bash
npm run dev
```

If successful, API will be available at:

http://localhost:3000

---

## Notes for testing

- Automated tests do NOT rely on seed data
- Test data is created dynamically via database helpers
- Authorization is enforced via middleware
