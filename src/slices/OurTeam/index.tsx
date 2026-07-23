import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { FoundersLayout } from "./components/FoundersLayout";
import { BoardLayout } from "./components/BoardLayout";
import clsx from "clsx";

/**
 * Props for `OurTeam`.
 */
export type OurTeamProps = SliceComponentProps<Content.OurTeamSlice>;

/**
 * Component for "OurTeam" Slices.
 */
const OurTeam: FC<OurTeamProps> = ({ slice, slices, index }) => {
  const isFirstOurTeam =
    slices.findIndex((entry) => entry.slice_type === slice.slice_type) ===
    index;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      padding="no padding"
      className={clsx(
        "pb-5 lg:py-10",
        isFirstOurTeam ? "pt-0" : "pt-5"
      )}
    >
      {slice.variation === "ourBoard" ? (
        <BoardLayout people={slice.primary.person} />
      ) : (
        <FoundersLayout people={slice.primary.person} />
      )}
    </Bounded>
  );
};

export default OurTeam;
