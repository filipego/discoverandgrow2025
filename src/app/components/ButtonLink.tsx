import { PrismicNextLinkProps } from "@prismicio/next";
import { SmartPrismicLink } from "@/app/components/SmartPrismicLink";
import clsx from "clsx";
import { LinkField } from "@prismicio/client";  // Add this import

export type ButtonProps = Omit<PrismicNextLinkProps, 'href'> & {
    color?: "Primary" | "Secondary";
    size?: "sm" | "md" | "lg";
    field: LinkField;  // Add proper type for field
};

export function ButtonLink({
    color = "Primary",
    size = "md",
    children,
    className,
    field,
    ...props
}: ButtonProps) {
    const colorStyles = {
        backgroundColor: color === "Primary" ? "#F1E1A7" : "#C7E9B4",
    };

    return (
        <SmartPrismicLink
            link={field}
        >
            <span
                className={clsx(
                    "group inline-block transition duration-300 rounded-full border border-solid uppercase text-[#29285D]",
                    size === "sm" && "gap-2.5 py-2 text-xs px-3",
                    size === "md" && "gap-3 text-sm py-2 px-6",
                    size === "lg" && "gap-3 text-sm py-4 px-6",
                    className,
                )}
                style={colorStyles}
            >
                {children}
            </span>
        </SmartPrismicLink>
    );
}