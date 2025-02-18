import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { CenteredHero } from "./components/CenteredHero";
import { DefaultHero } from "./components/DefaultHero";
import clsx from "clsx";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded className="pt-4 lg:pt-6">
      {slice.variation === 'centeredHero' ? (
        <CenteredHero
          heading={slice.primary.heading}
          body={slice.primary.body}
          link={slice.primary.link}
        />
      ) : (
        <DefaultHero 
          heading={slice.primary.heading}
          body={slice.primary.body}
          link={slice.primary.link}
          video_platform={slice.primary.video_platform}
          video_id={slice.primary.video_id}
          kicker={slice.primary.kicker}
        />
      )}
    </Bounded>
  );
};

export default Hero;
