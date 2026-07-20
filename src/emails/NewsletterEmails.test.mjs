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
