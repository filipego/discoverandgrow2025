import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";
import { LinkField } from "@prismicio/client";
import { HiArrowRight } from "react-icons/hi2";

export type ButtonProps = PrismicNextLinkProps & {
  color?: "Primary" | "Secondary" | "Link";
  size?: "sm" | "md" | "lg";
  blink?: boolean;
  noPadding?: boolean;
  field: LinkField;
};

export function ButtonLink({
  color = "Primary",
  size = "md",
  children,
  className,
  field,
  noPadding = false,
  ...props
}: ButtonProps) {
  const isPrimaryOrSecondary = color === "Primary" || color === "Secondary";

  return (
    <PrismicNextLink field={field} {...props}>
      <span
        className={clsx(
          "group inline-flex items-center transition duration-300 uppercase font-semibold",
          color === "Link" &&
            "bg-transparent text-brand-green-accessible text-[14px] lg:text-base",
          color === "Primary" &&
            "bg-brand-green text-white rounded-full text-[12px] lg:text-sm",
          color === "Secondary" &&
            "bg-brand-orange text-white rounded-full text-[12px] lg:text-sm",
          // One size down below lg: sm stays sm, md→sm, lg→md
          noPadding && size === "sm" && "gap-2.5",
          noPadding && size === "md" && "gap-2.5 lg:gap-3 lg:text-base",
          noPadding && size === "lg" && "gap-3 lg:text-lg",
          !noPadding && size === "sm" && "gap-2 py-1.5 pl-3 pr-1",
          !noPadding &&
            size === "md" &&
            "gap-2.5 py-1.5 pl-4 pr-1.5 lg:gap-3 lg:px-5 lg:py-[9px]",
          !noPadding &&
            size === "lg" &&
            "gap-3 py-[9px] pl-5 pr-1.5 lg:px-5 lg:py-3",
          className
        )}
      >
        {children}
        {(color === "Link" || isPrimaryOrSecondary) && (
          <>
            {isPrimaryOrSecondary ? (
              <span
                className={clsx(
                  "flex h-6 w-6 items-center justify-center rounded-full lg:h-7 lg:w-7",
                  color === "Primary" && "bg-[#54AC8B]",
                  color === "Secondary" && "bg-[#FF7456]"
                )}
              >
                <HiArrowRight
                  className={clsx(
                    "relative left-[0.5px] h-3.5 w-3.5 -rotate-45 transform transition-all duration-300 group-hover:left-[1px] group-hover:rotate-0 lg:h-4 lg:w-4"
                  )}
                  aria-hidden
                />
              </span>
            ) : (
              <HiArrowRight
                className={clsx(
                  "relative left-[0.5px] h-3.5 w-3.5 -rotate-45 transform transition-all duration-300 group-hover:left-[1px] group-hover:rotate-0 lg:h-4 lg:w-4"
                )}
                aria-hidden
              />
            )}
          </>
        )}
      </span>
    </PrismicNextLink>
  );
}
