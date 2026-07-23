import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const emailRoute = readFileSync("src/app/(home)/api/emails/route.ts", "utf8");
const formRoute = readFileSync(
  "src/app/(home)/api/forms/submit/route.ts",
  "utf8",
);
const donationEmail = readFileSync("src/lib/sendDonationThankYouEmail.ts", "utf8");
const newsletterForm = readFileSync(
  "src/app/components/Forms/NewsletterForm.tsx",
  "utf8",
);

test("production email senders use the Discover and Grow inbox", () => {
  for (const source of [emailRoute, formRoute, donationEmail]) {
    assert.doesNotMatch(source, /onboarding@resend\.dev/);
  }

  assert.match(emailRoute, /Discover and Grow <info@discoverandgrow\.org>/);
  assert.match(formRoute, /Discover and Grow <info@discoverandgrow\.org>/);
});

test("newsletter and form acknowledgments go to the submitted email", () => {
  assert.match(emailRoute, /type === 'newsletter'[\s\S]*?to: email/);
  assert.match(emailRoute, /to: userEmailField\.value/);
  assert.match(donationEmail, /to: details\.email/);
});

test("owner notifications use the Discover and Grow inbox", () => {
  assert.match(emailRoute, /const DEFAULT_ADMIN_EMAIL = "info@discoverandgrow\.org"/);
  assert.match(emailRoute, /to: DEFAULT_ADMIN_EMAIL/);
  assert.match(formRoute, /const DEFAULT_ADMIN_EMAIL = "info@discoverandgrow\.org"/);
});

test("newsletter subscriptions are stored in Resend, not Supabase", () => {
  assert.doesNotMatch(newsletterForm, /@\/lib\/supabase/);
  assert.doesNotMatch(newsletterForm, /\.from\('Newsletter'\)/);
  assert.match(emailRoute, /RESEND_NEWSLETTER_SEGMENT_ID/);
  assert.match(emailRoute, /resend\.contacts\.create\(/);
  assert.match(emailRoute, /segments:\s*\[\{ id: newsletterSegmentId \}\]/);
});

test("newsletter errors are returned to the form instead of being reported as success", () => {
  assert.match(newsletterForm, /if \(!response\.ok\)/);
  assert.match(newsletterForm, /FORM_MESSAGES\.EMAIL_ERROR/);
  assert.match(emailRoute, /status: 502/);
});
