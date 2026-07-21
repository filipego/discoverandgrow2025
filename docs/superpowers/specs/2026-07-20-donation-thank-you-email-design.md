# Donation Thank-You Email Design

**Date:** 2026-07-20

## Goal

Send a branded, personalized acknowledgment through Resend after a successful donation while Stripe continues to provide its standard payment receipt or subscription invoice.

The custom email is sent once for a one-time donation and once after the first successful payment of a new monthly donation. It is not sent for later monthly renewals.

## Delivery Architecture

- Stripe remains the payment processor and source of truth for payment success.
- The existing signed Stripe webhook triggers the custom email only after confirmed payment.
- React Email renders the email-safe HTML component.
- Resend delivers the email to the donor.
- Stripe independently sends its normal receipt or recurring invoice according to the account's customer-email settings.
- No newsletter or Supabase behavior changes are included in this feature.

## Trigger Rules

### One-time donation

Handle `payment_intent.succeeded` only when the PaymentIntent metadata identifies the donation as `one-time`.

### Initial monthly donation

Handle `invoice.payment_succeeded` only when `billing_reason` identifies the invoice as the subscription-creation invoice. Later subscription-cycle invoices do not trigger the custom email.

The monthly PaymentIntent's success event must not cause a duplicate email.

## Donor and Gift Data

The email receives server-verified values from Stripe rather than accepting payment details from the browser after checkout:

- Donor first name
- Donor email
- Donation amount and currency
- Successful payment date
- Stripe transaction reference
- One-time or monthly donation type
- Stripe receipt URL for one-time donations, when available
- Hosted invoice or invoice PDF URL for the initial monthly donation, when available

The donation endpoints will preserve the donor's first name in Stripe metadata so the webhook can reliably personalize the message.

## Email Content

**Subject:** Thank You for Supporting Discover and Grow 💛

The email contains:

- Personalized greeting using the donor's first name
- The approved thank-you letter
- Gift summary with amount, date, and Stripe transaction reference
- A button linking to the Stripe receipt or hosted invoice when available
- The 501(c)(3) tax-deductibility statement
- EIN 87-1397816
- “No goods or services were provided in exchange for this contribution.”
- Impact examples:
  - $25 provides SEL materials for a classroom
  - $100 funds a student SEL session
  - $500 sponsors a parent in the 8-week Circle of Security® Parenting cohort
- Gladys Henriquez's signature and contact information

The wording does not promise that a PDF is attached. It identifies the email as the written acknowledgment and links to Stripe's receipt or invoice when Stripe provides one.

## Branding

- Create an email-safe PNG from the same Discover and Grow long logo used in the site header and footer.
- Store the PNG with the site's public assets and reference it through the configured public site URL.
- Use the established brand palette: blue `#29285D`, green `#2CA382`, orange `#F15B3B`, off-white `#FAF9F6`, and white.
- Use email-safe typography and conservative table-based/React Email layout for Gmail, Outlook, and Apple Mail compatibility.
- Include useful plain text, alt text, and a mobile-friendly single-column layout.

## Links

- Newsletter: `https://www.discoverandgrow.org/#newsletter`
- Instagram: `https://www.instagram.com/Discoverandgrow/`
- TikTok: `https://www.tiktok.com/@discover.and.grow`
- Website: `https://www.discoverandgrow.org`
- Email: `mailto:info@discoverandgrow.org`

The newsletter URL uses the site's existing hash behavior, which scrolls to the footer form and focuses its email field.

## Sender

Use a verified Discover and Grow address through a deployment environment variable, with the intended display identity:

`Discover and Grow <info@discoverandgrow.org>`

Set replies to `info@discoverandgrow.org`. Production delivery requires `discoverandgrow.org` to be verified in Resend.

## Duplicate Prevention and Failure Handling

- Use a stable Resend idempotency key based on the successful Stripe payment or initial invoice ID.
- Persist a sent marker in the relevant Stripe object's metadata after delivery succeeds so retries outside Resend's idempotency window do not resend the letter.
- Return a webhook error when delivery fails so Stripe can retry the event.
- Log identifiers and error summaries without logging donor details, API keys, webhook secrets, or full event payloads.
- Continue verifying Stripe webhook signatures before processing events.

## Verification

- Unit-test the event eligibility rules for one-time donations, initial monthly payments, and renewal invoices.
- Unit-test donor and gift data mapping from Stripe objects.
- Render the React Email template with representative donation data and inspect the generated HTML.
- Verify links, alt text, amount/date formatting, receipt-link fallback, and mobile layout.
- Confirm Resend's idempotency key is stable for webhook retries.
- Use Stripe sandbox events and a safe test recipient; do not create or refund live payments during verification.

## Out of Scope

- Replacing Supabase newsletter storage
- Redesigning the newsletter email
- Sending the full thank-you letter on monthly renewals
- Migrating the existing Stripe checkout architecture or customer portal
- Changing Stripe Dashboard branding or invoice templates
