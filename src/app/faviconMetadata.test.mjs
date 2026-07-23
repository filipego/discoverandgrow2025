import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const layouts = [
  "src/app/(home)/layout.tsx",
  "src/app/(landingpages)/programs/layout.tsx",
  "src/app/(whatwedo)/what_we_do/layout.tsx",
];

test("every route-group root layout declares the shared favicon", () => {
  assert.equal(existsSync("src/app/favicon.ico"), false);

  for (const layout of layouts) {
    const source = readFileSync(layout, "utf8");
    assert.match(source, /icons:\s*\{\s*icon:\s*"\/favicon\.ico",?\s*\}/);
  }
});
