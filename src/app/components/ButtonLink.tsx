import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export type ButtonProps = PrismicNextLinkProps & {
    color?: "Primary" | "Secondary";
    size?: "sm" | "md" | "lg";
};

export function ButtonLink({
    color = "Primary",
    size = "md",
    children,
    className,
    ...props
}: ButtonProps) {
    const colorStyles = {
        backgroundColor: color === "Primary" ? "#F1E1A7" : "#C7E9B4",
    };

    return (
        <PrismicNextLink
            className={clsx(
                "group inline-block transition duration-300 rounded-full border border-solid uppercase text-[#29285D]",
                size === "sm" && "gap-2.5 py-2 text-xs px-3",
                size === "md" && "gap-3 text-sm py-2 px-6",
                size === "lg" && "gap-3 text-sm py-4 px-6",
                className,
            )}
            style={colorStyles}
            {...props}
        >
            {children}
        </PrismicNextLink>
    );
}

