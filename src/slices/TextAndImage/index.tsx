import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { Bounded } from "@/app/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { isFilled } from "@prismicio/client";
import { ButtonLink } from "@/app/components/ButtonLink";

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
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <div className={clsx(
          "flex flex-col items-center gap-8 text-center lg:items-start lg:text-left",
          slice.variation === "imageOnLeft" && "lg:order-2"
        )}>
          <Heading size="lg" className="mb-8">{slice.primary.heading}</Heading>
          <PrismicRichText field={slice.primary.body} />
          {isFilled.group(slice.primary.buttons) && (
            <ul>
              {slice.primary.buttons.map((item) => (
                <li><ButtonLink field={item.link}>{item.link.text}</ButtonLink></li>
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