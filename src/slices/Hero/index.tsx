import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <section
      className={clsx(
        "relative",
        slice.primary.bg_color === "Dark Blue" && "bg-[#29285D] text-white",
        slice.primary.bg_color === "Yellow" && "bg-[#F1E1A7]"
      )}
    >
      Placeholder component for hero (variation: {slice.variation}) Slices
    </section>
  );
};

export default Hero;
