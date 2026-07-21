import assert from "node:assert/strict";
import test from "node:test";

import {
  formatDonationAmount,
  formatDonationDate,
  isEligibleInitialMonthlyInvoice,
  isEligibleOneTimeDonation,
} from "./donationAcknowledgment.ts";

test("only successful one-time donation PaymentIntents qualify", () => {
  assert.equal(
    isEligibleOneTimeDonation({
      metadata: { donation_type: "one-time" },
    }),
    true,
  );
  assert.equal(
    isEligibleOneTimeDonation({ metadata: { donation_type: "monthly" } }),
    false,
  );
  assert.equal(
    isEligibleOneTimeDonation({
      metadata: {
        donation_type: "one-time",
        donation_thank_you_email_sent: "true",
      },
    }),
    false,
  );
});

test("only the first paid monthly invoice qualifies", () => {
  assert.equal(
    isEligibleInitialMonthlyInvoice(
      { billing_reason: "subscription_create" },
      { metadata: {} },
    ),
    true,
  );
  assert.equal(
    isEligibleInitialMonthlyInvoice(
      { billing_reason: "subscription_cycle" },
      { metadata: {} },
    ),
    false,
  );
  assert.equal(
    isEligibleInitialMonthlyInvoice(
      { billing_reason: "subscription_create" },
      { metadata: { donation_thank_you_email_sent: "true" } },
    ),
    false,
  );
});

test("gift values use donor-friendly US formatting", () => {
  assert.equal(formatDonationAmount(2500, "usd"), "$25.00");
  assert.equal(formatDonationDate(1784577600), "July 20, 2026");
});
