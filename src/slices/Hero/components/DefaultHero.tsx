import { Content, ImageField, isFilled, KeyTextField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { ButtonLink } from "@/app/components/ButtonLink";

type DefaultHeroProps = {
  heading: Content.HeroSlice["primary"]["heading"];
  body: Content.HeroSlice["primary"]["body"];
  link: Content.HeroSlice["primary"]["link"];
  image: ImageField;
  kicker: KeyTextField;
};

export function DefaultHero({
  heading,
  body,
  link,
  image,
  kicker,
}: DefaultHeroProps) {
  return (
    <div className="grid grid-cols-5 items-center gap-12 pt-4 pb-4 lg:gap-24 lg:py-20">
      <div className="col-span-5 lg:col-span-3">
        {isFilled.keyText(kicker) && (
          <span className="mb-4 block text-[10px] uppercase tracking-widest lg:text-xs">
            {kicker}
          </span>
        )}
        <Heading as="h1" size="xl" className="mb-5 max-w-[650] lg:mb-10">
          {heading}
        </Heading>
        <div className="mb-3 max-w-[480] lg:mb-5">
          <PrismicRichText field={body} />
        </div>
        {isFilled.repeatable(link) && (
          <ul className="mt-7 flex gap-2 lg:mt-14">
            {link.map((link) => (
              <li key={link.key}>
                <ButtonLink field={link} color={link.variant}>
                  {link.text}
                </ButtonLink>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isFilled.image(image) && (
        <div className="col-span-5 mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-xl lg:col-span-2 lg:max-w-none">
          <PrismicNextImage
            field={image}
            className="h-full w-full rounded-xl object-cover"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      )}
    </div>
  );
}
