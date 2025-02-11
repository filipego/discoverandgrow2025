import { FC } from "react";
import { CardProps } from "../index";
import { PrismicNextImage } from "@prismicio/next";
import { DefaultCard } from "./DefaultCard";

export const ImageLeftCard: FC<CardProps> = ({ item }) => {
  const imageContainer = (
    <div className="w-full h-[200px] overflow-hidden rounded-t-xl md:w-1/2 md:h-full md:rounded-none md:rounded-l-xl">
      <PrismicNextImage
        field={item.image}
        className="w-full h-full object-cover"
      />
    </div>
  );

  return (
    <DefaultCard
      item={item}
      imageLeft
      className="flex-col md:flex-row h-full md:h-[400px]"
      imageContainer={imageContainer}
    />
  );
};