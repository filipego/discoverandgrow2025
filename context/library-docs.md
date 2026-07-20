# Library Docs

Project-specific rules for the main third-party libraries used by this site. Read the relevant section before changing an integration.

---

## Before Using Any Library

1. Inspect the installed version in `package.json`.
2. Prefer existing components and helper APIs over generic examples.
3. Check official docs for fast-moving libraries.
4. Update this file when adding a new integration or project-wide usage rule.

---

## Next.js and React

- Installed versions: Next.js `15.5.20`, React `19.0.0`, React DOM `19.0.0`.
- Use App Router.
- Default to Server Components.
- Keep route and layout concerns in `src/app`.
- `next.config.ts` currently has `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` enabled.
- Use explicit verification beyond `next build` when a task depends on lint or type correctness.

---

## Prismic and Slice Machine

- Installed versions: `@prismicio/client` `^7.16.0`, `@prismicio/next` `^2.0.0`, `@prismicio/react` `^3.0.0`, `@slicemachine/adapter-next` `^0.3.93`, `slice-machine-ui` `^2.20.5`.
- Repository config lives in `slicemachine.config.json`.
- Client setup and route resolvers live in `src/prismicio.ts`.
- Run Slice Machine with `npm run slicemachine`.
- Run Next and Slice Machine together with `npm run both`.
- Use `npx prismic --help` and `npx prismic slicemachine --help` before Prismic CLI work.
- The installed Prismic CLI does not expose a `docs` command, so use package docs or official web docs when CLI help is insufficient.
- Do not manually edit generated `src/slices/index.ts` or `prismicio-types.d.ts`.

Current route resolvers:

| Prismic type | Public path |
| --- | --- |
| `homepage` | `/` |
| `page` | `/:uid` |
| `what_we_do` | `/what_we_do/:uid` |
| `programs` | `/programs/:uid` |

---

## Tailwind CSS v4

- Installed version: Tailwind CSS `^4.0.0`.
- Tokens live in `src/app/globals.css`.
- Brand utilities are generated from `@theme` variables.
- Do not create a separate color system in a Tailwind config.
- Use `clsx` or `cn` for conditional class composition.

---

## GSAP

- Installed versions: `gsap` `^3.13.0`, `@gsap/react` `^2.1.2`.
- Current usage includes the animated fixed header and navigation entry effects.
- Keep GSAP code in Client Components.
- Clean up event listeners and avoid creating animations on null refs.

---

## React Hook Form and Zod

- Installed versions: React Hook Form `^7.54.2`, Zod `^3.24.2`, `@hookform/resolvers` `^4.0.0`.
- Static forms and dynamic forms use React Hook Form.
- Dynamic Prismic form validation is generated in `src/lib/dynamicValidation.ts`.
- Validate server route payloads separately; client validation is not enough.

---

## Resend and React Email

- Installed versions: Resend `^6.17.2`, React Email `3.0.7`, `@react-email/components` `0.0.33`.
- Email templates live in `src/emails`.
- Local email preview runs with `npm run email`.
- Server routes must use `RESEND_API_KEY`.
- Donation acknowledgments are sent from the verified Stripe webhook with a stable Resend idempotency key. Send once for one-time gifts and once for only the initial successful monthly invoice.
- Subscriber welcome and owner notification templates use the same email-safe Discover and Grow branding as donation acknowledgments. Testing continues to use `onboarding@resend.dev` and the account owner as recipient until the production domain is verified.
- `DONATION_EMAIL_FROM` can override the donation sender; the configured domain/address must be verified in Resend.
- Dynamic-form owner notifications and submitter thank-you emails use the same branded layout. Empty Prismic thank-you content falls back to the standard 2–3-business-day response message; `FORM_TEST_RECIPIENT` safely routes both emails to one testing inbox, and `FORMS_EMAIL_FROM` selects a verified sender once available.
- Avoid documenting or logging actual API keys.

---

## Stripe

- Installed versions: `stripe` `^18.3.0`, `@stripe/react-stripe-js` `^3.8.0`, `@stripe/stripe-js` `^7.6.1`.
- Use the global `stripe-best-practices` skill before using Stripe MCP, changing Stripe API behavior, or reviewing Stripe payment, subscription, invoice, webhook, or key-handling code.
- Donation UI lives in the `DonationForm` slice and `DonateForm`.
- Server routes live in `src/app/api`.
- Use `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` on the client and `STRIPE_SECRET_KEY` on the server.
- Webhooks must verify signatures with `STRIPE_WEBHOOK_SECRET`.
- On the current Basil API, subscription creation must expand `latest_invoice.confirmation_secret` and return `confirmation_secret.client_secret`; `latest_invoice.payment_intent` is no longer the supported source for the first invoice client secret.
- Allow Stripe to determine eligible payment methods instead of forcing `payment_method_types: ['card']` in PaymentIntent creation.

---

## Cloudflare Turnstile

- Installed version: `@marsidev/react-turnstile` `^1.1.0`.
- Dynamic forms use `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in the client.
- `/api/forms/submit` verifies tokens with `TURNSTILE_SECRET_KEY`.

---

## Supabase JS

- Installed version: `@supabase/supabase-js` `^2.48.1`.
- Current active usage is limited to `NewsletterForm`, which imports `src/lib/supabase.ts` and inserts into a `Newsletter` table.
- This project does not use Supabase auth, RLS migrations, roles, permissions, or an admin shell.
- Do not expand Supabase usage without a focused task and context update.

---

## Swiper

- Installed version: `swiper` `^11.2.6`.
- Used for carousel/slider experiences such as partner/store presentations.
- Keep slider configuration local to the component unless a reusable pattern emerges.

---

## Icons

- Installed libraries: `lucide-react` `^0.525.0`, `react-icons` `^5.4.0`.
- The current site uses React Icons for social/footer and button iconography in several places.
- Use the library already used by nearby components unless there is a clear reason to switch.

---

## Approved Installed Libraries

The approved dependency set is the current `dependencies` and `devDependencies` in `package.json`. Update this file when adding a new integration or introducing a project-wide usage rule.
