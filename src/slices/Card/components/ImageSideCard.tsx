import { FC } from "react";
import { CardProps } from "../index";
import { PrismicNextImage } from "@prismicio/next";
import { DefaultCard } from "./DefaultCard";

export const ImageSideCard: FC<CardProps> = ({ item }) => {
    const imageContainer = (
        <div className={`w-full h-[300px] md:h-full md:w-1/2 overflow-hidden rounded-t-xl md:rounded-none ${
            item.direction === "left" ? "md:rounded-l-xl" : "md:rounded-r-xl"
        }`}>
            <PrismicNextImage
                field={item.image}
                className="w-full h-full object-cover"
                alt=""
            />
        </div>
    );

    return (
        <DefaultCard
            item={item}
            className={item.direction === "right" ? "imageSideReverse" : "imageSide"}
            imageContainer={imageContainer}
        />
    );
};