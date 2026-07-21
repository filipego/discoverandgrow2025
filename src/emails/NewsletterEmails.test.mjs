import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const subscriberSource = readFileSync(
  "src/emails/NewsletterFormEmail.tsx",
  "utf8",
);
const adminSource = readFileSync(
  "src/emails/NewsletterFormNotificationEmail.tsx",
  "utf8",
);
const emailRouteSource = readFileSync(
  "src/app/(home)/api/emails/route.ts",
  "utf8",
);
const emailBrandingSource = readFileSync("src/lib/emailBranding.ts", "utf8");

test("both newsletter emails use Discover and Grow branding", () => {
  for (const source of [subscriberSource, adminSource]) {
    assert.match(source, /<Preview>/);
    assert.match(source, /alt="Discover and Grow"/);
    assert.match(source, /logoUrl/);
    assert.match(source, /#29285D/);
    assert.match(source, /#2CA382/);
    assert.match(source, /https:\/\/www\.discoverandgrow\.org/);
    assert.match(source, /mailto:info@discoverandgrow\.org/);
    assert.doesNotMatch(source, /react\.email\/static/);
  }
});

test("the subscriber welcome email uses approved social links and useful copy", () => {
  assert.match(subscriberSource, /Welcome to the Discover and Grow Community/);
  assert.match(
    subscriberSource,
    /https:\/\/www\.instagram\.com\/Discoverandgrow\//,
  );
  assert.match(
    subscriberSource,
    /https:\/\/www\.tiktok\.com\/@discover\.and\.grow/,
  );
  assert.doesNotMatch(subscriberSource, /href="#"/);
});

test("the admin email clearly identifies the new subscriber", () => {
  assert.match(adminSource, /New Newsletter Subscriber/);
  assert.match(adminSource, /Email address/);
  assert.match(adminSource, /\{email\}/);
});

test("newsletter email previews and sends use a reachable logo source", () => {
  assert.match(emailBrandingSource, /EMAIL_LOGO_FALLBACK_URL/);
  assert.match(
    emailBrandingSource,
    /raw\.githubusercontent\.com\/filipego\/discoverandgrow2025/,
  );
  assert.match(emailRouteSource, /getEmailLogoUrl/);
  assert.match(emailRouteSource, /logoUrl/);
  for (const source of [subscriberSource, adminSource]) {
    assert.match(source, /EMAIL_LOGO_URL/);
  }
  assert.match(emailBrandingSource, /EMAIL_LOGO_PREVIEW_URL/);
  assert.match(emailBrandingSource, /\/static\/discover-and-grow-logo-email\.png/);
});
