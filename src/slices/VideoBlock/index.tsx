import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { LazyCanvaPlayer } from "@/app/components/LazyCanvaPlayer";
import { LazyYouTubePlayer } from "@/app/components/LazyYouTubePlayer";
import { getCanvaEmbedUrl } from "@/lib/canvaEmbed.mjs";
import clsx from "clsx";

type VideoBlockPrimary = Content.VideoBlockSliceDefaultPrimary & {
  video_platform?: "YouTube" | "Canva" | null;
};

/**
 * Props for `VideoBlock`.
 */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

/**
 * Component for "VideoBlock" Slices.
 */
const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  const primary = slice.primary as VideoBlockPrimary;
  const videoPlatform = primary.video_platform ?? "YouTube";
  const canvaEmbedUrl = getCanvaEmbedUrl(primary.youtube_video_id);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        primary.no_padding && "!py-0"
      )}
    >
      <div className="flex justify-center">
        <div className={clsx(
          "w-full relative",
          primary.smaller ? "lg:w-[70%]" : "w-full"
        )}>
          <div className="aspect-video">
            {videoPlatform === "Canva" || canvaEmbedUrl ? (
              <LazyCanvaPlayer canvaUrl={primary.youtube_video_id} />
            ) : (
              <LazyYouTubePlayer youTubeID={primary.youtube_video_id} />
            )}
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default VideoBlock;
