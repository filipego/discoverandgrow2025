"use client";

import { FC, useRef, useState } from "react";
import { Content, isFilled, PrismicDocument } from "@prismicio/client";
import { PrismicRichText, PrismicImage } from "@prismicio/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Heading } from "@/app/components/Heading";

interface PartnerSliderComponentProps {
  partners: Content.PartnerPostDocument[];
}

const PartnerSliderComponent: FC<PartnerSliderComponentProps> = ({ partners }) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <div>
      {/* Navigation arrows and counter */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            className="swiper-button-prev-custom w-8 h-8 bg-brand-green text-white flex items-center justify-center hover:bg-brand-yellow transition-colors duration-200 cursor-pointer group"
            aria-label="Previous slide"
          >
            <span className="relative block w-4 h-4 overflow-hidden">
              <svg
                className="w-4 h-4 block transition-all duration-300 group-hover:-translate-y-full fill-white"
                viewBox="0 0 24 24"
              >
                <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
              </svg>
                              <svg
                  className="w-4 h-4 absolute top-0 left-0 translate-y-full block transition-all duration-300 group-hover:translate-y-0 fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
                </svg>
            </span>
          </button>

          <button
            className="swiper-button-next-custom w-8 h-8 bg-brand-green text-white flex items-center justify-center hover:bg-brand-yellow transition-colors duration-200 cursor-pointer group"
            aria-label="Next slide"
          >
            <span className="relative block w-4 h-4 overflow-hidden">
              <svg
                className="w-4 h-4 block transition-all duration-300 group-hover:-translate-y-full fill-white"
                viewBox="0 0 24 24"
              >
                <path d="M8.59 16.09l4.58-4.59-4.58-4.59L10 5.5l6 6-6 6z" />
              </svg>
                              <svg
                  className="w-4 h-4 absolute top-0 left-0 translate-y-full block transition-all duration-300 group-hover:translate-y-0 fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59 16.09l4.58-4.59-4.58-4.59L10 5.5l6 6-6 6z" />
                </svg>
            </span>
          </button>
        </div>

        {/* Slide counter */}
        <div className="text-sm text-brand-gray font-medium">
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
                        as="h4"
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
