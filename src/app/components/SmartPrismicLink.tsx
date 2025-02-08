import { PrismicNextLink } from "@prismicio/next";
import { LinkField } from "@prismicio/client";

type SmartPrismicLinkProps = {
  link: LinkField;
  children: React.ReactNode;
  className?: string;  // Add className prop
};

export function SmartPrismicLink({ link, children, className }: SmartPrismicLinkProps) {
  if (!link) return null;

  if (link.link_type === 'Document' && link.type && link.uid) {
    return (
      <PrismicNextLink
        href={`${link.type === 'programs' ? '/programs/' : '/'}${link.uid}`}
        className={className}  // Pass className to PrismicNextLink
      >
        {children}
      </PrismicNextLink>
    );
  }

  return (
    <PrismicNextLink 
      field={link}
      className={className}  // Pass className here too
    >
      {children}
    </PrismicNextLink>
  );
}