import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { LazyYouTubePlayer } from "@/app/components/LazyYouTubePlayer";
import clsx from "clsx";

/**
 * Props for `VideoBlock`.
 */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

/**
 * Component for "VideoBlock" Slices.
 */
const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        slice.primary.no_padding && "!py-0"
      )}
    >
      <div className="flex justify-center">
        <div className={clsx(
          "w-full relative",
          slice.primary.smaller ? "lg:w-[70%]" : "w-full"
        )}>
          <div className="aspect-video">
            <LazyYouTubePlayer youTubeID={slice.primary.youtube_video_id} />
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default VideoBlock;
