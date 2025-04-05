import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { createClient } from "@/prismicio";

import BasicCard from "@/app/components/Cards/BasicCard";
import SideImageCard from "@/app/components/Cards/SideimageCard";

/**
 * Props for `ProgramsCard`.
 */
export type ProgramsCardProps = SliceComponentProps<Content.ProgramsCardSlice>;

/**
 * Component for "ProgramsCard" Slices.
 */
const ProgramsCard: FC<ProgramsCardProps> = async ({ slice }) => {
  const client = createClient();
  const programs = await client.getAllByType("what_we_do");

  // Filter featured program for imageSide variant
  const featuredProgram = programs.find(
    (program) => program.data.featured === true
  );

  // Filter non-featured programs for default variant (latest 2)
  const nonFeaturedPrograms = programs
    .filter((program) => !program.data.featured)
    .sort(
      (a, b) =>
        new Date(b.last_publication_date).getTime() -
        new Date(a.last_publication_date).getTime()
    )
    .slice(0, 2);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      padding={(slice.primary?.padding as any) || "normal padding"}
    >
      <ul className="flex flex-col md:flex-row gap-5 md:items-stretch">
        {slice.variation === "default" &&
          nonFeaturedPrograms.map((program, i) => {
            const baseProps = {
              heading: program.data.title || "",
              body: program.data.body,
              image: program.data.image,
              link: program.data.link,
              bg_color: "White" as "Dark Blue" | "White",
            };

            return <BasicCard key={i} item={baseProps} />;
          })}

        {slice.variation === "imageSide" && featuredProgram && (
          <SideImageCard
            item={{
              heading: featuredProgram.data.title || "",
              body: featuredProgram.data.body,
              image: featuredProgram.data.image,
              link: featuredProgram.data.link,
              bg_color: "White" as "Dark Blue" | "White",
              direction: slice.primary?.image_direction as "left" | "right",
            }}
          />
        )}
      </ul>
    </Bounded>
  );
};

export default ProgramsCard;
