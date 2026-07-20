import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { Bounded } from "@/app/components/Bounded";
import clsx from "clsx";
import { isFilled } from "@prismicio/client";
import { ColorSection } from "@/app/components/ColorSection";
import NewsletterForm from "@/app/components/Forms/NewsletterForm";

/**
 * Props for `TextAndForm`.
 */
export type TextAndFormProps = SliceComponentProps<Content.TextAndFormSlice>;

const formComponents = {
  "Newsletter Form": <NewsletterForm />,
} as const;

/**
 * Component for "TextAndForm" Slices.
 */
const TextAndForm: FC<TextAndFormProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        isFilled.select(slice.primary.bg_color_full_width) && "p-[50px_40px] my-10",
        slice.primary.bg_color_full_width === "Dark Blue" && "bg-[#29285D] text-white",
        slice.primary.bg_color_full_width === "Yellow" && "bg-[#F1E1A7]"
      )}
    >
      <ColorSection
        bgColor={isFilled.select(slice.primary.bg_color) ? slice.primary.bg_color : undefined}
        className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24"
      >
        <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
          <Heading size="lg" className="mb-8">{slice.primary.heading}</Heading>
          <PrismicRichText field={slice.primary.body} />
        </div>
        <div>
          {slice.primary.form && formComponents[slice.primary.form as keyof typeof formComponents]}
        </div>
      </ColorSection>
    </Bounded>
  );
};

export default TextAndForm;
