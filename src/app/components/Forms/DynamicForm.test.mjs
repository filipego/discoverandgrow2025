import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const source = readFileSync(
  "src/app/components/Forms/DynamicForm.tsx",
  "utf8",
);

test("hidden CAPTCHA uses Turnstile's invisible execute flow", () => {
  assert.match(source, /useRef<TurnstileInstance/);
  assert.match(source, /size:\s*showCaptcha\s*\?\s*["']normal["']\s*:\s*["']invisible["']/);
  assert.match(source, /execution:\s*showCaptcha\s*\?\s*["']render["']\s*:\s*["']execute["']/);
  assert.match(source, /turnstileRef\.current\.execute\(\)/);
});

test("hidden CAPTCHA does not keep a valid form's submit button disabled", () => {
  assert.match(
    source,
    /\(!enableCaptcha\s*\|\|\s*!showCaptcha\s*\|\|\s*Boolean\(turnstileToken\)\)/,
  );
});

test("labels use the same effective-required rule as the submit button", () => {
  assert.match(source, /const hasExplicitRequiredFields = formFields\.some\(/);
  assert.match(source, /const isFieldRequired = \(field: FormField\) =>/);
  assert.match(source, /required:\s*isFieldRequired\(field\)/);
});
