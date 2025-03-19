import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  color?: "brand-black" | "brand-light-gray" | "brand-off-white";
  ff?: "primary" | "primary-light" | "primary-medium" | "secondary";
  children: React.ReactNode;
  className?: string;
};

export function Heading({
  as: Comp = "h2",
  className,
  children,
  size = "lg",
  color = "brand-black",
  ff = "secondary",
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        "font-sans",
        size === "xl" &&
          "text-3xl lg:text-5xl leading-9 lg:leading-14 font-extrabold",
        size === "lg" &&
          "text-2xl lg:text-3xl font-bold leading-8 lg:leading-9",
        size === "md" &&
          "text-xl lg:text-2xl font-bold leading-7 lg:leading-[30px]",
        size === "sm" && "text-lg lg:text-xl font-bold",
        size === "xs" && "text-md lg:text-lg font-bold",

        color === "brand-black" && "text-brand-black",
        color === "brand-light-gray" && "text-brand-gray",
        color === "brand-off-white" && "text-brand-off-white",

        ff === "primary" && "font-primary",
        ff === "primary-light" && "font-primary-light",
        ff === "primary-medium" && "font-primary-medium",
        ff === "secondary" && "font-secondary",
        className
      )}
    >
      {children}
    </Comp>
  );
}
