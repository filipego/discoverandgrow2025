import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export type ButtonProps = PrismicNextLinkProps & {
    color?: "blue" | "gray";
    size?: "sm" | "md" | "lg";
};

export function ButtonLink({
    color = "blue",
    size = "md",
    children,
    className,
    ...props
}: ButtonProps) {
    return (
        <PrismicNextLink
            className={clsx(
                "group inline-block transition duration-300 rounded-full border border-solid uppercase",
                size === "sm" && "gap-2.5 py-2 text-xs px-3",
                size === "md" && "gap-3 text-sm py-2 px-6",
                size === "lg" && "gap-3 text-sm py-4 px-6",
                color === "blue" &&
                "bg-brand-blue text-brand-off-white border-brand-blue hover:bg-transparent hover:text-brand-blue",
                color === "gray" &&
                "border-brand-blue text-brand-blue hover:text-brand-off-white hover:bg-brand-blue",
                className,
            )}
            {...props}
        >
            {children}
        </PrismicNextLink>
    );
}

