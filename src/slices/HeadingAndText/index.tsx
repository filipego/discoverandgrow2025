import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { DefaultHeadingAndText } from "./components/DefaultHeadingAndText";
import { WithLinksHeadingAndText } from "./components/WithLinksHeadingAndText";
import { MultipleHeadingAndText } from "./components/MultipleHeadingAndText";

/**
 * Props for `HeadingAndText`.
 */
export type HeadingAndTextProps =
  SliceComponentProps<Content.HeadingAndTextSlice>;

export interface HeadingAndTextComponentProps {
  heading: Content.HeadingAndTextSliceDefaultPrimary["heading"];
  body: Content.HeadingAndTextSliceDefaultPrimary["body"];
  className?: string;
}

/**
 * Component for "HeadingAndText" Slices.
 */
const HeadingAndText: FC<HeadingAndTextProps> = ({ slice }) => {
  const renderContent = () => {
    switch (slice.variation) {
      case 'withLinks':
        return (
          <WithLinksHeadingAndText
            // @ts-ignore - Prismic types are correctly discriminated at runtime
            heading={slice.primary.heading}
            body={slice.primary.body}
            link={slice.primary.link}
          />
        );
      case 'multipleHeaderAndText':
        return (
          <MultipleHeadingAndText
            // @ts-ignore - Prismic types are correctly discriminated at runtime
            items={slice.primary.item}
          />
        );
      default:
        return (
          <DefaultHeadingAndText
            // @ts-ignore - Prismic types are correctly discriminated at runtime
            heading={slice.primary.heading}
            body={slice.primary.body}
          />
        );
    }
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      padding="no top padding"
      className="lg:pt-16 lg:pb-30"
    >
      {renderContent()}
    </Bounded>
  );
};

export default HeadingAndText;
