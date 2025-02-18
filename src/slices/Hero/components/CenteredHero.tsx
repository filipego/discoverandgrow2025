import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { ButtonLink } from "@/app/components/ButtonLink";

type CenteredHeroProps = {
  heading: Content.HeroSlice["primary"]["heading"];
  body: Content.HeroSlice["primary"]["body"];
  link: Content.HeroSlice["primary"]["link"];
};

export function CenteredHero({ heading, body, link }: CenteredHeroProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[60dvh]">
      <Heading as="h1" size="lg" className="mb-10 max-w-[800]">
        {heading}
      </Heading>
      <div className="max-w-[480] mb-5">
        <PrismicRichText field={body} />
      </div>
      {isFilled.repeatable(link) && (
        <ul className="flex gap-4 mt-8">
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
  );
}