# FinCore

FinCore is a financial intelligence workspace for tracking accounts, ledger activity, budgets, and spending patterns in one focused view.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/fincore-dashboard/` — React/Vite web app and product UI
- `artifacts/api-server/src/routes/fincore.ts` — FinCore API routes
- `artifacts/api-server/src/lib/fincore-store.ts` — seeded MVP account, transaction, budget, and audit data
- `lib/api-spec/openapi.yaml` — source of truth for typed API contracts
- `artifacts/fincore-dashboard/src/index.css` — FinCore theme tokens and app-wide visual language

## Architecture decisions

- The first build is a focused demo workspace with an in-memory store so the complete product loop is usable without requiring authentication or external bank connections.
- The API contract is OpenAPI-first; generated React Query hooks are the only frontend data access layer.
- Financial instruments are represented with masked account identifiers only; no raw account or card numbers are accepted.
- The app uses a shared API service at `/api` and a root-routed web artifact so the preview and future publish URL share the same paths.

## Product

The MVP includes a dashboard with net worth and cash-flow views, linked account management, searchable and filterable transactions, transaction creation and editing, budget tracking, spending analytics, audit history, settings, and a contextual advisor chat.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after changing `lib/api-spec/openapi.yaml`.
- The demo store resets when the API process restarts; connect the database and authentication layers before treating it as production persistence.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
