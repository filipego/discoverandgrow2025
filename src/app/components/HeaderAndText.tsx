import { FC } from "react";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "./Heading";
import { KeyTextField, RichTextField } from "@prismicio/client";

interface HeaderAndTextProps {
  heading: KeyTextField;
  body: RichTextField;
  bigger?: boolean;
  className?: string;
}

const HeaderAndText: FC<HeaderAndTextProps> = ({
  heading,
  body,
  bigger = false,
  className = "",
}) => {
  return (
    <div className={`${bigger ? 'mb-12' : 'mb-8'} ${className}`}>
      {heading && (
        <Heading 
          as="h2" 
          size={bigger ? "lg" : "md"} 
          className={`mb-6 ${bigger ? 'text-center' : ''}`}
        >
          {heading}
        </Heading>
      )}
      {body && (
        <div className={`${bigger ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
          <PrismicRichText
            field={body}
            components={{
              paragraph: ({ children }) => (
                <p className={`text-brand-gray ${bigger ? 'text-lg' : 'text-base'} leading-relaxed`}>
                  {children}
                </p>
              ),
              heading3: ({ children }) => (
                <Heading as="h3" size="sm" className="font-semibold mb-3 mt-6">
                  {children}
                </Heading>
              ),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HeaderAndText; 