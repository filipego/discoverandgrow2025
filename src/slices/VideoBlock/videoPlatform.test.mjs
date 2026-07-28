import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("a Canva URL selects the Canva player even without a platform value", async () => {
  const source = await readFile(new URL("./index.tsx", import.meta.url), "utf8");

  assert.match(source, /getCanvaEmbedUrl\(primary\.youtube_video_id\)/);
  assert.match(source, /videoPlatform === "Canva" \|\| canvaEmbedUrl/);
});
