# AGENTS.md

Operational reference for AI coding agents working in this repository. Read this
before making changes. Human-facing contribution guidance lives in
[CONTRIBUTING.md](CONTRIBUTING.md).

## Project overview

BetterKabankalan is a community-built civic tech site that makes government
service information for Kabankalan City, Negros Occidental accessible online,
covering what a service requires, what it costs, where to go, and who to call.
It is a static React + TypeScript single-page app built with Vite and Tailwind
CSS v4, with all content served from JSON files in `src/data/`. There is no
backend.

## Setup

```bash
npm install
npm run dev        # Vite dev server on http://localhost:5173
```

Requires Node.js 18+ and npm. No environment variables or secrets are needed.

## Build and verification commands

These are the only scripts defined in `package.json`:

```bash
npm run dev        # vite
npm run build      # tsc -b && vite build
npm run lint       # eslint .
npm run preview    # vite preview (serves ./dist)
```

Before finishing any code change, run:

```bash
npm run build      # this is the type check, see note below
npm run lint
```

Notes on verification:

- **There is no `npm run type-check` script**, despite CONTRIBUTING.md and
  README.md referencing one. Type checking happens through `npm run build`
  (`tsc -b`) or directly via `npx tsc -b`. Do not add a `type-check` script as a
  side effect of an unrelated change.
- **There is no `npm run format` script and no Prettier config**, despite
  README.md referencing one.
- **There is no automated test suite and no CI.** There is no `.github/`
  directory at all, so no workflows and no PR template, despite CONTRIBUTING.md
  describing automated checks and a PR template. Manual verification in the
  browser is the only functional test.
- **`npm run lint` currently fails** with 64 errors and 4 warnings on a clean
  checkout, mostly `@typescript-eslint/no-explicit-any` and unused vars. Treat
  the baseline as the bar, meaning your change must not add new errors. Do not
  bulk-"fix" unrelated lint errors inside a feature PR, and never silence them
  with blanket `eslint-disable` comments.
- `npm run build` passes on a clean checkout. If it fails, you broke it.

## Repository layout

```
src/components/   Shared UI components (some page-level components live here too)
src/pages/        Route components
src/hooks/        Custom hooks
src/services/     Data access layer (dataService.ts, api.ts)
src/utils/        Pure helpers (formatters.ts)
src/types/        Shared TypeScript types
src/constants/    App constants
src/config/       App config
src/data/         All site content as JSON
```

Path aliases (`@/*` to `src/*`, plus per-directory aliases like `@/components`)
are configured in both `tsconfig.app.json` and `vite.config.ts`, so they resolve
at type-check time and at runtime. `vite.config.ts` additionally defines
`@/data`, which `tsconfig.app.json` does not, so importing `@/data/...` will
build but fail type checking. No source file currently uses any alias, every
import is relative. Match the file you are editing.

## Code style and conventions

From CONTRIBUTING.md's style guide:

- **TypeScript everywhere.** Type all parameters and return values, with no
  implicit `any`. `strict`, `noUnusedLocals`, `noUnusedParameters`, and
  `noImplicitReturns` are all on.
- **Functional components only.** No class components.
- **Always type props**, via an explicit `interface FooProps`.
- **Tailwind utility classes only. No inline `style={{}}` objects.** Mobile-first
  ordering, related classes grouped (layout, colors, typography), and stick to
  the existing spacing scale (4, 6, 8, 12, 16).
- **Keep components under 200 lines.**
- **File naming:** `PascalCase.tsx` for components and pages
  (`ServiceCard.tsx`, `ServicesPage.tsx`), `useCamelCase.ts` for hooks
  (`useServices.ts`), `camelCase.ts` for utilities (`formatters.ts`).
- `const` by default and `let` only when reassigning, arrow functions for
  callbacks, JSDoc on exported functions.

Two places where the existing code diverges from those rules. Match the
surrounding file rather than starting a mixed convention, and do not
mass-rewrite either one as a drive-by:

- CONTRIBUTING.md says "export components with named exports", but nearly every
  component and page uses `export default`. Named exports appear only in
  multi-export files such as `ServiceCard.tsx`.
- Inline styles exist in `BarangaysPage.tsx`, `BarangayMap.tsx`,
  `CurrencyWidget.tsx`, and `pages/BarangayPage.tsx`, mostly for dynamic
  positioning values Tailwind cannot express statically. New static styling must
  still be Tailwind.

Tailwind v4 is wired through the `@tailwindcss/vite` plugin, so there is no
`tailwind.config.js`. Theme customization goes in CSS via `@theme`, not a JS
config file.

## Data contribution notes

All content lives in `src/data/` and is imported directly by
`src/services/dataService.ts` and `src/hooks/`. Adding data means editing JSON,
with no migration or database step.

