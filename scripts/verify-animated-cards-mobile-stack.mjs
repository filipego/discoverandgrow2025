import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentPath = new URL(
  "../src/slices/AnimatedCards/AnimatedCardsClient.tsx",
  import.meta.url,
);

test("Animated Cards provides a static, image-first mobile stack separate from desktop animation", async () => {
  const source = await readFile(componentPath, "utf8");

  assert.match(source, /className="lg:hidden[^"]*gap-/);
  assert.match(source, /className="hidden lg:flex/);

  const mobileBranchStart = source.indexOf('className="lg:hidden');
  const desktopBranchStart = source.indexOf('className="hidden lg:flex');

  assert.ok(mobileBranchStart >= 0, "expected a mobile-only card list");
  assert.ok(desktopBranchStart > mobileBranchStart, "expected desktop animation after mobile list");

  const mobileBranch = source.slice(mobileBranchStart, desktopBranchStart);
  assert.ok(
    mobileBranch.indexOf("<AnimatedCardImage") < mobileBranch.indexOf("<AnimatedCardContent"),
    "expected mobile card media before text content",
  );
});
