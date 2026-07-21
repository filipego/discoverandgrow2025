import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const paymentIntentRoute = readFileSync(
  "src/app/api/create-payment-intent/route.ts",
  "utf8",
);
const subscriptionRoute = readFileSync(
  "src/app/api/create-subscription/route.ts",
  "utf8",
);
const customerPortalRoute = readFileSync(
  "src/app/api/customer-portal/route.ts",
  "utf8",
);
const donationForm = readFileSync(
  "src/slices/DonationForm/DonateForm.tsx",
  "utf8",
);

test("one-time donations preserve donor details and request a Stripe receipt", () => {
  assert.match(paymentIntentRoute, /receipt_email:\s*customer_email/);
  assert.match(paymentIntentRoute, /customers\.update/);
  assert.match(paymentIntentRoute, /metadata:\s*\{[\s\S]*\.\.\.metadata/);
});

test("monthly donations preserve donor details on existing customers", () => {
  assert.match(subscriptionRoute, /customers\.update/);
  assert.match(subscriptionRoute, /metadata:\s*\{[\s\S]*\.\.\.metadata/);
});

test("monthly donations return the current Invoice confirmation secret", () => {
  assert.match(
    subscriptionRoute,
    /expand:\s*\[\s*["']latest_invoice\.confirmation_secret["']\s*\]/,
  );
  assert.match(subscriptionRoute, /invoice\.confirmation_secret\?\.client_secret/);
  assert.doesNotMatch(subscriptionRoute, /latest_invoice\.payment_intent/);
});

test("the donation reset button does not submit the payment form", () => {
  assert.match(
    donationForm,
    /<button\s+type=["']button["'][\s\S]{0,600}Make Another Donation/,
  );
});

test("one-time donations let Stripe select eligible payment methods", () => {
  assert.doesNotMatch(paymentIntentRoute, /payment_method_types/);
  assert.doesNotMatch(donationForm, /payment_method_types/);
});

test("all donation routes use the installed Stripe API version", () => {
  for (const route of [paymentIntentRoute, subscriptionRoute, customerPortalRoute]) {
    assert.match(route, /apiVersion:\s*["']2025-06-30\.basil["']/);
  }
});
