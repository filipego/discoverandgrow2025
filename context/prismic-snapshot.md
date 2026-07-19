# Prismic Snapshot

This file documents the committed Prismic model state for the project. It is not a dump of Prismic content entries.

---

## Configuration

- `slicemachine.config.json` points to repository `discoverandgrow2025`.
- Slice library is `./src/slices`.
- Local Slice Simulator URL is `http://localhost:3000/slice-simulator`.
- `src/prismicio.ts` uses `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` as an optional repository override.

---

## Route Resolvers

| Custom Type | Route |
| --- | --- |
| `homepage` | `/` |
| `page` | `/:uid` |
| `what_we_do` | `/what_we_do/:uid` |
| `programs` | `/programs/:uid` |

---

## Custom Types

| Type | Repeatable | Purpose |
| --- | --- | --- |
| `homepage` | No | Homepage slice zone and SEO metadata |
| `page` | Yes | Generic pages by UID (includes `what_we_do_categories` slice for the What We Do landing page) |
| `what_we_do` | Yes | Program/category detail content with category, featured flag, image, body, link, slices, and SEO |
| `programs` | Yes | Program landing/detail pages by UID |
| `partner_post` | Yes | Partner/testimonial entries consumed by the Partners slice |
| `settings` | No | Site metadata, navigation, CTA, newsletter/donate/footer content, badge, social links, and document links |

---

## Shared Slices

Committed shared slice models currently include:

- `AnimatedCards`
- `Card`
- `DonationForm`
- `Form`
- `HeadingAndText`
- `Hero`
- `ImageBlock`
- `OurTeam`
- `Partners`
- `ProgramsCard`
- `Store`
- `TabPanel`
- `TextAndForm`
- `TextAndImage`
- `TextBlock`
- `VideoBlock`
- `WhatWeDoCategories`

The generated `src/slices/index.ts` maps Prismic slice API IDs to these components.

---

## Snapshot Rules

- Do not commit Prismic content exports unless the user explicitly asks for a content migration/export workflow.
- Do not commit API tokens or repository credentials.
- Update this file when custom types, route resolvers, shared slices, or Slice Machine configuration change.
