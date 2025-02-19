import { FC } from "react";
import { SmartPrismicLink } from "@/app/components/SmartPrismicLink";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { LinkField } from "@prismicio/client";
import clsx from "clsx";

interface CardLinkProps {
    link: LinkField;
}

export const CardLink: FC<CardLinkProps> = ({ link }) => {
    return (
        <div className="flex justify-between items-center group mt-auto pt-16">
            <SmartPrismicLink
                link={link}
                className="font-bold text-[#D93CA6]"
            >
                {link.text}
            </SmartPrismicLink>

            <SmartPrismicLink link={link}>
                <IoArrowForwardCircleOutline
                    className={clsx(
                        "mt-2 -rotate-45 transition-transform duration-300 group-hover:rotate-0",
                        "text-[#D93CA6]"
                    )}
                    size={30}
                />
            </SmartPrismicLink>
        </div>
    );
};