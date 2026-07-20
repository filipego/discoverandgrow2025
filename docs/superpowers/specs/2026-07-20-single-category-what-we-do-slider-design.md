# Single-Category What We Do Slider

Date: 2026-07-20
Status: Approved — awaiting implementation plan

## Goal

Replace the current fixed three-category `WhatWeDoCategories` slice with one reusable category slider. Each slice instance introduces one selected category and renders only the `what_we_do` posts assigned to that category.

## Slice fields

- `padding` — existing layout control.
- `category` — required select with these exact values:
  1. Social and Emotional Learning for Schools
  2. Parenting Support & Education
  3. Community Campaigns & Awareness

## Rendering behavior

1. Fetch `what_we_do` documents once for the slice instance.
2. Filter documents by the selected slice `category` value.
3. Render the existing `WhatWeDoCategorySlider`; introductory copy is supplied by a Text Block slice placed above it.
4. Render nothing when no category is selected or when the selected category has no matching posts.
5. Do not retain the temporary legacy-UID fallback; editors will replace the current posts with correctly categorized content.

## Reuse

Editors may insert this slice multiple times on the What We Do page or another landing page. Each instance can select a different category and provide page-specific introductory copy.

## Model migration

The model removes the existing category-specific intro fields:

- `parenting_support_heading` / `parenting_support_body`
- `community_campaigns_heading` / `community_campaigns_body`
- `sel_for_schools_heading` / `sel_for_schools_body`

After Slice Machine changes are synced, editors must add a Text Block and fresh slider slice instances, then choose each slider's category in Prismic.

## Verification

- Regression test verifies the slice model exposes only `padding` and `category`.
- Regression test verifies filtering uses the selected slice category and contains no legacy UID fallback.
- Slice Machine UI verifies the fields and select values.
- Local browser check verifies one slice displays only the matching category’s posts.
