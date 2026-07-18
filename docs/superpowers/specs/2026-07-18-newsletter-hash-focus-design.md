# Newsletter Hash Scroll + Focus

Date: 2026-07-18  
Status: Approved for planning

## Goal

When a user clicks a Prismic (or any) link with `href="#newsletter"`, the page should smooth-scroll to the footer newsletter section and focus the email input so they can type immediately. Direct loads of `/page#newsletter` should behave the same way.

## Context

- The only newsletter UI is in the site footer (`Footer` → `NewsletterForm`).
- Prismic content already uses Web links like `#newsletter` (e.g. HeadingAndText “With links” variation).
- Without a matching `id="newsletter"`, the browser falls back to the top of the page.

## Behavior

1. Resolve `#newsletter` to the footer newsletter block.
2. Smooth-scroll that block into view (`behavior: "smooth"`, `block: "start"`).
3. After scroll settles, focus the footer email input.
4. Support:
   - same-page clicks on `#newsletter`
   - initial page load / navigation with `#newsletter` in the URL
5. Non-`#newsletter` hashes are ignored by this feature.

## Implementation

### 1. Footer anchor

- Wrap the footer newsletter column (heading + form) with `id="newsletter"`.
- Add scroll margin (e.g. Tailwind `scroll-mt-*`) so a sticky header does not cover the target.

### 2. Newsletter form input id

- Give the email input a stable id: `newsletter-email`.
- Keep `htmlFor` / label association correct when the label is shown.

### 3. Shared client hash handler

- Add a small client component mounted once from the root layout (e.g. `HashFocusHandler` or equivalent).
- On mount and when the hash becomes `#newsletter`:
  - find `#newsletter` and `#newsletter-email`
  - smooth-scroll to the section
  - focus the input after scroll completes (`scrollend` where available, short fallback timeout otherwise)
- Prefer preventing the default “jump to top / harsh jump” when intercepting same-page `#newsletter` clicks, then run the smooth scroll + focus flow.

### 4. Prismic / slices

- No custom type or slice model changes.
- Keep existing `#newsletter` Web links as-is.
- No special-casing inside individual slice link components; the global handler covers all `#newsletter` links.

## Out of scope

- Second newsletter targets on page body slices
- Custom Prismic link types or link resolvers for this behavior
- Changes to newsletter submit / Supabase / email logic
- Visual redesign of the footer newsletter block

## Success criteria

- Clicking “Subscribe to the Newsletter…” (or any `#newsletter` link) smooth-scrolls to the footer newsletter.
- The email input receives focus and is ready for typing.
- Reloading or opening a URL with `#newsletter` produces the same scroll + focus behavior.
- Pages without the footer (if any) fail gracefully: no errors if the ids are missing.
