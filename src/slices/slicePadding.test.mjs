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
  test(`${sliceName} exposes the standard per-slice padding controls`, async () => {
    const [modelSource, componentSource] = await Promise.all([
      readFile(new URL(`./${sliceName}/model.json`, import.meta.url), "utf8"),
      readFile(new URL(`./${sliceName}/index.tsx`, import.meta.url), "utf8"),
    ]);
    const model = JSON.parse(modelSource);
    const padding = model.variations[0].primary.padding;

    assert.deepEqual(padding.config.options, paddingOptions);
    assert.equal(padding.config.default_value, "normal padding");
    assert.match(componentSource, /padding=\{padding\}/);
  });
}
