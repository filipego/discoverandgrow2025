import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { Bounded } from "@/app/components/Bounded";

/**
 * Props for `HeadingAndText`.
 */
export type HeadingAndTextProps =
  SliceComponentProps<Content.HeadingAndTextSlice>;

/**
 * Component for "HeadingAndText" Slices.
 */
const HeadingAndText: FC<HeadingAndTextProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 lg:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
        <div>
          <Heading as="h2" size="md" className="max-w-[600]">
            {slice.primary.heading}
          </Heading>
        </div>
        <div>
          <div className="max-w-[480] mb-5">
            <PrismicRichText field={slice.primary.body} />
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default HeadingAndText;
