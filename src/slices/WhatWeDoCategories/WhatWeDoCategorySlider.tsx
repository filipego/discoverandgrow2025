"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Content, isFilled, type LinkField } from "@prismicio/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import BasicCard from "@/app/components/Cards/BasicCard";
import "swiper/css";

type WhatWeDoCategorySliderProps = {
  items: Content.WhatWeDoDocument[];
};

const navButtonClassName =
  "flex h-11 w-11 items-center justify-center rounded-full border border-brand-blue/15 bg-white text-brand-blue shadow-sm transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green disabled:pointer-events-none disabled:opacity-40";

const getCardLink = (item: Content.WhatWeDoDocument): LinkField => {
  if (isFilled.link(item.data.link)) {
    return item.data.link;
  }

  if (item.url) {
    return {
      link_type: "Web",
      url: item.url,
    };
  }

  return item.data.link;
};

const WhatWeDoCategorySlider: FC<WhatWeDoCategorySliderProps> = ({ items }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const showNavigation = items.length > 1;

  useEffect(() => {
    if (!swiperInstance || !showNavigation) return;
    if (
      !swiperInstance.params.navigation ||
      typeof swiperInstance.params.navigation === "boolean"
    ) {
      return;
    }

    swiperInstance.params.navigation.prevEl = prevRef.current;
    swiperInstance.params.navigation.nextEl = nextRef.current;
    swiperInstance.navigation.destroy();
    swiperInstance.navigation.init();
    swiperInstance.navigation.update();
  }, [swiperInstance, showNavigation]);

  if (items.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-stretch gap-2 sm:gap-3 md:gap-4">
        {showNavigation && (
          <div className="flex shrink-0 items-center self-center md:-ml-2 lg:-ml-6">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous program"
              className={navButtonClassName}
            >
              <HiChevronLeft size={22} aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="min-w-0 flex-1 overflow-visible">
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            grabCursor={showNavigation}
            allowTouchMove={showNavigation}
            onSwiper={setSwiperInstance}
            navigation={
              showNavigation
                ? {
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }
                : false
            }
            breakpoints={{
              768: {
                slidesPerView: Math.min(items.length, 2),
                spaceBetween: 28,
              },
              1024: {
                slidesPerView: Math.min(items.length, 2),
                spaceBetween: 32,
              },
            }}
            className="what-we-do-category-slider !overflow-visible px-1 pb-6 pt-2 [&_.swiper-button-prev]:hidden [&_.swiper-button-next]:hidden [&_.swiper-wrapper]:!overflow-visible"
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto !overflow-visible">
                <ul className="flex h-full list-none p-0">
                  <BasicCard
                    item={{
                      heading: item.data.title || "",
                      body: item.data.body,
                      image: item.data.image,
                      link: getCardLink(item),
                      bg_color: "White",
                    }}
                    contentClassName="max-w-xl"
                  />
                </ul>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {showNavigation && (
          <div className="flex shrink-0 items-center self-center md:-mr-2 lg:-mr-6">
            <button
              ref={nextRef}
              type="button"
              aria-label="Next program"
              className={navButtonClassName}
            >
              <HiChevronRight size={22} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatWeDoCategorySlider;
