import { FC } from "react";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { Content } from "@prismicio/client";

export interface MultipleHeadingAndTextProps {
  items: Content.HeadingAndTextSliceMultipleHeaderAndTextPrimary["item"];
  className?: string;
}

export const MultipleHeadingAndText: FC<MultipleHeadingAndTextProps> = ({
  items,
  className,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 border-t border-brand-light-gray pt-8">
      {items.map((item, index) => (
        <div key={index} className="space-y-4">
          <Heading as="h2" size="md" className="max-w-[600px]">
            {item.heading}
          </Heading>
          <div className="max-w-prose">
            <PrismicRichText
              field={item.body}
              components={{
                heading3: ({ children }) => (
                  <Heading as="h3" size="sm" className="font-semibold mb-3 mt-6">
                    {children}
                  </Heading>
                ),
                paragraph: ({ children }) => (
                  <p className="text-brand-gray leading-relaxed">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}; 