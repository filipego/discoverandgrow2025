# Project Overview

## Product

Discover and Grow 2025 is the public website for Discover and Grow, a nonprofit organization. The site presents programs, organization information, partners, team content, forms, newsletter signup, donation flows, and an Etsy/store-style section.

The website is content-managed through Prismic. Editors manage homepage/page content, program detail pages, What We Do pages, settings/navigation/footer content, partner posts, and slice-driven page sections.

---

## Primary Audiences

- Caregivers, families, schools, and community members learning about Discover and Grow programs.
- Donors making one-time or recurring contributions.
- Prospective partners and collaborators.
- Site editors using Prismic and Slice Machine-backed content models.
- Developers maintaining the Next.js site, integrations, and reusable slice components.

---

## Current Route Map

| Route | Purpose |
| --- | --- |
| `/` | Prismic singleton `homepage`, rendered with `SliceZone` |
| `/:uid` | Repeatable Prismic `page` documents |
| `/what_we_do/:uid` | Repeatable Prismic `what_we_do` documents |
| `/programs/:uid` | Repeatable Prismic `programs` documents |
| `/slice-simulator` | Slice Machine simulator route |
| `/thank-you` | Static thank-you page |
| `/api/preview` | Prismic preview entry |
| `/api/exit-preview` | Prismic preview exit |
| `/api/revalidate` | Revalidates the `prismic` cache tag |
| `/api/forms/submit` | Dynamic Prismic form submission handler with Resend and optional Turnstile |
| `/api/emails` | Contact/newsletter/dynamic-form email handler |
| `/api/etsy` | Etsy active listings proxy |
| `/api/create-payment-intent` | Stripe one-time donation payment intent |
| `/api/create-subscription` | Stripe monthly donation subscription |
| `/api/customer-portal` | Stripe customer portal session |
| `/api/webhooks/stripe` | Stripe webhook receiver |

Route groups such as `(home)`, `(whatwedo)`, and `(landingpages)` are organizational only; public paths are determined by the child segments.

---

## Content Model

Current Prismic custom types:

- `homepage` - singleton homepage with slice zone and SEO metadata.
- `page` - repeatable generic page with UID, slice zone, and SEO metadata.
- `what_we_do` - repeatable program/category content with category, featured flag, image, title, body, link, slice zone, and SEO metadata.
- `programs` - repeatable landing/program page with UID, slice zone, and SEO metadata.
- `partner_post` - repeatable partner/testimonial-style content used by the Partners slice.
- `settings` - singleton site settings for metadata, navigation, CTA button, newsletter/donate/footer copy, badge, social links, and document links.

Shared slices live in `src/slices`. The generated component map in `src/slices/index.ts` should not be edited manually.

---

## Existing Foundation

### App Shell

- `src/app/(home)/layout.tsx` imports `src/app/globals.css`, generates metadata from Prismic `settings`, renders `Header`, `Footer`, and `PrismicPreview`.
- `Header` and `Footer` read the Prismic `settings` singleton.
- Pages fetch Prismic documents with `createClient` from `src/prismicio.ts`.

### UI System

- Shared project components live in `src/app/components`.
- Form field primitives live under `src/app/components/Forms/ui`.
- Page sections are primarily slice components in `src/slices`.
- Brand tokens and typography utilities are defined in `src/app/globals.css`.

### Integrations

- Prismic provides CMS content, routing, previews, and revalidation tags.
- Stripe powers one-time and monthly donation flows.
- Resend sends contact, newsletter, and dynamic-form emails.
- Cloudflare Turnstile is supported by dynamic forms.
- Supabase currently appears only as a legacy newsletter storage dependency.
- Etsy listing fetch is exposed through `/api/etsy`.

---

## Out of Scope Unless Requested

- Adding an admin dashboard, Supabase auth flow, roles, permissions, or RLS.
- Replacing Prismic with another CMS.
- Hand-editing generated Prismic type and slice map files.
- Reworking donation, email, or newsletter storage behavior without a focused task.
- Broad visual redesign outside the requested feature.

---

## Success Criteria

- Public pages continue to render Prismic content through the existing slice system.
- Navigation, metadata, footer, and shared settings remain editor-managed in Prismic.
- New UI follows existing components and brand tokens.
- Secrets remain in environment variables only.
- Context files stay aligned with the actual site as it evolves.
