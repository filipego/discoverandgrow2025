import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const footer = readFileSync("src/app/components/Footer.tsx", "utf8");

test("mobile footer legal row shares the footer copy left edge", () => {
  assert.match(
    footer,
    /rounded-full px-0 py-4 md:flex-row md:items-center md:gap-0 md:border/,
  );
});
