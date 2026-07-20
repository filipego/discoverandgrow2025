import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("desktop navigation marks and underlines the active route", () => {
  const navigation = readFileSync("src/app/components/Navigation.tsx", "utf8");

  assert.match(navigation, /usePathname/);
  assert.match(navigation, /aria-current=\{isActive \? "page" : undefined\}/);
  assert.match(navigation, /after:bg-brand-blue/);
});
