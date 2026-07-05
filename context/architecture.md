# Architecture

## Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Next.js `15.5.20` App Router | Server Components, layouts, pages, route handlers, metadata, and cache revalidation |
| Language | TypeScript `^5` | Typed application, routes, Prismic models, and integrations |
| Runtime UI | React `19.0.0` / React DOM `19.0.0` | Component rendering and client interactivity |
| Styling | Tailwind CSS `^4.0.0` + CSS custom properties | Brand utilities and responsive layout |
| CMS | Prismic + Slice Machine | Content models, custom types, shared slices, previews, and route resolving |
| CMS Packages | `@prismicio/client`, `@prismicio/next`, `@prismicio/react` | Prismic querying, image/link components, previews, and rich text |
| Animation | GSAP + `@gsap/react` | Header and interactive slice animation |
| Forms | React Hook Form + Zod | Static and Prismic-configured dynamic forms |
| Email | Resend + React Email | Contact, newsletter, and dynamic-form notification templates |
| Payments | Stripe server SDK + Stripe React/JS | One-time donations, subscriptions, customer portal, and webhooks |
| Bot protection | Cloudflare Turnstile | Dynamic form verification |
| Sliders | Swiper | Partner/store carousel experiences |
| Legacy storage | Supabase JS | Newsletter insert only; not the primary backend |

---

## Folder Structure

```text
/
├── AGENTS.md
├── context/                         # Project guidance for future agents
├── customtypes/                     # Prismic custom type models managed by Slice Machine
├── public/                          # Static images, fonts, favicon
├── slicemachine.config.json         # Prismic repository and Slice Machine config
├── prismicio-types.d.ts             # Generated Prismic TypeScript types
├── src/
│   ├── app/
│   │   ├── (home)/                  # Root layout, homepage, generic pages, Prismic API routes
│   │   ├── (landingpages)/programs/ # /programs/[uid]
│   │   ├── (whatwedo)/what_we_do/   # /what_we_do/[uid]
│   │   ├── api/                     # Stripe API routes and webhook
│   │   ├── components/              # Shared site components and form controls
│   │   ├── globals.css              # Brand tokens and global styles
│   │   └── thank-you/               # Static thank-you page
│   ├── emails/                      # React Email templates
│   ├── lib/                         # Utilities, rate limiting, dynamic validation, legacy Supabase client
│   ├── prismicio.ts                 # Prismic client, repository name, route resolvers
│   └── slices/                      # Shared Slice Machine slice components and models
└── package.json
```

---

## System Boundaries

| Area | Owns | Must Not Own |
| --- | --- | --- |
| `src/app/(home)` | Root public layout, homepage, generic Prismic page route, Prismic preview/revalidation/email/form/Etsy routes | Slice model definitions or Stripe webhook logic |
| `src/app/(landingpages)` | Program public route group | Generic page behavior |
| `src/app/(whatwedo)` | What We Do public route group | Generic page behavior |
| `src/app/api` | Stripe donation, subscription, portal, and webhook endpoints | Prismic content modeling |
| `src/app/components` | Shared website UI, navigation, footer, cards, forms, media players, sliders | Route-specific document fetching when a slice or page should own it |
| `src/app/components/Forms/ui` | Low-level form controls used by form components | Page section composition |
| `src/slices` | Slice renderers and slice-specific client components | Generated component map edits |
| `src/prismicio.ts` | Prismic repository name, route resolver, client factory, preview setup | UI rendering |
| `customtypes` and `src/slices/*/model.json` | Prismic models maintained by Slice Machine/Prismic CLI | Manual ad hoc edits without approval |
| `src/emails` | React Email templates | Form validation or request routing |
| `src/lib` | Small utilities and integration helpers | App-facing visual components |
| `context` | Project guidance | Secrets, generated artifacts, or stale boilerplate assumptions |

---

## Data Flow

### Prismic Page Render

```text
Request to public route
  -> page creates Prismic client via src/prismicio.ts
  -> fetch singleton or UID document
  -> generate metadata from document SEO fields
  -> render document slices with SliceZone and src/slices/index.ts
```

### Global Site Chrome

```text
Root layout
  -> fetch Prismic settings singleton for metadata
  -> render Header and Footer
  -> Header/Footer fetch settings for navigation, CTA, newsletter/donate/footer content
  -> PrismicPreview enables editor preview behavior
```

### Dynamic Forms

```text
Prismic Form slice
  -> DynamicForm builds React Hook Form schema from Prismic field config
  -> /api/forms/submit validates rate limit, Turnstile token, timing, and payload
  -> Resend sends notification and optional thank-you email
```

### Donations

```text
DonationForm slice
  -> Stripe Elements collects card details
  -> /api/create-payment-intent or /api/create-subscription creates Stripe objects
  -> client confirms payment
  -> /api/webhooks/stripe receives Stripe lifecycle events
```

### Cache and Preview

```text
Prismic client in production
  -> fetches with next tag "prismic" and force-cache
  -> /api/revalidate calls revalidateTag("prismic")
  -> /api/preview and /api/exit-preview handle Prismic preview sessions
```

---

## Environment Variables

Do not commit real values.

| Variable | Required For | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` | Optional | Overrides `slicemachine.config.json` repository name |
| `RESEND_API_KEY` | Email routes | Server-side Resend API access |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Dynamic forms | Browser-safe Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Dynamic form API route | Server-side Turnstile verification |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Donation form | Browser-safe Stripe Elements key |
| `STRIPE_SECRET_KEY` | Stripe API routes | Server-side Stripe API access |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook | Webhook signature verification |
| `NEXT_PUBLIC_SITE_URL` | Customer portal fallback | Return URL for Stripe portal |
| `ETSY_SHOP_ID` | Etsy API route | Etsy shop lookup |
| `ETSY_API_KEY` | Etsy API route | Etsy API request key |
| `NEXT_PUBLIC_SUPABASE_URL` | Legacy newsletter form | Supabase project URL for newsletter insert |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Legacy newsletter form | Supabase anon key for newsletter insert |

---

## Invariants

1. Prismic is the primary CMS and source of page content.
2. Pages use `createClient` from `src/prismicio.ts`.
3. Slice pages render through `SliceZone` and the generated slice component map.
4. Custom type and slice model changes should use Slice Machine/Prismic CLI workflows.
5. Do not manually edit generated files.
6. Shared UI belongs in `src/app/components`; slice-specific UI can live near its slice.
7. Brand styling comes from `src/app/globals.css` tokens and existing component patterns.
8. Server-only API keys stay in route handlers or server code.
9. Legacy Supabase usage should not be expanded without an explicit product decision.
10. Current `next.config.ts` ignores lint and TypeScript errors during build; do not treat a successful build as proof of type/lint correctness.
