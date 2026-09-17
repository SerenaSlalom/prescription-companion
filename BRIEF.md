# BRIEF.md — MedCompanion (working title)

## Case Study Context

Protogen P303 — Mobile Experience. This is a mobile-first **responsive web app** (Vue 3, not a native app — no React Native/Swift/Kotlin). Built with Claude Code, using UIverse for component snippets instead of Vuetify, per the Claude Code + UIverse build guide.

No client or Slalom information appears anywhere in this build. All medication names, side effects, and interaction data are invented for demo purposes.

---

## Summary

A mobile-first medication companion for people managing an ongoing prescription. It answers three questions someone actually has on their phone, one-handed, in the middle of their day: *Did I take my meds today? Is this pill actually what it's supposed to be? How am I feeling since I started this?*

The core loop is daily logging and adherence tracking. Medication lookup (names, appearance, side effects, interactions) is a supporting reference feature someone dips into occasionally — not the primary flow. Keeping this hierarchy clear is intentional: the build should do the daily-check-in job extremely well before it does anything else.

## Target User

**Jordan, 29.** Has been on a maintenance medication for an anxiety/depression diagnosis for about eight months. Her insurance just switched her to a generic mid-refill, and the new pill is a different color and shape than what she's used to — which is unsettling given how much trial and error it took to find something that works. She wants a fast way to confirm the new pill is legitimate, log how she's feeling as her body adjusts, and keep a simple record she could show her prescriber if something feels off.

She is not a "patient portal" power user. She wants something that feels calm and human, not clinical — she checks it for a few seconds at a time, usually right after taking her dose or when something feels different.

## Key Features

### Primary flows (build these first, make them fully work end to end)

1. **Today / Home view** — Shows today's scheduled medication(s), a tap-to-confirm "taken" action, a simple adherence streak, and a gentle indicator if something is overdue. This is the screen Jordan opens most often and should orient a first-time user immediately.
2. **Log a dose → quick feeling check-in → history** — Tapping "taken" leads to a short check-in (e.g., feeling fine / mild side effect / not working / something's off, plus an optional one-line note). Confirms, then appears on a simple timeline/history view she can scroll back through.
3. **Medication profile / lookup** — Search or select a medication and land on a detail page: brand + generic/alias names, a description (and placeholder photo) of what the pill can look like across manufacturers, common side effects, and a short list of notable interactions (including alcohol). Includes a visible "This is educational information, not medical advice — talk to your doctor or pharmacist" disclaimer.

### Secondary / stretch features (only after the three above work cleanly)

- A simple two-medication interaction check (pick two from the mock list, get a plain-language caution level) — not a full interaction engine.
- A basic weekly trend view of logged feelings/side effects.
- A "share with my doctor" summary export (can be a static formatted view, no real export needed).
- Light/accessible text-size toggle.

### Explicitly out of scope

- Real drug databases or external APIs — use invented/mock data only.
- Real push notifications or native reminders (this is a responsive web app, not installable/native).
- User accounts, authentication, or backend persistence — client-side mock data and local state are sufficient.
- Clinical accuracy or regulatory completeness — this is a design demo, not a medical product.

## Design System — Meridian (adapted)

Use [Meridian](https://uiverse.io/design/systems/meridian) as the visual foundation, sourcing individual component snippets from UIverse and converting them to Vue SFCs per the build guide's Step 2.4.

Meridian's stated concept is editorial branding for "frontier AI and model infrastructure" — warm paper surfaces, high-contrast serif display type with one italic emphasis word per headline, a neutral grotesque for UI text, ink-black pill-shaped buttons and circular icon actions, and a single deliberate pastel-spectrum color band (with a halftone dot texture) as the only real color event on the page, with charcoal cards overlapping it for depth.

**Adapt it for a health/consumer context, don't import it literally:**

- Keep the warm paper background and generous margins — it reads as calm and human rather than clinical white, which suits Jordan's context well.
- Keep the serif display headlines with one italic emphasis word for reassurance-oriented copy (e.g., "You're *on track*" on the Today view, or "Same medicine, *different look*" on the profile page). Avoid any language that reads like AI/infrastructure product marketing.
- Use the neutral grotesque for all body text, form fields, and data (side effect lists, history entries) — this needs to stay highly legible at a glance.
- Ink-black pill-shaped buttons are a nice thematic coincidence for a medication app — use them for primary actions like "Mark as taken."
- Circular icon buttons work well for quick actions (log a note, view pill photo, search).
- Reserve the single pastel-spectrum band for one specific moment — recommended use is the adherence streak or the feeling/mood trend visualization — so it stays a deliberate accent rather than bleeding across the whole UI. Charcoal cards can overlap it for the medication profile or history cards, consistent with the system's own pattern.
- Do not carry over anything that reads as "AI infrastructure" branding (cold, technical, enterprise tone) — the voice should feel like a thoughtful wellness brand, not a dev tool.

## Content & Data Approach

- Build a mock dataset of 5–10 invented medications (`src/data/medications.json`), each with: name, 2–3 aliases/generic names, a plain-text appearance description (shape, color, imprint), 3–5 common side effects, and 2–3 notable interactions (including one alcohol-related entry).
- Build a mock log dataset (`src/data/logs.json` or client-side state) representing a couple of weeks of "taken" entries and feeling check-ins, so the history/trend views have something realistic to render on first load.
- Keep all medication names obviously invented (not real drug names) to avoid implying real clinical accuracy.

## Tech Stack

- Vue 3 + Vite + TypeScript + Vue Router (no Pinia, no testing framework, no JSX, no ESLint/Prettier config — per the standard scaffold).
- UIverse HTML/CSS snippets converted into Vue single-file components as needed (buttons, cards, nav).
- Local/mock data only — JSON files plus in-memory or localStorage-backed state for logging interactions during a session. No backend.
- Deploy to Vercel; add password protection before sharing the live link.

## Nice to Haves

- Subtle animation/transition when marking a dose taken (small moment of positive feedback).
- Empty states designed with the same care as populated states (e.g., first-time user with no history yet).
- A short onboarding moment that sets Jordan's persona context without requiring real account creation.
