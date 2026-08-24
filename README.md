# CI/CD Learning Monorepo

Minimal full-stack project used to learn local builds, testing, EC2 deployment,
Nginx, PM2 and GitHub Actions.

## Services

- `apps/web`: Next.js frontend on port 3000
- `apps/api`: Express HTTP API on port 4000
- `apps/websocket`: WebSocket echo server on port 5000
- `packages/database`: shared Prisma client and PostgreSQL schema

## Local commands

```bash
pnpm install
pnpm db:generate
pnpm dev
pnpm lint
pnpm test
pnpm build
```

Copy `.env.example` to `packages/database/.env` and insert the development
Neon pooled `DATABASE_URL` and direct `DIRECT_URL` before running migrations.
Real credentials must never be committed.

## HTTP API

- `GET /health`: process health check
- `GET /users`: list users from PostgreSQL
- `POST /users`: create a user with JSON `{ "email": "...", "name": "..." }`
