import { FC } from "react";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { createClient } from "@/prismicio";
import WhatWeDoCategorySlider from "./WhatWeDoCategorySlider";

type WhatWeDoCategoryValue =
  | "Social and Emotional Learning for Schools"
  | "Parenting Support & Education"
  | "Community Campaigns & Awareness";

type WhatWeDoCategoriesSlicePrimary = {
  padding?:
    | "normal padding"
    | "smaller padding"
    | "no padding"
    | "no top padding"
    | "no bottom padding"
    | "bigger padding";
  category: WhatWeDoCategoryValue | null;
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

/**
 * Component for "WhatWeDoCategories" Slices.
 */
const WhatWeDoCategories: FC<WhatWeDoCategoriesProps> = async ({ slice }) => {
  if (!slice.primary.category) return null;

  const client = createClient();
  const documents = await client.getAllByType("what_we_do", {
    orderings: [{ field: "document.first_publication_date", direction: "asc" }],
  });

  const items = documents.filter(
    (document) => document.data.category === slice.primary.category,
  );

  if (items.length === 0) return null;

  const padding = slice.primary.padding ?? "normal padding";
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      padding={padding}
    >
      <section aria-label={slice.primary.category} className="w-full">
        <WhatWeDoCategorySlider items={items} />
      </section>
    </Bounded>
  );
};

export default WhatWeDoCategories;
