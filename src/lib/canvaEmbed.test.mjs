import assert from "node:assert/strict";
import { getCanvaEmbedUrl } from "./canvaEmbed.mjs";
import test from "node:test";

test("converts a Canva share link into its embeddable player URL", () => {
  assert.equal(
    getCanvaEmbedUrl(
      "https://www.canva.com/design/DAHQhHbv3Mg/bkbjnODS1C434gBwe0gG4w/watch?utm_content=DAHQhHbv3Mg",
    ),
    "https://www.canva.com/design/DAHQhHbv3Mg/bkbjnODS1C434gBwe0gG4w/view?embed",
  );
});

test("rejects URLs outside Canva's public design paths", () => {
  assert.equal(getCanvaEmbedUrl("https://example.com/video"), null);
});
