## Personal Browser Verification Preference

- Prefer the Codex desktop in-app Browser for visual/browser verification, browser comments, and user-visible UI checks.
- Use Chrome DevTools only when lower-level Chrome inspection is specifically needed, such as detailed console, network, storage, performance, or Chrome-only session state debugging.

## Project Context

This is the Discover and Grow 2025 public website. It is a Next.js App Router site powered primarily by Prismic and Slice Machine, with Stripe donation flows, Resend email notifications, Cloudflare Turnstile on dynamic forms, and a small Etsy products API route.

This is not the copied Supabase admin boilerplate. Do not add admin-shell, role/permission, dashboard, or Supabase-auth assumptions unless a task explicitly asks for them.

## Read Before Anything Else

Read these files in this exact order before implementing or making architectural decisions:

1. `context/project-overview.md`
2. `context/architecture.md`
3. `context/ui-tokens.md`
4. `context/ui-rules.md`
5. `context/ui-registry.md`
6. `context/code-standards.md`
7. `context/library-docs.md`
8. `context/build-plan.md`
9. `context/progress-tracker.md`

Read `context/prismic-local-dev.md` and `context/prismic-snapshot.md` before Prismic, Slice Machine, custom type, slice model, preview, webhook, or content-model work.

Read `context/deployment-readiness-report.md` before deployment work.

## Rules That Never Change

- Work inside the existing App Router, Prismic, Slice Machine, and `src/app/components` structure. Do not create parallel systems.
- Use Prismic as the primary content source. Custom type and slice model changes should go through Slice Machine or `npx prismic` workflows, not hand-edited model JSON, unless the CLI cannot support the needed operation and the user approves the fallback.
- Preserve the current public-site routing model: homepage, generic pages, `/what_we_do/[uid]`, `/programs/[uid]`, Prismic preview, and Prismic revalidation.
- Use `createClient` from `src/prismicio.ts` for Prismic reads.
- Render Prismic page content through `SliceZone` and the generated `src/slices/index.ts` component map.
- Do not edit generated files such as `src/slices/index.ts`, `prismicio-types.d.ts`, `.next`, or `node_modules` manually.
- Use existing shared components from `src/app/components` before creating new UI.
- Use `Heading` from `src/app/components/Heading.tsx` for headings in new or modified UI.
- Use brand tokens from `src/app/globals.css` where they exist. If hardcoded colors are touched, prefer replacing them with existing brand utilities or document why a new token/pattern is needed.
- Preserve user-visible copy unless the task explicitly changes it.
- Treat `src/lib/supabase.ts` and the newsletter Supabase insert as a legacy integration, not the project’s main backend. Do not expand Supabase usage without an explicit task.
- Update `context/ui-registry.md` when reusable UI components or established component patterns change.
- Update `context/ui-tokens.md` and `context/ui-rules.md` whenever `src/app/globals.css` tokens or shared interaction patterns change.
- Update `context/progress-tracker.md` after meaningful application implementation changes, not documentation-only maintenance.
- If implementation changes architecture, scope, UI rules, tokens, standards, libraries, or the build plan, update the relevant context file before continuing.

## Development Workflow

1. Scope one feature unit.
2. Check the context files and nearby code patterns.
3. Implement the smallest complete change.
4. Verify it with the most relevant lint, build, Slice Machine, API, or browser check.
5. Update the relevant context documentation and application progress.

Do not commit secrets. `.env*` files are ignored and must stay out of documentation and source.

## Available Skills

- `/architect` - before any complex feature. Think before building.
- `/imprint` - after any new UI component. Capture patterns.
- `/review` - before demo or when something feels off.
- `/recover` - when something breaks after one failed correction.
- `/remember save` - when a feature spans multiple sessions.
- `/remember restore` - when returning after a multi-session feature.
