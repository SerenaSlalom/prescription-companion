# CLAUDE.md

Project context for AI tools (Claude Code, Copilot, etc.) working in this repo.

## What this is

**Calla** — a mobile-first medication companion, built as the Protogen P303
("Mobile Experience") case study. Full product spec, target persona, and
design rationale live in [BRIEF.md](./BRIEF.md) — read that first for *why*
before making product decisions here. This file is about *how the code is
built*, so future sessions don't have to re-derive it.

This is a design case study, not a real product: no client or Slalom data
appears anywhere, all medications and interactions are invented, and there
is no backend — everything is mock JSON plus `localStorage`.

## Tech stack & hard constraints

- Vue 3 + `<script setup>` + TypeScript + Vite + Vue Router.
- **No Pinia** — shared state lives in `src/composables/useAppState.ts` as a
  module-level singleton (`reactive`/`ref` declared outside the exported
  function, so every caller shares one instance).
- **No test framework, no ESLint/Prettier config, no JSX** — this was a
  deliberate scaffold choice per the brief; don't add them without reason.
- **No backend, no auth** — persistence is `localStorage` only, seeded from
  `src/data/*.json` / `src/data/seedLogs.ts` on first load.
- Icons: `lucide-vue-next` only (matches the Meridian design system's icon
  choice) — don't mix in a second icon set.

## Architecture at a glance

- `src/composables/useAppState.ts` — the single source of app state
  (medications, logs, onboarding flag, text-size preference) and all the
  derived logic (streaks, overdue checks, the adherence calendar). New
  cross-cutting logic belongs here, not duplicated in views.
- `src/data/medications.json` — mock medication catalog. Each entry needs
  `activeRegimen: true` to show up on the Today view; everything else is
  lookup-only.
- `src/data/seedLogs.ts` — generates 30 days of mock adherence history
  **relative to "today"** (not hardcoded dates), so the demo never looks
  stale no matter when it's opened. Keep new seed data relative, not
  absolute.
- `src/views/` — one file per route, wired in `src/router/index.ts`. A
  router guard redirects to `/welcome` (onboarding) until
  `completeOnboarding()` has run once.
- `src/components/` — shared UI primitives (`PillButton`, `IconButton`,
  `SeverityBadge`, `FeelingBadge`, `AdherenceCalendar`, etc.). Reach for
  these before writing a one-off styled element.
- `src/styles/tokens.css` + `src/styles/base.css` — the design system (see
  below). Prefer the existing CSS variables and utility classes
  (`.btn`, `.card`, `.field`, `.spectrum-band`, `.stack-*`) over new
  one-off styles.

## Design system: Meridian, adapted

Source system: [uiverse.io/design/systems/meridian](https://uiverse.io/design/systems/meridian),
adapted for a calm consumer-health context rather than its original
"AI infrastructure" branding. Rules that matter when adding UI:

- Warm paper background (`--color-surface`), never pure white.
- Serif display headlines (Fraunces) get **exactly one** italic emphasis
  word per headline (e.g. "You're *on track*."). Body/UI text is always
  Inter.
- Ink-black pill buttons (`.btn--primary`) and circular icon buttons
  (`IconButton`) are the only "loud" controls.
- The pastel spectrum band (`.spectrum-band`) is a **single reserved
  accent** — it currently appears only around the adherence streak/calendar
  on the Today view. Don't add a second spectrum-band elsewhere without a
  good reason; the system's whole point is that the color event stays rare.
- Never put spectrum colors on text, icons, or button fills — only inside
  the band's own gradient mesh.

## Conventions

- No comments unless they explain a non-obvious *why* (see repo-wide style
  guide in the root agent instructions) — identifiers should carry the
  *what*.
- Keep components small and composed from the shared primitives above
  rather than growing a view file with one-off markup.
- When adding a medication interaction, severity must be one of
  `"monitor" | "caution" | "avoid"` (see `SeverityBadge.vue` for the
  plain-language label mapping).

## Deployment

Deployed on Vercel, connected to this GitHub repo — pushing to `main`
triggers an automatic production deploy (no manual `vercel --prod` needed).
`vercel.json` carries the SPA rewrite rule that client-side routing needs;
don't remove it.
