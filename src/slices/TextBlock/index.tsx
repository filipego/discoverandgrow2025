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
      className="!py-0"
    >
      <div className="max-w-[700px] mb-5">
        <PrismicRichText
          field={slice.primary.body}
          components={{
            heading4: ({ children }) => (
              <Heading
                as="h4"
                size="lg"
                className="font-semibold mb-10 text-brand-gray/80"
              >
                {children}
              </Heading>
            ),
            list: ({ children }) => (
              <ul className="list-disc pl-14 mb-6 space-y-2 text-brand-gray">
                {children}
              </ul>
            ),
            listItem: ({ children }) => (
              <li className="leading-relaxed">{children}</li>
            ),
          }}
        />
      </div>
    </Bounded>
  );
};

export default TextBlock;
