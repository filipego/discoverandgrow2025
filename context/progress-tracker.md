# Progress Tracker

Update this file after every meaningful application implementation change. Documentation-only maintenance should be noted only when it changes how future work should proceed.

---

## Current Status

**Phase:** Dependency compatibility and deployment readiness

**Last completed:** The Header is responsive at tablet portrait and phone widths with a right-side navigation drawer; the Form/HeadingAndText slices apply explicit Prismic rich-text paragraph/link styles; the Form left content is vertically centered, and Open Sans/Raleway load through Next.js rather than a runtime stylesheet import.

**Next:** Address existing lint debt and remaining non-Next npm audit findings when deployment hardening continues.

---

## Project Foundation

- [x] Next.js App Router public website exists.
- [x] Prismic client is centralized in `src/prismicio.ts`.
- [x] Slice Machine config exists in `slicemachine.config.json`.
- [x] Prismic custom types exist under `customtypes`.
- [x] Shared slice components exist under `src/slices`.
- [x] Generated slice component map exists at `src/slices/index.ts`.
- [x] Global brand tokens exist in `src/app/globals.css`.
- [x] Header and footer are sourced from Prismic `settings`.
- [x] Stripe donation routes and donation slice exist.
- [x] Resend email templates and email routes exist.
- [x] Dynamic forms support Turnstile and rate limiting.
- [x] Legacy Supabase newsletter insert exists.
- [x] Next.js is on `15.5.20` with matching `eslint-config-next`.
- [x] `/thank-you` is inside the `(home)` route group while preserving the public `/thank-you` URL.

---

## Context Alignment

- [x] `AGENTS.md` describes this as a Prismic public site, not a Supabase admin boilerplate.
- [x] `project-overview.md` documents actual audiences, routes, content models, and integrations.
- [x] `architecture.md` documents actual folders, stack, data flow, and environment variables.
- [x] `ui-tokens.md` matches current `src/app/globals.css`.
- [x] `ui-rules.md` describes current public-site UI rules.
- [x] `ui-registry.md` lists existing shared components and slices.
- [x] `code-standards.md` matches current App Router, Prismic, and integration boundaries.
- [x] `library-docs.md` matches installed package versions and active integrations.
- [x] `build-plan.md` reflects project-specific follow-up phases.
- [x] Supabase-specific local/snapshot docs were replaced by Prismic-specific context.

---

## In Progress

- None.

---

## Upcoming

- Fix existing lint errors so `npm run lint` can pass.
- Decide whether `next.config.ts` should continue ignoring lint and TypeScript build errors.
- Review remaining `npm audit --omit=dev` findings outside the Next version update.
- Confirm production-safe Resend sender and recipient behavior.
- Confirm newsletter persistence direction: keep Supabase, migrate, or remove storage.
- Review Stripe webhook handling and API versions.
- Review mobile header/navigation behavior.
- Publish the local Hero slice model update in Prismic and add the supplied home-hero image to the homepage's default Hero variation.

---

## Decisions Made

- Prismic is the primary CMS and content source.
- Supabase is not the application platform for this project; current Supabase code is legacy newsletter storage only.
- Context files should be edited in place and kept accurate for the existing site.
- `src/app/globals.css` is the source of truth for brand tokens.
- Generated Prismic files should not be edited manually.

---

## Open Questions

- Should newsletter signups continue storing in Supabase?
- Should form and email routes send to real user-entered emails in production instead of the current testing recipient behavior?
- Should the project add a separate `typecheck` script because builds currently ignore TypeScript errors?
- Should hardcoded color variants in components be normalized into `globals.css` tokens?
