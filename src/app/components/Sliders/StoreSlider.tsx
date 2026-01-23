"use client";

import { useState, useEffect } from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { ImageField, RichTextField, LinkField } from "@prismicio/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
// Fix the import path for Heading
import { Heading } from "@/app/components/Heading";
import { ButtonLink } from "@/app/components/ButtonLink";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

type StoreSliderProps = {
  items: {
    image: ImageField;
    heading: string;
    body: RichTextField;
    price?: number;
    link?: LinkField;
    // Remove id from expected properties
  }[];
};

export default function StoreSlider({ items }: StoreSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Add debugging to see what's in the items array
    console.log("StoreSlider items:", items);
    console.log("Items length:", items?.length);
    if (items && items.length > 0) {
      console.log("First item structure:", items[0]);
    }
  }, [items]);

  if (!items || items.length === 0) {
    return <div>No items to display</div>;
  }

  if (!mounted) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        Loading carousel...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-6xl mx-auto relative">
        <div className="relative">
          <Swiper
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 150,
              modifier: 1.5,
              slideShadows: false,
            }}
            navigation={false}
            pagination={false}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="product-showcase-swiper"
            initialSlide={1} // Set to 1 to start with the second slide
            loop={false} // Changed from true to false to remove infinite sliding
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 3 },
            }}
          >
            {items.map((item, index) => (
              <SwiperSlide
                key={`store-item-${index + 1}`}
                className="bg-transparent"
              >
                <div className="flex flex-col items-center h-[440px] w-[340px] mx-auto overflow-hidden rounded-2xl border-2 border-transparent">
                  {item.image && (
                    <div className="relative w-full h-full overflow-hidden rounded-2xl">
                      <PrismicNextImage
                        field={item.image}
                        fill
                        className="object-cover rounded-2xl"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="text-center mt-10 min-h-[240px]">
            <Heading as="h3" size="md" className="mb-6 max-w-[560px] mx-auto min-h-[72px]">
              {items[activeIndex]?.heading}
            </Heading>
            {/* <div className="max-w-md mx-auto mt-3 h-[120px] overflow-y-auto">
              {items[activeIndex]?.body &&
              Array.isArray(items[activeIndex]?.body) ? (
                <PrismicRichText
                  field={items[activeIndex].body}
                  components={{
                    paragraph: ({ children }) => <>{children}</>,
                  }}
                />
              ) : (
                <p className="max-w-[500px] mx-auto">
                  {typeof items[activeIndex]?.body === "string"
                    ? items[activeIndex].body
                    : "No description available"}
                </p>
              )}
            </div> */}
            <div className="mt-0 flex justify-center min-h-[44px]">
              {items[activeIndex]?.link && (
                <ButtonLink
                  field={items[activeIndex].link}
                  color="Secondary"
                  size="md"
                >
                  {items[activeIndex].link.text || "Buy Now"}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
