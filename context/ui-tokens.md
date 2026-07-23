# UI Tokens

`src/app/globals.css` is the source of truth for this project's design tokens and global styling. If this file and `globals.css` disagree, follow `globals.css` and update this document.

---

## Tailwind v4 Theme Tokens

Tokens are declared in `@theme`, which exposes matching Tailwind utility names.

### Fonts

| Token | Value | Utility |
| --- | --- | --- |
| `--font-primary` | `"Open Sans", sans-serif` | `font-primary` |
| `--font-secondary` | `"Raleway", sans-serif` | `font-secondary` |
| `--font-logo` | `"More Sugar"` | `font-logo` |

Global font loading:

- `next/font/google` self-hosts Open Sans and Raleway from the home layout.
- `@font-face` loads More Sugar from `/fonts/MoreSugarRegular.woff2` and `/fonts/MoreSugarRegular.woff`.
- `body` uses `var(--font-primary)`.
- `h1` through `h6` use `var(--font-secondary)`.

### Brand Colors

| Token | Value | Utility |
| --- | --- | --- |
| `--color-brand-blue` | `#29285d` | `bg-brand-blue`, `text-brand-blue`, `border-brand-blue` |
| `--color-brand-blue-light` | `#51507a` | `bg-brand-blue-light`, `text-brand-blue-light` |
| `--color-brand-blue-lighter` | `#787898` | `bg-brand-blue-lighter`, `text-brand-blue-lighter` |
| `--color-brand-bg` | `#ffffff` | `bg-brand-bg`, `text-brand-bg` |
| `--color-brand-off-white` | `#faf9f6` | `bg-brand-off-white`, `text-brand-off-white` |
| `--color-brand-black` | `black` | `bg-brand-black`, `text-brand-black` |
| `--color-brand-gray` | `#0a0a0a` | `bg-brand-gray`, `text-brand-gray` |
| `--color-brand-gray-light` | `#4e4e4e` | `bg-brand-gray-light`, `text-brand-gray-light` |
| `--color-brand-gray-lighter` | `#949494` | `bg-brand-gray-lighter`, `text-brand-gray-lighter` |
| `--color-brand-green` | `#2ca382` | `bg-brand-green`, `text-brand-green`, `border-brand-green` |
| `--color-brand-green-accessible` | `#167458` | `text-brand-green-accessible`; use for green text on white surfaces where normal-size text requires WCAG AA contrast |
| `--color-brand-orange` | `#f15b3b` | `bg-brand-orange`, `text-brand-orange`, `border-brand-orange` |

---

## Global Base Styles

- Universal border color falls back to `var(--color-gray-200, currentColor)`.
- Paragraphs and list items use `text-sm leading-[22px]` and become `lg:text-base lg:leading-6`.
- Headings use the secondary font family.
- Body text color is `var(--color-brand-gray-light)`.
- Body background is `var(--color-brand-bg)`.
- SVG overflow is hidden globally.

---

## Component-Level Token Usage

### Heading

`src/app/components/Heading.tsx` defines the project heading scale with Tailwind classes:

| Prop | Classes |
| --- | --- |
| `size="xl"` | `text-3xl lg:text-5xl leading-9 lg:leading-14 font-extrabold` |
| `size="lg"` | `text-2xl lg:text-3xl font-bold leading-8 lg:leading-9` |
| `size="md"` | `text-xl lg:text-2xl font-bold leading-7 lg:leading-[30px]` |
| `size="sm"` | `text-lg lg:text-xl font-bold` |
| `size="xs"` | `text-md lg:text-lg font-bold` |

Color props:

- `brand-black` -> `text-brand-black`
- `brand-light-gray` -> `text-brand-gray`
- `brand-off-white` -> `text-brand-off-white`

Font props:

- `primary` -> `font-primary`
- `primary-light` -> `font-primary-light` currently has no matching token in `globals.css`.
- `primary-medium` -> `font-primary-medium` currently has no matching token in `globals.css`.
- `secondary` -> `font-secondary`

If `font-primary-light` or `font-primary-medium` are needed, add matching tokens/utilities or remove the unused options.

### Buttons

`ButtonLink` variants:

- `Primary`: `bg-brand-green text-white rounded-full`
- `Secondary`: `bg-brand-orange text-white rounded-full`
- `Link`: transparent with `text-brand-green-accessible`; use an explicit light override only on a dark surface

Sizes step down one level below `lg` (`md` renders as `sm`, `lg` as `md`); desktop sizes are unchanged. Primary/Secondary label type is `12px` below `lg` and `text-sm` from `lg` up. Link variant type is `14px` below `lg` and `text-base` from `lg` up.

The inner circular icon backgrounds are currently hardcoded `#54AC8B` and `#FF7456`; prefer tokenizing if those colors become reusable.

### Bounded Layout

`Bounded` uses:

- Outer `px-6`.
- Inner `mx-auto w-full max-w-6xl`.
- Padding variants: normal, smaller, none, no-top, no-bottom, and bigger.
- Vertical padding is roughly half below `lg` (`py-5 lg:py-10` for normal); desktop values are unchanged.

### Link Border Animation

`.link-border-animation::before` uses `var(--color-brand-green)` and a scale transition for a top border hover effect.

### Prismic Rich Text

- Style rich text at the slice via `PrismicRichText`'s `components` map, not with a generic typography wrapper when element-level control is needed.
- Render Prismic hyperlinks with `PrismicNextLink` and `text-brand-green`; do not add an underline unless it is explicitly part of the design.
- Paragraph spacing is a slice-level rhythm decision. The Form slice uses `mb-3` to keep its contact-information paragraphs compact.

---

## Known Hardcoded Style Values

The codebase contains intentional and legacy hardcoded visual values in components such as `Header`, `Footer`, `ColorSection`, cards, and slices. When modifying those areas, prefer moving repeated values to the existing brand token system rather than adding more one-off values.

Current examples:

- Dark blue surfaces use `#29285D`, equivalent to `brand-blue`.
- Orange surfaces sometimes use `#F57F15`, which differs from `brand-orange`.
- Yellow section backgrounds use `#F1E1A7`.
- Green section backgrounds use `#43C467`, which differs from `brand-green`.
- Footer secondary text uses `#dfdfdf`.

---

## Invariants

- `src/app/globals.css` remains the source of truth.
- Update this file when tokens, global typography, or shared interaction utilities change.
- Prefer `text-brand-*`, `bg-brand-*`, and `border-brand-*` utilities where they exist.
- Do not introduce a separate Tailwind config color system for app-facing styles.
