import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const donationForm = readFileSync("src/slices/DonationForm/DonateForm.tsx", "utf8");

test("donation success feedback uses the contact confirmation card styling", () => {
  assert.match(
    donationForm,
    /rounded-2xl border border-emerald-100 bg-white px-6 py-7 text-center shadow-sm/,
  );
  assert.match(
    donationForm,
    /mx-auto mb-4 flex size-11 items-center justify-center rounded-full bg-emerald-50 text-brand-green/,
  );
  assert.match(donationForm, /text-lg font-semibold text-black/);
  assert.match(donationForm, /text-sm leading-relaxed text-brand-gray/);
  assert.match(donationForm, /Thank you!/);
  assert.match(donationForm, /Your donation has been processed successfully\./);
  assert.match(donationForm, /Make Another Donation/);
});
