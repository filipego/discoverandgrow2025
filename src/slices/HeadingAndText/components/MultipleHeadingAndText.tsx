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
    <div className="grid grid-cols-1 gap-8 border-t border-brand-light-gray pt-4 lg:grid-cols-2 lg:gap-16 lg:pt-8">
      {items.map((item, index) => (
        <div key={index} className="space-y-5 lg:space-y-4">
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
                  <p className="mb-3 text-brand-gray leading-relaxed last:mb-0">
                    {children}
                  </p>
                ),
                list: ({ children }) => (
                  <ul className="mb-6 ml-2 lg:ml-4">{children}</ul>
                ),
                listItem: ({ children }) => (
                  <li className="mb-4 ml-5 list-disc lg:ml-6">{children}</li>
                ),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
