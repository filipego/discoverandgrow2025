import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";
import { LinkField } from "@prismicio/client";
import { HiArrowRight } from "react-icons/hi2";

export type ButtonProps = PrismicNextLinkProps & {
  color?: "Primary" | "Secondary" | "Link";
  size?: "sm" | "md" | "lg";
  blink?: boolean;
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
  const isPrimaryOrSecondary = color === "Primary" || color === "Secondary";

  return (
    <PrismicNextLink field={field} {...props}>
      <span
        className={clsx(
          "group inline-flex items-center transition duration-300 uppercase font-semibold",
          color === "Link" && "bg-transparent text-brand-green text-base",
          color === "Primary" &&
            "bg-brand-green text-white rounded-full text-sm",
          color === "Secondary" &&
            "bg-brand-orange text-white rounded-full text-sm",
          size === "sm" && "gap-2.5 py-1.5 text-sm px-2",
          size === "md" && "gap-3 py-[9px] px-5",
          size === "lg" && "gap-3 py-3 px-5",
          className
        )}
      >
        {children}
        {(color === "Link" || isPrimaryOrSecondary) && (
          <>
            {isPrimaryOrSecondary ? (
              <span
                className={clsx(
                  "flex items-center justify-center rounded-full w-7 h-7",
                  color === "Primary" && "bg-[#25DBC4]",
                  color === "Secondary" && "bg-[#FF7456]"
                )}
              >
                <HiArrowRight
                  className={clsx(
                    "transition-all duration-300 transform",
                    "-rotate-45 group-hover:rotate-0",
                    "relative left-[0.5px] group-hover:left-[1px]" // Adjust position before and after hover
                  )}
                  size={16}
                />
              </span>
            ) : (
              <HiArrowRight
                className={clsx(
                  "transition-all duration-300 transform",
                  "-rotate-45 group-hover:rotate-0",
                  "relative left-[0.5px] group-hover:left-[1px]"
                )}
                size={16}
              />
            )}
          </>
        )}
      </span>
    </PrismicNextLink>
  );
}
