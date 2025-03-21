import { FC } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { ButtonLink } from "@/app/components/ButtonLink";
import { isFilled } from "@prismicio/client";
import clsx from "clsx";

export interface CardProps {
  item: {
    heading: string;
    body: any;
    image: any;
    link: any;
    bg_color: "Dark Blue" | "White";
  };
}

export const IconInsideCard: FC<CardProps> = ({ item }) => {
  const isDarkBlue = item.bg_color === "Dark Blue";

  return (
    <li
      className={clsx(
        "shadow-xl rounded-xl w-full flex flex-col relative",
        isDarkBlue && "bg-[#29285D] text-white",
        item.bg_color === "White" && "bg-white"
      )}
    >
      <div className="flex items-center justify-center pt-10">
        <div className="w-[150px] h-[150px] rounded-[50%] overflow-hidden bg-[#29285D]">
          <PrismicNextImage
            field={item.image}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
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
              heading4: ({ children }) => (
                <Heading
                  as="h4"
                  size="sm"
                  className={clsx("mb-4", isDarkBlue && "text-white")}
                >
                  {children}
                </Heading>
              ),
              paragraph: ({ children }) => (
                <p
                  className={clsx(
                    "text-sm mb-6 last:mb-0",
                    isDarkBlue && "text-gray-200"
                  )}
                >
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
          <div className="w-full flex pt-10">
            <ButtonLink
              field={item.link}
              size="sm"
              color="Link"
              className="!pl-0"
            >
              Learn more
            </ButtonLink>
          </div>
        )}
      </div>
    </li>
  );
};

export default IconInsideCard;
