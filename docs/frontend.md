# Frontend (Web app)

[Main readme](../README.md)

## Overview

The frontend is a single-page application built with React and TypeScript.

It provides UI for:

- authentication (login / registration)
- managing projects
- managing todos inside projects

The frontend is used as:

- a real consumer of the backend API
- a target for automated UI (E2E) tests with Playwright

---

## Tech stack

- React
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS
- react-hook-form + zod (form validation)

---

## Requirements

- Node.js >= 18
- npm >= 9

---

## Setup

Navigate to frontend directory:

```bash
cd apps/web
```

Install dependencies:

```bash
npm install
```

Environment variables
Create a `.env.local` file in apps/web directory (can be created from `.env.example`).

Example:

```env
VITE_API_URL=http://localhost:3000
```

VITE_API_URL
Base URL of the backend API used by the frontend.

## Run application

Start development server:

```bash
npm run dev
```

If successful, frontend will be available at:

http://localhost:5173

---

### Routing

Routing is implemented with React Router.

Routes:

- /login — Login page

- /register — Registration page

- / — Projects list (protected)

- /projects/:projectId — Todos for a project (protected)

Protected routes are wrapped with AuthGuard.

---

### Authentication model

JWT token is stored in localStorage

Auth helpers are located in `src/shared/auth/token.ts`

---

### Global auth handling

Axios response interceptor handles authentication errors:

- `401 Unauthorized`. Token is cleared and user is redirected to /login.

This behavior is centralized and shared across the app.

---

### Error handling

Common error helpers are located in:

`src/shared/api/error.ts`

- `getApiErrorMessage(e, fallback)`. Extracts { message } from API error responses if available.

Project-specific redirects (403 / 404) are handled in domain logic
(e.g. when opening a project that does not exist or does not belong to the user).

---

### Application structure

Pages
Located in `src/pages`:

- LoginPage.tsx
- RegisterPage.tsx
- ProjectsPage.tsx
- TodosPage.tsx

Pages are responsible mainly for layout and composition.

---

### Domain logic (features)

Located in `src/features`:

- `features/todos/useTodos.ts`. Contains all state management and API interaction for todos.
- `features/projects/useProjects.ts`. Contains state management and API interaction for projects.

This separation keeps UI components simple and improves testability.

---

### UI components

Reusable UI components are located in `src/components`:

- Layout
- Card
- Button
- Input

---

### Domain-specific presentational components:

- components/projects/ProjectsList.tsx

- components/todos/TodosList.tsx

- components/todos/TodoCreateForm.tsx

- components/todos/TodosFilter.tsx

These components do not contain business logic and are driven by props.

---

### Notes for testing

Frontend is intentionally designed to support automated testing:

- predictable routing and page flows
- realistic user interactions (forms, buttons, links)
- no dependency on seeded backend data
- different locator strategies can be demonstrated in UI tests
  (roles, labels, visible text, attributes)
