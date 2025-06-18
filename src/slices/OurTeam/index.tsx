import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { FoundersLayout } from "./components/FoundersLayout";
import { BoardLayout } from "./components/BoardLayout";

/**
 * Props for `OurTeam`.
 */
export type OurTeamProps = SliceComponentProps<Content.OurTeamSlice>;

/**
 * Component for "OurTeam" Slices.
 */
const OurTeam: FC<OurTeamProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
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
