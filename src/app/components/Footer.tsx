import React from "react";
import { Bounded } from "./Bounded";
import { LongLogo } from "./LongLogo";
import { createClient } from "@/prismicio";
import { Heading } from "./Heading";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import NewsletterForm from "./Forms/NewsletterForm";
import { PrismicRichText } from "@prismicio/react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import { ButtonLink } from "./ButtonLink";

type Props = {};

export async function Footer({}: Props) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <div className="relative mt-30">
      <div
        className="w-full h-24 md:h-40 bg-no-repeat bg-cover bg-top"
        style={{ backgroundImage: "url(/images/ellipse.png)" }}
      />

      <Bounded className="!pt-0 pb-30 bg-[#29285D] text-white">
        <div>
          <div className="flex gap-8 mb-40">
            <div className="w-2/6">
              <Heading size="sm" color="brand-off-white" className="mb-11">
                {settings.data.newsletter_title}
              </Heading>
              <div className="max-w-[70%]">
                <NewsletterForm hideLabel={true} />
              </div>
            </div>
            <div className="w-3/6">
              <Heading size="sm" color="brand-off-white" className="mb-10">
                {settings.data.donate_title}
              </Heading>
              <PrismicRichText
                field={settings.data.donate_body}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-xs mb-5 lg:max-w-[375px] text-[#dfdfdf]">
                      {children}
                    </p>
                  ),
                }}
              />

              <ButtonLink
                field={settings.data.button}
                color="Secondary"
                size="md"
              >
                {settings.data.button.text}
              </ButtonLink>
            </div>
            <div className="w-1/6 flex items-center justify-end">
              <PrismicNextImage
                field={settings.data.badge}
                width={70}
                height={70}
              />
            </div>
          </div>

          <div className="flex gap-8">
            <div className="w-2/6">
              <LongLogo treeColor="white" className="h-[60]" />
            </div>
            <div className="w-3/6">
              <PrismicRichText
                field={settings.data.footer_bio}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-xs mb-5 last:mb-0 lg:max-w-[375px] text-[#dfdfdf]">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
            <div className="w-1/6 flex items-end justify-end gap-4">
              {settings.data.social_links.map((link, index) => (
                <PrismicNextLink
                  key={link.key}
                  field={link}
                  className="text-white hover:text-[#D93CA6] transition-colors"
                >
                  {index === 0 && <HiOutlineEnvelope size={20} />}
                  {index === 1 && <FaInstagram size={20} />}
                  {index === 2 && <FaFacebookF size={20} />}
                  {index === 3 && <FaXTwitter size={20} />}
                  {index === 4 && <FaLinkedinIn size={20} />}
                </PrismicNextLink>
              ))}
            </div>
          </div>
        </div>
      </Bounded>
    </div>
  );
}

export default Footer;
