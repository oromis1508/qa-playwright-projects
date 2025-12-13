# QA Playwright Full-Stack Project

Portfolio-oriented full-stack project focused on QA and test automation.

Stack:

- Backend: Node.js, Express, Prisma, SQLite ([docs](docs/backend.md))
- Frontend: React, Vite, TypeScript, Tailwind CSS ([docs](docs/frontend.md))
- Testing: Playwright (UI + API), Allure ([docs](docs/tests.md))
- Infrastructure: Docker, GitHub Actions ([docs](docs/docker.md))

## Quick Start

Clone repository:

git clone https://github.com/oromis1508/qa-playwright-projects.git
cd qa-playwright-projects

Backend setup:

```bash
cd apps/api
npm install
copy .env.example .env
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Frontend setup (open new terminal):

```bash
cd apps/web
npm install
copy .env.example .env.local
npm run dev
```

## Demo credentials

```text
Email: test@example.com
Password: password123
```
