import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `CardsandImages`.
 */
export type CardsandImagesProps =
  SliceComponentProps<Content.CardsandImagesSlice>;

/**
 * Component for "CardsandImages" Slices.
 */
const CardsandImages: FC<CardsandImagesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for cardsand_images (variation: {slice.variation})
      Slices
    </section>
  );
};

export default CardsandImages;
