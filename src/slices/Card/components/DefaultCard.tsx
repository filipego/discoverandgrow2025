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
  imageContainer?: ReactNode;
}

export const DefaultCard: FC<ExtendedCardProps> = ({ 
  item, 
  className,
  imageContainer = (
    <div className="w-full h-[200px]">
      <PrismicNextImage
        field={item.image}
        className="w-full h-full object-cover"
      />
    </div>
  )
}) => {
  return (
    <li className={clsx(
      "rounded-xl w-full flex flex-col md:min-h-[400px]", // Added md: prefix
      item.bg_color === "Dark Blue" && "bg-[#29285D] text-white",
      item.bg_color === "Yellow" && "bg-[#F1E1A7]",
      className
    )}>
      {imageContainer}
      <div className={clsx(
        "px-10 py-10 flex-1 flex flex-col",
        !className?.includes("flex-row") && "overflow-hidden"
      )}>
        <div className="flex-1"> {/* Added flex-1 to push content up */}
          <Heading as="h3" size="sm" className="mb-5">
            {item.heading}
          </Heading>
          <PrismicRichText
            field={item.body}
            components={{
              paragraph: ({ children }) => (
                <p className="text-sm mb-5 lg:max-w-[90%]">{children}</p>
              ),
            }}
          />
        </div>
        {isFilled.link(item.link) && (
          <div className="mt-auto pt-4 flex justify-between items-center group">
            {/* Link content remains the same */}
            <SmartPrismicLink
              link={item.link}
              className={clsx(
                item.bg_color === "Dark Blue" && "text-[#F1E1A7]"
              )}
            >
              {item.link.text}
            </SmartPrismicLink>

            <SmartPrismicLink link={item.link}>
              <IoArrowForwardCircleOutline
                className={clsx(
                  "mt-2 -rotate-45 transition-transform duration-300 group-hover:rotate-0",
                  item.bg_color === "Dark Blue" && "text-[#F1E1A7]"
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