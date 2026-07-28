import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the Canva frame clips its player to slightly rounded edges", async () => {
  const source = await readFile(
    new URL("./LazyCanvaPlayer.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /rounded-xl/);
  assert.match(source, /overflow-hidden/);
});
