import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { ButtonLink } from "@/app/components/ButtonLink";
import { LazyYouTubePlayer } from "@/app/components/LazyYouTubePlayer";
import { LazyTikTokPlayer } from "@/app/components/LazyTikTokPlayer";
import clsx from "clsx";

type DefaultHeroProps = {
  heading: Content.HeroSlice["primary"]["heading"];
  body: Content.HeroSlice["primary"]["body"];
  link: Content.HeroSlice["primary"]["link"];
  video_platform: "TikTok" | "YouTube" | null;
  video_id: string | null;
  kicker: Content.HeroSlice["primary"]["kicker"];
};

export function DefaultHero({ heading, body, link, video_platform, video_id, kicker }: DefaultHeroProps) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24 pt-8 lg:pt-20">
      <div>
        {kicker && (
          <span className="mb-4 text-xs uppercase tracking-widest block">
            {kicker}
          </span>
        )}
        <Heading as="h1" size="lg" className="mb-10 max-w-[600]">
          {heading}
        </Heading>
        <div className="max-w-[480] mb-5">
          <PrismicRichText field={body} />
        </div>
        {isFilled.repeatable(link) && (
          <ul className="flex gap-4 mt-8">
            {link.map((link) => (
              <li key={link.key}>
                <ButtonLink field={link} color={link.variant}>
                  {link.text}
                </ButtonLink>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={clsx(
        "w-full max-w-md mx-auto lg:max-w-none",
        video_platform === "TikTok" ? "aspect-[9/16] lg:max-h-[600px]" : "aspect-video"
      )}>
        {video_platform === "TikTok" && video_id && (
          <LazyTikTokPlayer tikTokID={video_id} />
        )}
        {video_platform === "YouTube" && video_id && (
          <LazyYouTubePlayer youTubeID={video_id} />
        )}
      </div>
    </div>
  );
}