import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync("next.config.ts", "utf8");

test("Prismic can frame only the production slice simulator", () => {
  assert.match(source, /source:\s*"\/slice-simulator"/);
  assert.match(
    source,
    /frame-ancestors https:\/\/discoverandgrow2025\.prismic\.io/,
  );
  assert.match(source, /source:\s*"\/\(\(\?!slice-simulator\)\.\*\)"/);
  assert.equal(
    source.match(/key:\s*"X-Frame-Options"/g)?.length,
    1,
    "X-Frame-Options should remain on every route except /slice-simulator",
  );
});
