# Hub

Personal homepage and project showcase. Static Next.js site, no backend.

See SPEC.md for full details.

## Next.js Version Note

This project uses Next.js 16, which has breaking changes from earlier versions. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`. Key changes: Turbopack is default, Tailwind 4 uses CSS-based config (no `tailwind.config.js`), ESLint uses flat config (`eslint.config.mjs`).

## Stack

- Next.js (App Router), Tailwind, shadcn/ui, static export

## Conventions

- TypeScript strict mode
- Tailwind for all styling — no CSS modules or inline styles
- No default exports except Next.js pages and layouts
- Keep it simple — this is a static showcase page, not an app
- No backend, no auth, no AWS resources

## Testing

- Coverage target: >90% — enforced in CI
- Tests are behavioral — test observable outputs, not internal implementation details
- Shared test factories live in `__tests__/factories/` (e.g. `createProjectCard()`)
- Every component and utility function has a corresponding unit test (Jest + React Testing Library)
- No duplicate assertions between unit and e2e tests — each behavior tested in exactly one layer
- Playwright e2e tests cover all user-facing flows
- Playwright tests use Gherkin-syntax comments (`# Given`, `# When`, `# Then`) above each step block
- Tests live in `__tests__/` (unit) and `e2e/` (Playwright) at the repo root

## Documentation

- Every function, component, and type gets a JSDoc block — no exceptions
- Include `@param`, `@returns` where applicable, and `@example` for utility functions
- Every field in `projects.ts` types gets a JSDoc description
- Inline comments explain the _why_, not the _what_

## UI

- shadcn/ui for all components — do not build primitives from scratch
- Dark mode via Tailwind `dark:` classes, toggled via next-themes, persisted in localStorage
- All interactive elements keyboard-navigable; ARIA labels required on icon-only buttons
- `error.tsx` boundary for hard failures
- CI runs GitHub Actions (lint → typecheck → test → build) on every push and PR
- Vercel deploys: `main` → production, feature branches → preview URLs

## README

`README.md` must always be kept up to date with:

- What the project is
- How to run locally
- How to run tests

## Adding Projects

- Project cards are defined in `src/data/projects.ts`
- Add a new entry there when a new project ships
