import { FC } from "react";
import { CardProps } from "../index";
import { PrismicNextImage } from "@prismicio/next";
import { DefaultCard } from "./DefaultCard";

export const IconOutsideCard: FC<CardProps> = ({ item }) => {
  const imageContainer = (
    <div className="absolute -top-16 w-full flex justify-center">
      <div className="w-[125px] h-[125px] rounded-[50%] overflow-hidden bg-[#29285D]">
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
      className="pt-16 relative mt-16"
      imageContainer={imageContainer}
    />
  );
};