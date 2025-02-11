import { FC } from "react";
import { CardProps } from "../index";
import { PrismicNextImage } from "@prismicio/next";
import { DefaultCard } from "./DefaultCard";

export const IconInsideCard: FC<CardProps> = ({ item }) => {
  const imageContainer = (
    <div className="flex items-center justify-center pt-10">
      <div className="w-[150px] h-[150px] rounded-[50%] overflow-hidden bg-[#29285D]">
        <PrismicNextImage
          field={item.image}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );

  return (
    <DefaultCard
      item={item}
      imageContainer={imageContainer}
    />
  );
};