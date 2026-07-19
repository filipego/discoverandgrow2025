import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";
import DonateForm from "./DonateForm";

/**
 * Props for `DonationForm`.
 */
export type DonationFormProps = SliceComponentProps<Content.DonationFormSlice>;

/**
 * Component for "DonationForm" Slices.
 */
const DonationForm: FC<DonationFormProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      padding="bigger padding"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <Heading className="mb-10">{slice.primary.heading}</Heading>
          <PrismicRichText
            field={slice.primary.body}
            components={{
              heading3: ({ children }) => (
                <Heading as="h3" size="sm" className="font-semibold mb-3 mt-10">
                  {children}
                </Heading>
              ),
              paragraph: ({ children }) => <p className="mb-4">{children}</p>,
              list: ({ children }) => <ul className="ml-4 mb-6">{children}</ul>,
              listItem: ({ children }) => (
                <li className="mb-4 list-disc ml-6">{children}</li>
              ),
            }}
          />
        </div>
        <div>
          <DonateForm
            image={slice.primary.donate_form_image}
            heading={slice.primary.donate_form_heading}
          />
        </div>
      </div>
    </Bounded>
  );
};

export default DonationForm;
