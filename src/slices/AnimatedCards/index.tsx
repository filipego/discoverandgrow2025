import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { AnimatedCardsClient } from "./AnimatedCardsClient";


/**
 * Props for `AnimatedCards`.
 */
export type AnimatedCardsProps =
  SliceComponentProps<Content.AnimatedCardsSlice>;

/**
 * Component for "AnimatedCards" Slices.
 */
const AnimatedCards: FC<AnimatedCardsProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <AnimatedCardsClient slice={slice} />
    </Bounded>
  );
};

export default AnimatedCards;
