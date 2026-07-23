import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/app/components/Bounded";
import clsx from "clsx";

/**
 * Props for `Image`.
 */
export type ImageProps = SliceComponentProps<Content.ImageSlice>;

/**
 * Component for "Image" Slices.
 */
const Image: FC<ImageProps> = ({ slice }) => {
  const getPadding = () => {
    if (slice.variation === "default") {
      return (slice.primary as Content.ImageSliceDefaultPrimary).padding || "normal padding";
    }
    return "normal padding";
  };

  const padding = getPadding();

  // Match hero → bordered-section gap on mobile (~36px). Bounded `py-5` alone
  // only gives 20px under images; desktop keeps the normal/bigger values.
  const mobilePaddingClass =
    padding === "normal padding"
      ? "pt-5 pb-9 lg:py-10"
      : padding === "bigger padding"
        ? "pt-5 pb-9 lg:py-20"
        : padding === "smaller padding"
          ? "pt-3 pb-5 lg:py-5"
          : padding === "no top padding"
            ? "pt-0 pb-9 lg:pb-10"
            : padding === "no bottom padding"
              ? "pt-5 pb-0 lg:pt-10"
              : undefined;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      padding={mobilePaddingClass ? "no padding" : padding}
      className={mobilePaddingClass}
    >
      {slice.variation === "multipleImages" ? (
        <ul
          className={clsx(
            "flex flex-col md:flex-row justify-center",
            !slice.primary.no_gap && "gap-5"
          )}
        >
          {slice.primary.images.map((item, i) => (
            <li key={i} className="w-full">
              <PrismicNextImage 
                field={item.image} 
                className={clsx(
                  "w-full",
                  slice.primary.remove_shadow === false && "shadow-2xl"
                )} 
                alt="" 
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center">
          <div
            className={clsx(
              "w-full",
              slice.primary.smaller ? "lg:w-[70%]" : "w-full"
            )}
          >
            <PrismicNextImage
              field={slice.primary.image}
              className={clsx(
                "w-full rounded-xl",
                slice.primary.remove_shadow === false && "shadow-2xl"
              )}
              alt=""
            />
          </div>
        </div>
      )}
    </Bounded>
  );
};

export default Image;
