import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync("src/app/api/webhooks/stripe/route.ts", "utf8");

test("the Stripe webhook sends only eligible donation acknowledgments", () => {
  assert.match(source, /isEligibleOneTimeDonation/);
  assert.match(source, /isEligibleInitialMonthlyInvoice/);
  assert.match(source, /sendDonationThankYouEmail/);
  assert.match(source, /billing_reason/);
  assert.match(source, /subscription_details\?\.subscription/);
});

test("the webhook includes receipt data and duplicate-delivery protection", () => {
  assert.match(source, /expand:\s*\[\s*["']latest_charge["']\s*\]/);
  assert.match(source, /receipt_url/);
  assert.match(source, /hosted_invoice_url/);
  assert.match(source, /donation_thank_you_email_sent/);
  assert.match(source, /donation-thank-you\/payment-intent/);
  assert.match(source, /donation-thank-you\/invoice/);

  const sendIndex = source.indexOf("await sendDonationThankYouEmail");
  const markerIndex = source.indexOf("donation_thank_you_email_sent: \"true\"");
  assert.ok(sendIndex >= 0 && markerIndex > sendIndex);
});
