import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(
  "src/emails/DonationThankYouEmail.tsx",
  "utf8",
);
const normalizedSource = source.replace(/\s+/g, " ");

test("the donation email contains the approved personalized acknowledgment", () => {
  const requiredContent = [
    "Thank You for Supporting Discover and Grow",
    "firstName",
    "amount",
    "date",
    "transactionId",
    "Tax-Deductible Receipt",
    "87-1397816",
    "No goods or services were provided in exchange for this contribution.",
    "<strong>$25</strong> provides SEL materials for a classroom",
    "<strong>$100</strong> funds a student SEL session",
    "<strong>$500</strong> sponsors a parent in our 8-week Circle of Security® Parenting cohort",
    "Gladys Henriquez",
    "Founder &amp; Executive Director",
  ];

  for (const content of requiredContent) {
    assert.match(
      normalizedSource,
      new RegExp(content.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }
});

test("the donation email uses the real brand logo and approved links", () => {
  const requiredLinks = [
    "logoUrl",
    "receiptUrl",
    "https://www.discoverandgrow.org/#newsletter",
    "https://www.instagram.com/Discoverandgrow/",
    "https://www.tiktok.com/@discover.and.grow",
    "https://www.discoverandgrow.org",
    "mailto:info@discoverandgrow.org",
  ];

  for (const link of requiredLinks) {
    assert.match(source, new RegExp(link.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(source, /alt="Discover and Grow"/);
});
