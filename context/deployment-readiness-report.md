# Deployment Readiness Report

Deployment checklist for the Discover and Grow public website.

---

## Current Project Status

- Framework: Next.js `15.5.20` App Router.
- CMS: Prismic with Slice Machine.
- Deployment target: Vercel-compatible Next.js app.
- Payments: Stripe.
- Email: Resend + React Email.
- Forms: React Hook Form, Zod, optional Cloudflare Turnstile.
- Newsletter audience: Resend Contacts in the `Newsletter subscribers` segment.

---

## Required Environment Variables

Set these in the deployment provider. Do not commit real values.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes for email routes | Server-side Resend API key |
| `RESEND_NEWSLETTER_SEGMENT_ID` | Yes for newsletter subscriptions | Server-side Resend segment receiving website newsletter contacts |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes for donations | Browser-safe Stripe publishable key |
| `STRIPE_SECRET_KEY` | Yes for donations | Server-side Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Yes for webhook | Stripe webhook signature verification |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes if captcha enabled | Browser-safe Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Yes if captcha enabled | Server-side Turnstile verification |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Stripe customer portal return URL |
| `ETSY_SHOP_ID` | If Etsy route is used | Etsy shop ID |
| `ETSY_API_KEY` | If Etsy route is used | Etsy API key |
| `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` | Optional | Prismic repository override |

---

## Prismic Checklist

- [ ] Confirm repository `discoverandgrow2025` or intended environment.
- [ ] Confirm custom types and shared slices are synced.
- [ ] Confirm `settings` singleton is published.
- [ ] Confirm homepage is published.
- [ ] Confirm required page/program/what-we-do documents are published.
- [ ] Confirm Prismic preview routes work.
- [ ] Configure publish webhook to hit `/api/revalidate` if production cache revalidation is required.

---

## Stripe Checklist

- [ ] Configure publishable and secret keys for the correct Stripe mode.
- [ ] Configure webhook endpoint for `/api/webhooks/stripe`.
- [ ] Configure `STRIPE_WEBHOOK_SECRET`.
- [ ] Test one-time donation.
- [ ] Test monthly donation/subscription.
- [ ] Test customer portal session if exposed in UI.

---

## Email and Forms Checklist

- [ ] Configure `RESEND_API_KEY`.
- [ ] Confirm sender domain/from address is production-ready.
- [ ] Confirm `RESEND_NEWSLETTER_SEGMENT_ID` targets the intended newsletter segment.
- [ ] Configure Turnstile keys if forms enable captcha.
- [ ] Test contact/newsletter/dynamic form success and error states.
- [ ] Confirm rate limiting behavior is acceptable for production traffic.

---

## Vercel Checklist

- [ ] Create or confirm Vercel project.
- [ ] Configure all required environment variables.
- [ ] Confirm Node version satisfies package requirements.
- [ ] Run `npm run build` locally.
- [ ] Run `npm run lint` or document current lint limitations.
- [ ] Deploy.
- [ ] Smoke-test homepage, generic pages, `/what_we_do/[uid]`, `/programs/[uid]`, forms, donation flow, preview, and revalidation.
- [ ] Check browser console and server logs.

---

## Known Risks

- `next.config.ts` ignores ESLint and TypeScript build errors, so `next build` can pass despite code issues.
- `npm run lint` currently fails on pre-existing lint debt across forms, emails, cards, slices, and navigation.
- `npm audit --omit=dev` still reports non-Next findings, including critical Swiper issues and a moderate unfixed `next -> postcss` advisory from Next's bundled dependency.
- Some routes/components contain testing-recipient comments for Resend emails.
- Some UI colors are still hardcoded rather than tokenized.

---

## Readiness Decision Template

```text
Decision: Ready / Not Ready
Date:
Environment:
Blocking Issues:
Non-Blocking Issues:
Verified By:
```
