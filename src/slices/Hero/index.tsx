import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { CenteredHero } from "./components/CenteredHero";
import { DefaultHero } from "./components/DefaultHero";
import { VideoHero } from "./components/VideoHero";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded padding="no padding" className="pt-2 pb-5 lg:pb-10 lg:pt-6">
      {slice.variation === "centeredHero" ? (
        <CenteredHero
          heading={slice.primary.heading}
          body={slice.primary.body}
          link={slice.primary.link}
        />
      ) : slice.variation === "heroWithVideo" ? (
        <VideoHero
          heading={slice.primary.heading}
          body={slice.primary.body}
          link={slice.primary.link}
          video_platform={slice.primary.video_platform}
          video_id={slice.primary.video_id}
          kicker={slice.primary.kicker}
        />
      ) : (
        <DefaultHero
          heading={slice.primary.heading}
          body={slice.primary.body}
          link={slice.primary.link}
          image={slice.primary.image}
          kicker={slice.primary.kicker}
        />
      )}
    </Bounded>
  );
};

export default Hero;
