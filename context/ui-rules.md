# UI Rules

Concise rules for building UI in the Discover and Grow public website.

---

## Visual Direction

- Warm, nonprofit-oriented public website with clear program storytelling and donation paths.
- Preserve the established brand palette: deep blue, green, orange, off-white, white, and neutral grays.
- Use editorial sections, cards, image/media blocks, forms, sliders, and slice-driven content blocks.
- Avoid admin dashboard patterns unless explicitly requested.
- Keep responsive layouts polished across mobile and desktop.
- Use `src/app/globals.css` brand tokens where available.

---

## Component Layering

```text
route page
  -> Prismic document fetch
  -> SliceZone
  -> src/slices/* renderer
  -> src/app/components shared UI
```

- Check `src/app/components` and `context/ui-registry.md` before building reusable UI.
- Place reusable site UI in `src/app/components`.
- Place slice-specific helper components near the slice when they are not broadly reusable.
- Keep low-level form primitives in `src/app/components/Forms/ui`.
- Import `cn` from `@/lib/utils` when class merging is needed; the current code also commonly uses `clsx`.

---

## Layout

- Use `Bounded` for constrained content sections unless a slice intentionally needs full-width styling.
- Keep the global `Header` and `Footer` controlled by the Prismic `settings` singleton.
- Preserve the fixed animated header behavior unless the task is specifically about navigation/header changes.
- The Header uses its full logo/navigation/CTA layout at `lg` and above. Below `lg` (including tablet portrait and phones), show a larger logo and accessible menu toggle; it opens a right-side drawer containing the same Prismic navigation links plus Donate as the final, visually matching link.
- Public paths should remain aligned with `src/prismicio.ts` route resolvers.
- Route groups are organizational only; do not rely on them for public URL semantics.
- Ensure long text, headings, buttons, and forms fit on mobile.
- For a desktop two-column Form slice, use `items-stretch` on the grid and `flex flex-col lg:justify-center` on the complete left column. This centers the entire heading-and-rich-text group against the adjacent form; never center only one child.

---

## Typography

- Use `Heading` for all new or modified headings.
- Body text inherits Open Sans via `body`.
- Heading elements inherit Raleway globally.
- Use the `Heading` size props instead of inventing one-off heading scales.
- Rich text from Prismic must use `PrismicRichText` with an explicit `components` map whenever a slice needs visual styling. Do not rely on a generic `prose` wrapper for headings, paragraphs, lists, or hyperlinks that need project-specific styles.
- In that map, render headings with `Heading`, paragraphs with the slice's intended margin/text/leading utilities, lists and list items explicitly, and hyperlinks with `PrismicNextLink`. Apply the link color in the `hyperlink` renderer; links have no underline unless a design explicitly requests one.
- Keep rich-text spacing intentional and slice-specific. The Contact Form and HeadingAndText slices use `mb-3` paragraphs so body copy stays compact and readable.

```tsx
<PrismicRichText
  field={slice.primary.body}
  components={{
    heading3: ({ children }) => <Heading as="h3" size="md">{children}</Heading>,
    paragraph: ({ children }) => <p className="mb-3 text-brand-gray leading-relaxed">{children}</p>,
    hyperlink: ({ node, children }) => (
      <PrismicNextLink field={node.data} className="font-semibold text-brand-green">
        {children}
      </PrismicNextLink>
    ),
  }}
/>
```

---

## Prismic Content Rendering

- Use `PrismicNextImage` for Prismic image fields.
- Use `PrismicNextLink` or `ButtonLink` for Prismic link fields.
- Use `isFilled` helpers before rendering optional Prismic fields.
- Keep SEO metadata generation close to the route that owns the document.
- Do not edit `src/slices/index.ts`; regenerate it through Slice Machine when models change.

---

## Buttons and Links

- Use `ButtonLink` for Prismic-managed CTA links.
- Use plain `next/link` for fixed internal links.
- Keep primary CTAs green and secondary CTAs orange unless a design task changes the system.
- Icon buttons or icon-only links need accessible labels.

---

## Cards, Sections, and Media

- Use existing card components in `src/app/components/Cards` before adding variants.
- Use `ColorSection` for Prismic-selected colored section backgrounds where the current pattern fits.
- Use `LazyYouTubePlayer` and `LazyTikTokPlayer` for embedded media.
- Use Swiper-backed slider components where current partner/store carousel patterns fit.

---

## Forms

- Static forms use React Hook Form, Zod, and the shared form UI controls.
- Dynamic Prismic forms use `DynamicForm` plus `createDynamicSchema` from `src/lib/dynamicValidation.ts`.
- Server form handlers must validate input, rate limit where appropriate, avoid raw internal errors, and keep API keys server-side.
- Cloudflare Turnstile verification belongs in the server route, not only in the client component.
- The newsletter form currently writes to Supabase and then calls `/api/emails`; treat that as a legacy implementation detail.

---

## Feedback and Errors

- User-facing success/error messages should be specific enough to act on but should not expose raw provider errors.
- Server logs can include provider context, but never log secrets.
- Donation and form flows need loading/disabled states.

---

## Tailwind v4

- Tokens are defined in `src/app/globals.css` through `@theme`.
- Use generated brand utilities such as `text-brand-blue`, `bg-brand-green`, and `text-brand-off-white`.
- Do not add a separate color system in a Tailwind config.
- Reduce hardcoded colors when touching legacy areas, especially if the same color already exists as a brand token.

---

## Do Nots

- Do not introduce Supabase auth/admin/dashboard patterns.
- Do not hand-edit generated Prismic files.
- Do not expand legacy Supabase usage without an explicit task.
- Do not duplicate route resolvers outside `src/prismicio.ts`.
- Do not hardcode secrets, Prismic repository credentials, Stripe keys, Resend keys, Etsy keys, or Turnstile secrets.
- Do not rewrite user-visible copy unless requested.
