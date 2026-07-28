# Animated Cards Mobile Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve desktop animated cards while displaying static, image-first, vertically spaced cards below the `lg` breakpoint.

**Architecture:** The `AnimatedCardsClient` component will render two responsive presentation branches from the same Prismic group. The desktop-only branch retains its current GSAP measurement and ScrollTrigger lifecycle. The mobile-only branch uses ordinary document flow, so its card height follows the image and content naturally.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4, GSAP/ScrollTrigger, Prismic React.

## Global Constraints

- Desktop behavior at `lg` and above remains unchanged.
- Mobile and tablet layouts below `lg` do not initialize GSAP or ScrollTrigger for this slice.
- Mobile cards use existing Prismic content, Heading, ButtonLink, and media primitives without changing authored copy or models.
- Use `bg-brand-blue` instead of duplicating the existing deep-blue hex value.
- No new dependency or reusable component is required.

---

### Task 1: Separate the responsive presentations in `AnimatedCardsClient`

**Files:**
- Modify: `src/slices/AnimatedCards/AnimatedCardsClient.tsx`
- Modify: `context/progress-tracker.md`

**Interfaces:**
- Consumes: `slice.primary.cards` from `Content.AnimatedCardsSlice`.
- Produces: A desktop-only animated card stack and a mobile-only static card list from the same Prismic fields.

- [ ] **Step 1: Write the failing responsive regression check**

Create a focused source-level check that asserts the client component has a `lg:hidden` normal-flow mobile list with `gap-` spacing, an image rendered before its text content, and a `hidden lg:flex` desktop animation container.

- [ ] **Step 2: Run the check to verify it fails**

Run the focused check before changing `AnimatedCardsClient.tsx`. Expected: fail because the current component has a single absolute-positioned card stack and GSAP initializes for all viewports.

- [ ] **Step 3: Implement the two responsive branches**

Keep the current animation markup in a `hidden lg:flex` desktop branch. Add a `lg:hidden` mobile list that maps the same card group to full-width cards with `flex flex-col`, an optional top image in normal flow, the existing text rendering, and `gap-6` or greater between cards. Gate the `useEffect` so it returns without registering or sizing the animation below `lg`.

- [ ] **Step 4: Run the focused check and lint**

Run the focused regression check and the available project lint command. Record any pre-existing lint limitation separately from the responsive check result.

- [ ] **Step 5: Update progress tracking**

Add the completed mobile Animated Cards responsive behavior to `context/progress-tracker.md`.

### Task 2: Verify visible responsive behavior

**Files:**
- Verify: `src/slices/AnimatedCards/AnimatedCardsClient.tsx`

**Interfaces:**
- Consumes: The rendered homepage Animated Cards slice.
- Produces: Evidence that the mobile layout is a spaced, static, image-first stack and desktop preserves animation.

- [ ] **Step 1: Start the local application**

Run `npm run dev` and load the homepage in the Codex in-app browser.

- [ ] **Step 2: Inspect mobile**

At a phone-sized viewport, confirm each card is fully visible in normal flow, its image precedes its text, neighboring cards have clear vertical spacing, and page scrolling does not trigger a pin or overlap effect.

- [ ] **Step 3: Inspect desktop**

At a viewport of at least 1024 CSS pixels, confirm the animated cards preserve their original overlap and scroll-pinned transitions.
