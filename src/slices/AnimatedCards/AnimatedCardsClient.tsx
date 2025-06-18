"use client";

import { useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonLink } from "@/app/components/ButtonLink";
import { Heading } from "@/app/components/Heading";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export type AnimatedCardsClientProps = {
  slice: Content.AnimatedCardsSlice;
};

export const AnimatedCardsClient = ({ slice }: AnimatedCardsClientProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return;

    const container = containerRef.current;
    const cards = cardsRef.current;
    
    // Calculate the height of the tallest card
    let maxHeight = 0;
    cards.forEach(card => {
      const cardHeight = card.offsetHeight;
      if (cardHeight > maxHeight) {
        maxHeight = cardHeight;
      }
    });
    
    // Set container height to tallest card height
    container.style.height = `${maxHeight}px`;
    
    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Set initial state for all cards
      cards.forEach((card, index) => {
        if (index === 0) {
          // First card starts visible and positioned normally
          gsap.set(card, {
            y: 0,
            opacity: 1,
            zIndex: 1,
          });
        } else {
          // Other cards start further below the container (hidden)
          gsap.set(card, {
            y: maxHeight + 100,
            opacity: 1,
            zIndex: 1, // Start with low z-index
          });
        }
      });

              // Create the main ScrollTrigger for pinning and stacking
        ScrollTrigger.create({
          trigger: container,
          start: "center center",
          end: `+=${maxHeight * (cards.length - 1)}`,
          pin: true,
          scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalCards = cards.length;
          
          cards.forEach((card, index) => {
            // Calculate which card should be active
            const cardProgress = progress * (totalCards - 1);
            const currentCardIndex = Math.floor(cardProgress);
            const transitionProgress = cardProgress - currentCardIndex;
            
            if (index === currentCardIndex) {
              // Current card - starts in position, then fades/moves as next comes
              const opacity = 1 - transitionProgress; // Fade to 0 opacity
              const scale = 1 - (transitionProgress * 0.1); // Slightly shrink
              const yOffset = transitionProgress * -50; // Move slightly up
              
              gsap.set(card, {
                y: yOffset,
                opacity: opacity,
                scale: scale,
                zIndex: index + 1, // Maintain current z-index
              });
            } else if (index === currentCardIndex + 1) {
              // Next card - slides up from bottom with higher z-index
              const yPos = (1 - transitionProgress) * (maxHeight + 100);
              const stackOffset = transitionProgress * 20; // Stacking effect
              const nextZIndex = index + 1; // Higher z-index when animating in
              
              gsap.set(card, {
                y: yPos - stackOffset,
                opacity: 1,
                scale: 1,
                zIndex: nextZIndex,
              });
            } else if (index < currentCardIndex) {
              // Previous cards - fully faded and moved
              gsap.set(card, {
                y: -100,
                opacity: 0,
                scale: 0.9,
                zIndex: index + 1, // Keep their z-index
              });
            } else {
              // Future cards - stay below container (hidden)
              gsap.set(card, {
                y: maxHeight + 100,
                opacity: 1,
                scale: 1,
                zIndex: 1, // Low z-index until they animate
              });
            }
          });
        }
      });

    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [slice.primary.cards]);

  const addCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  if (!isFilled.group(slice.primary.cards)) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full flex items-center justify-center"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {slice.primary.cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => addCardRef(el, index)}
            className="absolute w-full"
            style={{ 
              zIndex: index + 1,
            }}
          >
            <div className="bg-[#2A285D] rounded-2xl min-h-[400px] flex flex-col lg:flex-row overflow-hidden">
              {/* Text Content */}
              <div className="lg:w-1/2 p-12 space-y-6 flex flex-col justify-center">
                {isFilled.keyText(card.heading) && (
                  <Heading as="h3" size="sm" color="brand-off-white" ff="secondary">
                    {card.heading}
                  </Heading>
                )}
                
                {isFilled.richText(card.body) && (
                  <div className="text-brand-off-white">
                    <PrismicRichText 
                      field={card.body}
                      components={{
                        paragraph: ({ children }) => (
                          <p className="text-sm mb-4 last:mb-0 leading-relaxed">{children}</p>
                        ),
                        list: ({ children }) => (
                          <ul className="text-sm space-y-2 list-disc list-inside mb-4 last:mb-0 mt-4 ml-4">{children}</ul>
                        ),
                        listItem: ({ children }) => (
                          <li className="text-sm leading-relaxed">{children}</li>
                        ),
                        oList: ({ children }) => (
                          <ol className="text-sm space-y-2 list-decimal list-inside mb-4 last:mb-0 mt-4 ml-4">{children}</ol>
                        ),
                        heading4: ({ children }) => (
                          <Heading as="h4" size="xs" color="brand-off-white" ff="secondary" className="mb-3 mt-6 first:mt-0">
                            {children}
                          </Heading>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-brand-off-white">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),
                      }}
                    />
                  </div>
                )}

                {isFilled.link(card.link) && (
                  <div className="pt-4">
                    <ButtonLink
                      field={card.link}
                      color="Link"
                      size="sm"
                      noPadding={true}
                    >
                      Learn more
                    </ButtonLink>
                  </div>
                )}
              </div>

              {/* Image */}
              {isFilled.image(card.image) && (
                <div className="lg:w-1/2 relative">
                  <PrismicNextImage
                    field={card.image}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 