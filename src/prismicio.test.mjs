import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("production Prismic reads are not retained behind a deployment cache", async () => {
  const source = await readFile(new URL("./prismicio.ts", import.meta.url), "utf8");

  assert.doesNotMatch(source, /cache:\s*["']force-cache["']/);
  assert.match(
    source,
    /process\.env\.NODE_ENV === "production"\s*\?\s*\{\s*cache:\s*["']no-store["']\s*\}/s,
  );
});

for (const route of [
  "./app/(home)/[uid]/page.tsx",
  "./app/(landingpages)/programs/[uid]/page.tsx",
  "./app/(whatwedo)/what_we_do/[uid]/page.tsx",
]) {
  test(`${route} renders Prismic documents on request`, async () => {
    const source = await readFile(new URL(route, import.meta.url), "utf8");

    assert.match(source, /export const dynamic = "force-dynamic";/);
  });
}
