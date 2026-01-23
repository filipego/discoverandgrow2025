import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock: FC<TextBlockProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      padding="no padding"
    >
      <div className="max-w-[970px] mb-5 lg:mb-10 px-[50px]">
        <PrismicRichText
          field={slice.primary.body}
          components={{
            heading2: ({ children }) => (
              <Heading
                as="h2"
                size="xl"
                className="font-semibold mb-5 lg:mb-10"
              >
                {children}
              </Heading>
            ),
            heading3: ({ children }) => (
              <Heading
                as="h3"
                size="xl"
                className="font-semibold mb-10 lg:mb-20"
              >
                {children}
              </Heading>
            ),
            heading4: ({ children }) => (
              <Heading
                as="h4"
                size="xl"
                className="font-semibold mb-10 lg:mb-20"
              >
                {children}
              </Heading>
            ),
            list: ({ children }) => (
              <ul className="max-w-prose list-disc pl-14 mb-6 space-y-2 text-brand-gray">
                {children}
              </ul>
            ),
            listItem: ({ children }) => (
              <li className="leading-relaxed">{children}</li>
            ),
            paragraph: ({ children }) => (
              <p className="max-w-prose mb-6 text-brand-gray leading-relaxed">
                {children}
              </p>
            ),
          }}
        />
      </div>
    </Bounded>
  );
};

export default TextBlock;
