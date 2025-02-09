import { FC } from "react";
import { CardProps } from "../index";
import { PrismicNextImage } from "@prismicio/next";
import { DefaultCard } from "./DefaultCard";

export const ImageLeftCard: FC<CardProps> = ({ item }) => {
  const imageContainer = (
    <div className="w-1/2 h-full">
      <PrismicNextImage
        field={item.image}
        className="w-full h-full object-cover"
      />
    </div>
  );

  return (
    <DefaultCard 
      item={item}
      className="flex flex-row h-full md:h-[400px]"
      imageContainer={imageContainer}
    />
  );
};