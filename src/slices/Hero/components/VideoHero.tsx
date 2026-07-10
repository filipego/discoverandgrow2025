import { Content, isFilled, KeyTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { ButtonLink } from "@/app/components/ButtonLink";
import { LazyYouTubePlayer } from "@/app/components/LazyYouTubePlayer";
import { LazyTikTokPlayer } from "@/app/components/LazyTikTokPlayer";
import clsx from "clsx";

type VideoHeroProps = {
  heading: Content.HeroSliceHeroWithVideoPrimary["heading"];
  body: Content.HeroSliceHeroWithVideoPrimary["body"];
  link: Content.HeroSliceHeroWithVideoPrimary["link"];
  video_platform: "TikTok" | "YouTube" | null;
  video_id: string | null;
  kicker: KeyTextField;
};

export function VideoHero({
  heading,
  body,
  link,
  video_platform,
  video_id,
  kicker,
}: VideoHeroProps) {
  return (
    <div className="grid grid-cols-5 items-center gap-12 py-8 lg:gap-24 lg:py-20">
      <div className="col-span-5 lg:col-span-3">
        {isFilled.keyText(kicker) && (
          <span className="mb-4 block text-xs uppercase tracking-widest">
            {kicker}
          </span>
        )}
        <Heading as="h1" size="xl" className="mb-10 max-w-[650]">
          {heading}
        </Heading>
        <div className="mb-5 max-w-[480]">
          <PrismicRichText field={body} />
        </div>
        {isFilled.repeatable(link) && (
          <ul className="mt-14 flex gap-2">
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
      <div
        className={clsx(
          "col-span-5 mx-auto w-full max-w-md lg:col-span-2 lg:max-w-none",
          video_platform === "TikTok"
            ? "aspect-[9/16] lg:max-h-[600px]"
            : "aspect-video"
        )}
      >
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
