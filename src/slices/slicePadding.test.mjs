import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const paddingOptions = [
  "normal padding",
  "smaller padding",
  "no padding",
  "no top padding",
  "no bottom padding",
];

for (const sliceName of ["TextBlock", "VideoBlock"]) {
  test(`${sliceName} sends its selected padding to Bounded`, async () => {
    const [modelSource, componentSource] = await Promise.all([
      readFile(new URL(`./${sliceName}/model.json`, import.meta.url), "utf8"),
      readFile(new URL(`./${sliceName}/index.tsx`, import.meta.url), "utf8"),
    ]);
    const model = JSON.parse(modelSource);

    assert.deepEqual(model.variations[0].primary.padding.config.options, paddingOptions);
    assert.match(componentSource, /const padding = primary\.padding \?\? "normal padding"/);
    assert.match(componentSource, /padding=\{padding\}/);
  });
}
