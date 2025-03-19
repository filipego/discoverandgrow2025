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
  return (
    <PrismicNextLink field={field} {...props}>
      <span
        className={clsx(
          "group inline-flex items-center transition duration-300 uppercase font-semibold",
          color === "Link" && "bg-transparent text-brand-green text-base",
          color === "Primary" && "bg-brand-green text-white rounded-full border border-solid text-sm",
          color === "Secondary" && "bg-brand-orange text-white rounded-full border border-solid text-sm",
          size === "sm" && "gap-2.5 py-2 text-xs px-3",
          size === "md" && "gap-3 py-2 px-6",
          size === "lg" && "gap-3 py-4 px-6",
          className
        )}
      >
        {children}
        {color === "Link" && (
          <HiArrowRight
            className="ml-[-4px] transition-all duration-300 transform -rotate-45 group-hover:rotate-0 group-hover:translate-x-1"
            size={16}
          />
        )}
      </span>
    </PrismicNextLink>
  );
}
