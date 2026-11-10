# Veil

A Dota 2 player stats viewer built on the [OpenDota API](https://docs.opendota.com/).

## Getting started

```bash
npm install
npm run dev   # http://localhost:3000
```

No environment variables are required: the browser calls the same-origin `/api`, which proxies OpenDota.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js (Turbopack) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` / `test:watch` / `test:coverage` | Vitest |
| `npm run verify` | lint + typecheck + tests (per-change gate) |
| `npm run check` | verify + production build |

## Architecture at a glance

```
Component → hook (TanStack Query) → lib/queries → veilApi (client facade) → /api
/api route → withPlayerRoute → OpenDota (server facade) → mappers → OpenDota API
```

Development happens on the `develop` branch. Full documentation (architecture, folder layout, data fetching, cost strategy, testing, workflow) lives outside the repo in `D:\Documentation\Codex\Veil`.
