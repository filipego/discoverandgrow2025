import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { Bounded } from "@/app/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { isFilled } from "@prismicio/client";
import { ButtonLink } from "@/app/components/ButtonLink";

export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

const bgColorMap = {
  "Dark Blue": { bg: "#29285D", text: "#FFFFFF" },
  "Yellow": { bg: "#F1E1A7", text: "inherit" },
  "Green": { bg: "#43C467", text: "inherit" },
  "Orange": { bg: "#F57F15", text: "inherit" }
};

// Remove bgColorMap object

type ColorSectionProps = {
  bgColor?: string;
  className?: string;
  children: React.ReactNode;
};

const ColorSection = ({
  bgColor,
  className,
  children
}: ColorSectionProps) => {
  return (
    <div
      className={clsx(
        className,
        bgColor === "Dark Blue" && "bg-[#29285D] text-white rounded-xl p-[50px_40px]",
        bgColor === "Yellow" && "bg-[#F1E1A7] rounded-xl p-[50px_40px]",
        bgColor === "Green" && "bg-[#43C467] rounded-xl p-[50px_40px]",
        bgColor === "Orange" && "bg-[#F57F15] rounded-xl p-[50px_40px]"
      )}
    >
      {children}
    </div>
  );
};

const TextAndImage: FC<TextAndImageProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        isFilled.select(slice.primary.bg_color_full_width) && "p-[50px_40px] my-10",
        slice.primary.bg_color_full_width === "Dark Blue" && "bg-[#29285D] text-white",
        slice.primary.bg_color_full_width === "Yellow" && "bg-[#F1E1A7]",
        slice.primary.bg_color_full_width === "Green" && "bg-[#43C467]",
        slice.primary.bg_color_full_width === "Orange" && "bg-[#F57F15]"
      )}
    >
      <ColorSection
        bgColor={isFilled.select(slice.primary.bg_color) ? slice.primary.bg_color : undefined}
        className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24"
      >
        <div className={clsx(
          "flex flex-col items-center gap-8 text-center lg:items-start lg:text-left",
          slice.variation === "imageOnLeft" && "lg:order-2"
        )}>
          <Heading size="lg" className="mb-8">{slice.primary.heading}</Heading>
          <PrismicRichText field={slice.primary.body} />
          {isFilled.repeatable(slice.primary.link) && (
            <ul className="flex gap-4">
              {slice.primary.link.map((link) => (
                <li key={link.key}>
                  <ButtonLink
                    field={link}
                  >
                    {link.text}

                  </ButtonLink>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <PrismicNextImage field={slice.primary.image} className="rounded-xl" alt="" />
        </div>
      </ColorSection>
    </Bounded>
  );
};

export default TextAndImage;