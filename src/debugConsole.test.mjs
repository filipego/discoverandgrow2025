import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const productionFiles = [
  "src/app/(home)/api/etsy/route.ts",
  "src/app/components/Forms/DynamicForm.tsx",
  "src/slices/DonationForm/DonateForm.tsx",
  "src/slices/ImageBlock/index.tsx",
  "src/slices/Store/StoreClientComponent.tsx",
];

test("production code contains no leftover console.log debugging", () => {
  for (const file of productionFiles) {
    const source = readFileSync(file, "utf8");
    assert.doesNotMatch(source, /console\.log\(/, file);
  }
});
