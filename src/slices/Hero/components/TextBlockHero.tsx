import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";

type TextBlockHeroProps = {
  body: RichTextField;
};

export function TextBlockHero({ body }: TextBlockHeroProps) {
  return (
    <div className="mb-5 max-w-[970px] px-0 lg:mb-10 lg:px-[50px]">
      <PrismicRichText
        field={body}
        components={{
          heading2: ({ children }) => (
            <Heading as="h2" size="xl" className="mb-5 font-semibold lg:mb-10">
              {children}
            </Heading>
          ),
          heading3: ({ children }) => (
            <Heading as="h3" size="xl" className="mb-10 font-semibold lg:mb-20">
              {children}
            </Heading>
          ),
          heading4: ({ children }) => (
            <Heading as="h4" size="xl" className="mb-10 font-semibold lg:mb-20">
              {children}
            </Heading>
          ),
          list: ({ children }) => (
            <ul className="-mt-2 mb-6 ml-4 max-w-prose list-outside list-disc space-y-2 pl-5 text-brand-gray lg:mt-0 lg:ml-0 lg:pl-14">
              {children}
            </ul>
          ),
          listItem: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          paragraph: ({ children }) => (
            <p className="mb-4 max-w-prose leading-relaxed text-brand-gray lg:mb-6">
              {children}
            </p>
          ),
        }}
      />
    </div>
  );
}
