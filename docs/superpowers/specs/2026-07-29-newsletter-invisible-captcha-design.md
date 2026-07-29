# Newsletter Invisible CAPTCHA Design

## Goal

Protect the existing footer newsletter signup from automated submissions without changing its visible layout or normal visitor flow.

## Chosen approach

Reuse the existing Cloudflare Turnstile invisible-execution pattern from `DynamicForm`.

When a visitor presses **Subscribe**, the newsletter form will obtain an invisible verification token in the browser. After successful verification, it will send the email address and token to `/api/emails`. The route will verify the token with Cloudflare before it creates a Resend contact or sends either newsletter email.

## Behavior

- The email field, Subscribe button, copy, styling, and footer layout stay unchanged.
- The verification runs in the background when the visitor submits.
- If Cloudflare needs the person to interact, it can show its standard challenge; otherwise the visitor sees no CAPTCHA widget.
- While verification is running, the button shows a verification state and cannot start duplicate submissions.
- A failed or missing token stops the request before Resend is called and presents a plain retry message.
- Direct automated requests to `/api/emails` without a valid token are rejected.

## Scope

- Update `NewsletterForm` client behavior.
- Add server-side token validation to the newsletter branch of `/api/emails`.
- Add focused regression tests for the invisible flow and server-side gate.
- Update the project context documentation and progress tracker for the newsletter CAPTCHA behavior.

## Non-goals

- No visual redesign.
- No changes to newsletter content, Resend segments, delivery recipients, or email templates.
- No changes to Prismic models.
