import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Heading } from "@/app/components/Heading";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import clsx from "clsx";


/**
 * Props for `CardsandImages`.
 */
export type CardsandImagesProps =
  SliceComponentProps<Content.CardsandImagesSlice>;

/**
 * Component for "CardsandImages" Slices.
 */
const bgColorMap = {
  "Dark Blue": { bg: "#29285D", text: "#FFFFFF" },
  "Yellow": { bg: "#F1E1A7", text: "inherit" },
};

const CardsandImages: FC<CardsandImagesProps> = ({ slice }) => {
  console.log('Entire slice:', slice);
  console.log('Card data:', slice.primary.card);
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ul className="flex flex-col md:flex-row gap-5 md:items-stretch">
        {slice.primary.card.map((item, i) => (
          <li
            key={i}
            className={clsx(
              "rounded-xl overflow-hidden w-full",
              slice.variation === "imageLeft" ? "flex flex-row h-full md:h-[400px]" : "flex flex-col"
            )}
            style={{
              backgroundColor: item.bg_color ? bgColorMap[item.bg_color]?.bg : undefined,
              color: item.bg_color ? bgColorMap[item.bg_color]?.text : undefined,
            }}
          >
            <div className={clsx(
              slice.variation === "imageLeft" && "w-1/2"
            )}>
              <PrismicNextImage 
                field={item.image} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className={clsx(
              "px-10 py-10 flex-1 flex flex-col",
              slice.variation === "imageLeft" && "w-1/2"
            )}>
              <div>
                <Heading as="h3" size="sm" className="mb-5">
                  {item.heading}
                </Heading>
                <PrismicRichText
                  field={item.body}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-sm mb-5 max-w-[90%]">{children}</p>
                    ),
                  }}
                />
              </div>
              <div className="mt-auto pt-4 flex justify-between items-center">
                {item.link && (
                  <>
                    <PrismicNextLink field={item.link}>
                      {item.link.text}
                    </PrismicNextLink>

                    <PrismicNextLink field={item.link}>
                      <IoArrowForwardCircleOutline className="mt-2 -rotate-45" size={26} />
                    </PrismicNextLink>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Bounded>
  );
};

export default CardsandImages;
