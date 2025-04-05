import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import StoreSlider from "@/app/components/Sliders/StoreSlider";

/**
 * Props for `Store`.
 */
export type StoreProps = SliceComponentProps<Content.StoreSlice>;

/**
 * Component for "Store" Slices - Now a Server Component wrapper.
 */
const Store: FC<StoreProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <StoreSlider items={slice.primary.items} />
    </Bounded>
  );
};

export default Store;
