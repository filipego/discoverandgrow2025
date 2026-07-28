import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Bounded supports double bottom padding without changing normal top padding", async () => {
  const source = await readFile(new URL("./Bounded.tsx", import.meta.url), "utf8");

  assert.match(source, /\| "double bottom padding"/);
  assert.match(
    source,
    /padding === "double bottom padding" && "pt-5 pb-10 lg:pt-10 lg:pb-20"/,
  );
});
