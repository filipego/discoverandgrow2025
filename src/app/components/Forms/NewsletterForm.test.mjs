import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(
  "src/app/components/Forms/NewsletterForm.tsx",
  "utf8",
);

test("newsletter uses invisible Turnstile verification before submission", () => {
  assert.match(source, /Turnstile, type TurnstileInstance/);
  assert.match(source, /useRef<TurnstileInstance/);
  assert.match(source, /size:\s*["']invisible["']/);
  assert.match(source, /execution:\s*["']execute["']/);
  assert.match(source, /turnstileRef\.current\.execute\(\)/);
  assert.match(source, /turnstileToken/);
});

test("newsletter submits the pending email only after verification succeeds", () => {
  assert.match(source, /const pendingData = pendingSubmission\.current/);
  assert.match(source, /void submitNewsletter\(pendingData, token\)/);
  assert.match(source, /turnstileToken,?/);
  assert.match(source, /isCaptchaVerifying/);
  assert.match(source, /CAPTCHA_ERROR/);
});
