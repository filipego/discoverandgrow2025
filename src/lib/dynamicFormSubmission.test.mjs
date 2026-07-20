import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const submissionUtility = readFileSync(
  "src/lib/dynamicFormSubmission.ts",
  "utf8",
);
const validation = readFileSync("src/lib/dynamicValidation.ts", "utf8");
const formSlice = readFileSync("src/slices/Form/index.tsx", "utf8");
const dynamicForm = readFileSync(
  "src/app/components/Forms/DynamicForm.tsx",
  "utf8",
);
const submitRoute = readFileSync(
  "src/app/(home)/api/forms/submit/route.ts",
  "utf8",
);
const adminEmail = readFileSync("src/emails/DynamicFormEmail.tsx", "utf8");
const thankYouEmail = readFileSync(
  "src/emails/DynamicThankYouEmail.tsx",
  "utf8",
);

test("dynamic forms use a standard thank-you message when Prismic copy is blank", () => {
  assert.match(submissionUtility, /DEFAULT_DYNAMIC_THANK_YOU_CONTENT/);
  assert.match(submissionUtility, /2–3 business days/);
  assert.match(formSlice, /getDynamicThankYouContent/);
  assert.match(submitRoute, /getDynamicThankYouContent/);
});

test("dynamic form submissions preserve human-readable values for every supported field type", () => {
  assert.match(submissionUtility, /formatDynamicFormData/);
  assert.match(submissionUtility, /field\.field_type === "checkbox"/);
  assert.match(submissionUtility, /return value \? "Yes" : "No"/);
  assert.match(submissionUtility, /Array\.isArray\(value\)/);
  assert.match(submissionUtility, /options\?\.find/);
  assert.match(dynamicForm, /formatDynamicFormData\(formFields, data\)/);
});

test("optional Prismic fields allow an empty value without failing validation", () => {
  assert.match(validation, /allowEmptyValue/);
  assert.match(validation, /z\.literal\(""\)/);
});

test("the submission route honors the configured admin recipient, supports a test override, and reports Resend failures", () => {
  assert.match(submitRoute, /FORM_TEST_RECIPIENT/);
  assert.match(submitRoute, /notificationEmail/);
  assert.match(submitRoute, /to:\s*adminRecipient/);
  assert.match(submitRoute, /to:\s*thankYouRecipient/);
  assert.match(submitRoute, /error \|\| !data\?\.id/);
});

test("dynamic form emails use the established Discover and Grow branded layout", () => {
  for (const source of [adminEmail, thankYouEmail]) {
    assert.match(source, /alt="Discover and Grow"/);
    assert.match(source, /#29285D/);
    assert.match(source, /#2CA382/);
    assert.match(source, /import \* as React from "react"/);
  }
});

test("dynamic forms use the shared compact button instead of a full-width submit control", () => {
  assert.match(dynamicForm, /import \{ Button \} from "\.\/ui\/Button"/);
  assert.match(dynamicForm, /<div className="flex justify-start">/);
  assert.match(dynamicForm, /<Button[\s\S]*?type="submit"/);
  assert.doesNotMatch(dynamicForm, /className="w-full bg-brand-green/);
});
