# Hub Spec

## Purpose

Personal homepage and project showcase. Static, no backend.

## Stack

- Next.js (Vercel), Tailwind, shadcn/ui, fully static export

## Pages

```
/       ← hero, about blurb, project cards, links
```

Single page. No routing needed initially.

## Project Cards

Each card has:

- Name + short description
- Live URL + GitHub repo link
- Tech stack tags
- Screenshot or icon

Initial cards: Blog, Travel Buddy. Add more over time.

Travel Buddy card has three links: Live Demo, GitHub, and **Case Study** (links to blog post about the v1 → v2 AI-assisted migration).

## Infrastructure / Behind the Scenes Section

A secondary section on the hub for supporting services that have no frontend — scrapers, workers, cron jobs, data pipelines. Each card shows:

- Name + what it does
- GitHub repo link (no live URL)
- Tech stack tags
- No "live demo" button — replaced with a "view repo" button only

Initial cards: none yet. First candidate: Letterboxd review scraper (future).

## Additional Sections

### Resume

- Downloadable PDF link + inline preview or key highlights (experience, skills)
- Keep it brief on the page — full detail lives in the PDF

### Contact

- Simple contact form or mailto link
- Social links: GitHub (required), others optional
- No phone number or address — email only

### Buy Me a Coffee

- Embedded or linked [Buy Me a Coffee](https://buymeacoffee.com) button/widget
- Keep it subtle — not the focus of the page

## Other Links

- GitHub profile
- Domain placeholder (custom domain added later)

## Project Card Data Structure

Defined in `src/data/projects.ts`:

```ts
type ProjectCard = {
  name: string; // Display name
  description: string; // One-line description
  liveUrl: string; // Deployed URL
  githubUrl: string; // GitHub repo URL
  caseStudyUrl?: string; // Optional blog post link (Travel Buddy only for now)
  techStack: string[]; // e.g. ["Next.js", "DynamoDB", "Lambda"]
  screenshot?: string; // Path to screenshot in /public
};
```

## Recently Watched

- Grid of recent movie posters pulled from Letterboxd with star ratings only — no review text
- Data sourced from `src/data/letterboxd.json`, committed by the Letterboxd scraper repo on a schedule
- Scraper fetches Letterboxd RSS feed + TMDB API for poster images, writes to `src/data/letterboxd.json` in this repo via GitHub API, triggering a Vercel redeploy
- Scraper runs on a daily cron schedule
- GitHub token for the scraper stored as a secret in the scraper repo's CI environment
- Show last 6-10 films
- Clicking a poster links to the film's Letterboxd page (not the personal review)
- Fallback: if scraper fails or feed is unavailable, show last known data from committed JSON

## Content Tone

- Blog is fully professional/PC — safe for anyone to read
- Letterboxd reviews are personal and sometimes spicy — do **not** display them publicly on the hub or blog
- Letterboxd scraper (future) exposes **posters + ratings only** — review text is never stored or displayed

## Design System

### Palette

| Token        | Light     | Dark      |
| ------------ | --------- | --------- |
| Background   | `#f5f0eb` | `#1a1714` |
| Surface      | `#ede6dd` | `#232019` |
| Border       | `#d4c9bc` | `#3a342c` |
| Text primary | `#1a1714` | `#f0e8de` |
| Text muted   | `#6b5f54` | `#9e8f82` |
| Accent       | `#5b21b6` | `#7c3aed` |
| Accent hover | `#4c1d95` | `#6d28d9` |

### Typography

- **Body/UI:** Inter
- **Headings:** Fraunces (warm editorial serif)
- **Code:** JetBrains Mono

### Notes

- All colors defined as Tailwind config tokens — never hardcode hex values in components
- Dark mode via Tailwind `dark:` classes + next-themes, persisted in localStorage
- Shared with blog (same palette and fonts)

## Error Pages

All error pages follow the shared playful theme (see Global CLAUDE.md → Error Pages):

- `404` — shown for any unknown route
- All include a home link

## CI/CD

- **GitHub Actions** runs on every push and PR: lint → typecheck → unit tests → build
- **Vercel** handles all deployments automatically:
  - `main` branch → production deployment
  - Any feature branch → unique preview URL
- PRs must pass GitHub Actions before merge

## UI Standards

- **shadcn/ui** for all UI components
- **Dark mode** — system preference default, manual toggle persisted in localStorage
- **Accessibility** — all interactive elements keyboard-navigable, ARIA labels on icons, color contrast AA compliant minimum
- **Error handling** — Next.js `error.tsx` boundary + friendly error page
- **Loading states** — custom animated skeleton loader for any async content

## Linting & Pre-commit

- ESLint + Prettier enforced in CI
- Husky + lint-staged runs ESLint + Prettier + typecheck on staged files before every commit
- Commit blocked if any check fails

## Testing Standards

- **Unit tests** (Jest + React Testing Library) for everything:
  - All components (render, links, project card data)
  - All utility functions
- **Playwright e2e tests** for all user-facing flows:
  - Written with Gherkin-syntax comments (`# Given`, `# When`, `# Then`) above each step
  - Cover: page loads, all project card links resolve, GitHub link present, dark mode toggle, mobile layout
- Tests live in `__tests__/` (unit) and `e2e/` (Playwright) at repo root

## Documentation Standards

- **JSDoc on everything**: all functions, components, and types must have JSDoc blocks
  - `@param` and `@returns` for every function
  - `@example` for any utility functions
- **Inline comments** explain the _why_ — any non-obvious layout decisions or data transformations
- Every field in `projects.ts` data types gets a JSDoc description

## Notes

- No backend, no auth, no AWS
- Deploy to Vercel on push to `main`
- Add new project cards manually as projects ship in `src/data/projects.ts`
