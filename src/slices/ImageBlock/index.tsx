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
  // Debug the value
  // console.log('Remove shadow value:', slice.primary.remove_shadow);
  
  const getPadding = () => {
    if (slice.variation === "default") {
      return (slice.primary as Content.ImageSliceDefaultPrimary).padding || "normal padding";
    }
    return "normal padding";
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      padding={getPadding()}
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
