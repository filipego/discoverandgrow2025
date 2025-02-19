import { PrismicNextLinkProps } from "@prismicio/next";
import { SmartPrismicLink } from "@/app/components/SmartPrismicLink";
import clsx from "clsx";
import { LinkField } from "@prismicio/client";  // Add this import
import { IoArrowForwardCircleOutline } from "react-icons/io5";

export type ButtonProps = Omit<PrismicNextLinkProps, 'href'> & {
    color?: "Primary" | "Secondary" | "Link";
    size?: "sm" | "md" | "lg";
    field: LinkField;
};

export function ButtonLink({
    color = "Primary",
    size = "md",
    children,
    className,
    field,
    ...props
}: ButtonProps) {
    const styles = {
        backgroundColor: color === "Link" ? "transparent" :
            color === "Secondary" ? "#34328F" :
                "#D93CA6",
        color: color === "Link" ? "#34328F" : "#fff",
    };

    return (
        <SmartPrismicLink
            link={field}
        >
            <span
                className={clsx(
                    "group inline-flex items-center transition duration-300 uppercase",
                    color !== "Link" && "rounded-full border border-solid",
                    size === "sm" && "gap-2.5 py-2 text-xs px-3",
                    size === "md" && "gap-3 text-sm py-2 px-6",
                    size === "lg" && "gap-3 text-sm py-4 px-6",
                    className,
                )}
                style={styles}
            >
                {children}
                {color === "Link" && (
                    <IoArrowForwardCircleOutline
                        className="-ml-1 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
                        size={22}
                    />
                )}
            </span>
        </SmartPrismicLink>
    );
}