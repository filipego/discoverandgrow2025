import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("only the default Heading and Text body removes top spacing from its first H3", async () => {
  const [defaultSource, withLinksSource, multipleSource] = await Promise.all([
    readFile(new URL("./components/DefaultHeadingAndText.tsx", import.meta.url), "utf8"),
    readFile(new URL("./components/MultipleHeadingAndText.tsx", import.meta.url), "utf8"),
    readFile(new URL("./components/WithLinksHeadingAndText.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(defaultSource, /body\?\.\[0\]\?\.type === "heading3"/);
  assert.match(defaultSource, /bodyStartsWithH3 \? "mt-0" : "mt-10"/);
  assert.doesNotMatch(withLinksSource, /bodyStartsWithH3/);
  assert.doesNotMatch(multipleSource, /bodyStartsWithH3/);
});
