import { FC, ReactNode } from "react";
import { CardProps } from "../index";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { SmartPrismicLink } from "@/app/components/SmartPrismicLink";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

interface ExtendedCardProps extends CardProps {
  className?: string;
  contentClassName?: string;
  imageContainer?: ReactNode;
}

export const DefaultCard: FC<ExtendedCardProps> = ({
  item,
  className,
  contentClassName,
  imageContainer = (
    <div className={clsx(
      "w-full overflow-hidden",
      // Only apply height and rounded top to default cards
      !className && "h-[400px] rounded-t-xl"
    )}>
      <PrismicNextImage
        field={item.image}
        className="w-full h-full object-cover"
        alt=""
      />
    </div>
  )
}) => {
  return (
    <li className={clsx(
      "rounded-xl w-full flex flex-col relative",
      className === "imageSide" && "md:flex-row md:min-h-[400px]",
      className === "imageSideReverse" && "md:flex-row-reverse md:min-h-[400px]",
      item.bg_color === "Dark Blue" && "bg-[#29285D] text-white",
      item.bg_color === "White" && "bg-white"
    )}>
      {imageContainer}
      <div className={clsx(
        "flex flex-col h-full justify-between p-8 md:p-12",
        (className === "imageSide" || className === "imageSideReverse") && "md:w-1/2",
        contentClassName
      )}>
        <div>
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
                <p className="mb-6">{children}</p>
              ),
              list: ({ children }) => (
                <ul className={clsx(
                  "list-disc pl-10 space-y-2",
                  (className === "imageSide" || className === "imageSideReverse") && "mb-10"
                )}>{children}</ul>
              ),
              listItem: ({ children }) => (
                <li>{children}</li>
              )
            }}
          />
        </div>
        {isFilled.link(item.link) && (
          <div className="flex justify-between items-center group">
            <SmartPrismicLink
              link={item.link}
              className="font-bold text-[#D93CA6]"
            >
              {item.link.text}
            </SmartPrismicLink>

            <SmartPrismicLink link={item.link}>
              <IoArrowForwardCircleOutline
                className={clsx(
                  "mt-2 -rotate-45 transition-transform duration-300 group-hover:rotate-0",
                  "text-[#D93CA6]"
                )}
                size={30}
              />
            </SmartPrismicLink>
          </div>
        )}
      </div>
    </li>
  );
};