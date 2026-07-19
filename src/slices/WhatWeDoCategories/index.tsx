import { FC } from "react";
import { isFilled, KeyTextField, RichTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import HeaderAndText from "@/app/components/HeaderAndText";
import { createClient } from "@/prismicio";
import WhatWeDoCategorySlider from "./WhatWeDoCategorySlider";

type WhatWeDoCategoryValue =
  | "Programs for Caregivers"
  | "Programs for Children and Youth"
  | "Programs for Schools";

type WhatWeDoCategoriesSlicePrimary = {
  padding?:
    | "normal padding"
    | "smaller padding"
    | "no padding"
    | "no top padding"
    | "no bottom padding"
    | "bigger padding";
  caregivers_heading: KeyTextField;
  caregivers_body: RichTextField;
  children_youth_heading: KeyTextField;
  children_youth_body: RichTextField;
  schools_heading: KeyTextField;
  schools_body: RichTextField;
};

type WhatWeDoCategoriesSlice = {
  id: string;
  slice_type: "what_we_do_categories";
  slice_label: string | null;
  variation: "default";
  version: string;
  primary: WhatWeDoCategoriesSlicePrimary;
  items: Record<string, never>[];
};

/**
 * Props for `WhatWeDoCategories`.
 * Local typing until Slice Machine regenerates `prismicio-types.d.ts`.
 */
export type WhatWeDoCategoriesProps =
  SliceComponentProps<WhatWeDoCategoriesSlice>;

const CATEGORY_SECTIONS: {
  category: WhatWeDoCategoryValue;
  headingKey: keyof WhatWeDoCategoriesSlicePrimary;
  bodyKey: keyof WhatWeDoCategoriesSlicePrimary;
}[] = [
  {
    category: "Programs for Caregivers",
    headingKey: "caregivers_heading",
    bodyKey: "caregivers_body",
  },
  {
    category: "Programs for Children and Youth",
    headingKey: "children_youth_heading",
    bodyKey: "children_youth_body",
  },
  {
    category: "Programs for Schools",
    headingKey: "schools_heading",
    bodyKey: "schools_body",
  },
];

/**
 * Component for "WhatWeDoCategories" Slices.
 */
const WhatWeDoCategories: FC<WhatWeDoCategoriesProps> = async ({ slice }) => {
  const client = createClient();
  const documents = await client.getAllByType("what_we_do", {
    orderings: [
      { field: "document.first_publication_date", direction: "asc" },
    ],
  });

  const sections = CATEGORY_SECTIONS.map((section) => {
    const items = documents.filter(
      (document) => document.data.category === section.category,
    );

    return {
      ...section,
      items,
      heading: slice.primary[section.headingKey] as KeyTextField,
      body: slice.primary[section.bodyKey] as RichTextField,
    };
  }).filter((section) => section.items.length > 0);

  if (sections.length === 0) return null;

  const padding = slice.primary.padding ?? "normal padding";

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      padding={padding}
    >
      <div className="flex flex-col gap-16 lg:gap-24">
        {sections.map((section) => {
          const hasIntro =
            isFilled.keyText(section.heading) ||
            isFilled.richText(section.body);

          return (
            <section
              key={section.category}
              aria-label={section.category}
              className="w-full"
            >
              {hasIntro && (
                <HeaderAndText
                  heading={section.heading}
                  body={section.body}
                  className="mb-8"
                />
              )}
              <WhatWeDoCategorySlider items={section.items} />
            </section>
          );
        })}
      </div>
    </Bounded>
  );
};

export default WhatWeDoCategories;
