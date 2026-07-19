# What We Do Categories Slice

Date: 2026-07-18  
Status: Approved — implementing

## Goal

On the What We Do landing page (`page` type), show up to three category sections. Each section has CMS heading + paragraph and a traditional Swiper of `what_we_do` documents for that category. Empty categories are hidden.

## Categories (fixed)

1. Programs for Caregivers  
2. Programs for Children and Youth  
3. Programs for Schools  

## Behavior

- Query all `what_we_do` documents once per slice render.
- Group by `category`.
- Skip any category with zero documents.
- Cards use image, title, body, and link (fallback to document URL).
- Swiper: traditional arrows over media, mobile-friendly; one item looks static.

## Publishing

Editor must push/sync the slice model to Prismic, add the slice to the What We Do page, fill intros, and publish.
