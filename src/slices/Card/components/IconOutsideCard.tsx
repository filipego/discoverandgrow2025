import { FC } from "react";
import { CardProps } from "../index";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { CardLink } from "./CardLink";

export const IconOutsideCard: FC<CardProps> = ({ item }) => {
  const isDarkBlue = item.bg_color === "Dark Blue";
  
  return (
    <li className={clsx(
      "rounded-xl w-full flex flex-col relative pt-16 mt-16",
      isDarkBlue && "bg-[#29285D] text-white",
      item.bg_color === "White" && "bg-white"
    )}>
      <div className="absolute -top-16 left-0 w-full flex justify-center">
        <div className="w-[125px] h-[125px] rounded-[50%] overflow-hidden bg-[#29285D]">
          <PrismicNextImage
            field={item.image}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6 md:p-10">
        <div className="flex-1">
          <Heading as="h3" size="sm" className="mb-4">
            {item.heading}
          </Heading>
          <PrismicRichText
            field={item.body}
            components={{
              heading3: ({ children }) => (
                <h3 className="text-xl font-bold mb-4">{children}</h3>
              ),
              paragraph: ({ children }) => (
                <p className={clsx("mb-6", isDarkBlue && "text-gray-200")}>{children}</p>
              ),
              list: ({ children }) => (
                <ul className="list-disc pl-10 space-y-2">{children}</ul>
              ),
              listItem: ({ children }) => (
                <li className={clsx(isDarkBlue && "text-gray-200")}>{children}</li>
              )
            }}
          />
        </div>
        {isFilled.link(item.link) && <CardLink link={item.link} />}
      </div>
    </li>
  );
};