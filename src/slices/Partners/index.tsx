import { FC } from "react";
import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import HeaderAndText from "@/app/components/HeaderAndText";
import PartnerSliderComponent from "./PartnerSliderComponent";

/**
 * Props for `Partners`.
 */
export type PartnersProps = SliceComponentProps<Content.PartnersSlice>;

/**
 * Component for "Partners" Slices.
 */
const Partners: FC<PartnersProps> = async ({ slice }) => {
  const client = createClient();
  
  // Fetch partner posts from Prismic
  const partners = await client.getAllByType("partner_post", {
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      padding="no top padding"
    >
      <HeaderAndText
        heading={slice.primary.heading}
        body={slice.primary.body}
        bigger={true}
      />

      <PartnerSliderComponent partners={partners} />
    </Bounded>
  );
};

export default Partners;
