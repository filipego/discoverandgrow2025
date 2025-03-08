import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";
import { LinkField } from "@prismicio/client";
import { HiArrowRight } from "react-icons/hi2";

export type ButtonProps = PrismicNextLinkProps & {
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
        <PrismicNextLink
            field={field}
            {...props}
        >
            <span
                className={clsx(
                    "group inline-flex items-center transition duration-300 uppercase",
                    color !== "Link" && "rounded-full border border-solid",
                    size === "sm" && "gap-2.5 py-2 text-xs px-3",
                    size === "md" && "gap-3 text-sm py-2 px-6",
                    size === "lg" && "gap-3 text-base py-4 px-6",
                    className,
                )}
                style={styles}
            >
                {children}
                {color === "Link" && (
                    <HiArrowRight className="ml-[-4px] transition-all duration-300 transform -rotate-45 group-hover:rotate-0 group-hover:translate-x-1" size={16} />
                )}
            </span>
        </PrismicNextLink>
    );
}