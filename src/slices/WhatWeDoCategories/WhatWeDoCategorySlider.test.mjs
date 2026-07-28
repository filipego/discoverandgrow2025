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

test("What We Do slider keeps one full card and a partial next card inside the content bleed", async () => {
  const source = await readFile(
    new URL("./WhatWeDoCategorySlider.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /slidesPerView: Math\.min\(items\.length, 1\.3\)/);
  assert.match(source, /!overflow-hidden/);
  assert.match(source, /px-1 pb-10 pt-2/);
  assert.match(source, /className="!h-auto pb-8"/);
  assert.doesNotMatch(source, /!overflow-visible/);
  assert.doesNotMatch(source, /flex-1 overflow-visible/);
});

test("What We Do cards use a responsive bottom-aligned media crop", async () => {
  const source = await readFile(
    new URL("./WhatWeDoCategorySlider.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /imageContainerClassName="aspect-video"/);
  assert.match(source, /imageClassName="object-bottom"/);
});

test("What We Do card copy uses a slightly reduced capped measure", async () => {
  const source = await readFile(
    new URL("./WhatWeDoCategorySlider.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /contentClassName="max-w-\[40rem\]"/);
});

test("What We Do card lists leave room before the following paragraph", async () => {
  const source = await readFile(
    new URL("./WhatWeDoCategorySlider.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /listClassName="mb-6"/);
});
