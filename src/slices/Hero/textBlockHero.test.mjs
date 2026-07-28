import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const root = new URL("../../../", import.meta.url);

test("Hero exposes a Text Block variation with the existing Text Block rich-text presentation", async () => {
  const [modelSource, heroSource, textBlockHeroSource] = await Promise.all([
    readFile(new URL("./model.json", import.meta.url), "utf8"),
    readFile(new URL("./index.tsx", import.meta.url), "utf8"),
    readFile(new URL("./components/TextBlockHero.tsx", import.meta.url), "utf8"),
  ]);
  const model = JSON.parse(modelSource);
  const variation = model.variations.find(({ id }) => id === "textBlock");

  assert.equal(variation?.name, "Text Block");
  assert.deepEqual(Object.keys(variation.primary), ["body"]);
  assert.match(heroSource, /variation === "textBlock"/);
  assert.match(heroSource, /<TextBlockHero body=\{slice\.primary\.body\}/);

  assert.match(textBlockHeroSource, /max-w-\[970px\] px-0 lg:mb-10 lg:px-\[50px\]/);
  assert.match(textBlockHeroSource, /as="h2"[\s\S]*size="xl"/);
  assert.match(textBlockHeroSource, /as="h3"[\s\S]*size="xl"/);
  assert.match(textBlockHeroSource, /as="h4"[\s\S]*size="xl"/);
  assert.match(textBlockHeroSource, /mb-4 max-w-prose leading-relaxed text-brand-gray lg:mb-6/);
});
