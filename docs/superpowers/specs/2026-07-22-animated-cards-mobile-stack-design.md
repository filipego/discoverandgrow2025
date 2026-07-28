# Animated Cards Mobile Stack Design

**Date:** 2026-07-22

## Goal

Make the homepage Animated Cards slice easy to read on phones by replacing its pinned, overlapping animation with a static vertical list, while leaving the existing desktop experience unchanged.

## Responsive Behavior

- At `lg` and above, preserve the current GSAP ScrollTrigger pinning, card transitions, card dimensions, side-by-side text/media layout, and content rendering.
- Below `lg`, render the same Prismic cards in document order with no GSAP animation, inline transforms, absolute positioning, or fixed container height.
- Mobile cards are full width and separated by a visible vertical gap.
- Every populated Prismic image is rendered as the card's top media area. The existing heading, rich text, and optional Learn more link follow below the image.

## Implementation Boundaries

- Modify only the Animated Cards slice client component plus its responsive verification and project-progress record.
- Use the existing `Heading`, `ButtonLink`, `PrismicRichText`, `PrismicNextImage`, and Prismic field data; do not alter the slice model or CMS content.
- Use existing brand utilities in place of the slice's hard-coded blue surface when touching that class.

## Verification

- Confirm the desktop branch still initializes the ScrollTrigger behavior only at `lg` and wider.
- Confirm the mobile branch contains normal-flow, image-first cards with spacing and no animation setup.
- Run the narrowest available static/lint check and inspect the affected layout in the in-app browser at a mobile viewport and a desktop viewport.
