import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const layout = readFileSync("src/app/(home)/layout.tsx", "utf8");

test("Prismic preview runtime is always available to start editor previews", () => {
  assert.doesNotMatch(layout, /import \{ draftMode \} from "next\/headers"/);
  assert.match(layout, /<PrismicPreview repositoryName=\{repositoryName\} \/>/);
});
