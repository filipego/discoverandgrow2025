import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { DefaultCard } from "./components/DefaultCard";
import { ImageSideCard } from "./components/ImageSideCard";
import { IconInsideCard } from "./components/IconInsideCard";
import { IconOutsideCard } from "./components/IconOutsideCard";

export interface CardProps {
  item: Content.CardsandImagesSlice["primary"]["card"][number] & {
    direction?: "left" | "right";
  };
}

export type CardsandImagesProps = SliceComponentProps<Content.CardsandImagesSlice>;

const CardsandImages: FC<CardsandImagesProps> = ({ slice }) => {
  const components = {
    default: DefaultCard,
    imageSide: ImageSideCard,
    cardWithIconInside: IconInsideCard,
    cardWithIconOutside: IconOutsideCard
  };

  const CardComponent = components[slice.variation] || components.default;

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
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
