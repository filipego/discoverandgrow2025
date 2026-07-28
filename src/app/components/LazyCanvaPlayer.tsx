"use client";

import { KeyTextField } from "@prismicio/client";
import { useEffect, useRef, useState } from "react";
import { getCanvaEmbedUrl } from "@/lib/canvaEmbed.mjs";

type LazyCanvaPlayerProps = {
  canvaUrl: KeyTextField;
};

export function LazyCanvaPlayer({ canvaUrl }: LazyCanvaPlayerProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const embedUrl = getCanvaEmbedUrl(canvaUrl);

  useEffect(() => {
    const currentContainerRef = containerRef.current;
    if (!currentContainerRef || !embedUrl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0, rootMargin: "1500px" },
    );

    observer.observe(currentContainerRef);
    return () => observer.unobserve(currentContainerRef);
  }, [embedUrl]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl" ref={containerRef}>
      {isInView && embedUrl && (
        <iframe
          src={embedUrl}
          title="Canva video"
          loading="lazy"
          allow="fullscreen"
          className="h-full w-full border-0"
          allowFullScreen
        />
      )}
    </div>
  );
}
