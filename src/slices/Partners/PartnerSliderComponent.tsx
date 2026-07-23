"use client";

import { FC, useRef, useState } from "react";
import { Content, isFilled, PrismicDocument } from "@prismicio/client";
import { PrismicRichText, PrismicImage } from "@prismicio/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Heading } from "@/app/components/Heading";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface PartnerSliderComponentProps {
  partners: Content.PartnerPostDocument[];
}

const partnerNavButtonClassName =
  "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-brand-blue/15 bg-white text-brand-blue shadow-sm transition-colors duration-200 hover:border-brand-green hover:bg-brand-green hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green disabled:pointer-events-none disabled:opacity-40";

const PartnerSliderComponent: FC<PartnerSliderComponentProps> = ({ partners }) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <div>
      {/* Navigation arrows and counter */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            className={`swiper-button-prev-custom ${partnerNavButtonClassName}`}
            aria-label="Previous slide"
          >
            <HiChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <button
            type="button"
            className={`swiper-button-next-custom ${partnerNavButtonClassName}`}
            aria-label="Next slide"
          >
            <HiChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {/* Slide counter */}
        <div className="text-sm font-medium text-brand-gray">
          {String(currentSlide).padStart(2, "0")}—{" "}
          {String(partners.length).padStart(2, "0")}
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1.5}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
        breakpoints={{
          320: {
            slidesPerView: 1.25,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 35,
          },
          1024: {
            slidesPerView: 1.5,
            spaceBetween: 50,
          },
        }}
        className="partner-slider cursor-grab [&_.swiper-slide:not(.swiper-slide-active)]:blur-[2px] [&_.swiper-slide:not(.swiper-slide-active)]:opacity-60"
      >
        {partners.map((partner) => {
          // Type assertion until Prismic types are regenerated
          const partnerData = partner.data as any;
          
          return (
            <SwiperSlide key={partner.id}>
              <div className="py-7 flex flex-col">
                <div className="flex gap-4 mb-10 items-center">
                  {/* Partner Image */}
                  {isFilled.image(partnerData.image) && (
                    <div className="flex-shrink-0">
                      <PrismicImage
                        field={partnerData.image}
                        className="w-[100px] h-[100px] object-cover rounded-lg"
                        width={100}
                        height={100}
                      />
                    </div>
                  )}

                  {/* Partner Info */}
                  <div className="flex-1">
                    {isFilled.keyText(partnerData.name) && (
                      <Heading
                        as="h3"
                        size="sm"
                        className="font-semibold text-black mb-1"
                      >
                        {partnerData.name}
                      </Heading>
                    )}

                    <div className="text-xs text-brand-gray">
                      {isFilled.keyText(partnerData.job_title) && (
                        <span>{partnerData.job_title}</span>
                      )}
                      {isFilled.keyText(partnerData.job_title) &&
                        isFilled.keyText(partnerData.company_name) && (
                          <span> at </span>
                        )}
                      {isFilled.keyText(partnerData.company_name) && (
                        <span className="font-medium">
                          {partnerData.company_name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Partner content */}
                {isFilled.richText(partnerData.body) && (
                  <div className="mb-6 flex-1 overflow-hidden">
                    <PrismicRichText
                      field={partnerData.body}
                      components={{
                        paragraph: ({ children }) => (
                          <p className="text-brand-gray font-serif font-thin mb-6 leading-tight text-xl lg:text-[24px] max-w-2xl">
                            <span className="text-orange-500 text-3xl font-serif mr-8 float-left leading-none">"</span>
                            {children}
                          </p>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-brand-blue">
                            {children}
                          </strong>
                        ),
                      }}
                    />
                  </div>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default PartnerSliderComponent;
