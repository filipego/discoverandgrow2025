# Discover and Grow Launch Checklist

Use this checklist before pointing the public domain at the new Vercel site. Do not add secrets to this file or commit them anywhere.

## 1. Prepare the production URL and domain

- [ ] Create or confirm the Discover and Grow Vercel project.
- [ ] Deploy the current `codex/site-updates` branch (or the merged `main` branch) to Vercel.
- [ ] Add `discoverandgrow.org` and `www.discoverandgrow.org` to the Vercel project.
- [ ] In Bluehost DNS, replace the current website records with the exact Vercel DNS records shown by Vercel.
- [ ] Choose one canonical domain in Vercel and redirect the other domain to it.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to that canonical HTTPS URL.
- [ ] Wait for Vercel to confirm the SSL certificate, then test both domains in a private browser window.

## 2. Configure Vercel environment variables

Add the existing production values in Vercel for the appropriate Production, Preview, and Development environments. Never paste them into source files.

- [ ] `RESEND_API_KEY`
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET` (after creating the new Stripe webhook below)
- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- [ ] `TURNSTILE_SECRET_KEY`
- [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] `ETSY_SHOP_ID` and `ETSY_API_KEY`, if the Etsy section remains enabled
- [ ] `NEXT_PUBLIC_PRISMIC_ENVIRONMENT`, only if the default repository is not correct
- [ ] `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` only until the newsletter storage migration is complete

## 3. Move email from testing to production

- [ ] Add and verify the Discover and Grow sending domain in Resend.
- [ ] Configure `FORMS_EMAIL_FROM` in Vercel as a verified sender, for example `Discover and Grow <info@discoverandgrow.org>`.
- [ ] Configure `DONATION_EMAIL_FROM` with the same verified sender if it is not already set.
- [ ] Remove `FORM_TEST_RECIPIENT` in Production. This is essential: while it exists, both form emails go only to the test inbox.
- [ ] Keep `FORM_TEST_RECIPIENT=info@discoverandgrow.org` only in a Preview environment when testing with Resend's onboarding sender.
- [ ] Submit one contact form and one newsletter form after the Resend domain is verified. Confirm both the owner notification and visitor email arrive with the correct branding.

## 4. Configure Stripe for the new live site

- [ ] Confirm Vercel Production uses Stripe live-mode keys, not test keys.
- [ ] In Stripe live mode, add a webhook endpoint at `https://YOUR-CANONICAL-DOMAIN/api/webhooks/stripe`.
- [ ] Subscribe that webhook to the donation events required by this project, then copy its signing secret to Vercel as `STRIPE_WEBHOOK_SECRET`.
- [ ] Keep the old Bluehost/WordPress Stripe webhook active until the old site is fully retired, if it is still needed.
- [ ] Run one controlled live donation after launch and confirm the payment, Stripe receipt, Discover and Grow email, and Stripe webhook delivery.
- [ ] Run one controlled monthly donation/subscription test and confirm the first payment and customer portal behavior.

## 5. Confirm Prismic content and caching

- [ ] Publish the current `settings` document.
- [ ] Publish the homepage, contact, donate, get involved, and all required generic pages.
- [ ] Publish the three What We Do categories and their posts after replacing the placeholder content.
- [ ] Add a Text Block plus one category-filtered program slider for each What We Do category, then publish/revalidate.
- [ ] Publish the local slice-model changes through Slice Machine if any model changes remain unpublished.
- [ ] Configure Prismic's publish webhook to call the production revalidation endpoint if cached content needs immediate updates.
- [ ] Test Prismic preview and publishing/revalidation on the production URL.

## 6. Newsletter follow-up

- [ ] Decide when to replace the legacy Supabase newsletter insert with Resend Contacts.
- [ ] Before removing Supabase, implement normalized-email duplicate handling and a Resend contact segment/topic.
- [ ] Confirm future newsletter campaigns use the chosen Resend Broadcasts workflow and include unsubscribe handling.

## 7. Final production smoke test

- [ ] Test desktop and mobile navigation, active nav underline, footer newsletter link, and all social links.
- [ ] Test the contact form, a landing-page dynamic form, newsletter signup, and both email messages for each.
- [ ] Test one-time and monthly donation flows without storing a card or using a real donation unless intentionally running the controlled post-launch test.
- [ ] Test `/what-we-do`, category pages, `/get-involved`, `/contact`, `/donate`, and `/programs/[uid]`.
- [ ] Check Vercel function logs, browser console errors, and Stripe webhook attempts after the smoke test.
- [ ] Record the deployment URL, date, and anything deferred in the project tracker.

## Known technical follow-ups (not launch blockers if unaffected)

- [ ] Resolve the existing standalone TypeScript errors in `ButtonLink`, `Store`, and `TabPanel`.
- [ ] Resolve the broader legacy lint debt and stop ignoring lint/type errors in `next.config.ts` when the project is ready.
- [ ] Review remaining `npm audit --omit=dev` findings.
