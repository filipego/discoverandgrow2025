import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const brandedEmailFiles = [
  "src/emails/DonationThankYouEmail.tsx",
  "src/emails/NewsletterFormEmail.tsx",
  "src/emails/NewsletterFormNotificationEmail.tsx",
  "src/emails/DynamicFormEmail.tsx",
  "src/emails/DynamicThankYouEmail.tsx",
];

test("branded emails use the shared compact mobile layout", () => {
  for (const file of brandedEmailFiles) {
    const source = readFileSync(file, "utf8");

    assert.match(source, /EmailMobileStyles/);
    assert.match(source, /className="email-logo"/);
    assert.match(source, /className="email-content"/);
    assert.match(source, /className="email-heading"/);
  }
});

test("branded emails use a restrained logo size on desktop", () => {
  for (const file of brandedEmailFiles) {
    const source = readFileSync(file, "utf8");

    assert.match(source, /width="250"/);
    assert.match(source, /height="66"/);
    assert.match(source, /maxWidth: "250px"/);
  }
});
