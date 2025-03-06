import { FC } from "react";
import { PrismicNextLink } from "@prismicio/next";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { LinkField } from "@prismicio/client";
import clsx from "clsx";

interface CardLinkProps {
    link: LinkField;
}

export const CardLink: FC<CardLinkProps> = ({ link }) => {
    return (
        <div className="flex items-center mt-auto pt-16">
            <PrismicNextLink
                field={link}
                className="font-bold text-[#D93CA6] flex items-center group"
            >
                <span>{link.text}</span>
                <IoArrowForwardCircleOutline
                    className={clsx(
                        "ml-2 -rotate-45 transition-transform duration-300 group-hover:rotate-0",
                        "text-[#D93CA6]"
                    )}
                    size={24}
                />
            </PrismicNextLink>
        </div>
    );
};