import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("Who We Are semantic fixes preserve accessible names and heading order", async () => {
  const [header, founders, board, partners] = await Promise.all([
    source("src/app/components/Header.tsx"),
    source("src/slices/OurTeam/components/FoundersLayout.tsx"),
    source("src/slices/OurTeam/components/BoardLayout.tsx"),
    source("src/slices/Partners/PartnerSliderComponent.tsx"),
  ]);

  assert.match(header, /<Link href="\/" aria-label="Discover and Grow home">/);
  assert.match(founders, /aria-label=\{`View \$\{person\.name \?\? "team member"\} on LinkedIn`\}/);
  assert.match(board, /aria-label=\{`View \$\{person\.name \?\? "team member"\} on LinkedIn`\}/);
  assert.match(partners, /<Heading\s+as="h3"/);
});

test("generic Prismic pages provide a fallback meta description", async () => {
  const page = await source("src/app/(home)/[uid]/page.tsx");

  assert.match(page, /const fallbackDescription =/);
  assert.match(page, /: fallbackDescription/);
});
