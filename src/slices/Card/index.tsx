import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { BasicCard } from "./components/BasicCard";
import { SideImageCard } from "./components/SideImageCard";
import { IconInsideCard } from "./components/IconInsideCard";
import { IconOutsideCard } from "./components/IconOutsideCard";
import clsx from "clsx";

export interface CardProps {
  item: Content.CardsandImagesSlice["primary"]["card"][number] & {
    direction?: "left" | "right";
  };
}

export type CardsandImagesProps = SliceComponentProps<Content.CardsandImagesSlice>;

const CardsandImages: FC<CardsandImagesProps> = ({ slice }) => {
  const components = {
    default: BasicCard,
    imageSide: SideImageCard,
    cardWithIconInside: IconInsideCard,
    cardWithIconOutside: IconOutsideCard
  };

  const CardComponent = components[slice.variation] || components.default;

  // Add safe type checking for the padding property
  const padding = slice.primary.padding as string | undefined;

  return (
    <Bounded
      data-slice-type={slice.slice_type} data-slice-variation={slice.variation}
      className={clsx(
        padding === "smaller padding" && "!py-5",
        padding === "no padding" && "!py-0",
        padding === "no top padding" && "!pt-0",
        padding === "no bottom padding" && "!pb-0",
      )}
    >
      <ul className="flex flex-col md:flex-row gap-5 md:items-stretch">
        {slice.primary.card?.map((cardItem, i) => {
          const item = {
            ...cardItem,
            bg_color: cardItem.bg_color as "Dark Blue" | "White"
          };
          return <CardComponent key={i} item={item} />;
        })}
      </ul>
    </Bounded>
  );
};

export default CardsandImages;
