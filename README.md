# Recipe Builder (Starter)

A TypeScript monorepo for building a chef-friendly recipe app with:
- **Import from URL** (JSON-LD first, HTML fallback)
- **Manual entry**
- **Scaling & unit conversion**
- **Timers**
- **Photos**
- **Quick reference** (measurements & substitutions)

Tech: pnpm workspaces, Next.js (App Router), Prisma (SQLite local), Zod, Tailwind (optional later).

## Quick Start
```bash
# prerequisites: node >= 20, pnpm >= 9
pnpm install
pnpm -C apps/web dev
```

## Packages
- `packages/core`: Scaling, unit conversion, helpers.
- `packages/parser`: Recipe importers (JSON-LD & basic HTML fallback).

## App
- `apps/web`: Next.js app with API route `/api/import?url=...`

## Next steps (suggested issues)
- Auth (Clerk or Auth.js)
- Cloud storage for images (Cloudflare Images or R2)
- Offline mode (PWA) for kitchen use
- Costing & yield calculators
- Share/export as PDF
