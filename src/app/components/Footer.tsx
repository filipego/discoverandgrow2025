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
        style={{ backgroundImage: "url(/images/Ellipse.png)" }}
      />

      <Bounded className="!pt-0 pb-10 bg-[#29285D] text-white">
        <div>
          <div className="flex flex-col md:flex-row gap-12 md:gap-8 mb-20 md:mb-40">
            <div className="w-full md:w-2/6">
              <Heading size="sm" color="brand-off-white" className="mb-6 md:mb-11">
                {settings.data.newsletter_title}
              </Heading>
              <div className="max-w-full md:max-w-[70%] [&_form]:mx-0 md:[&_form]:mx-auto">
                <NewsletterForm hideLabel={true} />
              </div>
            </div>
            <div className="w-full md:w-3/6">
              <Heading size="sm" color="brand-off-white" className="mb-6 md:mb-10">
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
            <div className="w-full md:w-1/6 flex flex-row md:flex-col items-start md:items-end justify-start md:justify-center gap-4">
              {settings.data.social_links.map((link, index) => {
                const hoverColors = [
                  "hover:text-[#3B82F6]", // Email - blue
                  "hover:text-[#E4405F]", // Instagram - pink/red
                  "hover:text-[#1877F2]", // Facebook - blue
                  "hover:text-[#000000]", // Twitter/X - black
                  "hover:text-[#0077B5]", // LinkedIn - blue
                ];
                return (
                  <PrismicNextLink
                    key={link.key}
                    field={link}
                    className={`text-white ${hoverColors[index] || "hover:text-[#D93CA6]"} transition-colors`}
                  >
                    {index === 0 && <HiOutlineEnvelope size={20} />}
                    {index === 1 && <FaInstagram size={20} />}
                    {index === 2 && <FaFacebookF size={20} />}
                    {index === 3 && <FaXTwitter size={20} />}
                    {index === 4 && <FaLinkedinIn size={20} />}
                  </PrismicNextLink>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-8">
            <div className="w-full md:w-2/6">
              <LongLogo treeColor="white" className="h-[60]" />
            </div>
            <div className="w-full md:w-3/6">
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
            <div className="w-full md:w-1/6"></div>
          </div>
        </div>
        
        <div className="relative mt-12 md:mt-30 mb-0">
          <div className="md:border border-[#979797] rounded-full px-2 md:px-6 py-4 md:py-3 flex flex-col md:flex-row items-start md:items-center justify-between relative gap-4 md:gap-0 pb-16 md:pb-3">
            <div className="flex flex-col gap-0.5 text-white text-[10px] w-full md:w-auto">
              <p className="hidden md:block text-[11px]">© 2025 DISCOVER AND GROW, INC - We are a 501(c)(3) nonprofit based in New York City EIN# 87-1397816</p>
              <div className="flex flex-col gap-0.5 md:hidden">
                <p className="text-[11px]">© 2025 DISCOVER AND GROW, INC</p>
                <p className="text-[11px]">We are a 501(c)(3) nonprofit based in New York City EIN# 87-1397816</p>
              </div>
            </div>
            <div className="flex flex-row md:flex-row gap-4 md:gap-6 text-white text-xs md:ml-auto">
              {settings.data.documents_link.map((link, index) => (
                <PrismicNextLink
                  key={link.key}
                  field={link}
                  className="hover:text-brand-green transition-colors"
                >
                  {index === 0 && "Privacy Policy"}
                  {index === 1 && "Terms & Conditions"}
                </PrismicNextLink>
              ))}
            </div>
            <div className="absolute right-4 md:right-1/3 top-1/2 md:top-1/2 -translate-y-1/2 md:-translate-y-1/2 md:translate-x-1/2 z-10">
              <PrismicNextImage
                field={settings.data.badge}
                width={70}
                height={70}
                className="w-12 h-12 md:w-20 md:h-20"
              />
            </div>
          </div>
        </div>
      </Bounded>
    </div>
  );
}

export default Footer;
