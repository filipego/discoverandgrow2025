import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";

type TextBlockPrimary = Content.TextBlockSliceDefaultPrimary & {
  padding?:
    | "normal padding"
    | "smaller padding"
    | "no padding"
    | "no top padding"
    | "no bottom padding"
    | null;
};

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock: FC<TextBlockProps> = ({ slice }) => {
  const primary = slice.primary as TextBlockPrimary;
  const padding = primary.padding ?? "normal padding";

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      padding={padding}
    >
      <div className="mb-5 max-w-[970px] px-0 lg:mb-10 lg:px-[50px]">
        <PrismicRichText
          field={primary.body}
          components={{
            heading2: ({ children }) => (
              <Heading
                as="h2"
                size="xl"
                className="mb-5 font-semibold lg:mb-10"
              >
                {children}
              </Heading>
            ),
            heading3: ({ children }) => (
              <Heading
                as="h3"
                size="lg"
                className="mb-3 max-w-2xl font-semibold lg:mb-4"
              >
                {children}
              </Heading>
            ),
            heading4: ({ children }) => (
              <Heading
                as="h4"
                size="md"
                className="mb-3 font-semibold lg:mb-4"
              >
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
    </Bounded>
  );
};

export default TextBlock;
