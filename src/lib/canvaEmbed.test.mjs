import assert from "node:assert/strict";
import test from "node:test";

let getCanvaEmbedUrl;

try {
  ({ getCanvaEmbedUrl } = await import("./canvaEmbed.mjs"));
} catch {
  // The first test run proves the adapter must be implemented.
}

test("converts a Canva share link into its embeddable player URL", () => {
  assert.equal(typeof getCanvaEmbedUrl, "function");
  assert.equal(
    getCanvaEmbedUrl(
      "https://www.canva.com/design/DAHQhHbv3Mg/bkbjnODS1C434gBwe0gG4w/watch?utm_content=DAHQhHbv3Mg",
    ),
    "https://www.canva.com/design/DAHQhHbv3Mg/bkbjnODS1C434gBwe0gG4w/watch?embed",
  );
});

test("rejects URLs outside Canva's public design paths", () => {
  assert.equal(typeof getCanvaEmbedUrl, "function");
  assert.equal(getCanvaEmbedUrl("https://example.com/video"), null);
});
