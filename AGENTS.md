# AGENTS.md

Frontend Next.js 16 (App Router, Turbopack) + React 19 + TypeScript strict + Tailwind CSS v4. Consumes a REST backend; there is no test suite, no form library, no data-fetching library.

## Commands

- Package manager is **pnpm** (lockfile `pnpm-lock.yaml`). `pnpm-workspace.yaml` exists only to pass `allowBuilds: sharp/unrs-resolver: false`; do not "fix" that file.
- `pnpm dev` — dev server on http://localhost:3000
- `pnpm lint` — ESLint (flat config, `eslint-config-next`); pass changed files explicitly, e.g. `pnpm lint src/modules/...`
- `npx tsc --noEmit` — typecheck; fastest check after edits
- `pnpm build` — production build (also runs TypeScript + prerender checks); run before finishing route-level UI changes (catches App Router issues like missing Suspense around `useSearchParams`)

Verification that matters: `lint` + `tsc --noEmit` on every change; `build` when touching routes.

## Environment

- Requires `.env.local` (gitignored) with `NEXT_PUBLIC_API_URL` (e.g. `http://localhost:8080/api`). All API calls go through `src/lib/api.ts` → `apiFetch<T>(endpoint, options, accessToken)`; endpoints are like `/v1/tournaments`, auth is `Bearer` token from `useAuth()` (`src/context/AuthContext.tsx`), and every response is wrapped as `SuccessResponse<T>` (`{ data: T }`), errors throw `ApiException`.

## Architecture

- `src/app/(main)/app/**/page.tsx` files are 1–3 line wrappers that reexport a view from `src/modules/<domain>/views/`. Real logic lives in modules, not in `app/`.
- Module layout convention: `modules/<domain>/{services,dto,mappers,models,hooks,components,views}`. DTOs mirror the backend (snake_case fields), models are camelCase, mappers convert DTO→model. Services (`*.service.ts`) are the only place that call `apiFetch`.
- Shared cross-module types are imported by path (e.g. `@/modules/team_games/models/game.models`, `@/modules/organizations/models/organization.models`) — define a model once, never duplicate it in a service file.
- Generic UI components live in `src/components/ui/` (buttons, inputs, modal, pagination, wizard StepIndicator, SearchableSelect). Reuse them instead of hand-rolling inputs/selects; domain components stay in their module's `components/`.

## Conventions that matter

- **Design tokens**: colors are CSS variables in `src/app/globals.css` exposed as Tailwind classes (`bg-altv-bgcontent`, `bg-btn-primary`, `text-btn-primary`, `bg-altv-maindark`, `text-ciangreen`). Never use `neutral-*` or hardcoded hex in views; use `GeneralButton`/`MainButton` instead of raw buttons. Dark-mode styling is done with `dark:` variants on zinc classes plus these tokens.
- **Forms are manual**: `useState` per field (or a wizard hook holding a `formData` object) + a `validateStep`/`validateForm` function returning error strings. Multi-step flows follow the `useTeamWizard` / `useTournamentWizard` pattern (hook owns state + step validation; step components receive `data`, `error`, `update`).
- **Search/autocomplete** follows the debounce pattern in `SearchableSelect` / `useGames` (300 ms debounce, top 5 results, loading/empty/error states).
- Data-fetching hooks come in two styles: simple `useEffect`+`useState` (single fetch) or `useReducer` with debounce + pagination for listings (`useTournaments`, `useTeamGames`). Match the style of the surrounding module.
- Views are named exports (`export function XxxPage`) and almost everything is `"use client"`.

## Gotchas

- `page.tsx` under `(main)` that uses `useSearchParams()` must be wrapped in `<Suspense>` (client component) or `next build` fails on static prerender.
- Tailwind v4: tokens are defined via `@theme inline` in `globals.css`, not `tailwind.config`. Classes like `bg-btn-primary` only exist because of that mapping.
- `next build` runs TypeScript itself, but not lint; prerender/static-generation errors only surface in `build`, not in `tsc`.

## Known lint debt (accepted)

- `pnpm lint` is clean of errors; the remaining `@next/next/no-img-element` warnings are intentional: avatars/banners/logos come from the backend API at runtime, so migrating to `next/image` requires `images.remotePatterns` in `next.config.ts` for the real API host. Don't "fix" these warnings by guessing hostnames.
