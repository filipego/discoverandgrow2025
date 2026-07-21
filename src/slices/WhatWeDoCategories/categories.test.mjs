import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const expectedCategories = [
  "Social and Emotional Learning for Schools",
  "Parenting Support & Education",
  "Community Campaigns & Awareness",
];

const expectedSliceFields = ["padding", "category"];

test("the What We Do model and category sections use the approved categories", () => {
  const customType = JSON.parse(
    readFileSync("customtypes/what_we_do/index.json", "utf8"),
  );
  const component = readFileSync(
    "src/slices/WhatWeDoCategories/index.tsx",
    "utf8",
  );
  const sliceModel = JSON.parse(
    readFileSync("src/slices/WhatWeDoCategories/model.json", "utf8"),
  );

  assert.deepEqual(
    customType.json.Main.category.config.options,
    expectedCategories,
  );

  for (const category of expectedCategories) {
    assert.match(component, new RegExp(JSON.stringify(category)));
  }

  assert.deepEqual(
    Object.keys(sliceModel.variations[0].primary),
    expectedSliceFields,
  );

  assert.deepEqual(
    sliceModel.variations[0].primary.category.config.options,
    expectedCategories,
  );
});

test("the slice renders only posts matching its selected category", () => {
  const component = readFileSync(
    "src/slices/WhatWeDoCategories/index.tsx",
    "utf8",
  );

  assert.match(
    component,
    /document\.data\.category === slice\.primary\.category/,
  );
  assert.doesNotMatch(component, /CATEGORY_SECTIONS/);
  assert.doesNotMatch(component, /fallbackUIDs/);
  assert.doesNotMatch(component, /HeaderAndText/);
  assert.doesNotMatch(component, /slice\.primary\.heading/);
  assert.doesNotMatch(component, /slice\.primary\.body/);
});
