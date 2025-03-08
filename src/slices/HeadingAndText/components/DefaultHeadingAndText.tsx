import { FC } from "react";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { HeadingAndTextComponentProps } from "../index";

export const DefaultHeadingAndText: FC<HeadingAndTextComponentProps> = ({ 
  heading, 
  body,
  className 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 border-t border-brand-light-gray pt-8">
      <div>
        <Heading as="h2" size="md" className="max-w-[600]">
          {heading}
        </Heading>
      </div>
      <div>
        <div className="max-w-[480] mb-5">
          <PrismicRichText field={body} />
        </div>
      </div>
    </div>
  );
};