import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { FaLinkedinIn } from "react-icons/fa";
import { Heading } from "@/app/components/Heading";
import clsx from "clsx";

interface BoardLayoutProps {
  people: Content.OurTeamSliceOurBoardPrimary["person"];
}

export const BoardLayout: FC<BoardLayoutProps> = ({ people }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
      {people.map((person, index) => (
        <div key={index} className={clsx(
          "space-y-4",
          index > 0 && "pt-8 md:pt-0"
        )}>
          {/* Image */}
          <div className={clsx(
            "w-full max-w-xs rounded-xl overflow-hidden",
            index === 0 ? "ml-0 mr-auto" : index === people.length - 1 ? "mr-0 ml-auto" : "mx-auto"
          )}>
            <PrismicNextImage
              field={person.image}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          
          {/* Content */}
          <div className={clsx(
            "px-4 max-w-xs space-y-2",
            index === 0 ? "ml-0 mr-auto" : index === people.length - 1 ? "mr-0 ml-auto" : "mx-auto"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Heading 
                  as="h3" 
                  size="xs" 
                  color="brand-light-gray"
                  className="font-bold"
                >
                  {person.name}, <span className="text-sm font-medium text-brand-gray/70">{person.title}</span>
                </Heading>
              </div>
              {person.linkedin && (
                <PrismicNextLink field={person.linkedin} className="text-brand-green hover:text-brand-green/80 transition-colors ml-2">
                  <FaLinkedinIn className="w-4 h-4" />
                </PrismicNextLink>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 