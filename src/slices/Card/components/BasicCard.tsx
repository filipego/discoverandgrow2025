import { FC } from "react";
import { CardProps } from "../index";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { ButtonLink } from "@/app/components/ButtonLink";

export const BasicCard: FC<CardProps> = ({ item }) => {
  const isDarkBlue = item.bg_color === "Dark Blue";

  return (
    <li
      className={clsx(
        "rounded-xl w-full flex flex-col relative",
        isDarkBlue && "bg-[#29285D] !text-white",
        item.bg_color === "White" && "bg-white"
      )}
    >
      <div className="w-full overflow-hidden rounded-t-xl">
        <PrismicNextImage
          field={item.image}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <div className="flex flex-col flex-1 p-6 md:p-10">
        <div className="flex-1">
          <Heading 
            as="h3" 
            size="md" 
            className={clsx("mb-4 lg:mb-8", isDarkBlue && "text-white")}
          >
            {item.heading}
          </Heading>
          <PrismicRichText
            field={item.body}
            components={{
              heading3: ({ children }) => (
                <Heading 
                  as="h4" 
                  size="sm" 
                  className={clsx("mb-4", isDarkBlue && "text-white")}
                >
                  {children}
                </Heading>
              ),
              paragraph: ({ children }) => (
                <p className={clsx("mb-6", isDarkBlue && "text-gray-200")}>
                  {children}
                </p>
              ),
              list: ({ children }) => (
                <ul className="list-disc pl-10 space-y-2">{children}</ul>
              ),
              listItem: ({ children }) => (
                <li className={clsx(isDarkBlue && "text-gray-200")}>
                  {children}
                </li>
              ),
            }}
          />
        </div>
        {isFilled.link(item.link) && (
          <div className="flex items-center mt-auto pt-16">
            <ButtonLink field={item.link} color="Link">
              {item.link.text}
            </ButtonLink>
          </div>
        )}
      </div>
    </li>
  );
};
