import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { FaLinkedinIn } from "react-icons/fa";
import { Heading } from "@/app/components/Heading";
import clsx from "clsx";

interface FoundersLayoutProps {
  people: Content.OurTeamSliceDefaultPrimary["person"];
}

export const FoundersLayout: FC<FoundersLayoutProps> = ({ people }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-center">
      {people.map((person, index) => (
        <div key={index} className={clsx(
          "space-y-5",
          index > 0 && "pt-8 lg:pt-0"
        )}>
          {/* Image */}
          <div className={clsx(
            "w-full rounded-xl overflow-hidden",
            index === 0 ? "max-w-md mx-auto" : "max-w-md ml-auto"
          )}>
            <PrismicNextImage
              field={person.image}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          
          {/* Content */}
          <div className={clsx(
            "space-y-3 px-4",
            index === 0 ? "max-w-lg" : "max-w-md ml-auto"
          )}>
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <Heading 
                  as="h3" 
                  size="sm" 
                  color="brand-light-gray"
                  className="font-bold"
                >
                  {person.name}
                </Heading>
                <p className="text-sm text-brand-gray/70 font-medium mb-3">
                  {person.title}
                </p>
              </div>
              {person.linkedin && (
                <PrismicNextLink field={person.linkedin} className="text-brand-green hover:text-brand-green/80 transition-colors ml-2 self-start">
                  <FaLinkedinIn className="w-5 h-5" />
                </PrismicNextLink>
              )}
            </div>
            
            {/* Body text */}
            {'body' in person && person.body && (
              <div className="text-brand-gray">
                <PrismicRichText
                  field={person.body}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="leading-relaxed text-sm">{children}</p>
                    ),
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}; 