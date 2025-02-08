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
                size === "xl" && "text-4xl lg:text-8xl",
                size === "lg" && "text-2xl lg:text-4xl",
                size === "md" && "text-xl lg:text-3xl",
                size === "sm" && "text-lg lg:text-2xl",
                size === "xs" && "~text-md/lg:text-xl",

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