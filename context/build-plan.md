# Build Plan

## Core Principle

Maintain the Discover and Grow public website incrementally. Keep Prismic as the content source, Slice Machine as the model/slice workflow, and the existing public-site component system intact. Deliver one complete, verifiable workflow at a time.

---

## Delivery Rules

1. Preserve the current Prismic route model and `src/prismicio.ts` route resolvers.
2. Build page sections through existing shared slices and `src/app/components` patterns first.
3. Use Slice Machine/Prismic CLI workflows for model changes.
4. Keep tokens in `src/app/globals.css` and update UI docs when shared styles change.
5. Keep secrets in ignored environment files or deployment provider settings only.
6. Verify each unit with the smallest useful lint, build, Slice Machine, API, or browser check.
7. Update context docs when architecture, UI patterns, integrations, or progress change.

---

## Phase 1 - Context Realignment

**Status:** In progress

- Replace copied Supabase admin boilerplate documentation.
- Document the actual Prismic/Slice Machine architecture.
- Document current brand tokens and shared UI components.
- Document active integrations: Stripe, Resend, Turnstile, Etsy, and legacy Supabase newsletter storage.

---

## Phase 2 - Baseline Health Check

**Status:** Recommended next

- Run `npm run lint` and note current behavior.
- Run `npm run build` and note current behavior.
- Decide whether to keep `ignoreDuringBuilds` and `ignoreBuildErrors` in `next.config.ts`.
- Review existing `any`, `@ts-ignore`, and console logging in slices/forms/API routes.
- Confirm whether the newsletter should continue storing data in Supabase or move to another system.

---

## Phase 3 - CMS and Content Workflow Cleanup

**Status:** Upcoming

- Confirm all Prismic custom types are current in Slice Machine.
- Regenerate Prismic types after any model changes.
- Confirm route resolvers match the intended public URLs.
- Confirm `/api/revalidate` is connected to the correct Prismic webhook behavior before deployment.
- Review Slice Simulator behavior at `/slice-simulator`.

---

## Phase 4 - Forms, Email, and Donation Hardening

**Status:** Upcoming

- Review Resend sender/from/to behavior before production.
- Replace testing recipients with production-safe dynamic recipients where intended.
- Confirm Turnstile behavior on all dynamic forms.
- Review Stripe API versions and webhook event handling.
- Add focused validation to payment and email routes where currently minimal.

---

## Phase 5 - UI and Responsive Polish

**Status:** Ongoing

- Use the Codex in-app Browser for public visual verification.
- Check mobile header/navigation behavior.
- Verify footer, form, donation, slider, and media sections at common viewport sizes.
- Reduce hardcoded style values when touching affected components.
- Keep Prismic-authored content from breaking layouts.

---

## Feature Delivery Checklist

Before finishing a feature:

- [ ] Route and Prismic document ownership are intentional.
- [ ] UI uses existing shared components and brand tokens where possible.
- [ ] Slice/model changes use Prismic/Slice Machine workflow or an approved fallback.
- [ ] Loading, empty, error, and success states are handled where relevant.
- [ ] Secrets remain outside source and docs.
- [ ] Relevant context docs are updated in place.
- [ ] Verification command or browser check has been run or the skip reason is documented.
