# Code Standards

Implementation rules for the Discover and Grow public website.

---

## Engineering Mindset

- Read the context files and nearby code before implementing.
- Keep scope to one complete, verifiable unit.
- Match existing imports, naming, component structure, and route organization.
- Prefer root-cause fixes over workaround layers.
- Avoid unrelated renames, moves, formatting churn, and broad refactors.
- Preserve exact user-visible wording unless the task asks for copy changes.
- Keep new files focused and under 300 LOC when practical.

---

## TypeScript

- Prefer explicit interfaces for component props.
- Avoid `any` in new code. When existing Prismic type gaps force an escape hatch, keep it local and explain it with a short comment.
- Validate unknown external input at route-handler boundaries.
- Keep server-only values out of Client Components.
- Use `const` by default and handle async failures.
- Use the `@/*` path alias for `src/*`.

---

## Next.js App Router

- Use App Router conventions in `src/app`.
- Default to Server Components for pages and slices.
- Add `"use client"` only when state, effects, browser APIs, event handlers, animations, or client-only libraries require it.
- Keep route handlers focused on one responsibility.
- Use route groups for organization only.
- Generate route metadata from Prismic document SEO fields when available.
- Current dynamic route params are typed as promises in existing pages; match nearby route patterns unless intentionally standardizing.
- `next.config.ts` currently ignores lint and TypeScript errors during builds, so run focused checks when correctness matters.

---

## Prismic and Slice Machine

- Use `createClient` from `src/prismicio.ts`.
- Keep Prismic route resolvers centralized in `src/prismicio.ts`.
- Use `SliceZone` and `components` from `src/slices`.
- Use `PrismicRichText`, `PrismicNextImage`, and `PrismicNextLink` for Prismic fields.
- Use `isFilled` from `@prismicio/client` for optional fields.
- Do not manually edit generated files such as `src/slices/index.ts` or `prismicio-types.d.ts`.
- Prefer Slice Machine or `npx prismic` workflows for model changes. If tooling cannot support a required model edit, state that before using a manual fallback.

---

## File and Folder Naming

- Route folders follow the existing App Router structure.
- React component files use PascalCase.
- Slice folders use the current Slice Machine naming.
- Utility files follow existing camelCase patterns.
- API route files are `route.ts`.
- Do not add barrel exports unless the local directory already uses them.

---

## Component Structure and Styling

- Check `context/ui-registry.md` and `src/app/components` first.
- Use `Heading` for headings.
- Use `Bounded` for constrained page sections.
- Use `ButtonLink` for Prismic-managed CTAs.
- Prefer `clsx` where the surrounding file uses it; use `cn` from `@/lib/utils` when class merging conflict resolution is useful.
- Use `src/app/globals.css` brand tokens and Tailwind utilities where available.
- When touching legacy hardcoded colors, prefer replacing with existing brand utilities.
- Keep text fitted to its parent across mobile and desktop.

---

## API Routes and Server Logic

- Parse and validate request input before provider calls.
- Keep secrets server-side.
- Apply rate limiting to mutation/form routes when appropriate.
- Verify Stripe webhook signatures.
- Verify Turnstile tokens server-side when present.
- Return predictable response shapes and status codes.
- Log useful provider context without exposing secrets or raw internal details to users.

---

## Forms and Email

- Use React Hook Form and Zod for new form validation.
- Dynamic form schemas belong in `src/lib/dynamicValidation.ts` or a nearby focused helper.
- React Email templates live in `src/emails`.
- Resend API access belongs in route handlers.
- Avoid hardcoding production recipient behavior changes without an explicit task; current routes contain testing-address comments that should be handled carefully.

---

## Payments

- Stripe Elements/browser code uses `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
- Server routes use `STRIPE_SECRET_KEY`.
- Webhooks use `STRIPE_WEBHOOK_SECRET`.
- Keep donation metadata intentional and avoid storing sensitive payment data locally.

---

## Dependencies

- Use installed libraries before adding another.
- Check `context/library-docs.md` before changing a third-party integration.
- Do not install a package without a clear requirement and a docs update.
- Prefer framework, native, or existing wrapper functionality when it solves the problem cleanly.

---

## Protected Areas

Do not modify these unless the task requires it:

- `src/slices/index.ts`
- `prismicio-types.d.ts`
- `customtypes/*` and `src/slices/*/model.json`, except through approved Prismic/Slice Machine model work
- `.next`, `node_modules`, build output, and generated artifacts
- `.env*` secrets

---

## Verification

Before finishing a feature unit:

1. Confirm architecture invariants remain intact.
2. Run the narrowest relevant lint, build, API, Slice Machine, or browser verification.
3. Update relevant context documents.
4. Record meaningful application progress and decisions in `context/progress-tracker.md`.
