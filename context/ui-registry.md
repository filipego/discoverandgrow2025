# UI Registry

Living registry of reusable website UI. Read this before building a component and update it when reusable components or established patterns change.

---

## Core Components

| Component | Path | Purpose |
| --- | --- | --- |
| `Bounded` | `src/app/components/Bounded.tsx` | Constrained section wrapper with standard padding variants |
| `Heading` | `src/app/components/Heading.tsx` | Project heading abstraction and brand font/color/size mapping |
| `ButtonLink` | `src/app/components/ButtonLink.tsx` | Prismic link CTA button with Primary, Secondary, and Link variants; sizes step down one level below `lg` |
| `ColorSection` | `src/app/components/ColorSection.tsx` | Colored inner section wrapper for selected slice backgrounds |
| `Header` | `src/app/components/Header.tsx` | Fixed animated global header; Prismic settings are fetched in each server layout and passed to the interactive header, avoiding a client CMS fetch; desktop navigation at `lg`, right-side mobile/tablet navigation drawer below `lg`; animation waits for the rendered header DOM to mount |
| `Navigation` | `src/app/components/Navigation.tsx` | Header navigation list with route-aware active underline and moving hover indicator |
| `Footer` | `src/app/components/Footer.tsx` | Global footer sourced from Prismic settings; newsletter column uses `id="newsletter"` for in-page hash links and social icon links have accessible labels |
| `HashFocusHandler` | `src/app/components/HashFocusHandler.tsx` | Client helper that smooth-scrolls `#newsletter` to the footer and focuses `#newsletter-email` |
| `LongLogo` | `src/app/components/LongLogo.tsx` | Brand logo rendering |
| `HeaderAndText` | `src/app/components/HeaderAndText.tsx` | Reusable heading and rich-text composition |
| `EmailMobileStyles` | `src/emails/EmailMobileStyles.tsx` | Shared, email-safe mobile breakpoint for branded React Email templates |

---

## Cards

| Component | Path | Purpose |
| --- | --- | --- |
| `BasicCard` | `src/app/components/Cards/BasicCard.tsx` | Standard Prismic image/text/link card with responsive image sizing; optional `contentClassName` for text width; Learn more uses `ButtonLink` |
| `SideimageCard` | `src/app/components/Cards/SideimageCard.tsx` | Side-image card variant |
| `IconInsideCard` | `src/app/components/Cards/IconInsideCard.tsx` | Card with icon inside the surface |
| `IconOutsideCard` | `src/app/components/Cards/IconOutsideCard.tsx` | Card with icon outside/offset from the surface |

---

## Forms

| Component | Path | Purpose |
| --- | --- | --- |
| `NewsletterForm` | `src/app/components/Forms/NewsletterForm.tsx` | Newsletter signup; currently inserts into Supabase then emails; footer passes `inputId="newsletter-email"` for hash-focus |
| `DynamicForm` | `src/app/components/Forms/DynamicForm.tsx` | Prismic-configured dynamic form with optional Turnstile; preserves every configured field for email delivery, uses a standard thank-you fallback when Prismic copy is blank, and vertically centers its complete adjacent left-content column on desktop |
| `CustomInput` | `src/app/components/Forms/CustomInput.tsx` | Dynamic form text-like input |
| `CustomTextarea` | `src/app/components/Forms/CustomTextarea.tsx` | Dynamic form textarea |
| `CustomSelect` | `src/app/components/Forms/CustomSelect.tsx` | Dynamic form select |
| `CustomRadio` | `src/app/components/Forms/CustomRadio.tsx` | Dynamic form radio group |
| `CustomCheckbox` | `src/app/components/Forms/CustomCheckbox.tsx` | Dynamic form checkbox |
| `CustomCheckboxGroup` | `src/app/components/Forms/CustomCheckboxGroup.tsx` | Dynamic form checkbox group |
| `Forms/ui/Input` | `src/app/components/Forms/ui/Input.tsx` | Low-level form input primitive |
| `Forms/ui/Button` | `src/app/components/Forms/ui/Button.tsx` | Form submit button matching `ButtonLink` Primary pill styles, without the arrow icon |
| `Forms/ui/Label` | `src/app/components/Forms/ui/Label.tsx` | Low-level label primitive |

---

## Media and Sliders

| Component | Path | Purpose |
| --- | --- | --- |
| `LazyYouTubePlayer` | `src/app/components/LazyYouTubePlayer.tsx` | Lazy YouTube embed |
| `LazyTikTokPlayer` | `src/app/components/LazyTikTokPlayer.tsx` | Lazy TikTok embed |
| `StoreSlider` | `src/app/components/Sliders/StoreSlider.tsx` | Store/product slider with responsive image sizing |
| `LazyDonateForm` | `src/slices/DonationForm/LazyDonateForm.tsx` | Client boundary that loads the Stripe donation checkout only when its form nears the viewport |
| `PartnerSliderComponent` | `src/slices/Partners/PartnerSliderComponent.tsx` | Partner post carousel for the Partners slice |
| `WhatWeDoCategories` | `src/slices/WhatWeDoCategories/index.tsx` | Reusable carousel for one selected What We Do category; pair with a Text Block for introductory copy |
| `WhatWeDoCategorySlider` | `src/slices/WhatWeDoCategories/WhatWeDoCategorySlider.tsx` | Traditional Swiper carousel for one What We Do category; arrows over media when 2+ items |

---

## Shared Slices

The generated component map in `src/slices/index.ts` currently includes:

- `animated_cards`
- `cardsand_images`
- `donation_form`
- `form`
- `heading_and_text`
- `hero`
- `image`
- `our_team`
- `partners`
- `programs_card`
- `store`
- `tab_panel`
- `text_and_form`
- `text_and_image`
- `text_block`
- `video_block`
- `what_we_do_categories`

Slice components should keep `data-slice-type` and `data-slice-variation` attributes when using `Bounded`, because they help with debugging and Prismic/Slice Machine context.

---

## Established Patterns

| Pattern | Current Implementation |
| --- | --- |
| Prismic client | `src/prismicio.ts` |
| Prismic preview | `src/app/(home)/api/preview/route.ts`, `exit-preview`, and `PrismicPreview` in root layout |
| Prismic revalidation | `src/app/(home)/api/revalidate/route.ts` with `revalidateTag("prismic")` |
| Page rendering | Route fetches document, then renders `SliceZone` with `components` |
| Metadata | Route-specific `generateMetadata` reads Prismic SEO fields |
| Settings | `settings` singleton powers site metadata, navigation, header CTA, footer, and newsletter/donate content |
| Dynamic forms | Form slice -> `DynamicForm` -> `/api/forms/submit` -> branded owner notification and submitter thank-you templates via Resend |
| Branded emails | React Email templates use the Discover and Grow logo, blue/green/orange palette, rounded white card, dark-blue organization footer, and shared compact mobile breakpoint established by the donation and newsletter emails |
| Styled Prismic rich text | Slice-level `PrismicRichText` `components` map: `Heading` for headings, explicit paragraph/list spacing, and `PrismicNextLink` for brand-colored links without an underline by default |
| Donations | DonationForm slice -> Stripe Elements -> Stripe API route |

---

## Registry Rules

- Add new reusable UI here when it becomes a shared pattern.
- Remove entries only when the component is actually removed from the codebase.
- Do not document boilerplate components that do not exist in this project.
