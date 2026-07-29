# Newsletter Invisible CAPTCHA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement task-by-task.

**Goal:** Stop automated newsletter submissions with the existing invisible CAPTCHA pattern, without changing the visible footer form.

**Architecture:** The newsletter form runs the invisible browser check after Subscribe and forwards the returned token to `/api/emails`. The route verifies that token before it sends anything through Resend.

**Tech Stack:** Next.js, React Hook Form, `@marsidev/react-turnstile`, Cloudflare Turnstile, Node test runner.

## Global Constraints

- Preserve the visible footer layout, copy, input, and button styling.
- Use `NEXT_PUBLIC_TURNSTILE_SITE_KEY` only in the browser and `TURNSTILE_SECRET_KEY` only in the API route.
- Block all newsletter Resend work unless verification succeeds.
- Do not change Prismic models, Resend recipients, segments, or email templates.

### Task 1: Add failing regression tests

**Files:** Create `src/app/components/Forms/NewsletterForm.test.mjs`; modify `src/app/api/emailDeliveryRecipients.test.mjs`.

- [ ] Write a client source test asserting `Turnstile`, `TurnstileInstance`, `size: 'invisible'`, `execution: 'execute'`, `turnstileRef.current.execute()`, and `turnstileToken` are present.
- [ ] Run `node --test src/app/components/Forms/NewsletterForm.test.mjs`; confirm it fails because the form has no CAPTCHA code.
- [ ] Add an API source test requiring request `turnstileToken`, `https://challenges.cloudflare.com/turnstile/v0/siteverify`, and a `400` response after unsuccessful verification.
- [ ] Run `node --test src/app/api/emailDeliveryRecipients.test.mjs`; confirm it fails because the newsletter route currently calls Resend without verification.

### Task 2: Implement client verification

**Files:** Modify `src/app/components/Forms/NewsletterForm.tsx`; test `src/app/components/Forms/NewsletterForm.test.mjs`.

- [ ] Add `turnstileToken`, `isCaptchaVerifying`, a `TurnstileInstance` ref, and one pending `FormData` ref.
- [ ] Split the current request function so it accepts a verified token, serializes `{ type: 'newsletter', data, turnstileToken }`, clears the token, and resets Turnstile afterward.
- [ ] On form submit, store the data and execute the invisible widget if no token exists; prevent a second execution while verification is active.
- [ ] On success, submit the stored data; on provider error, clear pending state and show a generic retry error.
- [ ] Add `<Turnstile>` with the public site key and `{ size: 'invisible', execution: 'execute', appearance: 'interaction-only' }` options, without adding layout classes.
- [ ] Make the button show `Verifying...` and remain disabled only during verification or submission.
- [ ] Run `node --test src/app/components/Forms/NewsletterForm.test.mjs`; expect PASS.

### Task 3: Implement the server gate

**Files:** Modify `src/app/(home)/api/emails/route.ts`; test `src/app/api/emailDeliveryRecipients.test.mjs`.

- [ ] Destructure `turnstileToken` from the request body and read `x-forwarded-for` or `x-real-ip`.
- [ ] In the newsletter branch, return `400` with `Security verification failed. Please try again.` when the token is absent.
- [ ] POST `{ secret: process.env.TURNSTILE_SECRET_KEY, response: turnstileToken, remoteip: ip }` to Cloudflare's siteverify endpoint.
- [ ] Return the same generic `400` response if the provider result does not succeed.
- [ ] Keep the existing contact creation and both existing email sends after this gate only.
- [ ] Run `node --test src/app/api/emailDeliveryRecipients.test.mjs`; expect PASS.

### Task 4: Verify and document

**Files:** Modify `context/architecture.md`, `context/ui-rules.md`, `context/ui-registry.md`, `context/library-docs.md`, and `context/progress-tracker.md`.

- [ ] Record that newsletter uses invisible browser verification and server validation before Resend work.
- [ ] Run `node --test src/app/components/Forms/NewsletterForm.test.mjs src/app/api/emailDeliveryRecipients.test.mjs src/app/components/Forms/DynamicForm.test.mjs`; expect PASS.
- [ ] Run `npm run build`; record unrelated baseline output separately if present.
- [ ] Start the local application and verify in the Codex in-app Browser that the footer looks unchanged, with only the short button verification state on submission.
