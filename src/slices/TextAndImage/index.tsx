import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { Bounded } from "@/app/components/Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `TextAndImage`.
 */
export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

/**
 * Component for "TextAndImage" Slices.
 */
const TextAndImage: FC<TextAndImageProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <Heading size="lg" className="mb-16">{slice.primary.heading}</Heading>
          <PrismicRichText field={slice.primary.body} />
          {slice.primary.buttons && (
            <ul>
              {slice.primary.buttons.map((item) => (
                <li><PrismicNextLink field={item.link} /></li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <PrismicNextImage field={slice.primary.image} className="rounded-xl" />
        </div>
      </div>

    </Bounded>
  );
};

export default TextAndImage;
