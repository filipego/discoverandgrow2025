# What We Do Categories Slice

Date: 2026-07-18  
Status: Implemented locally — awaiting Prismic sync

## Goal

Provide one reusable category-slider section. Each slice instance has a selected category and renders a traditional Swiper of only the `what_we_do` documents assigned to that category. Use a Text Block slice immediately above it for introductory copy.

## Categories (fixed)

1. Social and Emotional Learning for Schools
2. Parenting Support & Education
3. Community Campaigns & Awareness

## Behavior

- Query all `what_we_do` documents once per slice render.
- Filter by the slice instance's selected `category` value.
- Render nothing when no category is selected or when it has zero matching documents.
- Cards use image, title, body, and link (fallback to document URL).
- Swiper: traditional arrows over media, mobile-friendly; one item looks static.

## Slice field API IDs

- `category`

The slice can be repeated on the What We Do page or on a different landing page. Every instance selects and displays one category only.

## Publishing

Editor must push/sync the slice model to Prismic, add a Text Block plus one slider slice per desired category, select the slider category, and publish.
