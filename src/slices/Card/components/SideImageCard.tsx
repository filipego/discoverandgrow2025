import { FC } from "react";
import { CardProps } from "../index";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { CardLink } from "./CardLink";

export const SideImageCard: FC<CardProps> = ({ item }) => {
    return (
        <li className={clsx(
            "rounded-xl w-full flex flex-col md:flex-row md:min-h-[400px] relative",
            item.direction === "right" && "md:flex-row-reverse",
            item.bg_color === "Dark Blue" && "bg-[#29285D] text-white",
            item.bg_color === "White" && "bg-white"
        )}>
            <div className={clsx(
                "w-full h-[300px] md:h-full md:w-1/2 overflow-hidden rounded-t-xl md:rounded-none",
                item.direction === "left" ? "md:rounded-l-xl" : "md:rounded-r-xl"
            )}>
                <PrismicNextImage
                    field={item.image}
                    className="w-full h-full object-cover"
                    alt=""
                />
            </div>
            <div className="flex flex-col flex-1 p-6 md:p-10 md:w-1/2">
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
                                <p className="mb-6">{children}</p>
                            ),
                            list: ({ children }) => (
                                <ul className="list-disc pl-10 space-y-2">{children}</ul>
                            ),
                            listItem: ({ children }) => (
                                <li>{children}</li>
                            )
                        }}
                    />
                </div>
                {isFilled.link(item.link) && <CardLink link={item.link} />}
            </div>
        </li>
    );
};