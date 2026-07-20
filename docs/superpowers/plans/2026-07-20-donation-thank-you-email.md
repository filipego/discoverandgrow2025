# Donation Thank-You Email Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Send one branded Resend acknowledgment after each one-time donation and after only the first successful payment of a monthly donation.

**Architecture:** Keep Stripe as the source of payment truth. Pure helpers classify webhook events and normalize donor/gift data; the verified webhook uses those helpers to call a focused Resend sender that renders a React Email template. Stripe metadata and a Resend idempotency key prevent duplicate acknowledgments.

**Tech Stack:** Next.js App Router, TypeScript, Stripe Node SDK, Resend, React Email, Node test runner, Sharp.

## Global Constraints

- Keep the existing custom donation form and Stripe payment architecture.
- Send the full email once for a one-time donation and once for the first successful monthly payment only.
- Do not change newsletter or Supabase behavior.
- Use `https://www.tiktok.com/@discover.and.grow` for TikTok.
- Include “No goods or services were provided in exchange for this contribution.”
- Do not send live payments or donor emails during verification.

---

### Task 1: Event eligibility and data contract

**Files:**
- Create: `src/lib/donationAcknowledgment.ts`
- Create: `src/lib/donationAcknowledgment.test.mjs`
- Modify: `src/slices/DonationForm/DonateForm.tsx`

**Interfaces:**
- Produces: `isEligibleOneTimeDonation`, `isEligibleInitialMonthlyInvoice`, `formatDonationAmount`, `formatDonationDate`, and `DonationAcknowledgmentDetails`.
- Adds `donor_first_name` to Stripe metadata sent by both donation modes.

- [x] **Step 1: Write failing tests for event eligibility and formatting**

Test that `one-time` PaymentIntents qualify, monthly PaymentIntents do not, only `subscription_create` invoices qualify, and USD/date values render correctly.

- [x] **Step 2: Run the focused test and verify RED**

Run: `node --test src/lib/donationAcknowledgment.test.mjs`

Expected: FAIL because `src/lib/donationAcknowledgment.ts` does not exist.

- [x] **Step 3: Implement the pure helper contract**

Use narrow structural types so the helpers remain independent of webhook networking and can be tested without mocks.

- [x] **Step 4: Add `donor_first_name` to both form metadata payloads**

Use `donorInfo.firstName`; keep the existing full-name metadata.

- [x] **Step 5: Run focused tests and lint**

Run: `node --test src/lib/donationAcknowledgment.test.mjs && npx eslint src/lib/donationAcknowledgment.ts src/lib/donationAcknowledgment.test.mjs src/slices/DonationForm/DonateForm.tsx`

Expected: PASS with zero failures and zero lint errors.

### Task 2: Branded React Email and logo

**Files:**
- Create: `public/images/discover-and-grow-logo-email.png`
- Create: `src/emails/DonationThankYouEmail.tsx`
- Create: `src/emails/DonationThankYouEmail.test.mjs`
- Create: `src/lib/sendDonationThankYouEmail.ts`

**Interfaces:**
- Consumes: `DonationAcknowledgmentDetails`.
- Produces: `DonationThankYouEmail(props)` and `sendDonationThankYouEmail(details, idempotencyKey)`.

- [x] **Step 1: Write a failing rendered-email contract test**

Assert that representative rendered output contains the personalized greeting, amount/date/transaction reference, acknowledgment language, EIN, impact examples, receipt link, newsletter, Instagram, TikTok, website, email, and real logo path.

- [x] **Step 2: Run the email test and verify RED**

Run: `node --test src/emails/DonationThankYouEmail.test.mjs`

Expected: FAIL because the template does not exist.

- [x] **Step 3: Generate the email-safe logo**

Use Sharp to render `public/svg/D&GLongLogo.svg` as a transparent PNG sized for email display.

- [x] **Step 4: Implement the React Email template**

Use inline/email-safe styles, the approved letter, brand colors, conditional receipt button, alt text, and a mobile-friendly single column.

- [x] **Step 5: Implement the Resend sender**

Use `DONATION_EMAIL_FROM` with `Discover and Grow <info@discoverandgrow.org>` as the documented intended identity, `replyTo: info@discoverandgrow.org`, the React component, and the supplied Resend idempotency key. Throw when Resend reports an error.

- [x] **Step 6: Run email tests and lint**

Run: `node --test src/emails/DonationThankYouEmail.test.mjs && npx eslint src/emails/DonationThankYouEmail.tsx src/emails/DonationThankYouEmail.test.mjs src/lib/sendDonationThankYouEmail.ts`

Expected: PASS with zero failures and zero lint errors.

### Task 3: Stripe webhook delivery and persistent duplicate protection

**Files:**
- Modify: `src/app/api/webhooks/stripe/route.ts`
- Modify: `src/app/api/create-payment-intent/route.ts`
- Modify: `src/app/api/create-subscription/route.ts`
- Create: `src/app/api/webhooks/stripe/route.test.mjs`
- Modify: `context/architecture.md`
- Modify: `context/progress-tracker.md`

**Interfaces:**
- One-time source: expanded PaymentIntent and latest Charge receipt URL.
- Initial-monthly source: subscription metadata, invoice amount/date/reference, and hosted invoice or PDF URL.
- Sent markers: `donation_thank_you_email_sent=true` on PaymentIntent or Subscription metadata.
- Idempotency keys: `donation-thank-you/payment-intent/<id>` and `donation-thank-you/invoice/<id>`.

- [x] **Step 1: Write a failing webhook source-contract test**

Assert signature verification remains, one-time and initial-monthly eligibility helpers are used, renewal invoices are excluded by the helper contract, Resend delivery occurs before the Stripe sent marker, and the webhook throws on delivery failure.

- [x] **Step 2: Run the webhook test and verify RED**

Run: `node --test src/app/api/webhooks/stripe/route.test.mjs`

Expected: FAIL because the delivery integration is absent.

- [x] **Step 3: Implement one-time delivery**

Retrieve the PaymentIntent with `latest_charge` expanded, skip already-sent or ineligible events, send verified Stripe data to Resend, then persist the sent marker.

- [x] **Step 4: Implement initial-monthly delivery**

Resolve the subscription through the invoice parent, skip renewals and already-sent subscriptions, send the initial invoice acknowledgment, then persist the sent marker.

- [x] **Step 5: Preserve metadata on existing customers**

Update existing customers with current donor name and donation metadata so monthly invoice processing can resolve the current donor details.

- [x] **Step 6: Update project context**

Document Stripe webhook → React Email → Resend delivery, required sender/site URL configuration, and the first-payment-only monthly rule.

- [x] **Step 7: Run final verification**

Run: `node --test src/lib/donationAcknowledgment.test.mjs src/emails/DonationThankYouEmail.test.mjs src/app/api/webhooks/stripe/route.test.mjs`

Run: `npx eslint src/lib/donationAcknowledgment.ts src/lib/donationAcknowledgment.test.mjs src/emails/DonationThankYouEmail.tsx src/emails/DonationThankYouEmail.test.mjs src/lib/sendDonationThankYouEmail.ts src/app/api/webhooks/stripe/route.ts src/app/api/webhooks/stripe/route.test.mjs src/app/api/create-payment-intent/route.ts src/app/api/create-subscription/route.ts src/slices/DonationForm/DonateForm.tsx`

Run: `npx tsc --noEmit`

Run: `git diff --check`

Expected: focused tests and lint pass. Any pre-existing full-project TypeScript failures are reported separately with exact output.
