import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { createClient } from "@/prismicio";
import clsx from "clsx";
import { BasicCard } from "./components/BasicCard";
import { SideImageCard } from "./components/SideImageCard";

/**
 * Props for `ProgramsCard`.
 */
export type ProgramsCardProps = SliceComponentProps<Content.ProgramsCardSlice>;

export interface CardProps {
  item: {
    heading: string;
    body: any;
    image: any;
    link: any;
    bg_color: "Dark Blue" | "White";
    direction?: "left" | "right";
  };
}

/**
 * Component for "ProgramsCard" Slices.
 */
const ProgramsCard: FC<ProgramsCardProps> = async ({ slice }) => {
  const client = createClient();
  const programs = await client.getAllByType("what_we_do");
  const padding = slice.primary?.padding as string | undefined;

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
      className={clsx(
        padding === "smaller padding" && "!py-5",
        padding === "no padding" && "!pt-0 !pb-0",
        padding === "no top padding" && "!pt-0",
        padding === "no bottom padding" && "!pb-0"
      )}
    >
      {slice.variation === "default" && (
        <ul className="flex flex-col md:flex-row gap-5 md:items-stretch">
          {nonFeaturedPrograms.map((program, i) => (
            <BasicCard
              key={i}
              item={{
                heading: program.data.title || "", // Add fallback empty string
                body: program.data.description,
                image: program.data.thumbnail,
                link: program.data.link,
                bg_color: "White",
              }}
            />
          ))}
        </ul>
      )}

      {slice.variation === "imageSide" && featuredProgram && (
        <ul className="flex flex-col md:flex-row gap-5 md:items-stretch">
          {/* In the SideImageCard usage: */}
          <SideImageCard
            item={{
              heading: featuredProgram.data.title || "",
              body: featuredProgram.data.description,
              image: featuredProgram.data.thumbnail,
              link: featuredProgram.data.link,
              bg_color: "White",
              direction: slice.primary?.image_direction,
            }}
          />
        </ul>
      )}
    </Bounded>
  );
};

export default ProgramsCard;
