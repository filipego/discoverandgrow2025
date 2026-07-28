import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("What We Do cards use only the link authored in Prismic", async () => {
  const source = await readFile(
    new URL("./WhatWeDoCategorySlider.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /getCardLink[\s\S]*=> item\.data\.link;/);
  assert.doesNotMatch(source, /item\.url/);
});
