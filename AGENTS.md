# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project shape

- Single Next.js 16.4.3 App Router app (React 19.3, TypeScript strict). Not a monorepo.
- Routes: `/`, `/destinations` (list), `/destinations/[destinationsId]` (detail), `/add-destinations`, `/login`, `/sign-up`, plus the better-auth handler at `/api/auth/[...all]`.
- **npm only** (`package-lock.json` is the lockfile) — do not use pnpm/yarn/bun.
- Path alias: `@/*` → `src/*` (see `tsconfig.json`). Layout `src/app/layout.tsx` renders `Navbar` + `Footer` around every page; feature code lives in `src/components/<area>/` (`layout`, `home`, `destinations`), primitives in `src/components/ui/`.
- No CI and no tests exist in this repo. Don't invent test commands.

## Backend dependency (data pages need it)

- Destination data comes from a **sibling repo**: `../wanderlust-server-side` — Express 5 (ESM), hardcoded `PORT = 5000`. It has **no start script**; run `node index.js` from that directory. Its MongoDB URI comes from its own `.env` (`MONGODB_URI`) — not this repo.
- Client API URLs are **hardcoded, no env indirection**: `src/app/destinations/page.tsx` → `GET /destinations`; `src/app/destinations/[destinationsId]/page.tsx` → `GET /destination/:id`; `src/components/destinations/{add-destination-form,EditDestinationsDialog,DeleteDestinationDialog}.tsx` → `POST /add-destinations`, `PATCH`/`DELETE /destination/:id`.
- Failure modes differ: the list page catches errors and renders a "Couldn't reach the travel API" card (`fetch(..., { cache: "no-store" })`); the **detail page fetch is unguarded** and throws during render when the backend is down.
- To make hosts configurable, introduce `NEXT_PUBLIC_*` (or a server-side const) yourself — the API host is a literal in each file today.

## Auth (better-auth, separate from the backend repo)

- Server config: `src/lib/auth.ts` (`betterAuth` + `mongodbAdapter` on db `wanderlust`, reads `process.env.MONGODB_URI`); handler: `src/app/api/auth/[...all]/route.ts`. `/login` and `/sign-up` call `signIn.email` / `signUp.email` from `@/lib/auth-client`.
- **`.env` exists but is gitignored** (keys: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`) — a fresh clone has none; auth flows fail at runtime until it's recreated.
- Quirk in `src/lib/auth-client.ts`: it creates **two** clients — `authClient` (uses `BETTER_AUTH_URL`) and a separate `createAuthClient()` whose `signIn`/`signUp`/`useSession` are what pages actually import (no baseURL → same origin). Changing one doesn't affect the other.

## Commands

```bash
npm run dev            # dev server (Turbopack) — also rewrites the managed block above
npm run lint           # eslint flat config (eslint.config.mjs)
npx tsc --noEmit       # typecheck — no typecheck script exists
npm run build          # production build (loads .env)
```

- Verified today: `npx tsc --noEmit && npm run build` both pass.
- **`npm run lint` currently exits 1** on pre-existing code: 2 `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.tsx` (shadcn-generated) and `src/hooks/use-mobile.ts`, plus 5 unused-import warnings. Don't treat these as your regression — but fix them if you edit those files.
- Gotcha: `layout.tsx` uses the generated global `LayoutProps<"/">` type; `npx tsc --noEmit` fails if `.next/types` was never generated — run `npm run dev` or `npm run build` once first.

## Config quirks (`next.config.ts`)

- `reactCompiler: true` (React Compiler via `babel-plugin-react-compiler`): **skip manual `useMemo`/`useCallback`/`React.memo`** — the compiler memoizes for you.
- `cacheComponents: false` and `partialPrefetching: false` — do **not** assume the Next 16 cache-components model is active; read `node_modules/next/dist/docs/01-app` before adding cache directives or data loading.
- `images.remotePatterns` deliberately allows **any** http(s) host — destination photos come from user-supplied URLs. Don't tighten it to a fixed allowlist.
- Tailwind **v4, CSS-first**: loaded via the Turbopack rule (`@tailwindcss/turbopack`); there is no `tailwind.config.*` and you must not add one. Theme tokens live in `src/app/globals.css` (`@import "shadcn/tailwind.css"` + `@theme inline` + CSS variables).
- `experimental.agentFeedback: true` is what makes `next dev` write/refresh the managed AGENTS.md block — leave it enabled.

## UI components (shadcn)

- `components.json` uses shadcn style **`base-nova`** — built on **`@base-ui/react`, NOT Radix**. Don't paste Radix-based shadcn examples.
- `src/components/ui/*` are shadcn-generated. Add/refresh with `npx shadcn add <component>`; hand-edit only for intentional customizations.
- `cn()` comes from the `cn` package, re-exported by `src/lib/utils.ts` — import from `@/lib/utils`, not directly from `"cn"`.
