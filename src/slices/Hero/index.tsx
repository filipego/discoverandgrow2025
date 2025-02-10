import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";
import { ButtonLink } from "@/app/components/ButtonLink";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded

    >
      <div className="flex flex-col items-center justify-center text-center h-[60dvh]">
        <Heading as="h1" size="lg" className="mb-10 max-w-[800]">
          {slice.primary.heading}
        </Heading>
        <div className="max-w-[480] mb-5">
          <PrismicRichText field={slice.primary.body} />
        </div>
        {isFilled.repeatable(slice.primary.link) && (
          <ul className="flex gap-4 mt-8">
            {slice.primary.link.map((link) => (
              <li key={link.key}>
                <ButtonLink
                  field={link}
                  color={link.variant}
                >
                  {link.text}

                </ButtonLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Bounded>
  );
};

export default Hero;
