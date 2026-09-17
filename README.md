# Calla — a medication companion

A mobile-first companion for someone managing a daily maintenance
medication: confirm today's dose, log a quick feeling check-in, and look up
what a pill is actually supposed to look like when a refill shows up
different than expected.

**Live**: https://prescription-companion-kappa.vercel.app

Built as the **Protogen P303 (Mobile Experience)** case study. It's a
design exercise, not a medical product — see the disclaimer below.

> [!IMPORTANT]
> No client or Slalom information appears anywhere in this build. All
> medication names, side effects, and interaction data are invented for
> demo purposes, are not clinically validated, and should never be treated
> as medical advice.

## What it does

- **Today** — today's medication, a one-tap "mark as taken," a gentle
  overdue nudge, and a 30-day adherence calendar with a running streak.
- **Check in** — after marking a dose taken, a short feeling check-in
  (fine / mild side effect / not working / something's off) plus an
  optional note, which lands on a scrollable history timeline.
- **Medication lookup** — search invented medications and see aliases,
  what the pill looks like across manufacturers (useful when a refill
  looks different than the last one), side effects, and interactions —
  including a two-medication interaction checker.

Full product spec, target persona, and design rationale: [BRIEF.md](./BRIEF.md).
Notes for AI coding tools working in this repo: [CLAUDE.md](./CLAUDE.md).

## Tech stack

Vue 3 + TypeScript + Vite + Vue Router. No Pinia (state is a single
composable, see `src/composables/useAppState.ts`), no backend — mock JSON
data plus `localStorage`. UI is built from scratch on an adapted version of
the [Meridian](https://uiverse.io/design/systems/meridian) design system
(warm paper surfaces, serif display type, ink pill controls, one reserved
pastel accent), converted from UIverse snippets into Vue components.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
```

## Deployment

Deployed on Vercel and connected to this repo — pushing to `main` builds
and deploys automatically.

## License

MIT — see [LICENSE](./LICENSE).
