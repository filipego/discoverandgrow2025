import { KeyTextField } from "@prismicio/client";

type VideoProps = {
    youTubeID: KeyTextField;
};

export function LazyYouTubePlayer({ youTubeID }: VideoProps) {

    return (
        <div className="relative h-full w-full">
            <iframe
                src={`https://www.youtube-nocookie.com/embed/${youTubeID}?autoplay=1&mute=1&loop=1&playlist=${youTubeID}&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="h-full w-full border-0"
                allowFullScreen
            />
        </div>
    );
}