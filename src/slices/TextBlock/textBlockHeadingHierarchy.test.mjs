import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

test("Text Block gives H3 and H4 a smaller shared heading hierarchy with compact spacing", async () => {
  const source = await readFile(new URL("./index.tsx", import.meta.url), "utf8");

  assert.match(source, /heading2:[\s\S]*as="h2"[\s\S]*size="xl"/);
  assert.match(source, /heading3:[\s\S]*as="h3"[\s\S]*size="md"[\s\S]*className="mb-3 max-w-2xl font-semibold lg:mb-4"/);
  assert.match(source, /heading4:[\s\S]*as="h4"[\s\S]*size="sm"[\s\S]*className="mb-3 max-w-xl font-semibold lg:mb-4"/);
  assert.match(source, /heading5:[\s\S]*as="h5"[\s\S]*size="xs"[\s\S]*className="mb-3 max-w-lg font-semibold lg:mb-4"/);
  assert.match(source, /heading6:[\s\S]*as="h6"[\s\S]*size="xs"[\s\S]*className="mb-3 max-w-lg font-semibold lg:mb-4"/);
  assert.doesNotMatch(source, /heading[34]:[\s\S]*mb-10 font-semibold lg:mb-20/);
});
