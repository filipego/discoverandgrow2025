# Progress Tracker

Update this file after every meaningful application implementation change. Documentation-only maintenance should be noted only when it changes how future work should proceed.

---

## Current Status

**Phase:** Dependency compatibility and deployment readiness

**Last completed:** Hardened dynamic Prismic-form delivery: all configured fields are formatted for email, optional inputs validate correctly, branded owner and thank-you emails render, and blank thank-you content uses a standard 2–3-business-day response message.

**Next:** Push/sync the updated category models to Prismic, add a Text Block plus one slider slice per desired category, replace the existing `what_we_do` post content, publish/revalidate, then continue deployment hardening.

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
- [x] Donation acknowledgments include the donor and gift summary, Stripe receipt/invoice link, nonprofit language, and duplicate-delivery protection.
- [x] Newsletter welcome and owner-notification emails use the established Discover and Grow email branding.
- [x] Dynamic forms support Turnstile and rate limiting.
- [x] Dynamic forms send branded owner notifications and submitter thank-you emails, with a default thank-you response when the slice copy is blank.
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
- Verify `info@discoverandgrow.org` (or configure `DONATION_EMAIL_FROM`) in the production Resend account.
- After the Resend domain is verified, configure `FORMS_EMAIL_FROM` with that sender and remove any `FORM_TEST_RECIPIENT` override so live form thank-you emails reach each submitter.
- Replace the legacy Supabase newsletter insert with Resend Contacts, including normalized-email duplicate handling and a newsletter segment/topic.
- After the new Vercel site has a public production URL, add a separate Stripe webhook at `<public-production-origin>/api/webhooks/stripe`, store its signing secret as Vercel's `STRIPE_WEBHOOK_SECRET`, deploy, and run one controlled live donation. Preserve the legacy `https://discoverandgrow.org?give-listener=stripe` endpoint while WordPress/Bluehost remains live.
- Review mobile header/navigation behavior.
- Publish the local Hero slice model update in Prismic and add the supplied home-hero image to the homepage's default Hero variation.

---

## Decisions Made

- Prismic is the primary CMS and content source.
- Supabase is not the application platform for this project; current Supabase code is legacy newsletter storage only.
- Resend Contacts will replace Supabase as the newsletter subscriber store; Resend Broadcasts will handle future marketing sends and unsubscribe management.
- Context files should be edited in place and kept accurate for the existing site.
- `src/app/globals.css` is the source of truth for brand tokens.
- Generated Prismic files should not be edited manually.

---

## Open Questions

- Should the project add a separate `typecheck` script because builds currently ignore TypeScript errors?
- Should hardcoded color variants in components be normalized into `globals.css` tokens?
