import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import BasicCard from "@/app/components/Cards/BasicCard";
import SideImageCard from "@/app/components/Cards/SideimageCard";
import IconInsideCard from "@/app/components/Cards/IconInsideCard";
import IconOutsideCard from "@/app/components/Cards/IconOutsideCard";
import clsx from "clsx";

export type CardsandImagesProps =
  SliceComponentProps<Content.CardsandImagesSlice>;

const CardsandImages: FC<CardsandImagesProps> = ({ slice }) => {
  const getPadding = () => {
    // Check if padding field exists for this variation and use proper type assertion
    if ('padding' in slice.primary && slice.primary.padding) {
      return slice.primary.padding as "normal padding" | "smaller padding" | "no padding" | "no top padding" | "no bottom padding";
    }
    return "normal padding" as const;
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      padding={getPadding()}
    >
      <ul className="flex flex-col md:flex-row gap-5 md:items-stretch">
        {slice.primary.card?.map((cardItem, i) => {
          // Common props for all card types
          const baseProps = {
            heading: cardItem.heading || "",
            body: cardItem.body,
            image: cardItem.image,
            link: cardItem.link,
            bg_color: cardItem.bg_color as "Dark Blue" | "White",
          };

          // Render different card components based on variation
          if (slice.variation === "default") {
            return <BasicCard key={i} item={baseProps} />;
          } else if (slice.variation === "imageSide") {
            return (
              <SideImageCard
                key={i}
                item={{
                  ...baseProps,
                  direction: ('direction' in cardItem ? cardItem.direction : "right") as "left" | "right",
                }}
              />
            );
          } else if (slice.variation === "cardWithIconInside") {
            return <IconInsideCard key={i} item={baseProps} />;
          } else if (slice.variation === "cardWithIconOutside") {
            return <IconOutsideCard key={i} item={baseProps} />;
          }

          // Fallback to BasicCard if variation is not recognized
          return <BasicCard key={i} item={baseProps} />;
        })}
      </ul>
    </Bounded>
  );
};

export default CardsandImages;
