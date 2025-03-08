import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { DefaultHeadingAndText } from "./components/DefaultHeadingAndText";
import { WithLinksHeadingAndText } from "./components/WithLinksHeadingAndText";
import clsx from "clsx";

/**
 * Props for `HeadingAndText`.
 */
export type HeadingAndTextProps =
  SliceComponentProps<Content.HeadingAndTextSlice>;

export interface HeadingAndTextComponentProps {
  heading: Content.HeadingAndTextSlice["primary"]["heading"];
  body: Content.HeadingAndTextSlice["primary"]["body"];
  className?: string;
}

/**
 * Component for "HeadingAndText" Slices.
 */
const HeadingAndText: FC<HeadingAndTextProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        "py-10 lg:pt-16 lg:pb-30",
      )}
    >
      {slice.variation === 'withLinks' ? (
        <WithLinksHeadingAndText
          heading={slice.primary.heading}
          body={slice.primary.body}
          link={slice.primary.link}
        />
      ) : (
        <DefaultHeadingAndText
          heading={slice.primary.heading}
          body={slice.primary.body}
        />
      )}
    </Bounded>
  );
};

export default HeadingAndText;
