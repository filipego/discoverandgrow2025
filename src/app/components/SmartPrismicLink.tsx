import { PrismicNextLink } from "@prismicio/next";
import { LinkField } from "@prismicio/client";

type SmartPrismicLinkProps = {
  link: LinkField;
  children: React.ReactNode;
};

export function SmartPrismicLink({ link, children }: SmartPrismicLinkProps) {
  if (!link) return null;

  if (link.link_type === 'Document' && link.type && link.uid) {
    return (
      <PrismicNextLink
        href={`${link.type === 'programs' ? '/programs/' : '/'}${link.uid}`}
      >
        {children}
      </PrismicNextLink>
    );
  }

  return (
    <PrismicNextLink field={link}>
      {children}
    </PrismicNextLink>
  );
}