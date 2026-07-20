# Single-Category What We Do Slider Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `WhatWeDoCategories` into a reusable slice that renders one category’s posts per slice instance.

**Architecture:** The Slice Machine model exposes a `category` field alongside its existing padding field. The server slice renderer fetches `what_we_do` documents once and renders `WhatWeDoCategorySlider` with only documents matching `slice.primary.category`; a separate Text Block slice provides any introductory copy.

**Tech Stack:** Next.js App Router, React, TypeScript, Prismic, Slice Machine, Node test runner, ESLint.

## Global Constraints

- Preserve the three exact category values: Social and Emotional Learning for Schools; Parenting Support & Education; Community Campaigns & Awareness.
- Update the Slice Machine model using its UI, not manual model JSON edits.
- Do not manually edit generated `prismicio-types.d.ts` or `src/slices/index.ts`.
- Use `Bounded` and the existing `WhatWeDoCategorySlider`; place a Text Block slice above the carousel when introductory copy is needed.
- Do not create a commit unless the user requests one.

---

### Task 1: Define the single-category slice contract

**Files:**

- Modify: `src/slices/WhatWeDoCategories/model.json` via Slice Machine
- Modify: `src/slices/WhatWeDoCategories/mocks.json` through Slice Machine generation plus a meaningful mock update
- Modify: `src/slices/WhatWeDoCategories/categories.test.mjs`

**Interfaces:**

- Produces slice primary fields: `padding` and `category`.
- `category` is a select field with the three approved category values.

- [x] **Step 1: Write the failing model-contract test**

```js
assert.deepEqual(Object.keys(sliceModel.variations[0].primary), [
  "padding",
  "category",
]);
assert.deepEqual(
  sliceModel.variations[0].primary.category.config.options,
  expectedCategories,
);
```

- [x] **Step 2: Run the focused test and confirm it fails on the old six field IDs**

Run: `node --test src/slices/WhatWeDoCategories/categories.test.mjs`

- [x] **Step 3: Update the Slice Machine model**

Remove the six category-specific intro fields and retain only `category` (Select with the approved values) plus `padding`.

- [x] **Step 4: Confirm generated Prismic types update through Slice Machine and run the focused test**

Run: `node --test src/slices/WhatWeDoCategories/categories.test.mjs`

### Task 2: Filter one slider by the selected category

**Files:**

- Modify: `src/slices/WhatWeDoCategories/index.tsx`
- Modify: `src/slices/WhatWeDoCategories/categories.test.mjs`

**Interfaces:**

- Consumes: `slice.primary.category`.
- Produces: one `WhatWeDoCategorySlider` for matching posts; a Text Block slice placed above it supplies introductory copy.

- [x] **Step 1: Write the failing renderer-contract test**

```js
assert.match(
  component,
  /document\.data\.category === slice\.primary\.category/,
);
assert.doesNotMatch(component, /fallbackUIDs/);
assert.doesNotMatch(component, /CATEGORY_SECTIONS/);
```

- [x] **Step 2: Run the focused test and confirm it fails because the current renderer groups three categories**

Run: `node --test src/slices/WhatWeDoCategories/categories.test.mjs`

- [x] **Step 3: Implement the minimal renderer**

```tsx
if (!slice.primary.category) return null;

const items = documents.filter(
  (document) => document.data.category === slice.primary.category,
);

if (items.length === 0) return null;
```

Pass `items` to `WhatWeDoCategorySlider`.

- [x] **Step 4: Run the focused test and lint check**

Run: `node --test src/slices/WhatWeDoCategories/categories.test.mjs && npx eslint src/slices/WhatWeDoCategories/index.tsx src/slices/WhatWeDoCategories/categories.test.mjs`

### Task 3: Document and visually verify reuse

**Files:**

- Modify: `docs/superpowers/specs/2026-07-18-what-we-do-categories-design.md`
- Modify: `context/ui-registry.md`
- Modify: `context/progress-tracker.md`

- [x] **Step 1: Replace the fixed-three-section behavior in the feature spec with the reusable selected-category behavior**

- [x] **Step 2: Update the UI registry and progress tracker with the new reusable-slice contract**

- [x] **Step 3: Verify Slice Machine shows only the four primary fields and category options**

- [ ] **Step 4: Verify a local page with a selected category renders only posts assigned to that category**

Deferred until the editor replaces the currently incorrect `what_we_do` post content and publishes at least one post under a selected category.

- [x] **Step 5: Run final focused verification**

Run: `node --test src/slices/WhatWeDoCategories/categories.test.mjs && npx eslint src/slices/WhatWeDoCategories/index.tsx src/slices/WhatWeDoCategories/categories.test.mjs && git diff --check`
