import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("BasicCard supports an opt-in fixed media crop", async () => {
  const source = await readFile(new URL("./BasicCard.tsx", import.meta.url), "utf8");

  assert.match(source, /imageContainerClassName\?: string;/);
  assert.match(source, /imageClassName\?: string;/);
  assert.match(source, /clsx\("w-full overflow-hidden rounded-t-xl", imageContainerClassName\)/);
  assert.match(source, /clsx\("w-full h-full object-cover", imageClassName\)/);
});

test("BasicCard supports spacing below rich-text lists when requested", async () => {
  const source = await readFile(new URL("./BasicCard.tsx", import.meta.url), "utf8");

  assert.match(source, /listClassName\?: string;/);
  assert.match(source, /clsx\("list-disc pl-10 space-y-2", listClassName\)/);
});
