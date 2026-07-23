"use client";

import { useEffect, useRef, useState } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonLink } from "@/app/components/ButtonLink";
import { Heading } from "@/app/components/Heading";

gsap.registerPlugin(ScrollTrigger);

type AnimatedCard = Content.AnimatedCardsSlice["primary"]["cards"][number];

export type AnimatedCardsClientProps = {
  slice: Content.AnimatedCardsSlice;
};

interface AnimatedCardContentProps {
  card: AnimatedCard;
  className: string;
}

const AnimatedCardContent = ({
  card,
  className,
}: AnimatedCardContentProps) => (
  <div className={className}>
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
              <p className="mb-4 text-sm leading-relaxed last:mb-0">
                {children}
              </p>
            ),
            list: ({ children }) => (
              <ul className="mt-4 mb-4 list-outside list-disc space-y-2 pl-5 text-sm last:mb-0">
                {children}
              </ul>
            ),
            listItem: ({ children }) => (
              <li className="text-sm leading-relaxed">{children}</li>
            ),
            oList: ({ children }) => (
              <ol className="mt-4 mb-4 list-outside list-decimal space-y-2 pl-5 text-sm last:mb-0">
                {children}
              </ol>
            ),
            heading4: ({ children }) => (
              <Heading
                as="h4"
                size="xs"
                color="brand-off-white"
                ff="secondary"
                className="mt-6 mb-3 first:mt-0"
              >
                {children}
              </Heading>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-brand-off-white">
                {children}
              </strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
          }}
        />
      </div>
    )}

    {isFilled.link(card.link) && (
      <div className="pt-4">
        <ButtonLink field={card.link} color="Link" size="sm" noPadding>
          Learn more
        </ButtonLink>
      </div>
    )}
  </div>
);

interface AnimatedCardImageProps {
  card: AnimatedCard;
  className: string;
}

const AnimatedCardImage = ({ card, className }: AnimatedCardImageProps) => {
  if (!isFilled.image(card.image)) {
    return null;
  }

  return (
    <div className={className}>
      <PrismicNextImage field={card.image} className="h-full w-full object-cover" />
    </div>
  );
};

export const AnimatedCardsClient = ({ slice }: AnimatedCardsClientProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateDesktopState = () => setIsDesktop(mediaQuery.matches);

    updateDesktopState();
    mediaQuery.addEventListener("change", updateDesktopState);

    return () => mediaQuery.removeEventListener("change", updateDesktopState);
  }, []);

  useEffect(() => {
    if (!isDesktop || !containerRef.current || cardsRef.current.length === 0) {
      return;
    }

    const container = containerRef.current;
    const cards = cardsRef.current;
    const maxHeight = Math.max(...cards.map((card) => card.offsetHeight));

    const ctx = gsap.context(() => {
      gsap.set(container, { height: maxHeight });

      cards.forEach((card, index) => {
        gsap.set(card, {
          y: index === 0 ? 0 : maxHeight + 100,
          opacity: 1,
          zIndex: index === 0 ? 1 : 1,
        });
      });

      ScrollTrigger.create({
        trigger: container,
        start: "center center",
        end: `+=${maxHeight * (cards.length - 1)}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const cardProgress = self.progress * (cards.length - 1);
          const currentCardIndex = Math.floor(cardProgress);
          const transitionProgress = cardProgress - currentCardIndex;

          cards.forEach((card, index) => {
            if (index === currentCardIndex) {
              gsap.set(card, {
                y: transitionProgress * -50,
                opacity: 1 - transitionProgress,
                scale: 1 - transitionProgress * 0.1,
                zIndex: index + 1,
              });
            } else if (index === currentCardIndex + 1) {
              gsap.set(card, {
                y: (1 - transitionProgress) * (maxHeight + 100) - transitionProgress * 20,
                opacity: 1,
                scale: 1,
                zIndex: index + 1,
              });
            } else if (index < currentCardIndex) {
              gsap.set(card, {
                y: -100,
                opacity: 0,
                scale: 0.9,
                zIndex: index + 1,
              });
            } else {
              gsap.set(card, {
                y: maxHeight + 100,
                opacity: 1,
                scale: 1,
                zIndex: 1,
              });
            }
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop, slice.primary.cards]);

  const addCardRef = (element: HTMLDivElement | null, index: number) => {
    if (element) {
      cardsRef.current[index] = element;
    }
  };

  if (!isFilled.group(slice.primary.cards)) {
    return null;
  }

  return (
    <>
      <div className="lg:hidden flex w-full flex-col gap-8">
        {slice.primary.cards.map((card, index) => (
          <article
            key={index}
            className="overflow-hidden rounded-2xl bg-brand-blue text-brand-off-white"
          >
            <AnimatedCardImage card={card} className="w-full aspect-[4/3]" />
            <AnimatedCardContent
              card={card}
              className="flex flex-col space-y-6 p-6"
            />
          </article>
        ))}
      </div>

      <div
        ref={containerRef}
        className="hidden lg:flex relative w-full items-center justify-center"
      >
        <div className="relative flex h-full w-full items-center justify-center">
          {slice.primary.cards.map((card, index) => (
            <div
              key={index}
              ref={(element) => addCardRef(element, index)}
              className="absolute w-full"
              style={{ zIndex: index + 1 }}
            >
              <div className="flex min-h-[400px] flex-col overflow-hidden rounded-2xl bg-brand-blue lg:flex-row">
                <AnimatedCardContent
                  card={card}
                  className="flex flex-col justify-center space-y-6 p-12 lg:w-1/2"
                />
                <AnimatedCardImage
                  card={card}
                  className="relative lg:w-1/2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
