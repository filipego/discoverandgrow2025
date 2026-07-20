import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("the retired static contact-form email path is no longer available", () => {
  assert.equal(existsSync("src/emails/ContactFormEmail.tsx"), false);
  assert.equal(existsSync("src/emails/ContactFormNotificationEmail.tsx"), false);
  assert.equal(existsSync("src/app/components/Forms/ContactForm.tsx"), false);

  const textAndFormSource = readFileSync(
    "src/slices/TextAndForm/index.tsx",
    "utf8",
  );
  const textAndFormModel = readFileSync(
    "src/slices/TextAndForm/model.json",
    "utf8",
  );
  const textAndFormMocks = readFileSync(
    "src/slices/TextAndForm/mocks.json",
    "utf8",
  );
  const emailRoute = readFileSync("src/app/(home)/api/emails/route.ts", "utf8");

  assert.doesNotMatch(textAndFormSource, /ContactForm/);
  assert.doesNotMatch(textAndFormModel, /Contact Form/);
  assert.doesNotMatch(textAndFormMocks, /Contact Form/);
  assert.doesNotMatch(emailRoute, /type === 'contact'/);
});
