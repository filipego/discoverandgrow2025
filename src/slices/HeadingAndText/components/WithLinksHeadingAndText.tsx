import { FC } from "react";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { HeadingAndTextComponentProps } from "../index";
import { PrismicNextLink } from "@prismicio/next";
import { HiArrowRight } from "react-icons/hi2";
import { LinkField } from "@prismicio/client";

interface WithLinksHeadingAndTextProps extends HeadingAndTextComponentProps {
  link: LinkField[];
}

export const WithLinksHeadingAndText: FC<WithLinksHeadingAndTextProps> = ({
  heading,
  body,
  className,
  link,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 border-t border-brand-light-gray pt-6 lg:grid-cols-2 lg:gap-24 lg:pt-12">
      <div>
        <Heading as="h2" size="md" className="max-w-[600] mb-5">
          {heading}
        </Heading>
        <div className="mb-2 max-w-[480] lg:mb-5">
          <PrismicRichText
            field={body}
            components={{
              heading3: ({ children }) => (
                <Heading as="h3" size="sm" className="font-semibold mb-3 mt-10">
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
      <div>
        {link && (
          <ul className="flex flex-col">
            {link.map((linkItem, index) => (
              <li key={index} className="relative group text-[14px] lg:text-base">
                <PrismicNextLink
                  field={linkItem}
                  className="flex w-full items-center justify-between border-t border-brand-light-gray py-6 font-medium text-brand-green link-border-animation"
                >
                  <span>{linkItem.text}</span>
                  <HiArrowRight
                    className="transition-all duration-300 transform -rotate-45 group-hover:rotate-0 group-hover:translate-x-1"
                    size={20}
                  />
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
