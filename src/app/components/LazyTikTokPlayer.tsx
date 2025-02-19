"use client";

import { KeyTextField } from "@prismicio/client";
import { useEffect, useRef, useState } from "react";

type VideoProps = {
    tikTokID: KeyTextField;
};

export function LazyTikTokPlayer({ tikTokID }: VideoProps) {
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentContainerRef = containerRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0, rootMargin: "1500px" }
        );

        if (currentContainerRef) {
            observer.observe(currentContainerRef);
        }

        return () => {
            if (currentContainerRef) {
                observer.unobserve(currentContainerRef);
            }
        };
    });

    return (
        <div className="relative w-full h-full overflow-hidden" ref={containerRef}>
            {isInView && (
                <iframe
                    src={`https://www.tiktok.com/player/v1/${tikTokID}?controls=1&play_button=1&volume_control=1&progress_bar=1&autoplay=1&rel=0&description=0&music_info=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="absolute top-0 left-0 w-full h-full"
                />
            )}
        </div>
    );
}