- **`services.json`** is a top-level array of service objects. Each has `id`,
  `title`, `category`, `description`, `requirements[]`, `fees[]`, `steps[]`,
  `location`, `contact`, `officeHours`, `processingTime`, `tags`,
  `relatedServices`, `isActive`, and ISO timestamps (`createdAt`, `updatedAt`,
  `lastUpdated`). Nested `requirements` and `fees` entries carry their own `id`.
  Copy the shape of an existing entry. The annotated example in
  [CONTRIBUTING.md](CONTRIBUTING.md#-data-contribution-guide) is close but not
  exact, see the discrepancies below.
- **Actual `category` values in use** are `government`, `business`, `education`,
  `social_services`, `health`. CONTRIBUTING.md lists
  `documents|business|health|infrastructure`, which does not match the data.
  Reuse an existing category rather than inventing one.
- **`barangays.json` does not currently contain barangay data.** It is a
  byte-for-byte duplicate of `emergency.json`, a `{ "hotlines": [...] }`
  object. Real barangay records with `id`, `name`, `lat`, `lng`, `population`,
  `households`, `classification`, `district`, `phone`, `address`, `captain`,
  and `description` live in `barangays-template.json` under a `barangays` key,
  which nothing imports. Note also that every page renders barangays from
  `BARANGAY_DETAILS` in `src/constants/index.ts` rather than through the API
  layer, so the `barangaysApi` and `useBarangays` path is dead code sitting on
  the wrong data. Do not paper over this by appending barangay records to the
  hotlines file. Fix it deliberately or leave it alone.
- **`src/data/transparency/budget.json` and `projects.json` are zero-byte
  files.** Importing them as-is will fail to parse.
- Emergency hotlines and announcements live in `emergency.json` and
  `announcement.json`.

Data accuracy rules:

- **Never invent service details.** Do not guess phone numbers, fees, office
  hours, addresses, requirements, or processing times. This site is used by
  residents to plan real trips to real government offices, and a
  plausible-looking fabricated fee or hotline is worse than a missing field.
  Omit what you cannot verify, or leave a clearly-marked placeholder that
  matches existing placeholder phrasing.
- Cite the source and verification date in the commit body when adding or
  updating service data.
- Keep `updatedAt` and `lastUpdated` current when editing a record.

## Commit convention

Conventional Commits, in the form `type(scope): description`.

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

```
feat(services): add community tax certificate (cedula) service
fix(header): resolve mobile menu not closing
docs(readme): clarify installation steps
```

Scope is the affected area, such as `services`, `header`, `barangays`, or
`readme`. Keep the subject line imperative and under roughly 72 characters.

## Branch workflow

`dev` is the integration branch. `main` is production and auto-deploys to
Vercel.

```bash
git checkout dev
git pull
git checkout -b feature/your-feature-name
# ... changes, then push and open a PR targeting dev
```

- Branch off **`dev`**, not `main`.
- Open PRs **into `dev`**. Maintainers merge `dev` into `main` when a release is
  ready.
- Branch prefixes: `feature/`, `fix/`, `docs/`, `style/`, `refactor/`.
- One focused change per PR.

Note that CONTRIBUTING.md's workflow section predates this and shows PRs going
straight from a feature branch with no mention of `dev`. The `dev`-first flow
above is what the repository actually uses.

## What not to do

- **Do not commit directly to `dev` or `main`.** Always work on a branch and
  open a PR.
- **Do not push or open a PR unless explicitly asked.** Make the change, run the
  checks, report what you did, and let the human decide when it ships.
- **Do not skip verification.** Run `npm run build` and `npm run lint` before
  declaring a change done, and report the real result, including failures.
- **Do not fabricate government service data.** No invented phone numbers, fees,
  office hours, officials, or requirements. Ever.
- **Do not add inline styles**, class components, or untyped props.
- Do not add dependencies, testing frameworks, CI workflows, or formatters
  without being asked. Several are referenced in the docs but deliberately
  absent from the repo.
- Do not commit `dist/`, `node_modules/`, or `*.tsbuildinfo`. `dist` is
  gitignored, and `tsconfig.app.tsbuildinfo` is currently tracked in error, so
  leave it out of your commits rather than staging its churn.
- Do not silently "fix" documentation mismatches you stumble across. Report them
  so a maintainer can decide, because the docs and the code are both candidates
  for being the thing that is wrong.
- Do not mass-reformat, re-export, or lint-sweep files you were not asked to
  touch.

## AGENTS.md vs CONTRIBUTING.md

They serve different readers and should not be merged.

**[CONTRIBUTING.md](CONTRIBUTING.md) is for humans**, meaning the community. It
covers the code of conduct, non-coding contribution paths such as verifying
phone numbers, translating to Hiligaynon and Tagalog, and reporting bugs, plus
fork-and-clone onboarding for first-timers, the PR review and recognition
process, and worked examples. It is deliberately warm and welcoming.

**AGENTS.md is the terse operational reference an AI agent reads every
session.** Commands that actually exist, conventions to match, data shapes, and
hard constraints. No onboarding narrative, no encouragement, no emoji.

When they conflict, AGENTS.md reflects the verified current state of the
repository and wins for agent behavior, but flag the conflict rather than
assuming CONTRIBUTING.md is simply stale. Changes to shared facts such as
commands, style rules, or commit format should be made in both files in the same
PR.
