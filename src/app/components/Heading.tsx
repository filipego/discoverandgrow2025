import clsx from "clsx";

type HeadingProps = {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    size?: "xl" | "lg" | "md" | "sm" | "xs";
    color?: "brand-dark-gray" | "brand-light-gray" | "brand-gold" | "brand-off-white";
    ff?: "primary" | "primary-light" | "primary-medium" | "secondary";
    children: React.ReactNode;
    className?: string;
};

export function Heading({
    as: Comp = "h2",
    className,
    children,
    size = "lg",
    color = "brand-dark-gray",
    ff,
}: HeadingProps) {
    return (
        <Comp
            className={clsx(
                "font-sans",
                size === "xl" && "~text-4xl/8xl",
                size === "lg" && "text-4xl",
                size === "md" && "~text-3xl/5xl",
                size === "sm" && "~text-xl/4xl",
                size === "xs" && "~text-lg/xl",

                color === "brand-dark-gray" && "text-brand-dark-gray",
                color === "brand-light-gray" && "text-brand-light-gray",
                color === "brand-gold" && "text-brand-gold",
                color === "brand-off-white" && "text-brand-off-white",

                ff === "primary" && "font-primary",
                ff === "primary-light" && "font-primary-light",
                ff === "primary-medium" && "font-primary-medium",
                ff === "secondary" && "font-secondary",
                className,
            )}
        >
            {children}
        </Comp>
    );
}